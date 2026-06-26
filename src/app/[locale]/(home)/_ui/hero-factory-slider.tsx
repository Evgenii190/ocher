"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSlider } from "@/shared/hooks/use-slider";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { factoryItems } from "./data";
import { HeroFactoryCard } from "./hero-factory-card";

export function HeroFactorySlider() {
  const t = useTranslations("home.factorySlider");
  const {
    emblaRef,
    currentSlide,
    scrollPrev,
    scrollNext,
    scrollTo,
    canScrollPrev,
    canScrollNext,
  } = useSlider({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const showNav = canScrollPrev || canScrollNext;

  return (
    <div className="mt-section w-full">
      <div className="2xl:hidden">
        <div className="flex items-center gap-1 sm:gap-2">
          {canScrollPrev ? (
            <Button
              type="button"
              aria-label={t("prev")}
              onClick={() => scrollPrev()}
              className="hidden size-8 shrink-0 sm:inline-flex lg:size-10"
            >
              <ChevronLeft
                className="size-4 text-white lg:size-5"
                strokeWidth={1.5}
              />
            </Button>
          ) : null}

          <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-0 sm:gap-3">
              {factoryItems.map((item, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list
                  key={index}
                  className="min-w-0 shrink-0 flex-[0_0_100%] sm:flex-[0_0_48%] md:flex-[0_0_38%] lg:flex-[0_0_32%]"
                >
                  <HeroFactoryCard item={item} compact />
                </div>
              ))}
            </div>
          </div>

          {canScrollNext ? (
            <Button
              type="button"
              aria-label={t("next")}
              onClick={() => scrollNext()}
              className="hidden size-8 shrink-0 sm:inline-flex lg:size-10"
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
            className="mt-4 pb-2 flex items-center justify-center gap-2 sm:hidden"
            role="tablist"
            aria-label={t("nav")}
          >
            {factoryItems.map((item, index) => {
              const isActive = currentSlide === index + 1;
              const ariaLabel = t(`workshops.${item.workshopKey}.alt`);

              return (
                <button
                  key={item.workshopKey}
                  type="button"
                  role="tab"
                  aria-label={ariaLabel}
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

      <div className="hidden justify-center 2xl:flex">
        {factoryItems.map((item, index) => (
          <HeroFactoryCard
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
