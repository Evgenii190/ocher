"use client";

import { useTranslations } from "next-intl";
import { RiArrowRightSLine } from "react-icons/ri";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textMicro,
  textSmall,
} from "@/shared/ui/typography";

const popularQueryKeys = [
  "search.popularQueries.wallFormwork",
  "search.popularQueries.clamps",
  "search.popularQueries.tieScrew",
  "search.popularQueries.parts",
] as const;

const siteSectionKeys = [
  "search.siteSections.catalog",
  "search.siteSections.certificates",
  "search.siteSections.history",
  "search.siteSections.vacancies",
] as const;

export function SearchHints() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-5">
      <p className={cn(textSmall, "text-center text-muted-foreground")}>
        {t("search.hints.startTyping")}
      </p>

      <div className="flex flex-col gap-2.5">
        <span
          className={cn(headingAppearance, textMicro, "text-muted-foreground")}
        >
          {t("search.hints.popular")}
        </span>
        <div className="flex flex-wrap gap-2">
          {popularQueryKeys.map((key) => (
            <span
              key={key}
              className={cn(
                textSmall,
                "rounded-full border border-border bg-muted/5 px-3 py-1.5 text-foreground/80",
              )}
            >
              {t(key)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            headingAppearance,
            textMicro,
            "mb-1 text-muted-foreground",
          )}
        >
          {t("search.hints.sections")}
        </span>
        {siteSectionKeys.map((key) => (
          <div
            key={key}
            className={cn(
              textSmall,
              "flex items-center justify-between rounded-lg px-2 py-2.5 text-foreground/90 transition-colors hover:bg-muted/10",
            )}
          >
            <span>{t(key)}</span>
            <RiArrowRightSLine
              size={18}
              className="shrink-0 text-muted-foreground"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
