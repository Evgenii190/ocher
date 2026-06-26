"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { headingAppearance, textBody } from "@/shared/ui/typography";

type CatalogPaginationProps = {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
  onShowMore: () => void;
};

export function CatalogPagination({
  currentPage,
  totalPages,
  hasMore,
  onPageChange,
  onShowMore,
}: CatalogPaginationProps) {
  const t = useTranslations();

  if (totalPages <= 1) {
    return null;
  }

  const pages = buildPageNumbers(currentPage, totalPages);
  const cellBase = cn(
    headingAppearance,
    textBody,
    "flex size-12 cursor-pointer items-center justify-center border-2 uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40",
  );

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      {hasMore ? (
        <Button
          type="button"
          onClick={onShowMore}
          className={cn(
            "h-[52px] w-full px-6 uppercase sm:w-[308px]",
            panelShadow,
            headingAppearance,
            textBody,
          )}
        >
          {t("catalog.pagination.showMore")}
        </Button>
      ) : (
        <div className="hidden sm:block sm:w-[308px]" />
      )}

      <nav
        aria-label={t("catalog.pagination.aria")}
        className="flex items-center justify-center gap-0 sm:justify-end"
      >
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label={t("catalog.pagination.prev")}
          className={cn(
            cellBase,
            "border-primary/20 bg-white/20 text-primary/60 hover:border-primary/40",
          )}
        >
          <ChevronLeft className="size-5" />
        </button>

        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: статичный список страниц
              key={`ellipsis-${index}`}
              className={cn(
                headingAppearance,
                textBody,
                "flex size-12 items-center justify-center border-2 border-primary/20 bg-white/20 text-primary/30",
              )}
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                cellBase,
                page === currentPage
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-primary/20 bg-white/20 text-primary/60 hover:border-primary/40",
              )}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label={t("catalog.pagination.next")}
          className={cn(
            cellBase,
            "border-primary/20 bg-white/20 text-primary/60 hover:border-primary/40",
          )}
        >
          <ChevronRight className="size-5" />
        </button>
      </nav>
    </div>
  );
}

function buildPageNumbers(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, "ellipsis", total];
  }

  if (current >= total - 2) {
    return [1, "ellipsis", total - 3, total - 2, total - 1, total];
  }

  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}
