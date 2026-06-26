import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  findCategoryBySlug,
  staticCatalogCategories,
} from "@/shared/catalog/static-categories";
import { getCatalogMeta, getCatalogResults } from "../_lib/get-catalog";
import {
  hasActiveFilters,
  parseCatalogQuery,
  type RawSearchParams,
} from "../_lib/search-params";
import { CatalogView } from "../_ui/catalog-view";

type CategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<RawSearchParams>;
};

export function generateStaticParams() {
  return staticCatalogCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  const category = findCategoryBySlug(categorySlug);
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tCategories = await getTranslations({
    locale,
    namespace: "staticCategories",
  });

  if (!category) {
    return { title: t("catalog.categoryNotFound") };
  }

  const query = parseCatalogQuery(await searchParams);
  const hasFilters = hasActiveFilters(query);
  const hasSearch = Boolean(query.q.trim());
  const isFirstPage = query.page === 1;

  const indexable = !hasFilters && !hasSearch && isFirstPage;

  const categoryTitle = tCategories(`${categorySlug}.title`);
  const baseTitle = t("catalog.categoryTitle", { category: categoryTitle });
  const title =
    query.page > 1
      ? t("catalog.categoryPageTitle", {
          category: categoryTitle,
          page: query.page,
        })
      : baseTitle;

  const seoKey = `catalog.categorySeo.${categorySlug}` as const;
  const description = t.has(seoKey)
    ? t(seoKey)
    : t("catalog.categoryDescription", { category: categoryTitle });

  const canonicalUrl = `/catalog/${categorySlug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: {
      title: categoryTitle,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { locale, category: categorySlug } = await params;
  const category = findCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const tCategories = await getTranslations({
    locale,
    namespace: "staticCategories",
  });
  const categoryTitle = tCategories(`${categorySlug}.title`);

  const rawSearchParams = await searchParams;
  const baseQuery = parseCatalogQuery(rawSearchParams);

  const subcategorySlugs = category.subcategories.map((sub) => sub.slug);
  const query = {
    ...baseQuery,
    categories:
      baseQuery.categories.length > 0
        ? baseQuery.categories.filter((slug) => subcategorySlugs.includes(slug))
        : subcategorySlugs,
  };

  const [meta, results] = await Promise.all([
    getCatalogMeta(locale),
    getCatalogResults(locale, query),
  ]);

  const filteredMeta = {
    ...meta,
    categories: meta.categories.filter((cat) => cat.slug === categorySlug),
  };

  return (
    <main>
      <CatalogView
        meta={filteredMeta}
        results={results}
        query={query}
        categorySlug={categorySlug}
        categoryTitle={categoryTitle}
      />
    </main>
  );
}
