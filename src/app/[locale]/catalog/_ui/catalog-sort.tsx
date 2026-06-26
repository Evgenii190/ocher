"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { textSmall } from "@/shared/ui/typography";
import { type SortOption, sortOptionValues } from "../_lib/search-params";

const sortLabelKeys: Record<SortOption, string> = {
  popularity: "catalog.sort.popularity",
  "title-asc": "catalog.sort.titleAsc",
  "title-desc": "catalog.sort.titleDesc",
  "price-asc": "catalog.sort.priceAsc",
  "price-desc": "catalog.sort.priceDesc",
};

type CatalogSortProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
};

export function CatalogSort({ value, onChange, className }: CatalogSortProps) {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col gap-1.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3",
        className,
      )}
    >
      <span className={cn(textSmall, "shrink-0 font-medium text-muted")}>
        {t("catalog.sort.label")}
      </span>
      <Select
        value={value}
        onValueChange={(next) => onChange(next as SortOption)}
      >
        <SelectTrigger
          size="sm"
          aria-label={t("catalog.sort.label")}
          className={cn(
            textSmall,
            "h-10 w-full min-w-0 border border-border bg-white px-4 font-medium shadow-none transition-colors hover:border-primary sm:min-w-[200px]",
            "data-[state=open]:border-primary data-[state=open]:text-primary [&_svg:not([class*='size-'])]:size-4",
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {sortOptionValues.map((optionValue) => (
            <SelectItem
              key={optionValue}
              value={optionValue}
              className="px-4 py-2.5"
            >
              {t(sortLabelKeys[optionValue])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
