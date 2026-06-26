"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import type { CertificateItem } from "@/shared/lib/certificates.shared";
import { Button } from "@/shared/ui/button";

type CertificateLightboxProps = {
  items: CertificateItem[];
  activeIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function CertificateLightbox({
  items,
  activeIndex,
  onClose,
  onIndexChange,
}: CertificateLightboxProps) {
  const t = useTranslations("certificates");
  const tCommon = useTranslations("common.aria");
  const item = items[activeIndex];
  const total = items.length;

  const goPrev = useCallback(() => {
    onIndexChange((activeIndex - 1 + total) % total);
  }, [activeIndex, onIndexChange, total]);

  const goNext = useCallback(() => {
    onIndexChange((activeIndex + 1) % total);
  }, [activeIndex, onIndexChange, total]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        goPrev();
      }
      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrev, onClose]);

  if (!item) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={t("lightbox.aria")}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label={t("lightbox.closeView")}
        onClick={onClose}
      />

      <Button
        type="button"
        size="icon"
        aria-label={tCommon("close")}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 size-12 bg-primary text-primary-foreground hover:bg-primary/90 sm:top-8 sm:right-8"
      >
        <X className="size-6" strokeWidth={1.5} />
      </Button>

      <Button
        type="button"
        aria-label={t("prev")}
        onClick={(event) => {
          event.stopPropagation();
          goPrev();
        }}
        className="absolute top-1/2 left-2 z-10 size-17 -translate-y-1/2 sm:left-6"
      >
        <ChevronLeft className="size-7 text-white" strokeWidth={1.5} />
      </Button>

      <Button
        type="button"
        aria-label={t("next")}
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
        className="absolute top-1/2 right-2 z-10 size-17 -translate-y-1/2 sm:right-6"
      >
        <ChevronRight className="size-7 text-white" strokeWidth={1.5} />
      </Button>

      <div className="relative z-[1] flex max-h-[min(90vh,56rem)] w-full max-w-[min(90vw,48rem)] items-center justify-center">
        <Image
          src={item.url}
          alt={item.title}
          width={item.width}
          height={item.height}
          className="max-h-[min(90vh,56rem)] h-auto w-auto max-w-full object-contain shadow-2xl"
          sizes="90vw"
          priority
        />
      </div>
    </div>,
    document.body,
  );
}
