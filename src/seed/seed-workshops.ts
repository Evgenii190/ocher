import fs from "node:fs";
import path from "node:path";
import type { getPayload } from "payload";
import {
  buildWorkshopAboutContent,
  type WorkshopSeedDefinition,
} from "./workshop-content.shared";
import { ALL_WORKSHOP_SEEDS } from "./workshops-data";
import type { SeedLocale } from "./i18n/catalog";
import {
  workshopTranslations,
  type WorkshopGlobalSlug,
} from "./i18n/workshops";
import { seedLocalizedCreate, seedLocalizedUpdateGlobal } from "./localized-seed";

const secondaryLocales = ["en", "zh"] as const satisfies readonly SeedLocale[];

const SEED_ASSETS_DIR = path.resolve(process.cwd(), "src/seed/assets");

function resolveAsset(fileName: string): string | null {
  const candidate = path.join(SEED_ASSETS_DIR, fileName);
  return fs.existsSync(candidate) ? candidate : null;
}

async function uploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  fileName: string,
  alt: string,
): Promise<number | string | undefined> {
  const filePath = resolveAsset(fileName);
  if (!filePath) {
    payload.logger.warn(`Файл не найден: ${fileName}`);
    return undefined;
  }

  const media = await payload.create({
    collection: "media",
    data: { alt },
    filePath,
  });

  return media.id;
}

function buildWorkshopLocaleGlobalData(
  definition: WorkshopSeedDefinition,
  locale: SeedLocale,
  shared: {
    heroBackgroundId?: number | string;
    galleryMedia: { id: number | string; alt: string }[];
    stockItems: { title: string; value: string; image: number | string }[];
  },
) {
  const translation =
    workshopTranslations[locale][definition.globalSlug as WorkshopGlobalSlug];

  return {
    heroDescription: translation?.heroDescription ?? definition.heroDescription,
    heroBackground: shared.heroBackgroundId,
    sectionOrder: definition.sectionOrder,
    aboutContent: buildWorkshopAboutContent(
      {
        titleLine1: definition.about.titleLine1,
        titleLine2: definition.about.titleLine2,
        sectionHeading: definition.about.sectionHeading,
        paragraphs: definition.about.paragraphs,
        galleryMedia: shared.galleryMedia,
      },
      locale,
      definition.globalSlug as WorkshopGlobalSlug,
    ),
    ...(definition.stock && shared.stockItems.length > 0
      ? {
          stockSection: {
            title:
              translation?.stock?.title ?? definition.stock.title,
            items: shared.stockItems.map((item) => {
              const itemTr = translation?.stock?.items[item.title];
              return {
                title: itemTr?.title ?? item.title,
                value: itemTr?.value ?? item.value,
                image: item.image,
              };
            }),
          },
        }
      : {}),
    advantageBlocks: definition.advantages.map((advantage) => {
      const advantageTr = translation?.advantages[advantage.title];
      return {
        title: advantageTr?.title ?? advantage.title,
        description: advantageTr?.description ?? advantage.description,
      };
    }),
  };
}

async function seedWorkshop(
  payload: Awaited<ReturnType<typeof getPayload>>,
  definition: WorkshopSeedDefinition,
) {
  payload.logger.info(`🌱 Наполнение: ${definition.globalSlug}…`);

  await payload.delete({
    collection: "workshop-equipment",
    where: { workshop: { equals: definition.pageSlug } },
  });

  const heroBackgroundId = await uploadMedia(
    payload,
    definition.heroBackgroundFile,
    definition.about.titleLine1,
  );

  const galleryMedia: { id: number | string; alt: string }[] = [];
  for (const slide of definition.about.gallery) {
    const id = await uploadMedia(payload, slide.file, slide.alt);
    if (id) {
      galleryMedia.push({ id, alt: slide.alt });
    }
  }

  const stockItems: {
    title: string;
    value: string;
    image: number | string;
  }[] = [];

  if (definition.stock) {
    for (const item of definition.stock.items) {
      const imageId = await uploadMedia(payload, item.file, item.title);
      if (imageId) {
        stockItems.push({
          title: item.title,
          value: item.value,
          image: imageId,
        });
      }
    }
  }

  const shared = { heroBackgroundId, galleryMedia, stockItems };

  await seedLocalizedUpdateGlobal({
    payload,
    slug: definition.globalSlug,
    ru: {
      heroDescription: definition.heroDescription,
      heroBackground: heroBackgroundId,
      sectionOrder: definition.sectionOrder,
      aboutContent: buildWorkshopAboutContent({
        titleLine1: definition.about.titleLine1,
        titleLine2: definition.about.titleLine2,
        sectionHeading: definition.about.sectionHeading,
        paragraphs: definition.about.paragraphs,
        galleryMedia,
      }),
      ...(definition.stock && stockItems.length > 0
        ? {
            stockSection: {
              title: definition.stock.title,
              items: stockItems,
            },
          }
        : {}),
      advantageBlocks: definition.advantages,
    },
    locales: Object.fromEntries(
      secondaryLocales.map((locale) => [
        locale,
        buildWorkshopLocaleGlobalData(definition, locale, shared),
      ]),
    ),
  });

  for (const [index, item] of definition.equipment.entries()) {
    const imageId = await uploadMedia(payload, item.imageFile, item.title);

    if (!imageId) {
      continue;
    }

    await seedLocalizedCreate({
      payload,
      collection: "workshop-equipment",
      ru: {
        title: item.title,
        titleFull: item.titleFull,
        description: item.description,
        descriptionLong: item.descriptionLong,
        features: item.features.map((text) => ({ text })),
        specs: item.specs,
        order: index,
      },
      shared: {
        workshop: definition.pageSlug,
        image: imageId,
      },
      locales: Object.fromEntries(
        secondaryLocales.map((locale) => {
          const equipmentTr =
            workshopTranslations[locale][
              definition.globalSlug as WorkshopGlobalSlug
            ]?.equipment[item.title];

          return [
            locale,
            {
              title: equipmentTr?.title,
              titleFull: equipmentTr?.titleFull,
              description: equipmentTr?.description,
              descriptionLong: equipmentTr?.descriptionLong,
              features: equipmentTr?.features.map((text) => ({ text })),
              specs: equipmentTr?.specs,
            },
          ];
        }),
      ),
    });
  }
}

export async function seedAllWorkshops(
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  for (const definition of ALL_WORKSHOP_SEEDS) {
    await seedWorkshop(payload, definition);
  }

  payload.logger.info("🏭 Все цеха обновлены");
}
