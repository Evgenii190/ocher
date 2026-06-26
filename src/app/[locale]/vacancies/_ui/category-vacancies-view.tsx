"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import type {
  VacancyCategoryItem,
  VacancyItem,
} from "../_lib/vacancies-shared";
import { VacancyListingCard } from "./vacancy-listing-card";

type CategoryVacanciesViewProps = {
  category: VacancyCategoryItem;
  vacancies: VacancyItem[];
};

export function CategoryVacanciesView({
  category,
  vacancies,
}: CategoryVacanciesViewProps) {
  const t = useTranslations("vacancies");

  return (
    <main>
      <Container className={cn("flex flex-col", gapHeading, "pb-section")}>
        <TopBar
          variant="black"
          breadcrumbs={[
            { label: t("breadcrumb"), href: "/vacancies" },
            { label: category.title },
          ]}
        />

        <div className="flex flex-col">
          <h1 className={typeTitle}>{category.title}</h1>

          {vacancies.length > 0 ? (
            <div className="mt-[25px] flex flex-col gap-[25px]">
              {vacancies.map((vacancy) => (
                <VacancyListingCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  categoryImage={category.image}
                />
              ))}
            </div>
          ) : (
            <p className="mt-[25px] text-body text-foreground/70">
              {t("noInCategory")}
            </p>
          )}
        </div>
      </Container>
    </main>
  );
}
