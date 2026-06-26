import config from "@payload-config";
import type { SerializedEditorState } from "lexical";
import { unstable_cache } from "next/cache";
import { getPayload, type Where } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import type {
  VacancyCategoryItem,
  VacancyItem,
  VacancyTypeItem,
} from "./vacancies-shared";

export type {
  VacancyCategoryItem,
  VacancyItem,
  VacancyTypeItem,
} from "./vacancies-shared";
export {
  isVacancyTypeSlug,
  vacanciesIndexHref,
  vacancyCategoryHref,
  vacancyHref,
} from "./vacancies-shared";

const VACANCIES_TAG = "vacancies";

type RelationDoc = {
  id: number | string;
  slug?: string | null;
  title?: string | null;
  order?: number | null;
};

type RawVacancyType = RelationDoc;

type RawMedia = RelationDoc & {
  url?: string | null;
};

type RawVacancyCategory = RelationDoc & {
  description?: string | null;
  salaryFrom?: number | null;
  image?: RawMedia | number | string | null;
  publishedAt?: string | null;
  type?: RawVacancyType | number | string | null;
};

type RawVacancy = RelationDoc & {
  subtitle?: string | null;
  description?: string | null;
  salaryFrom?: number | null;
  salaryText?: string | null;
  schedule?: string | null;
  experience?: string | null;
  location?: string | null;
  content?: SerializedEditorState | null;
  publishedAt?: string | null;
  isActive?: boolean | null;
  type?: RawVacancyType | number | string | null;
  category?: RawVacancyCategory | number | string | null;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function formatSalary(
  salaryFrom: number | null | undefined,
  salaryText?: string | null,
): string | null {
  if (salaryText?.trim()) {
    return salaryText.trim();
  }
  if (salaryFrom == null) {
    return null;
  }
  return `От ${new Intl.NumberFormat("ru-RU").format(salaryFrom)} р.`;
}

function formatPublishedDate(value?: string | null): {
  iso: string | null;
  label: string | null;
} {
  if (!value) {
    return { iso: null, label: null };
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { iso: null, label: null };
  }

  return {
    iso: date.toISOString().slice(0, 10),
    label: new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date),
  };
}

function mapMediaUrl(value: RawVacancyCategory["image"]): string | null {
  if (!isObject(value)) {
    return null;
  }
  if (typeof value.url === "string") {
    return value.url;
  }
  return null;
}

function mapVacancyType(raw: RawVacancyType): VacancyTypeItem {
  return {
    id: String(raw.id),
    slug: raw.slug ?? String(raw.id),
    title: raw.title ?? "",
    order: raw.order ?? 0,
  };
}

function mapVacancyCategory(
  raw: RawVacancyCategory,
): VacancyCategoryItem | null {
  if (!isObject(raw.type)) {
    return null;
  }

  const published = formatPublishedDate(raw.publishedAt);

  return {
    id: String(raw.id),
    slug: raw.slug ?? String(raw.id),
    title: raw.title ?? "",
    description: raw.description ?? "",
    salaryFrom: raw.salaryFrom ?? null,
    salaryLabel: formatSalary(raw.salaryFrom),
    image: mapMediaUrl(raw.image),
    publishedAt: published.iso,
    publishedAtLabel: published.label,
    type: mapVacancyType(raw.type),
    order: raw.order ?? 0,
  };
}

function mapVacancy(raw: RawVacancy): VacancyItem | null {
  if (!isObject(raw.type) || !isObject(raw.category)) {
    return null;
  }

  const published = formatPublishedDate(raw.publishedAt);

  return {
    id: String(raw.id),
    slug: raw.slug ?? String(raw.id),
    title: raw.title ?? "",
    subtitle: raw.subtitle ?? null,
    description: raw.description ?? raw.subtitle ?? null,
    salaryFrom: raw.salaryFrom ?? null,
    salaryLabel: formatSalary(raw.salaryFrom, raw.salaryText),
    schedule: raw.schedule ?? null,
    experience: raw.experience ?? null,
    location: raw.location ?? null,
    content: raw.content ?? null,
    publishedAt: published.iso,
    publishedAtLabel: published.label,
    type: mapVacancyType(raw.type),
    category: {
      id: String(raw.category.id),
      slug: raw.category.slug ?? String(raw.category.id),
      title: raw.category.title ?? "",
    },
    order: raw.order ?? 0,
  };
}

async function fetchVacancyTypes(locale: string): Promise<VacancyTypeItem[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "vacancy-types",
      limit: 100,
      depth: 0,
      sort: "order",
      ...payloadLocaleOptions(locale),
    });

    return (result.docs as RawVacancyType[]).map(mapVacancyType);
  } catch (error) {
    console.error("[vacancies] Не удалось загрузить типы:", error);
    return [];
  }
}

async function fetchVacancyCategories(
  locale: string,
  typeSlug?: string,
): Promise<VacancyCategoryItem[]> {
  try {
    const payload = await getPayload({ config });
    const localeOpts = payloadLocaleOptions(locale);
    const conditions: Where[] = [];

    if (typeSlug) {
      const typeResult = await payload.find({
        collection: "vacancy-types",
        where: { slug: { equals: typeSlug } },
        limit: 1,
        depth: 0,
        ...localeOpts,
      });
      const typeId = typeResult.docs[0]?.id;
      if (!typeId) {
        return [];
      }
      conditions.push({ type: { equals: typeId } });
    }

    const result = await payload.find({
      collection: "vacancy-categories",
      where: conditions.length > 0 ? { and: conditions } : undefined,
      limit: 500,
      depth: 2,
      sort: "order",
      ...localeOpts,
    });

    return (result.docs as RawVacancyCategory[])
      .map(mapVacancyCategory)
      .filter((item): item is VacancyCategoryItem => item !== null);
  } catch (error) {
    console.error("[vacancies] Не удалось загрузить категории:", error);
    return [];
  }
}

async function fetchVacancyCategoryBySlug(
  slug: string,
  locale: string,
): Promise<VacancyCategoryItem | null> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "vacancy-categories",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
      ...payloadLocaleOptions(locale),
    });

    const raw = result.docs[0] as RawVacancyCategory | undefined;
    if (!raw) {
      return null;
    }

    return mapVacancyCategory(raw);
  } catch (error) {
    console.error(
      `[vacancies] Не удалось загрузить категорию «${slug}»:`,
      error,
    );
    return null;
  }
}

async function fetchVacancies(
  locale: string,
  options: {
    categorySlug?: string;
    typeSlug?: string;
  },
): Promise<VacancyItem[]> {
  try {
    const payload = await getPayload({ config });
    const localeOpts = payloadLocaleOptions(locale);
    const conditions: Where[] = [{ isActive: { equals: true } }];

    if (options.categorySlug) {
      const categoryResult = await payload.find({
        collection: "vacancy-categories",
        where: { slug: { equals: options.categorySlug } },
        limit: 1,
        depth: 0,
        ...localeOpts,
      });
      const categoryId = categoryResult.docs[0]?.id;
      if (!categoryId) {
        return [];
      }
      conditions.push({ category: { equals: categoryId } });
    }

    if (options.typeSlug) {
      const typeResult = await payload.find({
        collection: "vacancy-types",
        where: { slug: { equals: options.typeSlug } },
        limit: 1,
        depth: 0,
        ...localeOpts,
      });
      const typeId = typeResult.docs[0]?.id;
      if (!typeId) {
        return [];
      }
      conditions.push({ type: { equals: typeId } });
    }

    const result = await payload.find({
      collection: "vacancies",
      where: { and: conditions },
      limit: 500,
      depth: 2,
      sort: "order",
      ...localeOpts,
    });

    return (result.docs as RawVacancy[])
      .map(mapVacancy)
      .filter((item): item is VacancyItem => item !== null);
  } catch (error) {
    console.error("[vacancies] Не удалось загрузить вакансии:", error);
    return [];
  }
}

async function fetchVacancyBySlug(
  categorySlug: string,
  vacancySlug: string,
  locale: string,
): Promise<VacancyItem | null> {
  try {
    const payload = await getPayload({ config });
    const localeOpts = payloadLocaleOptions(locale);
    const categoryResult = await payload.find({
      collection: "vacancy-categories",
      where: { slug: { equals: categorySlug } },
      limit: 1,
      depth: 0,
      ...localeOpts,
    });
    const categoryId = categoryResult.docs[0]?.id;
    if (!categoryId) {
      return null;
    }

    const result = await payload.find({
      collection: "vacancies",
      where: {
        and: [
          { slug: { equals: vacancySlug } },
          { category: { equals: categoryId } },
          { isActive: { equals: true } },
        ],
      },
      limit: 1,
      depth: 3,
      ...localeOpts,
    });

    const raw = result.docs[0] as RawVacancy | undefined;
    if (!raw) {
      return null;
    }

    return mapVacancy(raw);
  } catch (error) {
    console.error(
      `[vacancies] Не удалось загрузить вакансию «${vacancySlug}»:`,
      error,
    );
    return null;
  }
}

export function getVacancyTypes(locale: string) {
  return unstable_cache(
    () => fetchVacancyTypes(locale),
    ["vacancy-types", locale],
    { tags: [VACANCIES_TAG] },
  )();
}

export function getVacancyCategories(locale: string, typeSlug?: string) {
  return unstable_cache(
    () => fetchVacancyCategories(locale, typeSlug),
    ["vacancy-categories", locale, typeSlug ?? ""],
    { tags: [VACANCIES_TAG] },
  )();
}

export function getVacancyCategoryBySlug(slug: string, locale: string) {
  return unstable_cache(
    () => fetchVacancyCategoryBySlug(slug, locale),
    ["vacancy-category", slug, locale],
    { tags: [VACANCIES_TAG] },
  )();
}

export function getVacancies(
  locale: string,
  options: { categorySlug?: string; typeSlug?: string } = {},
) {
  return unstable_cache(
    () => fetchVacancies(locale, options),
    [
      "vacancies-list",
      locale,
      options.categorySlug ?? "",
      options.typeSlug ?? "",
    ],
    { tags: [VACANCIES_TAG] },
  )();
}

export function getVacancyBySlug(
  categorySlug: string,
  vacancySlug: string,
  locale: string,
) {
  return unstable_cache(
    () => fetchVacancyBySlug(categorySlug, vacancySlug, locale),
    ["vacancy-detail", categorySlug, vacancySlug, locale],
    { tags: [VACANCIES_TAG] },
  )();
}
