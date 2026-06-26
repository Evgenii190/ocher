import type {
  VacancyCategoryItem,
  VacancyTypeItem,
} from "../_lib/vacancies-shared";
import { VacanciesListingSection } from "./vacancies-listing-section";

type VacanciesViewProps = {
  types: VacancyTypeItem[];
  categories: VacancyCategoryItem[];
  activeTypeSlug?: string;
};

export function VacanciesView({
  types,
  categories,
  activeTypeSlug,
}: VacanciesViewProps) {
  return (
    <VacanciesListingSection
      types={types}
      categories={categories}
      activeTypeSlug={activeTypeSlug}
    />
  );
}
