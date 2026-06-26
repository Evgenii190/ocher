import {
  type CatalogCharacteristic,
  type CatalogProduct,
  discountedPrice,
  type Unit,
} from "../_ui/types";
import type { CatalogQuery, SortOption } from "./search-params";

export type NumberFacet = {
  slug: string;
  label: string;
  unit: Unit;
  min: number;
  max: number;
};

export type TextFacet = {
  slug: string;
  label: string;
  values: string[];
};

export type Facets = {
  numbers: NumberFacet[];
  texts: TextFacet[];
};

/**
 * Доступные фасеты считаются по набору, суженному категориями/наличием/поиском,
 * но БЕЗ учёта самих характеристик-фильтров — чтобы пользователь мог менять выбор.
 */
export function computeFacets(
  products: CatalogProduct[],
  characteristics: CatalogCharacteristic[],
): Facets {
  const numbers: NumberFacet[] = [];
  const texts: TextFacet[] = [];

  for (const def of characteristics) {
    if (def.type === "number") {
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;
      for (const product of products) {
        for (const char of product.characteristics) {
          if (char.slug === def.slug && char.valueNumber !== null) {
            min = Math.min(min, char.valueNumber);
            max = Math.max(max, char.valueNumber);
          }
        }
      }
      if (Number.isFinite(min) && Number.isFinite(max)) {
        const flooredMin = Math.floor(min);
        const ceiledMax = Math.ceil(max);
        if (ceiledMax > flooredMin) {
          numbers.push({
            slug: def.slug,
            label: def.label,
            unit: def.unit,
            min: flooredMin,
            max: ceiledMax,
          });
        }
      }
    } else {
      const values = new Set<string>();
      for (const product of products) {
        for (const char of product.characteristics) {
          if (char.slug === def.slug && char.valueText) {
            values.add(char.valueText);
          }
        }
      }
      if (values.size > 0) {
        texts.push({
          slug: def.slug,
          label: def.label,
          values: [...values].sort((a, b) => a.localeCompare(b, "ru")),
        });
      }
    }
  }

  return { numbers, texts };
}

/** Фильтрация по характеристикам — выполняется по строкам товара (same-row match). */
export function applyCharacteristicFilters(
  products: CatalogProduct[],
  query: CatalogQuery,
  facets: Facets,
): CatalogProduct[] {
  const boundsBySlug = new Map(
    facets.numbers.map((facet) => [facet.slug, facet]),
  );

  return products.filter((product) => {
    for (const [slug, range] of Object.entries(query.numberFilters)) {
      const facet = boundsBySlug.get(slug);
      if (!facet) {
        continue;
      }
      const isActive = range.min > facet.min || range.max < facet.max;
      if (!isActive) {
        continue;
      }
      const char = product.characteristics.find(
        (item) => item.slug === slug && item.valueNumber !== null,
      );
      if (!char || char.valueNumber === null) {
        return false;
      }
      if (char.valueNumber < range.min || char.valueNumber > range.max) {
        return false;
      }
    }

    for (const [slug, values] of Object.entries(query.textFilters)) {
      if (values.length === 0) {
        continue;
      }
      const allowed = new Set(values);
      const char = product.characteristics.find(
        (item) => item.slug === slug && item.valueText !== null,
      );
      if (!char || char.valueText === null || !allowed.has(char.valueText)) {
        return false;
      }
    }

    return true;
  });
}

function effectivePrice(product: CatalogProduct): number | null {
  if (product.price === null) {
    return null;
  }
  return discountedPrice(product.price, product.discountPercent);
}

export function sortProducts(
  products: CatalogProduct[],
  sort: SortOption,
): CatalogProduct[] {
  const list = [...products];

  switch (sort) {
    case "title-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    case "title-desc":
      return list.sort((a, b) => b.title.localeCompare(a.title, "ru"));
    case "price-asc":
      return list.sort((a, b) => comparePrice(a, b, "asc"));
    case "price-desc":
      return list.sort((a, b) => comparePrice(a, b, "desc"));
    default:
      return list.sort((a, b) => b.popularity - a.popularity);
  }
}

function comparePrice(
  a: CatalogProduct,
  b: CatalogProduct,
  direction: "asc" | "desc",
): number {
  const priceA = effectivePrice(a);
  const priceB = effectivePrice(b);

  // Товары «по запросу» (без цены) всегда в конце.
  if (priceA === null && priceB === null) {
    return 0;
  }
  if (priceA === null) {
    return 1;
  }
  if (priceB === null) {
    return -1;
  }

  return direction === "asc" ? priceA - priceB : priceB - priceA;
}
