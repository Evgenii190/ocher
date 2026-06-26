import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getAllNewsSlugs, getNewsBySlug } from "@/shared/lib/get-news";
import { NewsDetailView } from "../_ui/news-detail-view";

type NewsDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.news" });
  const item = await getNewsBySlug(slug, locale);

  if (!item) {
    return { title: t("notFound") };
  }

  return {
    title: t("itemTitle", { title: item.title }),
    description: item.description ?? item.title,
    alternates: {
      canonical: `/news/${slug}`,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  const item = await getNewsBySlug(slug, locale);

  if (!item) {
    notFound();
  }

  return <NewsDetailView item={item} />;
}
