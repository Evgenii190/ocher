"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSlider } from "@/shared/hooks/use-slider";
import {
  parseRichTextSliderPerView,
  richTextSliderSlideClassName,
  type RichTextSliderPerView,
} from "@/shared/lib/rich-text-slider.shared";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

type RichTextImageSliderSlide = {
  url: string;
  alt: string;
};

type RichTextImageSliderProps = {
  slides: RichTextImageSliderSlide[];
  slidesPerView?: RichTextSliderPerView | string | number | null;
};

export function RichTextImageSlider({
  slides,
  slidesPerView = 3,
}: RichTextImageSliderProps) {
  const t = useTranslations("common.aria");
  const perView = parseRichTextSliderPerView(slidesPerView);
  const slideClassName = richTextSliderSlideClassName(perView);

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

  if (slides.length === 0) {
    return null;
  }

  const showNav = slides.length > perView && (canScrollPrev || canScrollNext);

  return (
    <div className="w-full">
      <div className="relative">
        {canScrollPrev ? (
          <Button
            type="button"
            aria-label={t("prevSlide")}
            onClick={() => scrollPrev()}
            className="absolute top-1/2 left-0 z-10 size-8 -translate-y-1/2 lg:size-10"
          >
            <ChevronLeft className="size-4 lg:size-5" strokeWidth={1.5} />
          </Button>
        ) : null}

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {slides.map((slide) => (
              <div
                key={slide.url}
                className={cn(
                  "relative min-w-0 shrink-0 aspect-[16/9] overflow-hidden rounded-[0.625rem]",
                  slideClassName,
                )}
              >
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {canScrollNext ? (
          <Button
            type="button"
            aria-label={t("nextSlide")}
            onClick={() => scrollNext()}
            className="absolute top-1/2 right-0 z-10 size-8 -translate-y-1/2 lg:size-10"
          >
            <ChevronRight className="size-4 lg:size-5" strokeWidth={1.5} />
          </Button>
        ) : null}
      </div>

      {showNav ? (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label={t("slideNav")}
        >
          {slides.map((slide, index) => {
            const isActive = currentSlide === index + 1;

            return (
              <button
                key={slide.url}
                type="button"
                role="tab"
                aria-label={slide.alt}
                aria-selected={isActive}
                onClick={() => scrollTo(index)}
                className={cn(
                  "rounded-full transition-all",
                  isActive
                    ? "size-2.5 bg-primary"
                    : "size-2 bg-foreground/20 hover:bg-foreground/35",
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
