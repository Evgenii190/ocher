"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Container } from "@/shared/components/container";
import { PayloadRichText } from "@/shared/components/payload-rich-text";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { gapContent, gapHeading, gapSection } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  typeTitle,
} from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import type { VacancyItem } from "../_lib/vacancies-shared";
import { toVacancyApplicationTarget } from "../_lib/vacancies-shared";
import { VacancyApplicationDialog } from "./vacancy-application-dialog";

type VacancyDetailViewProps = {
  vacancy: VacancyItem;
};

export function VacancyDetailView({ vacancy }: VacancyDetailViewProps) {
  const t = useTranslations("vacancies");
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  return (
    <main>
      <Container className={cn("flex flex-col", gapHeading, "pb-section")}>
        <TopBar
          variant="black"
          breadcrumbs={[
            { label: t("breadcrumb"), href: "/vacancies" },
            {
              label: vacancy.category.title,
              href: `/vacancies/${vacancy.category.slug}`,
            },
            { label: vacancy.title },
          ]}
        />

        <div className={cn("flex flex-col", gapContent)}>
          <div className="flex flex-col gap-3">
            <p
              className={cn(headingAppearance, textBody, "text-foreground/85")}
            >
              {vacancy.type.title}
            </p>
            <h1 className={typeTitle}>{vacancy.title}</h1>
            {vacancy.description ? (
              <p className={cn(textBodyLg, "text-foreground/85")}>
                {vacancy.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {vacancy.salaryLabel ? (
              <p className={cn(textBodyLg, "font-semibold text-foreground")}>
                Зарплата: {vacancy.salaryLabel}
              </p>
            ) : null}
            {vacancy.schedule ? (
              <p className={cn(textBody, "text-foreground/85")}>
                График: {vacancy.schedule}
              </p>
            ) : null}
            {vacancy.experience ? (
              <p className={cn(textBody, "text-foreground/85")}>
                Опыт: {vacancy.experience}
              </p>
            ) : null}
            {vacancy.location ? (
              <p className={cn(textBody, "text-foreground/85")}>
                Место: {vacancy.location}
              </p>
            ) : null}
          </div>
        </div>
      </Container>

      {vacancy.content ? (
        <Container className={cn("flex flex-col", gapSection, "pb-section")}>
          <PayloadRichText content={vacancy.content} />
          <Button
            type="button"
            className="h-16 w-full max-w-[313px]"
            onClick={() => setIsApplicationOpen(true)}
          >
            <span
              className={cn(
                headingAppearance,
                textBodyLg,
                "font-semibold text-primary-foreground",
              )}
            >
              откликнуться
            </span>
          </Button>
        </Container>
      ) : (
        <Container className="pb-section">
          <Button
            type="button"
            className="h-16 w-full max-w-[313px]"
            onClick={() => setIsApplicationOpen(true)}
          >
            <span
              className={cn(
                headingAppearance,
                textBodyLg,
                "font-semibold text-primary-foreground",
              )}
            >
              откликнуться
            </span>
          </Button>
        </Container>
      )}

      <VacancyApplicationDialog
        open={isApplicationOpen}
        onOpenChange={setIsApplicationOpen}
        target={toVacancyApplicationTarget(vacancy)}
      />
    </main>
  );
}

/** @deprecated используйте VacancyDetailView */
export const VacancyDetailStub = VacancyDetailView;
