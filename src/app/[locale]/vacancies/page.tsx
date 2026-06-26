import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  getVacancyCategories,
  getVacancyTypes,
  isVacancyTypeSlug,
} from "./_lib/get-vacancies";
import { VacanciesView } from "./_ui/vacancies-view";

type VacanciesPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
};

export async function generateMetadata({
  params,
}: VacanciesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("vacancies.title"),
    description: t("vacancies.description"),
  };
}

export default async function VacanciesPage({
  params,
  searchParams,
}: VacanciesPageProps) {
  const { locale } = await params;
  const { type } = await searchParams;
  const types = await getVacancyTypes(locale);
  const activeTypeSlug = isVacancyTypeSlug(type, types) ? type : undefined;
  const categories = await getVacancyCategories(locale, activeTypeSlug);

  return (
    <main>
      <VacanciesView
        types={types}
        categories={categories}
        activeTypeSlug={activeTypeSlug}
      />
    </main>
  );
}
