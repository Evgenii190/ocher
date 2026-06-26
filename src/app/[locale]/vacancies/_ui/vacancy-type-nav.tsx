"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useSlider } from "@/shared/hooks/use-slider";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { headingAppearance, textBodyLg } from "@/shared/ui/typography";
import type { VacancyTypeItem } from "../_lib/vacancies-shared";
import { vacanciesIndexHref } from "../_lib/vacancies-shared";

type VacancyTypeNavProps = {
  types: VacancyTypeItem[];
  activeTypeSlug?: string;
  basePath?: string;
  className?: string;
};

function buildTypeHref(basePath: string, typeSlug?: string) {
  if (basePath === "/vacancies") {
    return vacanciesIndexHref(typeSlug);
  }

  const params = typeSlug ? `?type=${typeSlug}` : "";
  return `${basePath}${params}`;
}

function TypeNavTab({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center px-8 py-5.75 uppercase transition-colors",
        headingAppearance,
        textBodyLg,
        isActive
          ? "bg-primary text-primary-foreground"
          : "border-2 border-primary bg-white text-primary hover:bg-primary/5",
      )}
    >
      {label}
    </Link>
  );
}

export function VacancyTypeNav({
  types,
  activeTypeSlug,
  basePath = "/vacancies",
  className,
}: VacancyTypeNavProps) {
  const t = useTranslations("vacancies");
  const tCommon = useTranslations("common");
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useSlider({ align: "start", loop: false, dragFree: true });
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    setCanScroll(canScrollPrev || canScrollNext);
  }, [canScrollPrev, canScrollNext]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          <TypeNavTab
            href={buildTypeHref(basePath)}
            label={tCommon("all")}
            isActive={!activeTypeSlug}
          />
          {types.map((type) => (
            <TypeNavTab
              key={type.id}
              href={buildTypeHref(basePath, type.slug)}
              label={type.title}
              isActive={activeTypeSlug === type.slug}
            />
          ))}
        </div>
      </div>

      {canScroll ? (
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Button
            type="button"
            aria-label={t("typeNav.scrollBack")}
            disabled={!canScrollPrev}
            onClick={() => scrollPrev()}
            className="size-17"
          >
            <ChevronLeft className="size-7" strokeWidth={1.5} />
          </Button>
          <Button
            type="button"
            aria-label={t("typeNav.scrollForward")}
            disabled={!canScrollNext}
            onClick={() => scrollNext()}
            className="size-17"
          >
            <ChevronRight className="size-7" strokeWidth={1.5} />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
