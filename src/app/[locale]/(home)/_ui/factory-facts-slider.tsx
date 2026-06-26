"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSlider } from "@/shared/hooks/use-slider";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { factoryFacts } from "./data";
import { FactoryFactCard } from "./factory-fact-card";

const navButtonClassName = cn(
  "absolute top-1/2 z-10 size-8 -translate-y-1/2 rounded-none border border-white/20 bg-primary",
  "hover:bg-primary/90 lg:size-10",
);

export function FactoryFactsSlider() {
  const t = useTranslations("home.factoryFacts");
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useSlider({
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    });

  return (
    <>
      <div className="relative xl:hidden">
        <div className="overflow-hidden px-10 sm:px-12" ref={emblaRef}>
          <div className="flex gap-4">
            {factoryFacts.map((item, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static list with duplicate titles
                key={index}
                className="min-w-0 shrink-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.5rem)]"
              >
                <FactoryFactCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {canScrollPrev ? (
          <Button
            type="button"
            aria-label={t("prev")}
            onClick={() => scrollPrev()}
            className={cn(navButtonClassName, "left-0")}
          >
            <ChevronLeft
              className="size-4 text-white lg:size-5"
              strokeWidth={1.5}
            />
          </Button>
        ) : null}

        {canScrollNext ? (
          <Button
            type="button"
            aria-label={t("next")}
            onClick={() => scrollNext()}
            className={cn(navButtonClassName, "right-0")}
          >
            <ChevronRight
              className="size-4 text-white lg:size-5"
              strokeWidth={1.5}
            />
          </Button>
        ) : null}
      </div>

      <div className="hidden grid-cols-2 gap-x-4 gap-y-6 xl:grid 2xl:grid-cols-4 2xl:gap-x-3">
        {factoryFacts.map((item, index) => (
          <FactoryFactCard
            // biome-ignore lint/suspicious/noArrayIndexKey: static list with duplicate titles
            key={index}
            item={item}
          />
        ))}
      </div>
    </>
  );
}
