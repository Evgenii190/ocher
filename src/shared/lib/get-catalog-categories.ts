import "server-only";

import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import type {
  CatalogParentGroup,
  CatalogSubcategorySlideItem,
} from "./catalog-categories.shared";

const CATALOG_CATEGORIES_TAG = "catalog-categories";

type Relation<T> = T | number | string | null | undefined;

type RawMedia = {
  url?: string | null;
  alt?: string | null;
};

type RawCategory = {
  id: number | string;
  title: string;
  slug?: string | null;
  parent?: Relation<RawCategory>;
  order?: number | null;
  image?: Relation<RawMedia>;
};

function isObject<T>(value: Relation<T>): value is T {
  return typeof value === "object" && value !== null;
}

function relationId<T extends { id: number | string }>(
  value: Relation<T>,
): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (isObject(value)) {
    return String(value.id);
  }
  return String(value);
}

function resolveMediaUrl(media: Relation<RawMedia>): string | null {
  if (!isObject(media)) {
    return null;
  }
  const url = media.url?.trim();
  return url ? url : null;
}

function resolveMediaAlt(media: Relation<RawMedia>, fallback: string): string {
  if (isObject(media)) {
    const alt = media.alt?.trim();
    if (alt) {
      return alt;
    }
  }
  return fallback;
}

function mapSubcategory(category: RawCategory): CatalogSubcategorySlideItem {
  const title = category.title;
  return {
    id: String(category.id),
    slug: category.slug ?? String(category.id),
    title,
    imageUrl: resolveMediaUrl(category.image),
    imageAlt: resolveMediaAlt(category.image, title),
  };
}

function buildCatalogParentGroups(
  rawCategories: RawCategory[],
): CatalogParentGroup[] {
  const roots = rawCategories
    .filter((category) => !relationId(category.parent))
    .toSorted((left, right) => (left.order ?? 0) - (right.order ?? 0));

  return roots.flatMap((root) => {
    const rootId = String(root.id);
    const subcategories = rawCategories
      .filter((category) => relationId(category.parent) === rootId)
      .toSorted((left, right) => (left.order ?? 0) - (right.order ?? 0))
      .map(mapSubcategory);

    if (subcategories.length === 0) {
      return [];
    }

    return [
      {
        id: rootId,
        slug: root.slug ?? rootId,
        title: root.title,
        subcategories,
      },
    ];
  });
}

async function fetchCatalogSubcategoryGroups(
  locale: string,
): Promise<CatalogParentGroup[]> {
  try {
    const payload = await getPayload({ config });
    const categoriesRes = await payload.find({
      collection: "categories",
      limit: 1000,
      depth: 1,
      sort: "order",
      ...payloadLocaleOptions(locale),
    });

    return buildCatalogParentGroups(
      categoriesRes.docs as unknown as RawCategory[],
    );
  } catch (error) {
    console.error(
      "[catalog] Не удалось загрузить подкатегории для главной:",
      error,
    );
    return [];
  }
}

export function getCatalogSubcategoryGroups(locale: string) {
  return unstable_cache(
    () => fetchCatalogSubcategoryGroups(locale),
    ["catalog-subcategory-groups", locale],
    { tags: [CATALOG_CATEGORIES_TAG, "catalog"] },
  )();
}
