"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import type {
  VacancyCategoryItem,
  VacancyTypeItem,
} from "../_lib/vacancies-shared";
import { VacancyCategoryCard } from "./vacancy-category-card";
import { VacancyTypeNav } from "./vacancy-type-nav";

type VacanciesListingSectionProps = {
  types: VacancyTypeItem[];
  categories: VacancyCategoryItem[];
  activeTypeSlug?: string;
};

export function VacanciesListingSection({
  types,
  categories,
  activeTypeSlug,
}: VacanciesListingSectionProps) {
  const t = useTranslations("vacancies");

  return (
    <Container className={cn("flex flex-col", gapHeading, "pb-section")}>
      <TopBar variant="black" breadcrumbs={[{ label: t("breadcrumb") }]} />

      <div className="flex flex-col">
        <div className={cn("flex flex-col", gapHeading)}>
          <h1 className={typeTitle}>{t("title")}</h1>
          <VacancyTypeNav types={types} activeTypeSlug={activeTypeSlug} />
        </div>

        {categories.length > 0 ? (
          <div className="mt-[25px] flex flex-col gap-[25px]">
            {categories.map((category) => (
              <VacancyCategoryCard
                key={category.id}
                category={category}
                activeTypeSlug={activeTypeSlug}
              />
            ))}
          </div>
        ) : (
          <p className="text-body text-foreground/70">{t("noCategories")}</p>
        )}
      </div>
    </Container>
  );
}
