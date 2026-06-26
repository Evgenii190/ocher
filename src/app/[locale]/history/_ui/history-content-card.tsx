"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { headingAppearance, textBody } from "@/shared/ui/typography";
import type { HistoryEntry } from "./data";

export type HistorySlideDirection = 1 | -1;

type HistoryContentCardProps = {
  entry: HistoryEntry;
  pageIndex: number;
  totalPages: number;
  direction: HistorySlideDirection;
};

export function HistoryContentCard({
  entry,
  pageIndex,
  totalPages,
  direction,
}: HistoryContentCardProps) {
  const t = useTranslations("history");
  const slideAnimation =
    direction === 1 ? "animate-history-forward" : "animate-history-backward";

  return (
    <article className="overflow-hidden shadow-[0px_1.85px_3.15px_0px_#0004221C,0px_8.15px_6.52px_0px_#00042215,0px_20px_13px_0px_#00042211]">
      <div
        key={entry.year}
        className={cn(
          "history-slide-motion flex flex-col bg-white lg:flex-row",
          slideAnimation,
        )}
      >
        <div className="flex flex-1 flex-col gap-6 px-5 py-6 sm:px-6 sm:py-8 lg:max-w-[45rem] lg:py-6">
          {entry.paragraphs.map((paragraph, index) => (
            <p
              key={`${entry.year}-${index}`}
              className={cn(
                "history-slide-motion text-justify text-foreground/85 opacity-0 animate-history-fade-up",
                textBody,
              )}
              style={{ animationDelay: `${120 + index * 70}ms` }}
            >
              {paragraph}
            </p>
          ))}
          <p
            className={cn(
              "history-slide-motion mt-auto text-primary opacity-0 animate-history-fade-up",
              headingAppearance,
              textBody,
            )}
            style={{
              animationDelay: `${120 + entry.paragraphs.length * 70 + 40}ms`,
            }}
            aria-live="polite"
          >
            {pageIndex}/{totalPages}
          </p>
        </div>

        {entry.image ? (
          <div
            className={cn(
              "history-slide-motion relative aspect-[705/508] w-full shrink-0 opacity-0 animate-history-fade-up lg:w-[44%]",
            )}
            style={{
              animationDelay: `${entry.paragraphs.length * 70 + 180}ms`,
            }}
          >
            <Image
              src={entry.image}
              alt={t("illustrationAlt", { year: entry.year })}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
              priority={entry.year === 1757}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
