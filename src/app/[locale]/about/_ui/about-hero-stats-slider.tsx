"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useSlider } from "@/shared/hooks/use-slider";
import type { CompanyStat } from "@/shared/lib/company-stats.shared";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { AboutHeroStatCard } from "./about-hero-stat-card";

type AboutHeroStatsSliderProps = {
  items: (CompanyStat & { title: string; description: string })[];
};

export function AboutHeroStatsSlider({ items }: AboutHeroStatsSliderProps) {
  const t = useTranslations("home.factoryFacts");
  const {
    emblaRef,
    currentSlide,
    scrollPrev,
    scrollNext,
    scrollTo,
    emblaApi,
    canScrollPrev,
    canScrollNext,
  } = useSlider({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const showNav = canScrollPrev || canScrollNext;

  useEffect(() => {
    if (!emblaApi) return;

    const equalizeSlideHeights = () => {
      const slides = emblaApi.containerNode().children;

      for (const slide of slides) {
        if (slide instanceof HTMLElement) {
          slide.style.height = "auto";
        }
      }

      let maxHeight = 0;

      for (const slide of slides) {
        if (slide instanceof HTMLElement) {
          maxHeight = Math.max(maxHeight, slide.offsetHeight);
        }
      }

      if (maxHeight === 0) return;

      for (const slide of slides) {
        if (slide instanceof HTMLElement) {
          slide.style.height = `${maxHeight}px`;
        }
      }
    };

    equalizeSlideHeights();
    emblaApi.on("reInit", equalizeSlideHeights);

    const resizeObserver = new ResizeObserver(equalizeSlideHeights);
    resizeObserver.observe(emblaApi.containerNode());
    window.addEventListener("resize", equalizeSlideHeights);

    return () => {
      emblaApi.off("reInit", equalizeSlideHeights);
      resizeObserver.disconnect();
      window.removeEventListener("resize", equalizeSlideHeights);

      for (const slide of emblaApi.containerNode().children) {
        if (slide instanceof HTMLElement) {
          slide.style.height = "";
        }
      }
    };
  }, [emblaApi]);

  return (
    <div className="w-full">
      <div className="2xl:hidden">
        <div className="flex items-stretch gap-1 sm:gap-2">
          {canScrollPrev ? (
            <Button
              type="button"
              aria-label={t("prev")}
              onClick={() => scrollPrev()}
              className="hidden size-8 shrink-0 self-center sm:inline-flex lg:size-10"
            >
              <ChevronLeft
                className="size-4 text-white lg:size-5"
                strokeWidth={1.5}
              />
            </Button>
          ) : null}

          <div className="min-w-0 flex-1 self-stretch overflow-hidden" ref={emblaRef}>
            <div className="flex items-stretch gap-0">
              {items.map((item, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list with duplicate titles
                  key={index}
                  className="flex min-w-0 shrink-0 flex-[0_0_100%] sm:flex-[0_0_48%] md:flex-[0_0_38%] lg:flex-[0_0_32%]"
                >
                  <AboutHeroStatCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {canScrollNext ? (
            <Button
              type="button"
              aria-label={t("next")}
              onClick={() => scrollNext()}
              className="hidden size-8 shrink-0 self-center sm:inline-flex lg:size-10"
            >
              <ChevronRight
                className="size-4 text-white lg:size-5"
                strokeWidth={1.5}
              />
            </Button>
          ) : null}
        </div>

        {showNav ? (
          <div
            className="mt-3 flex items-center justify-center gap-2 sm:hidden"
            role="tablist"
            aria-label={t("title")}
          >
            {items.map((item, index) => {
              const isActive = currentSlide === index + 1;

              return (
                <button
                  key={`${item.key}-${index}`}
                  type="button"
                  role="tab"
                  aria-label={item.title}
                  aria-selected={isActive}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    "rounded-full transition-all",
                    isActive
                      ? "size-2.5 bg-primary"
                      : "size-2 bg-white/30 hover:bg-white/50",
                  )}
                />
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="hidden grid-cols-4 gap-0 2xl:grid">
        {items.map((item, index) => (
          <AboutHeroStatCard
            // biome-ignore lint/suspicious/noArrayIndexKey: static list with duplicate titles
            key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
