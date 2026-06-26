import type { AvailabilityStatus } from "../_ui/types";

export type SortOption =
  | "popularity"
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc";

export const DEFAULT_SORT: SortOption = "popularity";

export const sortOptionValues: SortOption[] = [
  "popularity",
  "title-asc",
  "title-desc",
  "price-asc",
  "price-desc",
];

const SORT_VALUES = new Set<SortOption>(sortOptionValues);

const AVAILABILITY_VALUES = new Set<AvailabilityStatus>(["inStock", "onOrder"]);

/** Префиксы параметров характеристик в URL: числовой диапазон / текстовый список. */
const NUMBER_PREFIX = "n_";
const TEXT_PREFIX = "t_";

export type CatalogQuery = {
  /** Поисковый запрос. */
  q: string;
  /** Слаги выбранных подкатегорий. */
  categories: string[];
  /** Выбранные статусы наличия. */
  availability: AvailabilityStatus[];
  /** Числовые характеристики: slug → диапазон. */
  numberFilters: Record<string, { min: number; max: number }>;
  /** Текстовые характеристики: slug → выбранные значения. */
  textFilters: Record<string, string[]>;
  sort: SortOption;
  /** 1-based номер страницы. */
  page: number;
};

export function createEmptyQuery(): CatalogQuery {
  return {
    q: "",
    categories: [],
    availability: [],
    numberFilters: {},
    textFilters: {},
    sort: DEFAULT_SORT,
    page: 1,
  };
}

/** Нормализованный вход: значение searchParam может быть строкой или массивом. */
export type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function parseRange(value: string): { min: number; max: number } | null {
  const [rawMin, rawMax] = value.split("-");
  const min = Number(rawMin);
  const max = Number(rawMax);
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return null;
  }
  return { min: Math.min(min, max), max: Math.max(min, max) };
}

export function parseCatalogQuery(params: RawSearchParams): CatalogQuery {
  const query = createEmptyQuery();

  query.q = firstValue(params.q).slice(0, 200);
  query.categories = splitList(firstValue(params.cat));

  query.availability = splitList(firstValue(params.avail)).filter(
    (value): value is AvailabilityStatus =>
      AVAILABILITY_VALUES.has(value as AvailabilityStatus),
  );

  const sort = firstValue(params.sort) as SortOption;
  query.sort = SORT_VALUES.has(sort) ? sort : DEFAULT_SORT;

  const page = Number.parseInt(firstValue(params.page), 10);
  query.page = Number.isFinite(page) && page > 0 ? page : 1;

  for (const [key, rawValue] of Object.entries(params)) {
    const value = firstValue(rawValue);
    if (!value) {
      continue;
    }
    if (key.startsWith(NUMBER_PREFIX)) {
      const slug = key.slice(NUMBER_PREFIX.length);
      const range = parseRange(value);
      if (slug && range) {
        query.numberFilters[slug] = range;
      }
    } else if (key.startsWith(TEXT_PREFIX)) {
      const slug = key.slice(TEXT_PREFIX.length);
      const values = splitList(value);
      if (slug && values.length > 0) {
        query.textFilters[slug] = values;
      }
    }
  }

  return query;
}

export function catalogQueryToSearchParams(
  query: CatalogQuery,
): URLSearchParams {
  const params = new URLSearchParams();

  if (query.q.trim()) {
    params.set("q", query.q.trim());
  }
  if (query.categories.length > 0) {
    params.set("cat", query.categories.join(","));
  }
  if (query.availability.length > 0) {
    params.set("avail", query.availability.join(","));
  }
  for (const [slug, range] of Object.entries(query.numberFilters)) {
    params.set(`${NUMBER_PREFIX}${slug}`, `${range.min}-${range.max}`);
  }
  for (const [slug, values] of Object.entries(query.textFilters)) {
    if (values.length > 0) {
      params.set(`${TEXT_PREFIX}${slug}`, values.join(","));
    }
  }
  if (query.sort !== DEFAULT_SORT) {
    params.set("sort", query.sort);
  }
  if (query.page > 1) {
    params.set("page", String(query.page));
  }

  return params;
}

/** Ссылка на одну подкатегорию (query-параметр, индексируется). */
export function catalogSubcategoryHref(slug: string): string {
  const params = catalogQueryToSearchParams({
    ...createEmptyQuery(),
    categories: [slug],
  });
  const qs = params.toString();
  return qs ? `/catalog?${qs}` : "/catalog";
}

/**
 * Ссылка на категорию верхнего уровня (статический роут).
 * Пример: catalogCategoryRouteHref("oilfield") → "/catalog/oilfield"
 */
export function catalogCategoryRouteHref(categorySlug: string): string {
  return `/catalog/${categorySlug}`;
}

/**
 * @deprecated Использовать catalogCategoryRouteHref для категорий.
 * Оставлено для обратной совместимости.
 */
export function catalogCategoryHref(slugs: string[]): string {
  const params = catalogQueryToSearchParams({
    ...createEmptyQuery(),
    categories: slugs,
  });
  const qs = params.toString();
  return qs ? `/catalog?${qs}` : "/catalog";
}

/** Проверяет, является ли запрос выборкой одной подкатегории (индексируемый URL). */
export function isSingleSubcategoryQuery(query: CatalogQuery): boolean {
  return (
    query.categories.length === 1 &&
    query.availability.length === 0 &&
    Object.keys(query.numberFilters).length === 0 &&
    Object.keys(query.textFilters).length === 0 &&
    !query.q.trim()
  );
}

/** Стабильный строковый ключ запроса — для cache-ключей и сравнения. */
export function catalogQueryKey(query: CatalogQuery): string {
  const params = catalogQueryToSearchParams(query);
  params.sort();
  return params.toString();
}

/** Активны ли какие-либо фильтры (без учёта поиска/сортировки/страницы). */
export function hasActiveFilters(query: CatalogQuery): boolean {
  return (
    query.categories.length > 0 ||
    query.availability.length > 0 ||
    Object.keys(query.numberFilters).length > 0 ||
    Object.keys(query.textFilters).length > 0
  );
}
