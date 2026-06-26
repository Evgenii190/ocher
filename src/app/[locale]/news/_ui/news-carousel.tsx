"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSlider } from "@/shared/hooks/use-slider";
import type { NewsItem } from "@/shared/lib/news.shared";
import { newsIndexHref } from "@/shared/lib/news.shared";
import { cn } from "@/shared/lib/utils";
import { Button, buttonVariants } from "@/shared/ui/button";
import { gapHeading } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textSmall,
  typeTitle,
} from "@/shared/ui/typography";
import { NewsCard } from "./news-card";

type NewsCarouselProps = {
  items: NewsItem[];
  showAllLink?: boolean;
  className?: string;
};

export function NewsCarousel({
  items,
  showAllLink = true,
  className,
}: NewsCarouselProps) {
  const t = useTranslations("news");
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useSlider({ align: "start", loop: false });

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col", gapHeading, className)}>
      <div className="flex items-center justify-between gap-5">
        <h2 className={typeTitle}>{t("title")}</h2>
        <div className="flex items-center shrink-0 gap-2 lg:gap-3">
          {showAllLink ? (
            <Link
              href={newsIndexHref()}
              className={cn(
                buttonVariants({ variant: "inverse" }),
                headingAppearance,
                textSmall,
                "hidden h-auto border-2 border-primary px-6 py-3 font-semibold sm:inline-flex",
              )}
            >
              {t("allNews")}
            </Link>
          ) : null}
          <Button
            aria-label={t("carousel.prev")}
            disabled={!canScrollPrev}
            onClick={() => scrollPrev()}
            className="size-10 lg:size-17"
          >
            <ChevronLeft
              className="size-5 text-white lg:size-7"
              strokeWidth={1.5}
            />
          </Button>
          <Button
            aria-label={t("carousel.next")}
            disabled={!canScrollNext}
            onClick={() => scrollNext()}
            className="size-10 lg:size-17"
          >
            <ChevronRight
              className="size-5 text-white lg:size-7"
              strokeWidth={1.5}
            />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3 py-2">
          {items.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              className="flex-[0_0_100%] md:flex-[0_0_calc(50%-6px)] lg:flex-[0_0_calc(33.333%-8px)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
