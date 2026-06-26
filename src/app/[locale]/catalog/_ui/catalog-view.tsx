"use client";

import { useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import { gapContent } from "@/shared/ui/spacing";
import { textBody, typeTitle } from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import type { CatalogMeta, CatalogResults } from "../_lib/get-catalog";
import {
  type CatalogQuery,
  catalogQueryToSearchParams,
  type SortOption,
} from "../_lib/search-params";
import { CatalogFilters } from "./catalog-filters";
import { CatalogPagination } from "./catalog-pagination";
import { CatalogSearch } from "./catalog-search";
import { CatalogSort } from "./catalog-sort";
import { ProductCard } from "./product-card";
import { formatProductCount } from "./types";

type CatalogViewProps = {
  meta: CatalogMeta;
  results: CatalogResults;
  query: CatalogQuery;
  /** Slug категории (для страниц /catalog/[category]). */
  categorySlug?: string;
  /** Название категории для заголовка. */
  categoryTitle?: string;
};

export function CatalogView({
  meta,
  results,
  query,
  categorySlug,
  categoryTitle,
}: CatalogViewProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (next: CatalogQuery, options?: { scroll?: boolean }) => {
      const qs = catalogQueryToSearchParams(next).toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      startTransition(() => {
        router.replace(href, { scroll: options?.scroll ?? false });
      });
    },
    [router, pathname],
  );

  const handleFiltersChange = useCallback(
    (next: CatalogQuery) => {
      navigate({ ...next, page: 1 });
    },
    [navigate],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      navigate({ ...query, q: value, page: 1 });
    },
    [navigate, query],
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      navigate({ ...query, sort, page: 1 });
    },
    [navigate, query],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      navigate({ ...query, page });
    },
    [navigate, query],
  );

  const handleShowMore = useCallback(() => {
    navigate({ ...query, page: query.page + 1 });
  }, [navigate, query]);

  const catalogIsEmpty =
    meta.categories.length === 0 &&
    results.total === 0 &&
    query.q.trim().length === 0 &&
    query.categories.length === 0 &&
    query.availability.length === 0;

  const breadcrumbs = categoryTitle
    ? [
        { label: t("catalog.title"), href: "/catalog" },
        { label: categoryTitle },
      ]
    : [{ label: t("catalog.title") }];

  const pageTitle = categoryTitle
    ? categoryTitle.toLowerCase()
    : t("catalog.titleFull");

  return (
    <Container className={cn("flex flex-col", gapContent)}>
      <TopBar variant="black" breadcrumbs={breadcrumbs} />

      <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className={typeTitle}>{pageTitle}</h1>
          {results.total > 0 ? (
            <p className={cn(textBody, "text-muted-foreground")}>
              {formatProductCount(results.total, t)}
            </p>
          ) : null}
        </div>
        <CatalogSort
          value={query.sort}
          onChange={handleSortChange}
          className="min-w-0 sm:shrink-0"
        />
      </div>

      {catalogIsEmpty ? (
        <p className="py-16 text-center text-muted">{t("catalog.emptySeed")}</p>
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-5">
          <CatalogFilters
            categories={meta.categories}
            facets={results.facets}
            query={query}
            onChange={handleFiltersChange}
            activeCategorySlug={categorySlug}
          />

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <CatalogSearch value={query.q} onChange={handleSearchChange} />

            <div
              aria-busy={isPending}
              className={cn(
                "flex flex-col gap-4 transition-opacity duration-200",
                isPending && "pointer-events-none opacity-50",
              )}
            >
              {results.products.length > 0 ? (
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 xl:grid-cols-3">
                  {results.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="py-16 text-center text-muted">
                  {query.q.trim()
                    ? t("catalog.notFoundSearch")
                    : t("catalog.notFoundFilters")}
                </p>
              )}

              {results.total > 0 ? (
                <CatalogPagination
                  currentPage={results.page}
                  totalPages={results.totalPages}
                  hasMore={results.hasMore}
                  onPageChange={handlePageChange}
                  onShowMore={handleShowMore}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
