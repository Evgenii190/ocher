"use client";

import { ArrowLeft, ExternalLink, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  panelShadow,
} from "@/shared/ui/accordion";
import { headingAppearance, textBody, textSmall } from "@/shared/ui/typography";
import type { Facets } from "../_lib/filtering";
import {
  type CatalogQuery,
  catalogCategoryRouteHref,
  hasActiveFilters,
} from "../_lib/search-params";
import { FilterCheckbox, FilterRadio } from "./filter-section";
import { RangeFilter } from "./range-filter";
import {
  type AvailabilityStatus,
  availabilityLabelKeys,
  availabilityOptionIds,
  type CatalogCategory,
  unitLabel,
} from "./types";

type CatalogFiltersProps = {
  categories: CatalogCategory[];
  facets: Facets;
  query: CatalogQuery;
  onChange: (next: CatalogQuery) => void;
  /** Slug текущей страницы категории (/catalog/[category]). */
  activeCategorySlug?: string;
};

export function CatalogFilters({
  categories,
  facets,
  query,
  onChange,
  activeCategorySlug,
}: CatalogFiltersProps) {
  const t = useTranslations();
  const [openCategories, setOpenCategories] = useState<string[]>(() =>
    categories.length > 0 ? [categories[0]?.id ?? ""] : [],
  );

  const selectedCategories = new Set(query.categories);
  const selectedAvailability = new Set(query.availability);

  const toggleCategory = (slug: string, checked: boolean) => {
    const next = new Set(selectedCategories);
    if (checked) {
      next.add(slug);
    } else {
      next.delete(slug);
    }
    onChange({ ...query, categories: [...next] });
  };

  const selectAllInCategory = (category: CatalogCategory) => {
    const next = new Set(selectedCategories);
    for (const sub of category.subcategories) {
      next.add(sub.slug);
    }
    onChange({ ...query, categories: [...next] });
  };

  const deselectAllInCategory = (category: CatalogCategory) => {
    const categorySlugs = new Set(category.subcategories.map((s) => s.slug));
    const next = new Set(
      [...selectedCategories].filter((slug) => !categorySlugs.has(slug)),
    );
    onChange({ ...query, categories: [...next] });
  };

  const getCategorySelectionState = (category: CatalogCategory) => {
    const selected = category.subcategories.filter((sub) =>
      selectedCategories.has(sub.slug),
    ).length;
    const total = category.subcategories.length;
    return {
      allSelected: selected === total,
      noneSelected: selected === 0,
      hasSelectedSubs: selected > 0,
    };
  };

  const toggleAvailability = (status: AvailabilityStatus) => {
    const next = new Set(selectedAvailability);
    if (next.has(status)) {
      next.delete(status);
    } else {
      next.add(status);
    }
    onChange({ ...query, availability: [...next] });
  };

  const setRange = (
    slug: string,
    range: { min: number; max: number },
    facet: { min: number; max: number },
  ) => {
    const numberFilters = { ...query.numberFilters };
    if (range.min <= facet.min && range.max >= facet.max) {
      delete numberFilters[slug];
    } else {
      numberFilters[slug] = range;
    }
    onChange({ ...query, numberFilters });
  };

  const toggleTextValue = (slug: string, value: string) => {
    const current = new Set(query.textFilters[slug] ?? []);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    const textFilters = { ...query.textFilters };
    if (current.size > 0) {
      textFilters[slug] = [...current];
    } else {
      delete textFilters[slug];
    }
    onChange({ ...query, textFilters });
  };

  const resetFilters = () => {
    onChange({
      ...query,
      categories: [],
      availability: [],
      numberFilters: {},
      textFilters: {},
    });
    setOpenCategories(categories.length > 0 ? [categories[0]?.id ?? ""] : []);
  };

  const isActive = hasActiveFilters(query);
  const hasCharacteristics =
    facets.numbers.length > 0 || facets.texts.length > 0;

  const defaultPanels = ["categories", "availability"];
  if (hasCharacteristics) {
    defaultPanels.push("characteristics");
  }

  return (
    <aside className="flex w-full flex-col gap-1 lg:w-[308px] lg:shrink-0">
      {activeCategorySlug ? (
        <Link
          href="/catalog"
          className={cn(
            "mb-1 flex h-[52px] items-center gap-3 border border-border bg-white px-6 transition-colors hover:border-primary hover:text-primary",
            panelShadow,
            headingAppearance,
            textBody,
            "text-foreground",
          )}
        >
          <ArrowLeft className="size-5 shrink-0" strokeWidth={2} />
          {t("catalog.allCatalog")}
        </Link>
      ) : null}

      <Accordion type="multiple" defaultValue={defaultPanels} className="gap-1">
        {categories.length > 0 ? (
          <AccordionItem value="categories" variant="panel">
            <AccordionTrigger icon="chevron">
              {t("catalog.selectCategory")}
            </AccordionTrigger>
            <AccordionContent variant="panel">
              <Accordion
                type="multiple"
                value={openCategories}
                onValueChange={setOpenCategories}
                className="flex flex-col gap-6"
              >
                {categories.map((category) => {
                  const { allSelected, noneSelected, hasSelectedSubs } =
                    getCategorySelectionState(category);
                  const isCurrentCategory =
                    activeCategorySlug === category.slug;
                  const showCategoryLink = !isCurrentCategory;

                  return (
                    <AccordionItem
                      key={category.id}
                      value={category.id}
                      variant="nested"
                    >
                      <AccordionTrigger
                        className={cn(
                          "uppercase",
                          hasSelectedSubs && "text-primary",
                        )}
                        icon="plus-minus"
                      >
                        <span className="flex w-full min-w-0 items-center justify-between gap-3">
                          <span className="min-w-0">{category.label}</span>
                          {category.productCount > 0 ? (
                            <span
                              className={cn(
                                textSmall,
                                "shrink-0 tabular-nums text-muted-foreground normal-case",
                              )}
                            >
                              {category.productCount}
                            </span>
                          ) : null}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent variant="nested">
                        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <button
                            type="button"
                            onClick={() => selectAllInCategory(category)}
                            disabled={allSelected}
                            className={cn(
                              textSmall,
                              "text-primary underline-offset-2 transition-colors hover:underline",
                              allSelected && "cursor-not-allowed opacity-50",
                            )}
                          >
                            {t("catalog.selectAll")}
                          </button>
                          <span className="text-border">|</span>
                          <button
                            type="button"
                            onClick={() => deselectAllInCategory(category)}
                            disabled={noneSelected}
                            className={cn(
                              textSmall,
                              "text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline",
                              noneSelected && "cursor-not-allowed opacity-50",
                            )}
                          >
                            {t("catalog.deselectAll")}
                          </button>
                          {showCategoryLink ? (
                            <>
                              <span className="text-border">|</span>
                              <Link
                                href={catalogCategoryRouteHref(category.slug)}
                                className={cn(
                                  textSmall,
                                  "inline-flex items-center gap-1 text-muted-foreground underline-offset-2 transition-colors hover:text-primary hover:underline",
                                )}
                              >
                                {t("catalog.goTo")}
                                <ExternalLink className="size-3" />
                              </Link>
                            </>
                          ) : null}
                        </div>
                        {category.subcategories.map((sub) => (
                          <FilterCheckbox
                            key={sub.id}
                            id={`category-${sub.id}`}
                            label={sub.label}
                            count={sub.productCount}
                            checked={selectedCategories.has(sub.slug)}
                            onChange={(checked) =>
                              toggleCategory(sub.slug, checked)
                            }
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        <AccordionItem value="availability" variant="panel">
          <AccordionTrigger icon="chevron">
            {t("common.availabilityLabel")}
          </AccordionTrigger>
          <AccordionContent variant="panel">
            <div className="flex flex-col gap-3">
              {availabilityOptionIds.map((id) => (
                <FilterRadio
                  key={id}
                  id={`availability-${id}`}
                  label={t(availabilityLabelKeys[id])}
                  checked={selectedAvailability.has(id)}
                  onChange={() => toggleAvailability(id)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {hasCharacteristics ? (
          <AccordionItem value="characteristics" variant="panel">
            <AccordionTrigger icon="chevron">
              {t("catalog.characteristics")}
            </AccordionTrigger>
            <AccordionContent variant="panel">
              <div className="flex flex-col gap-7">
                {facets.numbers.map((facet) => {
                  const range = query.numberFilters[facet.slug] ?? {
                    min: facet.min,
                    max: facet.max,
                  };
                  return (
                    <RangeFilter
                      key={facet.slug}
                      label={facet.label}
                      unit={unitLabel(facet.unit, t)}
                      min={facet.min}
                      max={facet.max}
                      value={range}
                      onChange={(next) => setRange(facet.slug, next, facet)}
                    />
                  );
                })}

                {facets.texts.map((facet) => {
                  const selected = new Set(query.textFilters[facet.slug] ?? []);
                  return (
                    <div key={facet.slug} className="flex flex-col gap-3">
                      <span
                        className={cn(textBody, "font-medium text-foreground")}
                      >
                        {facet.label}
                      </span>
                      <div className="flex flex-col gap-3">
                        {facet.values.map((value) => (
                          <FilterCheckbox
                            key={value}
                            id={`char-${facet.slug}-${value}`}
                            label={value}
                            checked={selected.has(value)}
                            onChange={() => toggleTextValue(facet.slug, value)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>

      <button
        type="button"
        onClick={resetFilters}
        disabled={!isActive}
        className={cn(
          "flex h-[52px] items-center justify-center gap-3 bg-primary px-6 transition-opacity",
          panelShadow,
          headingAppearance,
          textBody,
          "text-primary-foreground",
          !isActive && "cursor-not-allowed opacity-50",
        )}
      >
        <RotateCcw className="size-5" strokeWidth={2} />
        {t("catalog.resetFilters")}
      </button>
    </aside>
  );
}
