"use client";

import useEmblaCarousel, {
  type EmblaViewportRefType,
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

export type UseSliderReturnType = {
  emblaRef: EmblaViewportRefType;
  currentSlide: number;
  scrollPrev: (animate?: boolean) => void;
  scrollNext: (animate?: boolean) => void;
  scrollTo: (to: number) => void;
  emblaApi: UseEmblaCarouselType[1];
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

const EMPTY_PLUGINS: NonNullable<UseCarouselParameters[1]> = [];

export const useSlider = (
  options?: UseCarouselParameters[0],
  plugins: UseCarouselParameters[1] = EMPTY_PLUGINS,
) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollState = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap() + 1);
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateScrollState();
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);

    return () => {
      emblaApi.off("select", updateScrollState);
      emblaApi.off("reInit", updateScrollState);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(
    (animate = true) => {
      if (!emblaApi) return;

      if (!animate) {
        emblaApi.internalEngine().animation.destroy();
        emblaApi.scrollPrev(true);
        return;
      }

      emblaApi.scrollPrev();
    },
    [emblaApi],
  );

  const scrollNext = useCallback(
    (animate = true) => {
      if (!emblaApi) return;

      if (!animate) {
        emblaApi.internalEngine().animation.destroy();
        emblaApi.scrollNext(true);
        return;
      }

      emblaApi.scrollNext();
    },
    [emblaApi],
  );

  const scrollTo = useCallback(
    (to: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(to);
    },
    [emblaApi],
  );

  return {
    emblaRef,
    currentSlide,
    scrollPrev,
    scrollNext,
    scrollTo,
    emblaApi,
    canScrollPrev,
    canScrollNext,
  };
};
