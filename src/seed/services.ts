import fs from "node:fs";
import path from "node:path";
import type { getPayload } from "payload";
import { buildServicesBottomContent } from "./services-content-builder";
import { buildServicePageContent } from "./service-page-content-builder";
import { servicesSeedDefinitions } from "./services-data";
import type { SeedLocale } from "./i18n/catalog";
import {
  serviceTranslations,
  servicesPageTranslations,
} from "./i18n/services";
import { seedLocalizedCreate, seedLocalizedUpdateGlobal } from "./localized-seed";

const secondaryLocales = ["en", "zh"] as const satisfies readonly SeedLocale[];

const ASSETS_DIR = path.resolve(process.cwd(), "src/seed/assets/services");

function resolveAsset(fileName: string): string | null {
  const candidate = path.join(ASSETS_DIR, fileName);
  return fs.existsSync(candidate) ? candidate : null;
}

async function uploadServiceMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  fileName: string,
  alt: string,
): Promise<number | string | undefined> {
  const filePath = resolveAsset(fileName);
  if (!filePath) {
    payload.logger.warn(`Файл услуги не найден: ${fileName}`);
    return undefined;
  }

  const media = await payload.create({
    collection: "media",
    data: { alt },
    filePath,
  });

  return media.id;
}

async function uploadSlides(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slides: { file: string; alt: string }[],
  translatedAlts?: string[],
): Promise<{ id: number | string; alt: string }[]> {
  const result: { id: number | string; alt: string }[] = [];

  for (const [index, slide] of slides.entries()) {
    const alt = translatedAlts?.[index] ?? slide.alt;
    const id = await uploadServiceMedia(payload, slide.file, alt);
    if (id) {
      result.push({ id, alt });
    }
  }

  return result;
}

export async function seedServices(payload: Awaited<ReturnType<typeof getPayload>>) {
  payload.logger.info("🌱 Наполнение «Услуги»…");

  await payload.delete({
    collection: "services",
    where: { id: { exists: true } },
  });

  let created = 0;

  for (const service of servicesSeedDefinitions) {
    const cardImageId = await uploadServiceMedia(
      payload,
      service.cardImageFile,
      service.title,
    );

    if (!cardImageId) {
      payload.logger.warn(
        `Пропущена услуга «${service.title}»: нет изображения карточки`,
      );
      continue;
    }

    const heroImageId =
      service.heroImageFile === service.cardImageFile
        ? cardImageId
        : await uploadServiceMedia(
            payload,
            service.heroImageFile,
            service.heroTitle,
          );

    if (!heroImageId) {
      payload.logger.warn(
        `Пропущена услуга «${service.title}»: нет hero-изображения`,
      );
      continue;
    }

    const [primarySlider, secondarySlider] = await Promise.all([
      uploadSlides(payload, service.sliderSlides),
      uploadSlides(payload, service.secondarySliderSlides),
    ]);

    await seedLocalizedCreate({
      payload,
      collection: "services",
      ru: {
        title: service.title,
        description: service.description,
        heroTitle: service.heroTitle,
        heroDescription: service.heroDescription,
        pageContent: buildServicePageContent(service, {
          primarySlider,
          secondarySlider,
        }),
        specs: service.specs ?? [],
        advantages: (service.advantages ?? []).map((text) => ({ text })),
        order: service.order,
      },
      shared: {
        slug: service.slug,
        image: cardImageId,
        heroImage: heroImageId,
      },
      locales: Object.fromEntries(
        secondaryLocales.map((locale) => {
          const translation = serviceTranslations[locale][service.slug];
          const localePrimarySlider = primarySlider.map((slide, index) => ({
            ...slide,
            alt: translation?.sliderAlts?.[index] ?? slide.alt,
          }));
          const localeSecondarySlider = secondarySlider.map((slide, index) => ({
            ...slide,
            alt: translation?.secondarySliderAlts?.[index] ?? slide.alt,
          }));

          return [
            locale,
            {
              title: translation?.title,
              description: translation?.description,
              heroTitle: translation?.heroTitle,
              heroDescription: translation?.heroDescription,
              pageContent: buildServicePageContent(
                service,
                {
                  primarySlider: localePrimarySlider,
                  secondarySlider: localeSecondarySlider,
                },
                locale,
              ),
              specs: translation?.specs ?? [],
              advantages: (translation?.advantages ?? []).map((text) => ({
                text,
              })),
            },
          ];
        }),
      ),
    });

    created += 1;
  }

  await seedLocalizedUpdateGlobal({
    payload,
    slug: "services-page",
    ru: {
      pageTitle: "Услуги",
      cardsSectionTitle: "Услуги",
      bottomContent: buildServicesBottomContent(),
    },
    locales: Object.fromEntries(
      secondaryLocales.map((locale) => [
        locale,
        {
          pageTitle: servicesPageTranslations[locale].pageTitle,
          cardsSectionTitle: servicesPageTranslations[locale].cardsSectionTitle,
          bottomContent: buildServicesBottomContent(locale),
        },
      ]),
    ),
  });

  payload.logger.info(`🛠️ Услуг создано: ${created}`);
}
