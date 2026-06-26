"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSlider } from "@/shared/hooks/use-slider";
import { cn } from "@/shared/lib/utils";
import type { WorkshopStockItemView } from "@/shared/lib/workshop-view.shared";
import { Button } from "@/shared/ui/button";
import { StockCard } from "./stock-card";

const navButtonClassName = cn(
  "shrink-0 self-center rounded-none border border-white/20 bg-primary",
  "size-10 hover:bg-primary/90 disabled:opacity-40 lg:size-12",
);

type StockSliderProps = {
  items: WorkshopStockItemView[];
};

export function StockSlider({ items }: StockSliderProps) {
  const t = useTranslations("production.stock");
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useSlider({
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    });

  const showNav = canScrollPrev || canScrollNext;

  return (
    <div className="relative">
      <div className="flex items-stretch gap-2">
        {showNav ? (
          <Button
            type="button"
            aria-label={t("prev")}
            onClick={() => scrollPrev()}
            disabled={!canScrollPrev}
            className={navButtonClassName}
          >
            <ChevronLeft className="size-5 text-white" strokeWidth={1.5} />
          </Button>
        ) : null}

        <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-2">
            {items.map((item) => (
              <div
                key={item.title}
                className="min-w-0 shrink-0 flex-[0_0_88%] sm:flex-[0_0_calc(50%-4px)] xl:flex-[0_0_calc(25%-6px)]"
              >
                <StockCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {showNav ? (
          <Button
            type="button"
            aria-label={t("next")}
            onClick={() => scrollNext()}
            disabled={!canScrollNext}
            className={navButtonClassName}
          >
            <ChevronRight className="size-5 text-white" strokeWidth={1.5} />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
