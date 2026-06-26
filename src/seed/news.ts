import fs from "node:fs";
import path from "node:path";
import { buildNewsContent } from "./news-content-builder";
import { seedNews, seedNewsCategories } from "./news-data";
import type { SeedLocale } from "./i18n/catalog";
import {
  newsCategoryTranslations,
  newsItemTranslations,
} from "./i18n/news";
import { seedLocalizedCreate } from "./localized-seed";

const secondaryLocales = ["en", "zh"] as const satisfies readonly SeedLocale[];

const NEWS_ASSETS_DIR = path.resolve(process.cwd(), "media");

function resolveNewsImage(fileName?: string): string | null {
  if (!fileName) {
    return null;
  }

  const candidate = path.join(NEWS_ASSETS_DIR, fileName);
  return fs.existsSync(candidate) ? candidate : null;
}

async function uploadNewsMedia(
  payload: Awaited<ReturnType<typeof import("payload").getPayload>>,
  fileName: string | undefined,
  alt: string,
): Promise<number | string | undefined> {
  const imagePath = resolveNewsImage(fileName);
  if (!imagePath) {
    payload.logger.warn(`Изображение не найдено: ${fileName ?? "—"}`);
    return undefined;
  }

  const media = await payload.create({
    collection: "media",
    data: { alt },
    filePath: imagePath,
  });

  return media.id;
}

export async function seedNewsSection(
  payload: Awaited<ReturnType<typeof import("payload").getPayload>>,
) {
  payload.logger.info("🌱 Наполнение новостей…");

  for (const collection of ["news", "news-categories"] as const) {
    await payload.delete({
      collection,
      where: { id: { exists: true } },
    });
  }

  const categoryIdBySlug = new Map<string, number | string>();
  for (const category of seedNewsCategories) {
    const created = await seedLocalizedCreate({
      payload,
      collection: "news-categories",
      ru: { title: category.title, order: category.order },
      shared: { slug: category.slug },
      locales: Object.fromEntries(
        secondaryLocales.map((locale) => [
          locale,
          { title: newsCategoryTranslations[locale][category.slug]?.title },
        ]),
      ),
    });
    categoryIdBySlug.set(category.slug, created.id);
  }
  payload.logger.info(`📁 Категорий новостей: ${categoryIdBySlug.size}`);

  let createdNews = 0;
  for (const item of seedNews) {
    const categoryId = categoryIdBySlug.get(item.categorySlug);
    if (!categoryId) {
      payload.logger.warn(
        `Пропущена новость «${item.title}»: нет категории ${item.categorySlug}`,
      );
      continue;
    }

    const cardImageId = await uploadNewsMedia(
      payload,
      item.cardImageFile,
      `${item.title} — превью`,
    );
    const heroId = await uploadNewsMedia(
      payload,
      item.heroImageFile,
      `${item.title} — hero`,
    );
    const bannerId = await uploadNewsMedia(
      payload,
      item.bannerImageFile,
      `${item.title} — banner`,
    );

    await seedLocalizedCreate({
      payload,
      collection: "news",
      ru: {
        title: item.title,
        description: item.description,
        content: buildNewsContent(item.contentKey, { heroId, bannerId }),
        publishedAt: item.publishedAt,
        order: item.order,
        isActive: true,
      },
      shared: {
        slug: item.slug,
        category: categoryId,
        image: cardImageId,
      },
      locales: Object.fromEntries(
        secondaryLocales.map((locale) => {
          const translation = newsItemTranslations[locale][item.slug];
          return [
            locale,
            {
              title: translation?.title,
              description: translation?.description,
              content: buildNewsContent(
                item.contentKey,
                { heroId, bannerId },
                locale,
              ),
            },
          ];
        }),
      ),
    });
    createdNews += 1;
  }

  payload.logger.info(`📰 Новостей создано: ${createdNews}`);
}
