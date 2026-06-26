import fs from "node:fs";
import path from "node:path";
import type { getPayload } from "payload";
import { certificateSeedItems } from "./certificates-data";
import type { Locale } from "@/i18n/locales";
import type { SeedLocale } from "./i18n/catalog";
import { getCertificateTitle } from "./i18n/certificates";
import { seedLocalizedUpdateGlobal } from "./localized-seed";

const secondaryLocales = ["en", "zh"] as const satisfies readonly SeedLocale[];
const ASSETS_DIR = path.resolve(process.cwd(), "src/seed/assets/certificates");

async function ensureCertificateMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  filename: string,
  title: string,
): Promise<number | string | undefined> {
  const filePath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`Пропущен сертификат: не найден ${filePath}`);
    return undefined;
  }

  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });

  if (existing.docs[0]?.id) {
    await payload.delete({
      collection: "media",
      id: existing.docs[0].id,
    });
  }

  const media = await payload.create({
    collection: "media",
    locale: "ru",
    data: { alt: title },
    filePath,
  });

  for (const locale of secondaryLocales) {
    await payload.update({
      collection: "media",
      id: media.id,
      locale,
      data: {
        alt: getCertificateTitle(slug, locale, title),
      },
    });
  }

  return media.id;
}

function buildLocaleItems(
  imageIds: Map<string, number | string>,
  locale: Locale,
) {
  return certificateSeedItems.flatMap((item) => {
    const imageId = imageIds.get(item.slug);
    if (!imageId) {
      return [];
    }

    return [
      {
        slug: item.slug,
        image: imageId,
        title:
          locale === "ru"
            ? item.title
            : getCertificateTitle(item.slug, locale, item.title),
        order: item.order,
      },
    ];
  });
}

export async function seedCertificatesPage(
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  payload.logger.info("🌱 Наполнение «Сертификаты»…");

  if (!fs.existsSync(ASSETS_DIR)) {
    payload.logger.warn(
      "Пропущено: не найдена папка src/seed/assets/certificates",
    );
    return;
  }

  const imageIds = new Map<string, number | string>();
  for (const item of certificateSeedItems) {
    const id = await ensureCertificateMedia(
      payload,
      item.slug,
      item.filename,
      item.title,
    );
    if (id) {
      imageIds.set(item.slug, id);
    }
  }

  if (imageIds.size === 0) {
    payload.logger.warn("Сертификаты не загружены");
    return;
  }

  await seedLocalizedUpdateGlobal({
    payload,
    slug: "certificates-page",
    ru: {
      items: buildLocaleItems(imageIds, "ru"),
    },
    locales: Object.fromEntries(
      secondaryLocales.map((locale) => [
        locale,
        { items: buildLocaleItems(imageIds, locale) },
      ]),
    ),
  });

  payload.logger.info(`🏅 Сертификатов: ${imageIds.size}`);
}
