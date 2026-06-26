import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { findSubcategoryBySlug } from "@/shared/catalog/static-categories";
import { getCatalogMeta, getCatalogResults } from "./_lib/get-catalog";
import {
  isSingleSubcategoryQuery,
  parseCatalogQuery,
  type RawSearchParams,
} from "./_lib/search-params";
import { CatalogView } from "./_ui/catalog-view";

type CatalogPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<RawSearchParams>;
};

export async function generateMetadata({
  params,
  searchParams,
}: CatalogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tCategories = await getTranslations({
    locale,
    namespace: "staticCategories",
  });
  const query = parseCatalogQuery(await searchParams);
  const search = query.q.trim();

  const isSingleSubcategory = isSingleSubcategoryQuery(query);
  const subcategorySlug = query.categories[0];
  const subcategoryData =
    isSingleSubcategory && subcategorySlug
      ? findSubcategoryBySlug(subcategorySlug)
      : undefined;

  const indexable =
    (!search && query.categories.length === 0 && query.page === 1) ||
    (isSingleSubcategory && query.page === 1);

  let title: string;
  let description: string;
  let canonicalUrl: string;

  if (search) {
    title = t("catalog.searchTitle", { search });
    description = t("catalog.baseDescription");
    canonicalUrl = "/catalog";
  } else if (subcategoryData && subcategorySlug) {
    const { category } = subcategoryData;
    const subcategoryTitle = tCategories(
      `${category.slug}.subcategories.${subcategorySlug}`,
    );
    const categoryTitle = tCategories(`${category.slug}.title`);
    title =
      query.page > 1
        ? t("catalog.subcategoryPageTitle", {
            subcategory: subcategoryTitle,
            page: query.page,
          })
        : t("catalog.subcategoryTitle", {
            subcategory: subcategoryTitle,
            category: categoryTitle,
          });
    description = t("catalog.subcategoryDescription", {
      subcategory: subcategoryTitle,
      category: categoryTitle,
    });
    canonicalUrl = `/catalog?cat=${subcategorySlug}`;
  } else if (query.page > 1) {
    title = t("catalog.pageTitle", { page: query.page });
    description = t("catalog.baseDescription");
    canonicalUrl = "/catalog";
  } else {
    title = t("catalog.baseTitle");
    description = t("catalog.baseDescription");
    canonicalUrl = "/catalog";
  }

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function CatalogPage({
  params,
  searchParams,
}: CatalogPageProps) {
  const { locale } = await params;
  const query = parseCatalogQuery(await searchParams);

  const [meta, results] = await Promise.all([
    getCatalogMeta(locale),
    getCatalogResults(locale, query),
  ]);

  return (
    <main>
      <CatalogView meta={meta} results={results} query={query} />
    </main>
  );
}
