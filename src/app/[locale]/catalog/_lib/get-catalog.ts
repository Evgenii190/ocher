import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload, type Where } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import type {
  AvailabilityStatus,
  CatalogCategory,
  CatalogCharacteristic,
  CatalogProduct,
  CharacteristicType,
  ProductCharacteristic,
  Unit,
} from "../_ui/types";
import {
  applyCharacteristicFilters,
  computeFacets,
  type Facets,
  sortProducts,
} from "./filtering";
import type { CatalogQuery } from "./search-params";

export const PAGE_SIZE = 9;

const CATALOG_TAG = "catalog";

type Relation<T> = T | number | string | null | undefined;

type RawCategory = {
  id: number | string;
  title: string;
  slug?: string | null;
  parent?: Relation<RawCategory>;
  order?: number | null;
};

type RawMedia = {
  id: number | string;
  url?: string | null;
};

type RawCharacteristic = {
  id: number | string;
  title: string;
  slug?: string | null;
  type?: CharacteristicType | null;
  unit?: Unit | null;
  order?: number | null;
};

type RawProductCharacteristic = {
  characteristic?: Relation<RawCharacteristic>;
  valueNumber?: number | null;
  valueText?: string | null;
};

type RawProduct = {
  id: number | string;
  title: string;
  slug?: string | null;
  category?: Relation<RawCategory>;
  availability?: AvailabilityStatus | null;
  price?: number | null;
  discountPercent?: number | null;
  image?: Relation<RawMedia>;
  popularity?: number | null;
  description?: string | null;
  characteristics?: RawProductCharacteristic[] | null;
};

export type CatalogMeta = {
  categories: CatalogCategory[];
  characteristics: CatalogCharacteristic[];
  /** Слаг подкатегории → id (для серверных where-запросов). */
  subcategorySlugToId: Record<string, string>;
};

export type CatalogResults = {
  products: CatalogProduct[];
  facets: Facets;
  total: number;
  totalPages: number;
  page: number;
  /** Есть ли ещё товары за пределами текущей страницы (для «Показать ещё»). */
  hasMore: boolean;
};

const EMPTY_META: CatalogMeta = {
  categories: [],
  characteristics: [],
  subcategorySlugToId: {},
};

const EMPTY_RESULTS: CatalogResults = {
  products: [],
  facets: { numbers: [], texts: [] },
  total: 0,
  totalPages: 1,
  page: 1,
  hasMore: false,
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

export function mapProduct(
  product: RawProduct,
  categoryById: Map<string, RawCategory>,
): CatalogProduct {
  const categoryId = relationId(product.category);
  const categoryDoc = categoryId ? categoryById.get(categoryId) : undefined;
  const image = isObject(product.image) ? (product.image.url ?? null) : null;

  const productCharacteristics: ProductCharacteristic[] = (
    product.characteristics ?? []
  ).flatMap((row) => {
    const charDoc = isObject(row.characteristic)
      ? row.characteristic
      : undefined;
    if (!charDoc) {
      return [];
    }
    return [
      {
        slug: charDoc.slug ?? String(charDoc.id),
        label: charDoc.title,
        type: (charDoc.type ?? "text") as CharacteristicType,
        unit: (charDoc.unit ?? "none") as Unit,
        valueNumber:
          typeof row.valueNumber === "number" ? row.valueNumber : null,
        valueText: row.valueText ?? null,
      },
    ];
  });

  return {
    id: String(product.id),
    slug: product.slug ?? String(product.id),
    title: product.title,
    categoryId: categoryId ?? "",
    categorySlug: categoryDoc?.slug ?? "",
    categoryLabel: categoryDoc?.title ?? "",
    availability: (product.availability ?? "inStock") as AvailabilityStatus,
    price: typeof product.price === "number" ? product.price : null,
    discountPercent:
      typeof product.discountPercent === "number" ? product.discountPercent : 0,
    image,
    popularity: typeof product.popularity === "number" ? product.popularity : 0,
    description: product.description ?? null,
    characteristics: productCharacteristics,
  };
}

function buildCatalogCategoriesFromRaw(
  rawCategories: RawCategory[],
  productCountByCategoryId?: Map<string, number>,
): {
  categories: CatalogCategory[];
  subcategorySlugToId: Record<string, string>;
} {
  const subcategorySlugToId: Record<string, string> = {};
  const roots = rawCategories.filter(
    (category) => !relationId(category.parent),
  );

  const categories: CatalogCategory[] = roots.flatMap((root) => {
    const rootId = String(root.id);
    const subcategories = rawCategories
      .filter((category) => relationId(category.parent) === rootId)
      .filter((category) => {
        if (!productCountByCategoryId) return true;
        return (productCountByCategoryId.get(String(category.id)) ?? 0) > 0;
      })
      .map((category) => {
        const slug = category.slug ?? String(category.id);
        const categoryId = String(category.id);
        subcategorySlugToId[slug] = categoryId;
        return {
          id: categoryId,
          slug,
          label: category.title,
          productCount: productCountByCategoryId?.get(categoryId) ?? 0,
        };
      });

    if (subcategories.length === 0) {
      return [];
    }

    const productCount = subcategories.reduce(
      (sum, sub) => sum + sub.productCount,
      0,
    );

    return [
      {
        id: rootId,
        slug: root.slug ?? rootId,
        label: root.title,
        subcategories,
        productCount,
      },
    ];
  });

  return { categories, subcategorySlugToId };
}

async function fetchCatalogNavCategories(
  locale: string,
): Promise<CatalogCategory[]> {
  try {
    const payload = await getPayload({ config });
    const categoriesRes = await payload.find({
      collection: "categories",
      limit: 1000,
      depth: 0,
      sort: "order",
      ...payloadLocaleOptions(locale),
    });

    const rawCategories = categoriesRes.docs as unknown as RawCategory[];
    return buildCatalogCategoriesFromRaw(rawCategories).categories;
  } catch (error) {
    console.error(
      "[catalog] Не удалось загрузить категории для навигации:",
      error,
    );
    return [];
  }
}

export function getCatalogNavCategories(locale: string) {
  return unstable_cache(
    () => fetchCatalogNavCategories(locale),
    ["catalog-nav-categories", locale],
    {
      tags: [CATALOG_TAG],
      revalidate: 60,
    },
  )();
}

async function fetchCatalogMeta(locale: string): Promise<CatalogMeta> {
  try {
    const payload = await getPayload({ config });
    const localeOpts = payloadLocaleOptions(locale);

    const [categoriesRes, characteristicsRes, productsRes] = await Promise.all([
      payload.find({
        collection: "categories",
        limit: 1000,
        depth: 0,
        sort: "order",
        ...localeOpts,
      }),
      payload.find({
        collection: "characteristics",
        limit: 500,
        depth: 0,
        sort: "order",
        ...localeOpts,
      }),
      payload.find({
        collection: "products",
        limit: 5000,
        depth: 2,
        ...localeOpts,
      }),
    ]);

    const rawCategories = categoriesRes.docs as unknown as RawCategory[];
    const rawCharacteristics =
      characteristicsRes.docs as unknown as RawCharacteristic[];
    const rawProducts = productsRes.docs as unknown as RawProduct[];

    const characteristics: CatalogCharacteristic[] = rawCharacteristics.map(
      (item) => ({
        id: String(item.id),
        slug: item.slug ?? String(item.id),
        label: item.title,
        type: (item.type ?? "text") as CharacteristicType,
        unit: (item.unit ?? "none") as Unit,
      }),
    );

    const productCountByCategoryId = new Map<string, number>();
    const usedCharacteristicSlugs = new Set<string>();
    for (const product of rawProducts) {
      const categoryId = relationId(product.category);
      if (categoryId) {
        productCountByCategoryId.set(
          categoryId,
          (productCountByCategoryId.get(categoryId) ?? 0) + 1,
        );
      }
      for (const row of product.characteristics ?? []) {
        const charDoc = isObject(row.characteristic)
          ? row.characteristic
          : undefined;
        if (charDoc) {
          usedCharacteristicSlugs.add(charDoc.slug ?? String(charDoc.id));
        }
      }
    }

    const { categories, subcategorySlugToId } = buildCatalogCategoriesFromRaw(
      rawCategories,
      productCountByCategoryId,
    );

    return {
      categories,
      characteristics: characteristics.filter((item) =>
        usedCharacteristicSlugs.has(item.slug),
      ),
      subcategorySlugToId,
    };
  } catch (error) {
    console.error("[catalog] Не удалось загрузить мету каталога:", error);
    return EMPTY_META;
  }
}

export function getCatalogMeta(locale: string) {
  return unstable_cache(
    () => fetchCatalogMeta(locale),
    ["catalog-meta", locale],
    {
      tags: [CATALOG_TAG],
      revalidate: 60,
    },
  )();
}

async function fetchCatalogResults(
  locale: string,
  query: CatalogQuery,
): Promise<CatalogResults> {
  try {
    const meta = await fetchCatalogMeta(locale);
    const payload = await getPayload({ config });
    const localeOpts = payloadLocaleOptions(locale);

    const conditions: Where[] = [];

    if (query.categories.length > 0) {
      const ids = query.categories
        .map((slug) => meta.subcategorySlugToId[slug])
        .filter((id): id is string => Boolean(id))
        .map((id) => {
          const numeric = Number(id);
          return Number.isNaN(numeric) ? id : numeric;
        });
      if (ids.length === 0) {
        return { ...EMPTY_RESULTS, page: query.page };
      }
      conditions.push({ category: { in: ids } });
    }

    if (query.availability.length > 0) {
      conditions.push({ availability: { in: query.availability } });
    }

    const trimmedQuery = query.q.trim();
    if (trimmedQuery.length > 0) {
      conditions.push({ title: { like: trimmedQuery } });
    }

    const where: Where | undefined =
      conditions.length > 0 ? { and: conditions } : undefined;

    const productsRes = await payload.find({
      collection: "products",
      where,
      limit: 5000,
      depth: 2,
      ...localeOpts,
    });

    const rawProducts = productsRes.docs as unknown as RawProduct[];

    const categoryById = new Map<string, RawCategory>();
    for (const product of rawProducts) {
      if (isObject(product.category)) {
        categoryById.set(String(product.category.id), product.category);
      }
    }

    const candidates = rawProducts.map((product) =>
      mapProduct(product, categoryById),
    );

    const facets = computeFacets(candidates, meta.characteristics);
    const filtered = applyCharacteristicFilters(candidates, query, facets);
    const sorted = sortProducts(filtered, query.sort);

    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(Math.max(query.page, 1), totalPages);
    // Кумулятивно: показываем товары до текущей страницы включительно,
    // чтобы «Показать ещё» добавляло товары, а номера страниц совпадали.
    const products = sorted.slice(0, page * PAGE_SIZE);
    const hasMore = page < totalPages;

    return { products, facets, total, totalPages, page, hasMore };
  } catch (error) {
    console.error("[catalog] Не удалось загрузить товары:", error);
    return { ...EMPTY_RESULTS, page: query.page };
  }
}

export function getCatalogResults(locale: string, query: CatalogQuery) {
  return unstable_cache(
    () => fetchCatalogResults(locale, query),
    ["catalog-results", locale, JSON.stringify(query)],
    { tags: [CATALOG_TAG], revalidate: 60 },
  )();
}

export type CatalogProductRef = {
  id?: string;
  slug?: string;
};

export async function getCatalogProductsByRefs(
  refs: CatalogProductRef[],
  locale: string,
): Promise<CatalogProduct[]> {
  const ids = refs.flatMap((ref) => {
    if (!ref.id) {
      return [];
    }
    const numeric = Number(ref.id);
    return [Number.isNaN(numeric) ? ref.id : numeric];
  });
  const slugs = refs.flatMap((ref) => (ref.slug ? [ref.slug] : []));

  if (ids.length === 0 && slugs.length === 0) {
    return [];
  }

  try {
    const payload = await getPayload({ config });
    const where: Where = {
      or: [
        ...(ids.length > 0 ? [{ id: { in: ids } }] : []),
        ...(slugs.length > 0 ? [{ slug: { in: slugs } }] : []),
      ],
    };

    const productsRes = await payload.find({
      collection: "products",
      where,
      limit: refs.length,
      depth: 2,
      ...payloadLocaleOptions(locale),
    });

    const rawProducts = productsRes.docs as unknown as RawProduct[];
    const categoryById = new Map<string, RawCategory>();
    for (const product of rawProducts) {
      if (isObject(product.category)) {
        categoryById.set(String(product.category.id), product.category);
      }
    }

    return rawProducts.map((product) => mapProduct(product, categoryById));
  } catch (error) {
    console.error("[catalog] Не удалось загрузить товары корзины:", error);
    return [];
  }
}
