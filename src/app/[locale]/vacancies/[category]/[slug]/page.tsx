import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getVacancies,
  getVacancyBySlug,
  getVacancyCategories,
} from "../../_lib/get-vacancies";
import { VacancyDetailView } from "../../_ui/vacancy-detail-stub";

type VacancyDetailPageProps = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getVacancyCategories("ru");
  const params: { category: string; slug: string }[] = [];

  for (const category of categories) {
    const vacancies = await getVacancies("ru", {
      categorySlug: category.slug,
    });
    for (const vacancy of vacancies) {
      params.push({ category: category.slug, slug: vacancy.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: VacancyDetailPageProps): Promise<Metadata> {
  const { locale, category: categorySlug, slug } = await params;
  const vacancy = await getVacancyBySlug(categorySlug, slug, locale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  if (!vacancy) {
    return { title: t("vacancies.notFound") };
  }

  return {
    title: t("vacancies.itemTitle", { title: vacancy.title }),
    description: vacancy.subtitle ?? vacancy.title,
    alternates: {
      canonical: `/vacancies/${categorySlug}/${slug}`,
    },
  };
}

export default async function VacancyDetailPage({
  params,
}: VacancyDetailPageProps) {
  const { locale, category: categorySlug, slug } = await params;
  const vacancy = await getVacancyBySlug(categorySlug, slug, locale);

  if (!vacancy) {
    notFound();
  }

  return <VacancyDetailView vacancy={vacancy} />;
}
