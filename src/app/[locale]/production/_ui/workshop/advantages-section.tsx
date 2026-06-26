"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/container";
import { useSlider } from "@/shared/hooks/use-slider";
import { cn } from "@/shared/lib/utils";
import type { WorkshopAdvantage } from "@/shared/lib/workshop-view.shared";
import { Button } from "@/shared/ui/button";
import { gapHeading, gapSection } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import { AdvantageCard } from "./advantage-card";

const navButtonClassName = cn(
  "absolute top-1/2 z-10 size-8 -translate-y-1/2 rounded-none border border-white/20 bg-primary",
  "hover:bg-primary/90 lg:size-10",
);

type AdvantagesSectionProps = {
  title: string;
  items: WorkshopAdvantage[];
};

export function AdvantagesSection({ title, items }: AdvantagesSectionProps) {
  const t = useTranslations("production.advantages");
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useSlider({
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    });

  if (items.length === 0) {
    return null;
  }

  return (
    <section>
      <Container className={cn("flex flex-col", gapSection)}>
        <div className={cn("flex flex-col", gapHeading)}>
          <h2 className={typeTitle}>{title}</h2>

          <div className="relative xl:hidden">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {items.map((item, index) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    key={index}
                    className="flex min-w-0 shrink-0 flex-[0_0_88%] sm:flex-[0_0_48%]"
                  >
                    <AdvantageCard item={item} />
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

          <div
            className="hidden items-stretch gap-4 xl:grid"
            style={{
              gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`,
            }}
          >
            {items.map((item, index) => (
              <AdvantageCard
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                key={index}
                item={item}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
