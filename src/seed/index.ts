import fs from "node:fs";
import path from "node:path";
import config from "@payload-config";
import { getPayload } from "payload";
import { seedCategories, seedCharacteristics, seedProducts } from "./data";
import {
  buildProductLocaleFields,
  getCategoryTitle,
  getCharacteristicTitle,
} from "./i18n";
import type { SeedLocale } from "./i18n/catalog";
import {
  vacancyCategoryTranslations,
  vacancyTranslations,
  vacancyTypeTranslations,
} from "./i18n/vacancies";
import {
  seedVacancies,
  seedVacancyCategories,
  seedVacancyTypes,
  type SeedVacancy,
} from "./vacancies-data";
import { seedLaborProtection } from "./labor-protection";
import { seedCertificatesPage } from "./certificates";
import { seedEducationDisclosure } from "./education-disclosure";
import { seedProcurement } from "./procurement";
import { seedServices } from "./services";
import { seedAboutPage } from "./about-page";
import { seedHomePage } from "./home-page";
import { seedAllWorkshops } from "./seed-workshops";
import { seedNewsSection } from "./news";
import { seedSiteContacts } from "./site-contacts";
import {
  buildAccountantContent,
  buildDesignEngineerContent,
  buildQualityInspectorContent,
  buildTurnerContent,
} from "./vacancy-content-builder";
import { seedLocalizedCreate } from "./localized-seed";

const secondaryLocales = ["en", "zh"] as const satisfies readonly SeedLocale[];

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@ochko.local";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "changeme123";

// Картинка товара: ищем персональный файл в src/seed/assets/products/<slug>.*,
// иначе берём общий плейсхолдер-фото из public/catalog.
const ASSETS_DIR = path.resolve(process.cwd(), "src/seed/assets/products");
const FALLBACK_PHOTO = path.resolve(
  process.cwd(),
  "public/catalog/product-placeholder.png",
);
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];
const VACANCY_ASSETS_DIR = path.resolve(
  process.cwd(),
  "src/seed/assets/vacancies",
);
const CATEGORY_ASSETS_DIR = path.resolve(
  process.cwd(),
  "src/seed/assets/categories",
);

function resolveProductImage(slug: string): string | null {
  for (const ext of IMAGE_EXTENSIONS) {
    const candidate = path.join(ASSETS_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return fs.existsSync(FALLBACK_PHOTO) ? FALLBACK_PHOTO : null;
}

function resolveCategoryImage(slug: string): string | null {
  for (const ext of IMAGE_EXTENSIONS) {
    const candidate = path.join(CATEGORY_ASSETS_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

async function uploadCategoryMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  alt: string,
): Promise<number | string | undefined> {
  const imagePath = resolveCategoryImage(slug);
  if (!imagePath) {
    return undefined;
  }

  const media = await payload.create({
    collection: "media",
    data: { alt },
    filePath: imagePath,
  });
  return media.id;
}

function resolveVacancyCategoryImage(fileName?: string): string | null {
  if (!fileName) {
    return null;
  }

  const candidate = path.join(VACANCY_ASSETS_DIR, fileName);
  return fs.existsSync(candidate) ? candidate : null;
}

function resolveVacancyDetailImage(fileName?: string): string | null {
  return resolveVacancyCategoryImage(fileName);
}

async function uploadVacancyMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  fileName: string | undefined,
  alt: string,
): Promise<number | string | undefined> {
  const imagePath = resolveVacancyDetailImage(fileName);
  if (!imagePath) {
    return undefined;
  }

  const media = await payload.create({
    collection: "media",
    data: { alt },
    filePath: imagePath,
  });

  return media.id;
}

function buildVacancyRichText(
  vacancy: SeedVacancy,
  media: { heroId?: number | string; bannerId?: number | string },
  locale?: SeedLocale,
) {
  switch (vacancy.contentKey) {
    case "turner":
      return buildTurnerContent(media, locale);
    case "accountant":
      return buildAccountantContent(media, locale);
    case "design-engineer":
      return buildDesignEngineerContent(media, locale);
    case "quality-inspector":
      return buildQualityInspectorContent(media, locale);
    default:
      return buildTurnerContent(media, locale);
  }
}

async function seedVacanciesSection(
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  payload.logger.info("🌱 Наполнение вакансий…");

  for (const collection of [
    "vacancies",
    "vacancy-categories",
    "vacancy-types",
  ] as const) {
    await payload.delete({
      collection,
      where: { id: { exists: true } },
    });
  }

  const typeIdBySlug = new Map<string, number | string>();
  for (const type of seedVacancyTypes) {
    const created = await seedLocalizedCreate({
      payload,
      collection: "vacancy-types",
      ru: { title: type.title, order: type.order },
      shared: { slug: type.slug },
      locales: Object.fromEntries(
        secondaryLocales.map((locale) => [
          locale,
          { title: vacancyTypeTranslations[locale][type.slug]?.title },
        ]),
      ),
    });
    typeIdBySlug.set(type.slug, created.id);
  }
  payload.logger.info(`🏷️ Типов вакансий: ${typeIdBySlug.size}`);

  const categoryIdBySlug = new Map<string, number | string>();
  for (const category of seedVacancyCategories) {
    const typeId = typeIdBySlug.get(category.typeSlug);
    if (!typeId) {
      payload.logger.warn(
        `Пропущена категория «${category.title}»: нет типа ${category.typeSlug}`,
      );
      continue;
    }

    let imageId: number | string | undefined;
    const imagePath = resolveVacancyCategoryImage(category.imageFile);
    if (imagePath) {
      const media = await payload.create({
        collection: "media",
        data: { alt: category.title },
        filePath: imagePath,
      });
      imageId = media.id;
    }

    const created = await seedLocalizedCreate({
      payload,
      collection: "vacancy-categories",
      ru: {
        title: category.title,
        description: category.description,
        salaryFrom: category.salaryFrom,
        publishedAt: category.publishedAt,
        order: category.order,
      },
      shared: {
        slug: category.slug,
        type: typeId,
        ...(imageId ? { image: imageId } : {}),
      },
      locales: Object.fromEntries(
        secondaryLocales.map((locale) => {
          const translation = vacancyCategoryTranslations[locale][category.slug];
          return [
            locale,
            {
              title: translation?.title,
              description: translation?.description,
            },
          ];
        }),
      ),
    });
    categoryIdBySlug.set(category.slug, created.id);
  }
  payload.logger.info(`📁 Категорий вакансий: ${categoryIdBySlug.size}`);

  let createdVacancies = 0;
  for (const vacancy of seedVacancies) {
    const categoryId = categoryIdBySlug.get(vacancy.categorySlug);
    const typeId = typeIdBySlug.get(vacancy.typeSlug);
    if (!categoryId || !typeId) {
      payload.logger.warn(
        `Пропущена вакансия «${vacancy.title}»: нет категории или типа`,
      );
      continue;
    }

    const heroId = await uploadVacancyMedia(
      payload,
      vacancy.heroImageFile,
      `${vacancy.title} — hero`,
    );
    const bannerId = await uploadVacancyMedia(
      payload,
      vacancy.bannerImageFile,
      `${vacancy.title} — banner`,
    );

    const doc = await seedLocalizedCreate({
      payload,
      collection: "vacancies",
      ru: {
        title: vacancy.title,
        subtitle: vacancy.subtitle,
        description: vacancy.description,
        salaryFrom: vacancy.salaryFrom,
        salaryText: vacancy.salaryText,
        schedule: vacancy.schedule,
        experience: vacancy.experience,
        location: vacancy.location,
        content: buildVacancyRichText(vacancy, { heroId, bannerId }),
        publishedAt: vacancy.publishedAt,
        order: vacancy.order,
        isActive: true,
      },
      shared: {
        slug: vacancy.slug,
        category: categoryId,
        type: typeId,
      },
      locales: Object.fromEntries(
        secondaryLocales.map((locale) => {
          const translation = vacancyTranslations[locale][vacancy.slug];
          return [
            locale,
            {
              title: translation?.title,
              subtitle: translation?.subtitle,
              description: translation?.description,
              salaryText: translation?.salaryText,
              schedule: translation?.schedule,
              experience: translation?.experience,
              location: translation?.location,
              content: buildVacancyRichText(
                vacancy,
                { heroId, bannerId },
                locale,
              ),
            },
          ];
        }),
      ),
    });
    void doc;
    createdVacancies += 1;
  }
  payload.logger.info(`💼 Вакансий создано: ${createdVacancies}`);
}

async function seed() {
  const payload = await getPayload({ config });

  payload.logger.info("🌱 Старт наполнения каталога…");

  // 1. Админ-пользователь
  const existingAdmin = await payload.find({
    collection: "users",
    where: { email: { equals: ADMIN_EMAIL } },
    limit: 1,
  });

  if (existingAdmin.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: "Администратор",
      },
    });
    payload.logger.info(
      `👤 Создан администратор: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`,
    );
  } else {
    payload.logger.info(`👤 Администратор уже существует: ${ADMIN_EMAIL}`);
  }

  await seedSiteContacts(payload);
  await seedLaborProtection(payload);
  await seedEducationDisclosure(payload);
  await seedProcurement(payload);

  // 2. Очистка каталога (пользователей и заказы не трогаем)
  for (const collection of [
    "products",
    "characteristics",
    "categories",
    "media",
  ] as const) {
    await payload.delete({
      collection,
      where: { id: { exists: true } },
    });
  }

  // 3. Характеристики
  const characteristicIdBySlug = new Map<string, number | string>();
  for (const char of seedCharacteristics) {
    const created = await seedLocalizedCreate({
      payload,
      collection: "characteristics",
      ru: {
        title: char.title,
        type: char.type,
        unit: char.unit,
        order: char.order,
      },
      shared: { slug: char.slug },
      locales: Object.fromEntries(
        secondaryLocales.map((locale) => [
          locale,
          { title: getCharacteristicTitle(char.slug, locale) },
        ]),
      ),
    });
    characteristicIdBySlug.set(char.slug, created.id);
  }
  payload.logger.info(`📐 Характеристик: ${characteristicIdBySlug.size}`);

  // 4. Категории и подкатегории
  const categoryIdBySlug = new Map<string, number | string>();
  for (const [index, category] of seedCategories.entries()) {
    const root = await seedLocalizedCreate({
      payload,
      collection: "categories",
      ru: { title: category.title, order: index },
      shared: { slug: category.slug },
      locales: Object.fromEntries(
        secondaryLocales.map((locale) => [
          locale,
          { title: getCategoryTitle(category.slug, null, locale) },
        ]),
      ),
    });
    categoryIdBySlug.set(category.slug, root.id);

    for (const [subIndex, sub] of category.subcategories.entries()) {
      const imageId = await uploadCategoryMedia(payload, sub.slug, sub.title);

      const subDoc = await seedLocalizedCreate({
        payload,
        collection: "categories",
        ru: { title: sub.title, order: subIndex },
        shared: {
          slug: sub.slug,
          parent: root.id,
          ...(imageId ? { image: imageId } : {}),
        },
        locales: Object.fromEntries(
          secondaryLocales.map((locale) => [
            locale,
            { title: getCategoryTitle(sub.slug, category.slug, locale) },
          ]),
        ),
      });
      categoryIdBySlug.set(sub.slug, subDoc.id);
    }
  }
  payload.logger.info(`📂 Категорий и подкатегорий: ${categoryIdBySlug.size}`);

  // 5. Товары
  let createdProducts = 0;
  for (const product of seedProducts) {
    const categoryId = categoryIdBySlug.get(product.categorySlug);
    if (!categoryId) {
      payload.logger.warn(
        `Пропущен товар «${product.title}»: нет подкатегории ${product.categorySlug}`,
      );
      continue;
    }

    let imageId: number | string | undefined;
    const galleryIds: (number | string)[] = [];
    const imagePath = product.withImage
      ? resolveProductImage(product.slug)
      : null;

    if (imagePath) {
      const media = await payload.create({
        collection: "media",
        data: { alt: product.title },
        filePath: imagePath,
      });
      imageId = media.id;

      const extraCount = product.galleryExtra ?? 0;
      for (let i = 0; i < extraCount; i += 1) {
        const galleryMedia = await payload.create({
          collection: "media",
          data: { alt: `${product.title} — фото ${i + 2}` },
          filePath: imagePath,
        });
        galleryIds.push(galleryMedia.id);
      }
    }

    await seedLocalizedCreate({
      payload,
      collection: "products",
      ru: {
        title: product.title,
        availability: product.availability,
        price: product.price ?? undefined,
        discountPercent: product.discountPercent,
        popularity: product.popularity,
        characteristics: product.characteristics.map((item) => {
          const characteristicId = characteristicIdBySlug.get(item.slug);
          return {
            characteristic: characteristicId,
            valueNumber: item.valueNumber,
            valueText: item.valueText,
          };
        }),
        specTables: product.specTables?.map((table) => ({
          title: table.title,
          columns: table.columns?.map((header) => ({ header })) ?? [],
          rows: table.rows.map((row) => ({
            kind: row.kind,
            label: row.label,
            wideValue: row.wideValue,
            highlight: row.highlight ?? false,
            accent: row.accent ?? false,
            cells:
              row.cells?.map((cell) => ({
                values: cell.values.map((text) => ({ text })),
              })) ?? [],
          })),
        })),
      },
      shared: {
        slug: product.slug,
        category: categoryId,
        image: imageId,
        gallery: galleryIds.length > 0 ? galleryIds : undefined,
      },
      locales: Object.fromEntries(
        secondaryLocales
          .map((locale) => {
            const localeFields = buildProductLocaleFields(
              product.slug,
              locale,
              product.characteristics,
              characteristicIdBySlug,
            );
            return localeFields ? [locale, localeFields] : null;
          })
          .filter((entry): entry is [SeedLocale, Record<string, unknown>] =>
            Boolean(entry),
          ),
      ),
    });
    createdProducts += 1;
  }
  payload.logger.info(`📦 Товаров создано: ${createdProducts}`);

  await seedVacanciesSection(payload);
  await seedNewsSection(payload);
  await seedHomePage(payload);
  await seedAboutPage(payload);
  await seedCertificatesPage(payload);
  await seedAllWorkshops(payload);
  await seedServices(payload);

  payload.logger.info("✅ Готово.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
