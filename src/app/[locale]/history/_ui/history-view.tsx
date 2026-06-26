"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import { gapContent, gapHeading } from "@/shared/ui/spacing";
import { textBody, typeDisplay } from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import { type HistoryEntry, history1757Image, historyYears } from "./data";
import {
  HistoryContentCard,
  type HistorySlideDirection,
} from "./history-content-card";
import { YearTimeline } from "./year-timeline";

export function HistoryView() {
  const t = useTranslations("history");
  const [activeYear, setActiveYear] = useState<number>(historyYears[0] ?? 1757);
  const [slideDirection, setSlideDirection] =
    useState<HistorySlideDirection>(1);

  const historyEntries = useMemo((): HistoryEntry[] => {
    return historyYears.map((year) => {
      if (year === 1757) {
        return {
          year,
          image: history1757Image,
          paragraphs: [t("entry1757.p1"), t("entry1757.p2"), t("entry1757.p3")],
        };
      }

      return {
        year,
        paragraphs: [t("placeholder", { year })],
      };
    });
  }, [t]);

  const handleYearChange = (year: number) => {
    if (year === activeYear) {
      return;
    }

    const prevIndex = historyYears.indexOf(activeYear);
    const nextIndex = historyYears.indexOf(year);
    setSlideDirection(nextIndex > prevIndex ? 1 : -1);
    setActiveYear(year);
  };

  const activeEntry = useMemo((): HistoryEntry => {
    const found = historyEntries.find((entry) => entry.year === activeYear);
    if (found) return found;
    if (historyEntries[0]) return historyEntries[0];
    return { year: activeYear, paragraphs: [] };
  }, [activeYear, historyEntries]);

  const pageIndex = historyYears.indexOf(activeYear) + 1;

  return (
    <Container className={cn("flex flex-col", gapHeading)}>
      <TopBar variant="black" breadcrumbs={[{ label: t("breadcrumb") }]} />

      <div className={cn("flex flex-col", gapContent)}>
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[0.94fr_1fr]">
          <div className="flex min-w-0 flex-col gap-8">
            <h1 className={typeDisplay}>{t("title")}</h1>
            <p
              className={cn(
                textBody,
                "max-w-[36.25rem] font-semibold text-primary text-justify",
              )}
            >
              {t("intro")}
            </p>
          </div>

          <div className="flex min-w-0">
            <YearTimeline
              years={historyYears}
              activeYear={activeYear}
              onYearChange={handleYearChange}
              ariaLabel={t("timelineAria")}
            />
          </div>
        </div>

        <HistoryContentCard
          entry={activeEntry}
          pageIndex={pageIndex}
          totalPages={historyYears.length}
          direction={slideDirection}
        />
      </div>
    </Container>
  );
}
