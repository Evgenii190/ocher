import type { SerializedEditorState } from "lexical";

export type VacancyTypeItem = {
  id: string;
  slug: string;
  title: string;
  order: number;
};

export type VacancyCategoryItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  salaryFrom: number | null;
  salaryLabel: string | null;
  image: string | null;
  publishedAt: string | null;
  publishedAtLabel: string | null;
  type: VacancyTypeItem;
  order: number;
};

export type VacancyItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  salaryFrom: number | null;
  salaryLabel: string | null;
  schedule: string | null;
  experience: string | null;
  location: string | null;
  content: SerializedEditorState | null;
  publishedAt: string | null;
  publishedAtLabel: string | null;
  type: VacancyTypeItem;
  category: Pick<VacancyCategoryItem, "id" | "slug" | "title">;
  order: number;
};

export type VacancyApplicationTarget = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  categoryTitle: string;
  categorySlug: string;
};

export function toVacancyApplicationTarget(
  vacancy: VacancyItem,
): VacancyApplicationTarget {
  return {
    id: vacancy.id,
    slug: vacancy.slug,
    title: vacancy.title,
    subtitle: vacancy.subtitle,
    categoryTitle: vacancy.category.title,
    categorySlug: vacancy.category.slug,
  };
}

export function vacancyCategoryHref(slug: string, typeSlug?: string) {
  const params = typeSlug ? `?type=${typeSlug}` : "";
  return `/vacancies/${slug}${params}`;
}

export function vacancyHref(
  categorySlug: string,
  vacancySlug: string,
  typeSlug?: string,
) {
  const params = typeSlug ? `?type=${typeSlug}` : "";
  return `/vacancies/${categorySlug}/${vacancySlug}${params}`;
}

export function vacanciesIndexHref(typeSlug?: string) {
  const params = typeSlug ? `?type=${typeSlug}` : "";
  return `/vacancies${params}`;
}

export function isVacancyTypeSlug(
  value: string | undefined,
  types: VacancyTypeItem[],
): value is string {
  if (!value) {
    return false;
  }
  return types.some((type) => type.slug === value);
}
