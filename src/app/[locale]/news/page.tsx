import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  getNewsCategories,
  getNewsPage,
  isNewsCategorySlug,
} from "@/shared/lib/get-news";
import { NEWS_PAGE_SIZE } from "@/shared/lib/news.shared";
import { NewsListView } from "./_ui/news-list-view";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  params,
}: Pick<NewsPageProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.news" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function NewsPage({
  params,
  searchParams,
}: NewsPageProps) {
  const { locale } = await params;
  const { category } = await searchParams;
  const categories = await getNewsCategories(locale);
  const activeCategorySlug = isNewsCategorySlug(category, categories)
    ? category
    : undefined;
  const newsPage = await getNewsPage({
    locale,
    page: 1,
    limit: NEWS_PAGE_SIZE,
    categorySlug: activeCategorySlug,
  });

  return (
    <main>
      <NewsListView
        categories={categories}
        initialItems={newsPage.items}
        initialHasMore={newsPage.hasMore}
        activeCategorySlug={activeCategorySlug}
      />
    </main>
  );
}
