import { unstable_cache } from "next/cache";
import {
  queryAllNewsSlugs,
  queryNewsBySlug,
  queryNewsCategories,
  queryNewsPage,
  type NewsPageResult,
} from "@/shared/lib/news-fetch";
import { NEWS_PAGE_SIZE, NEWS_TAG } from "@/shared/lib/news.shared";

export type { NewsCategoryItem, NewsItem } from "@/shared/lib/news.shared";
export {
  isNewsCategorySlug,
  newsHref,
  newsIndexHref,
} from "@/shared/lib/news.shared";
export { NEWS_PAGE_SIZE, type NewsPageResult };

export function getNewsCategories(locale: string) {
  return unstable_cache(
    () => queryNewsCategories(locale),
    ["news-categories", locale],
    { tags: [NEWS_TAG] },
  )();
}

export function getNewsPage(
  options: {
    page?: number;
    limit?: number;
    categorySlug?: string;
    locale: string;
  },
) {
  const { locale, ...rest } = options;
  return unstable_cache(
    () => queryNewsPage({ ...rest, locale }),
    [
      "news-page",
      locale,
      String(rest.page ?? 1),
      String(rest.limit ?? NEWS_PAGE_SIZE),
      rest.categorySlug ?? "",
    ],
    { tags: [NEWS_TAG] },
  )();
}

/** @deprecated используйте getNewsPage */
export async function getNews(
  locale: string,
  options?: { categorySlug?: string },
) {
  const result = await getNewsPage({
    locale,
    page: 1,
    limit: 500,
    categorySlug: options?.categorySlug,
  });
  return result.items;
}

export function getNewsBySlug(slug: string, locale: string) {
  return unstable_cache(
    () => queryNewsBySlug(slug, locale),
    ["news-detail", slug, locale],
    { tags: [NEWS_TAG] },
  )();
}

export const getAllNewsSlugs = unstable_cache(
  queryAllNewsSlugs,
  ["news-slugs"],
  { tags: [NEWS_TAG] },
);
