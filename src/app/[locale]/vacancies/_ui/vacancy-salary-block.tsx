"use client";

import { Banknote } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textMicro,
  textSmall,
  typeSubtitle,
} from "@/shared/ui/typography";

export const vacancyCardMediaInset = "p-4";
export const vacancyCardMediaHeight = "min-h-59 lg:min-h-[236px]";

type VacancySalaryBlockProps = {
  salaryFrom: number | null;
  salaryLabel: string | null;
};

export function VacancySalaryBlock({
  salaryFrom,
  salaryLabel,
}: VacancySalaryBlockProps) {
  const t = useTranslations("vacancies");

  if (!salaryLabel) {
    return null;
  }

  const formattedAmount =
    salaryFrom != null
      ? new Intl.NumberFormat("ru-RU").format(salaryFrom)
      : null;

  return (
    <div
      className={cn(
        vacancyCardMediaInset,
        "flex items-center self-stretch max-lg:pt-0",
      )}
    >
      <div className="relative w-full overflow-hidden border border-primary/20 bg-white shadow-[0_8px_24px_rgba(0,4,34,0.06)]">
        <div className="flex items-center gap-2.5 bg-primary px-4 py-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
            <Banknote
              className="size-4 text-primary-foreground"
              strokeWidth={2}
              aria-hidden
            />
          </span>
          <span
            className={cn(
              headingAppearance,
              textMicro,
              "text-primary-foreground",
            )}
          >
            {t("salary")}
          </span>
        </div>

        <div className="relative border-l-4 border-primary px-4 py-4">
          <span
            aria-hidden
            className={cn(
              headingAppearance,
              "pointer-events-none absolute -right-1 -top-1 select-none text-[clamp(3rem,2rem+3vw,4.5rem)] leading-none text-primary/[0.07]",
            )}
          >
            ₽
          </span>

          {formattedAmount ? (
            <div className="relative flex flex-col gap-1">
              <span
                className={cn(
                  headingAppearance,
                  textMicro,
                  "text-muted-foreground",
                )}
              >
                {t("salaryFrom")}
              </span>
              <p className={cn(typeSubtitle, "text-primary leading-none")}>
                {formattedAmount}
                <span className="ml-1 text-foreground/80">₽</span>
              </p>
            </div>
          ) : (
            <p
              className={cn(
                headingAppearance,
                textSmall,
                "relative leading-snug text-foreground",
              )}
            >
              {salaryLabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
