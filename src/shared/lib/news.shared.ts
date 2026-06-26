import type { SerializedEditorState } from "lexical";

export const NEWS_TAG = "news";

export const NEWS_PAGE_SIZE = 3;

export type NewsCategoryItem = {
  id: string;
  slug: string;
  title: string;
  order: number;
};

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  content: SerializedEditorState | null;
  publishedAt: string | null;
  publishedAtLabel: string | null;
  category: Pick<NewsCategoryItem, "id" | "slug" | "title">;
  order: number;
};

export function newsIndexHref(categorySlug?: string) {
  const params = categorySlug ? `?category=${categorySlug}` : "";
  return `/news${params}`;
}

export function newsHref(slug: string) {
  return `/news/${slug}`;
}

export function isNewsCategorySlug(
  value: string | undefined,
  categories: NewsCategoryItem[],
): value is string {
  if (!value) {
    return false;
  }
  return categories.some((category) => category.slug === value);
}
