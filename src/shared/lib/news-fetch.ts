import config from "@payload-config";
import type { SerializedEditorState } from "lexical";
import { getPayload, type Where } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import type { NewsCategoryItem, NewsItem } from "@/shared/lib/news.shared";
import { NEWS_PAGE_SIZE } from "@/shared/lib/news.shared";

export type NewsPageResult = {
  items: NewsItem[];
  total: number;
  page: number;
  hasMore: boolean;
};

type RelationDoc = {
  id: number | string;
  slug?: string | null;
  title?: string | null;
  order?: number | null;
};

type RawMedia = RelationDoc & {
  url?: string | null;
};

type RawNewsCategory = RelationDoc;

type RawNews = RelationDoc & {
  description?: string | null;
  image?: RawMedia | number | string | null;
  content?: SerializedEditorState | null;
  publishedAt?: string | null;
  isActive?: boolean | null;
  category?: RawNewsCategory | number | string | null;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
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

function mapMediaUrl(value: RawNews["image"]): string | null {
  if (!isObject(value)) {
    return null;
  }
  if (typeof value.url === "string") {
    return value.url;
  }
  return null;
}

function mapNewsCategory(raw: RawNewsCategory): NewsCategoryItem {
  return {
    id: String(raw.id),
    slug: raw.slug ?? String(raw.id),
    title: raw.title ?? "",
    order: raw.order ?? 0,
  };
}

function mapNews(raw: RawNews, includeContent = false): NewsItem | null {
  if (!isObject(raw.category)) {
    return null;
  }

  const published = formatPublishedDate(raw.publishedAt);

  return {
    id: String(raw.id),
    slug: raw.slug ?? String(raw.id),
    title: raw.title ?? "",
    description: raw.description ?? null,
    image: mapMediaUrl(raw.image),
    content: includeContent ? (raw.content ?? null) : null,
    publishedAt: published.iso,
    publishedAtLabel: published.label,
    category: {
      id: String(raw.category.id),
      slug: raw.category.slug ?? String(raw.category.id),
      title: raw.category.title ?? "",
    },
    order: raw.order ?? 0,
  };
}

async function resolveCategoryId(
  categorySlug?: string,
  locale?: string,
): Promise<number | string | null> {
  if (!categorySlug) {
    return null;
  }

  const payload = await getPayload({ config });
  const categoryResult = await payload.find({
    collection: "news-categories",
    where: { slug: { equals: categorySlug } },
    limit: 1,
    depth: 0,
    ...(locale ? payloadLocaleOptions(locale) : {}),
  });

  return categoryResult.docs[0]?.id ?? null;
}

export async function queryNewsCategories(
  locale?: string,
): Promise<NewsCategoryItem[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "news-categories",
      limit: 100,
      depth: 0,
      sort: "order",
      ...(locale ? payloadLocaleOptions(locale) : {}),
    });

    return (result.docs as RawNewsCategory[]).map(mapNewsCategory);
  } catch (error) {
    console.error("[news] Не удалось загрузить категории:", error);
    return [];
  }
}

export async function queryNewsPage(options?: {
  page?: number;
  limit?: number;
  categorySlug?: string;
  locale?: string;
}): Promise<NewsPageResult> {
  const page = Math.max(1, options?.page ?? 1);
  const limit = Math.max(1, options?.limit ?? NEWS_PAGE_SIZE);
  const localeOpts = options?.locale
    ? payloadLocaleOptions(options.locale)
    : {};

  try {
    const payload = await getPayload({ config });
    const conditions: Where[] = [{ isActive: { equals: true } }];

    if (options?.categorySlug) {
      const categoryId = await resolveCategoryId(
        options.categorySlug,
        options.locale,
      );
      if (!categoryId) {
        return { items: [], total: 0, page, hasMore: false };
      }
      conditions.push({ category: { equals: categoryId } });
    }

    const result = await payload.find({
      collection: "news",
      where: { and: conditions },
      limit,
      page,
      depth: 2,
      sort: "-publishedAt",
      ...localeOpts,
    });

    const items = (result.docs as RawNews[])
      .map((doc) => mapNews(doc))
      .filter((item): item is NewsItem => item !== null);

    return {
      items,
      total: result.totalDocs,
      page: result.page ?? page,
      hasMore: result.hasNextPage ?? false,
    };
  } catch (error) {
    console.error("[news] Не удалось загрузить новости:", error);
    return { items: [], total: 0, page, hasMore: false };
  }
}

export async function queryAllNewsSlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "news",
      where: { isActive: { equals: true } },
      limit: 500,
      depth: 0,
      sort: "-publishedAt",
    });

    return (result.docs as RawNews[])
      .map((doc) => doc.slug)
      .filter(
        (slug): slug is string => typeof slug === "string" && slug.length > 0,
      );
  } catch (error) {
    console.error("[news] Не удалось загрузить slug новостей:", error);
    return [];
  }
}

export async function queryNewsBySlug(
  slug: string,
  locale?: string,
): Promise<NewsItem | null> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "news",
      where: {
        and: [{ slug: { equals: slug } }, { isActive: { equals: true } }],
      },
      limit: 1,
      depth: 3,
      ...(locale ? payloadLocaleOptions(locale) : {}),
    });

    const raw = result.docs[0] as RawNews | undefined;
    if (!raw) {
      return null;
    }

    return mapNews(raw, true);
  } catch (error) {
    console.error(`[news] Не удалось загрузить новость «${slug}»:`, error);
    return null;
  }
}
