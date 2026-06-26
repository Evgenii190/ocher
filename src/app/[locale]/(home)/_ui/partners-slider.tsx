"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSlider } from "@/shared/hooks/use-slider";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { gapHeading } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import type { Partner } from "./data";
import { partners } from "./data";

const navButtonClassName = cn("size-10 shrink-0");

const partnerCardClassName = cn(
  "group flex aspect-[350/200] w-full max-w-[21.875rem] items-center justify-center px-6",
  "border-2 border-solid",
  "bg-[linear-gradient(249.33deg,#FFFFFF_4.4%,#F6F6F6_104.8%)]",
  "[border-image-source:linear-gradient(107.46deg,#F6F6F6_7.07%,#FFFFFF_53.59%,#F6F6F6_93.55%)]",
  "[border-image-slice:1]",
  "shadow-[-5px_8px_21px_0_#A6A6A61A,-21px_31px_38px_0_#A6A6A617,-48px_71px_51px_0_#A6A6A60D,-85px_126px_61px_0_#A6A6A603,-133px_197px_66px_0_#A6A6A600]",
  "transition-transform duration-300 ease-out hover:-translate-y-1",
);

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className={partnerCardClassName}>
      <Image
        src={partner.src}
        alt={partner.alt}
        width={partner.width}
        height={partner.height}
        className="h-auto max-h-[70%] w-auto max-w-[85%] object-contain transition-transform duration-300 ease-out group-hover:scale-105"
      />
    </div>
  );
}

export function PartnersSlider() {
  const t = useTranslations("home.partners");
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useSlider({
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    });

  return (
    <div className={cn("flex flex-col", gapHeading)}>
      <div className="flex items-center justify-between gap-5">
        <h2 className={typeTitle}>{t("title")}</h2>
        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <Button
            type="button"
            aria-label={t("prev")}
            disabled={!canScrollPrev}
            onClick={() => scrollPrev()}
            className={navButtonClassName}
          >
            <ChevronLeft className="size-5 text-white" strokeWidth={1.5} />
          </Button>
          <Button
            type="button"
            aria-label={t("next")}
            disabled={!canScrollNext}
            onClick={() => scrollNext()}
            className={navButtonClassName}
          >
            <ChevronRight className="size-5 text-white" strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden xl:hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {partners.map((partner) => (
            <div
              key={partner.alt}
              className="flex min-w-0 flex-[0_0_100%] justify-center sm:flex-[0_0_calc(50%-0.25rem)] md:flex-[0_0_calc(33.333%-0.375rem)]"
            >
              <PartnerLogo partner={partner} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden grid-cols-4 items-center justify-items-center gap-2 xl:grid">
        {partners.map((partner) => (
          <PartnerLogo key={partner.alt} partner={partner} />
        ))}
      </div>
    </div>
  );
}
