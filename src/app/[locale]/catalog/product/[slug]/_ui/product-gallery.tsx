"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useSlider } from "@/shared/hooks/use-slider";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

const PLACEHOLDER = "/catalog/placeholder.svg";
const MAIN_IMAGE_MAX_HEIGHT_PX = 520;
const THUMB_GAP_PX = 8;
const VISIBLE_THUMBS = 3;
const THUMB_SIZE_PX =
  (MAIN_IMAGE_MAX_HEIGHT_PX - THUMB_GAP_PX * (VISIBLE_THUMBS - 1)) /
  VISIBLE_THUMBS;
const THUMB_SLIDE_STRIDE_PX = THUMB_SIZE_PX + THUMB_GAP_PX;
const THUMB_VIEWPORT_HEIGHT =
  THUMB_SLIDE_STRIDE_PX * VISIBLE_THUMBS - THUMB_GAP_PX;

type ProductGalleryProps = {
  title: string;
  images: string[];
};

export function ProductGallery({ title, images }: ProductGalleryProps) {
  const t = useTranslations();
  const slides = useMemo(
    () => (images.length > 0 ? images : [PLACEHOLDER]),
    [images],
  );
  const hasMultiple = slides.length > 1;

  const {
    emblaRef: mainEmblaRef,
    currentSlide,
    scrollPrev: mainScrollPrev,
    scrollNext: mainScrollNext,
    scrollTo: mainScrollTo,
    canScrollPrev: canMainScrollPrev,
    canScrollNext: canMainScrollNext,
    emblaApi: mainEmblaApi,
  } = useSlider({ align: "start", containScroll: "trimSnaps" });

  const { emblaRef: thumbEmblaRef, emblaApi: thumbEmblaApi } = useSlider({
    axis: "y",
    align: "start",
    containScroll: "trimSnaps",
  });

  const activeIndex = currentSlide - 1;

  useEffect(() => {
    if (!mainEmblaApi || !thumbEmblaApi || !hasMultiple) {
      return;
    }

    const syncThumbs = () => {
      thumbEmblaApi.scrollTo(mainEmblaApi.selectedScrollSnap());
    };

    syncThumbs();
    mainEmblaApi.on("select", syncThumbs);

    return () => {
      mainEmblaApi.off("select", syncThumbs);
    };
  }, [mainEmblaApi, thumbEmblaApi, hasMultiple]);

  if (!hasMultiple) {
    return (
      <div className="overflow-hidden rounded-lg border-2 border-[#F7F7F7] bg-white">
        <div className="relative aspect-[572/520] max-h-[520px] w-full">
          <Image
            src={slides[0] ?? PLACEHOLDER}
            alt={title}
            fill
            sizes="(max-width: 1280px) 100vw, 55vw"
            className="object-contain p-6 sm:p-10"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 gap-2">
      <div
        className="shrink-0 overflow-hidden"
        ref={thumbEmblaRef}
        style={{
          width: THUMB_SIZE_PX,
          height: THUMB_VIEWPORT_HEIGHT,
        }}
      >
        <div
          className="flex h-full flex-col"
          style={{ marginTop: -THUMB_GAP_PX }}
        >
          {slides.map((src, index) => (
            <div
              key={`thumb-${src}`}
              className="min-h-0 shrink-0"
              style={{
                flex: `0 0 ${THUMB_SLIDE_STRIDE_PX}px`,
                paddingTop: THUMB_GAP_PX,
                boxSizing: "border-box",
              }}
            >
              <button
                type="button"
                onClick={() => mainScrollTo(index)}
                aria-label={t("common.aria.photoN", { n: index + 1 })}
                aria-current={activeIndex === index ? "true" : undefined}
                className={cn(
                  "relative block shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-colors",
                  activeIndex === index
                    ? "border-primary"
                    : "border-[#F7F7F7] hover:border-primary/50",
                )}
                style={{
                  width: THUMB_SIZE_PX,
                  height: THUMB_SIZE_PX,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={`${THUMB_SIZE_PX}px`}
                  className="object-contain p-3"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-w-0 flex-1">
        <div
          className="overflow-hidden rounded-lg border-2 border-[#F7F7F7] bg-white"
          ref={mainEmblaRef}
        >
          <div className="flex">
            {slides.map((src, index) => (
              <div
                key={src}
                className="relative aspect-[572/520] max-h-[520px] min-w-0 flex-[0_0_100%]"
              >
                <Image
                  src={src}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain p-6 sm:p-10"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          type="button"
          aria-label={t("common.aria.prevPhoto")}
          onClick={() => mainScrollPrev()}
          disabled={!canMainScrollPrev}
          className="absolute top-1/2 left-0 size-14 -translate-y-1/2 rounded-none disabled:opacity-40"
        >
          <ChevronLeft className="size-6" />
        </Button>
        <Button
          type="button"
          aria-label={t("common.aria.nextPhoto")}
          onClick={() => mainScrollNext()}
          disabled={!canMainScrollNext}
          className="absolute top-1/2 right-0 size-14 -translate-y-1/2 rounded-none disabled:opacity-40"
        >
          <ChevronRight className="size-6" />
        </Button>
      </div>
    </div>
  );
}
