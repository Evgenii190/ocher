"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSlider } from "@/shared/hooks/use-slider";
import type { CertificateItem } from "@/shared/lib/certificates.shared";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CertificateLightbox } from "./certificate-lightbox";

/** Фиксированная ширина слайда в карусели — без transition width, иначе дёргается Embla. */
const SLIDE_BASIS = "min(25.25rem,72vw)";
/** 285 / 404 — масштаб неактивного слайда относительно активного в макете. */
const INACTIVE_SCALE = 285 / 404;
const INACTIVE_OPACITY = 0.4;
const SCROLL_DURATION = 40;
const AUTOPLAY_INTERVAL_MS = 5000;
const SLIDE_TRANSITION =
  "transition-[transform,opacity,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

const activeSlideStyle = {
  transform: "scale(1)",
  opacity: 1,
} as const;

const inactiveSlideStyle = {
  transform: `scale(${INACTIVE_SCALE})`,
  opacity: INACTIVE_OPACITY,
} as const;

type CertificateSliderProps = {
  items: CertificateItem[];
};

export function CertificateSlider({ items }: CertificateSliderProps) {
  const t = useTranslations("certificates");
  const {
    emblaRef,
    emblaApi,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    currentSlide,
    scrollTo,
  } = useSlider({ align: "center", loop: true, duration: SCROLL_DURATION });

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isArrowNavRef = useRef(false);
  const isAutoplayPausedRef = useRef(false);
  const isHoveringRef = useRef(false);
  const goToNextRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const syncFromCarousel = () => {
      if (isArrowNavRef.current) {
        return;
      }
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    const syncAfterSettle = () => {
      isArrowNavRef.current = false;
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    syncFromCarousel();
    emblaApi.on("select", syncFromCarousel);
    emblaApi.on("settle", syncAfterSettle);
    emblaApi.on("reInit", syncFromCarousel);

    return () => {
      emblaApi.off("select", syncFromCarousel);
      emblaApi.off("settle", syncAfterSettle);
      emblaApi.off("reInit", syncFromCarousel);
    };
  }, [emblaApi]);

  const goToPrev = useCallback(() => {
    const next = (activeIndex - 1 + items.length) % items.length;
    isArrowNavRef.current = true;
    setActiveIndex(next);
    scrollPrev();
  }, [activeIndex, items.length, scrollPrev]);

  const goToNext = useCallback(() => {
    const next = (activeIndex + 1) % items.length;
    isArrowNavRef.current = true;
    setActiveIndex(next);
    scrollNext();
  }, [activeIndex, items.length, scrollNext]);

  goToNextRef.current = goToNext;

  useEffect(() => {
    if (!emblaApi || items.length <= 1 || lightboxIndex !== null) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (isAutoplayPausedRef.current) {
        return;
      }
      goToNextRef.current();
    }, AUTOPLAY_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [emblaApi, items.length, lightboxIndex]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    let resumeTimeout: ReturnType<typeof setTimeout> | undefined;

    const pauseAutoplay = () => {
      isAutoplayPausedRef.current = true;
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
      }
    };

    const scheduleResume = () => {
      if (isHoveringRef.current) {
        return;
      }
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
      }
      resumeTimeout = setTimeout(() => {
        isAutoplayPausedRef.current = false;
      }, AUTOPLAY_INTERVAL_MS);
    };

    emblaApi.on("pointerDown", pauseAutoplay);
    emblaApi.on("settle", scheduleResume);

    return () => {
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
      }
      emblaApi.off("pointerDown", pauseAutoplay);
      emblaApi.off("settle", scheduleResume);
    };
  }, [emblaApi]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  if (items.length === 0) {
    return null;
  }

  const progress = items.length > 1 ? (activeIndex + 1) / items.length : 1;

  return (
    <div className="flex flex-col gap-6">
      {/* biome-ignore lint/a11y/noStaticElementInteractions: pauses autoplay on hover/focus */}
      <div
        className="relative"
        onMouseEnter={() => {
          isHoveringRef.current = true;
          isAutoplayPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          isAutoplayPausedRef.current = false;
        }}
        onFocusCapture={() => {
          isAutoplayPausedRef.current = true;
        }}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            isAutoplayPausedRef.current = false;
          }
        }}
      >
        <Button
          type="button"
          aria-label={t("prev")}
          disabled={!canScrollPrev}
          onClick={goToPrev}
          className={cn(
            "absolute top-1/2 left-0 z-10 hidden size-17 -translate-y-1/2 sm:inline-flex",
            !canScrollPrev && "bg-primary/30 hover:bg-primary/30",
          )}
        >
          <ChevronLeft className="size-7 text-white" strokeWidth={1.5} />
        </Button>

        <Button
          type="button"
          aria-label={t("next")}
          disabled={!canScrollNext}
          onClick={goToNext}
          className={cn(
            "absolute top-1/2 right-0 z-10 hidden size-17 -translate-y-1/2 sm:inline-flex",
            !canScrollNext && "bg-primary/30 hover:bg-primary/30",
          )}
        >
          <ChevronRight className="size-7 text-white" strokeWidth={1.5} />
        </Button>

        <div className="overflow-hidden px-12 sm:px-20" ref={emblaRef}>
          <div className="flex items-center gap-3 sm:gap-5">
            {items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  className="flex min-w-0 shrink-0 justify-center"
                  style={{ flex: `0 0 ${SLIDE_BASIS}` }}
                >
                  <button
                    type="button"
                    aria-label={t("open", { alt: item.title })}
                    onClick={() => openLightbox(index)}
                    className={cn(
                      "relative w-full origin-center cursor-zoom-in overflow-hidden bg-white",
                      SLIDE_TRANSITION,
                      isActive &&
                        "shadow-[0_1.85px_3.15px_rgba(0,4,34,0.11),0_8.15px_6.52px_rgba(0,4,34,0.08),0_20px_13px_rgba(0,4,34,0.07)]",
                    )}
                    style={isActive ? activeSlideStyle : inactiveSlideStyle}
                  >
                    <div className="relative aspect-[404/631] w-full">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 72vw, 404px"
                        className="object-cover object-center"
                      />
                    </div>

                    <span
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                      aria-hidden
                    >
                      <span
                        className={cn(
                          "flex items-center justify-center rounded-none bg-primary transition-[width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                          isActive ? "size-17" : "size-7.5",
                        )}
                      >
                        <Search
                          className={cn(
                            "text-primary-foreground transition-[width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                            isActive ? "size-9" : "size-4",
                          )}
                          strokeWidth={2}
                        />
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
          <Button
            type="button"
            aria-label={t("prev")}
            disabled={!canScrollPrev}
            onClick={goToPrev}
            className={cn("size-17", !canScrollPrev && "bg-primary/30")}
          >
            <ChevronLeft className="size-7 text-white" strokeWidth={1.5} />
          </Button>
          <Button
            type="button"
            aria-label={t("next")}
            disabled={!canScrollNext}
            onClick={goToNext}
            className={cn("size-17", !canScrollNext && "bg-primary/30")}
          >
            <ChevronRight className="size-7 text-white" strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <div
        className="h-1 w-full overflow-hidden rounded-full bg-primary/20"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={items.length}
        aria-valuenow={currentSlide}
        aria-label={t("progress")}
      >
        <div
          className="h-full bg-primary transition-[width] duration-200 ease-out motion-reduce:transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {lightboxIndex !== null ? (
        <CertificateLightbox
          items={items}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={(index) => {
            setLightboxIndex(index);
            isArrowNavRef.current = true;
            setActiveIndex(index);
            scrollTo(index);
          }}
        />
      ) : null}
    </div>
  );
}
