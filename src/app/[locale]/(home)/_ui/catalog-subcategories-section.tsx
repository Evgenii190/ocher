"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSlider } from "@/shared/hooks/use-slider";
import type {
  CatalogParentGroup,
  CatalogSubcategorySlideItem,
} from "@/shared/lib/catalog-categories.shared";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { gapHeading } from "@/shared/ui/spacing";
import { headingAppearance, textBody, typeTitle } from "@/shared/ui/typography";
import { CatalogSubcategoryCard } from "./catalog-subcategory-card";

type CatalogSubcategoriesSectionProps = {
  groups: CatalogParentGroup[];
};

const navButtonClassName =
  "absolute top-1/2 z-10 hidden size-17 -translate-y-1/2 2xl:inline-flex";

function ParentCategoryTab({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        "flex h-[70px] max-h-[70px] w-[243px] max-w-[243px] shrink-0 items-center justify-center px-6 py-3 text-center uppercase transition-colors",
        headingAppearance,
        textBody,
        isActive
          ? "bg-primary text-primary-foreground"
          : "border-2 border-primary bg-white text-foreground hover:bg-primary/5",
      )}
    >
      <span className="text-balance leading-snug">{label}</span>
    </button>
  );
}

function CatalogParentCategoryNav({
  groups,
  activeGroupSlug,
  onSelect,
  className,
}: {
  groups: CatalogParentGroup[];
  activeGroupSlug: string;
  onSelect: (slug: string) => void;
  className?: string;
}) {
  const t = useTranslations("staticCategories");
  const tCatalog = useTranslations("home.catalog");
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useSlider({ align: "start", loop: false, dragFree: true });

  const showNav = canScrollPrev || canScrollNext;

  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex w-max gap-2">
          {groups.map((group) => (
            <ParentCategoryTab
              key={group.id}
              label={t(`${group.slug}.title`)}
              isActive={group.slug === activeGroupSlug}
              onClick={() => onSelect(group.slug)}
            />
          ))}
        </div>
      </div>

      {showNav ? (
        <div className="hidden shrink-0 items-center gap-2 2xl:flex">
          <Button
            type="button"
            aria-label={tCatalog("scrollBack")}
            disabled={!canScrollPrev}
            onClick={() => scrollPrev()}
            className="size-17"
          >
            <ChevronLeft className="size-7" strokeWidth={1.5} />
          </Button>
          <Button
            type="button"
            aria-label={tCatalog("scrollForward")}
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

function CatalogSubcategoriesSlider({
  items,
  parentSlug,
}: {
  items: CatalogSubcategorySlideItem[];
  parentSlug: string;
}) {
  const t = useTranslations("home.catalog");
  const { emblaRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useSlider({
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    });

  const showNav = items.length > 4 || canScrollPrev || canScrollNext;

  return (
    <div className="relative overflow-x-clip">
      {showNav ? (
        <>
          <Button
            type="button"
            aria-label={t("prevSubcategory")}
            disabled={!canScrollPrev}
            onClick={() => scrollPrev()}
            className={cn(navButtonClassName, "left-0")}
          >
            <ChevronLeft className="size-7" strokeWidth={1.5} />
          </Button>
          <Button
            type="button"
            aria-label={t("nextSubcategory")}
            disabled={!canScrollNext}
            onClick={() => scrollNext()}
            className={cn(navButtonClassName, "right-0")}
          >
            <ChevronRight className="size-7" strokeWidth={1.5} />
          </Button>
        </>
      ) : null}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="min-w-0 shrink-0 flex-[0_0_88%] sm:flex-[0_0_calc(50%-4px)] lg:flex-[0_0_calc(25%-6px)]"
            >
              <CatalogSubcategoryCard item={item} parentSlug={parentSlug} />
            </div>
          ))}
        </div>
      </div>

      {showNav ? (
        <div className="mt-4 flex items-center justify-center gap-2 2xl:hidden">
          <Button
            type="button"
            aria-label={t("prevSubcategory")}
            disabled={!canScrollPrev}
            onClick={() => scrollPrev()}
            className="size-10"
          >
            <ChevronLeft className="size-5 text-white" strokeWidth={1.5} />
          </Button>
          <Button
            type="button"
            aria-label={t("nextSubcategory")}
            disabled={!canScrollNext}
            onClick={() => scrollNext()}
            className="size-10"
          >
            <ChevronRight className="size-5 text-white" strokeWidth={1.5} />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function CatalogSubcategoriesSection({
  groups,
}: CatalogSubcategoriesSectionProps) {
  const t = useTranslations("home.catalog");
  const [activeGroupSlug, setActiveGroupSlug] = useState(groups[0]?.slug ?? "");
  const activeGroup =
    groups.find((group) => group.slug === activeGroupSlug) ?? groups[0];

  if (!activeGroup || activeGroup.subcategories.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col overflow-x-clip", gapHeading)}>
      <div className="flex w-full flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <h2 className={cn(typeTitle, "shrink-0 leading-none")}>
          <span className="block">{t("titleLine1")}</span>
          <span className="block">{t("titleLine2")}</span>
        </h2>

        <div className="w-full min-w-0 2xl:w-auto 2xl:max-w-[calc(100%-13rem)]">
          <CatalogParentCategoryNav
            groups={groups}
            activeGroupSlug={activeGroup.slug}
            onSelect={setActiveGroupSlug}
          />
        </div>
      </div>

      <CatalogSubcategoriesSlider
        key={activeGroup.slug}
        items={activeGroup.subcategories}
        parentSlug={activeGroup.slug}
      />
    </div>
  );
}
