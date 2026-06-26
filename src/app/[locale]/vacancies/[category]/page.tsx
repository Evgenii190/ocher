import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getVacancies,
  getVacancyCategories,
  getVacancyCategoryBySlug,
} from "../_lib/get-vacancies";
import { CategoryVacanciesView } from "../_ui/category-vacancies-view";

type CategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateStaticParams() {
  const categories = await getVacancyCategories("ru");
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  const category = await getVacancyCategoryBySlug(categorySlug, locale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  if (!category) {
    return { title: t("vacancies.categoryNotFound") };
  }

  return {
    title: t("vacancies.categoryTitle", { title: category.title }),
    description: category.description,
    alternates: { canonical: `/vacancies/${categorySlug}` },
  };
}

export default async function VacancyCategoryPage({
  params,
}: CategoryPageProps) {
  const { locale, category: categorySlug } = await params;
  const category = await getVacancyCategoryBySlug(categorySlug, locale);

  if (!category) {
    notFound();
  }

  const vacancies = await getVacancies(locale, { categorySlug });

  return <CategoryVacanciesView category={category} vacancies={vacancies} />;
}
