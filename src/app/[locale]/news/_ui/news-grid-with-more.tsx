"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import type { NewsItem } from "@/shared/lib/news.shared";
import { NEWS_PAGE_SIZE } from "@/shared/lib/news.shared";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { headingAppearance, textBody } from "@/shared/ui/typography";
import { NewsGrid } from "./news-grid";

type NewsGridWithMoreProps = {
  initialItems: NewsItem[];
  initialHasMore: boolean;
  categorySlug?: string;
  pageSize?: number;
  className?: string;
};

export function NewsGridWithMore({
  initialItems,
  initialHasMore,
  categorySlug,
  pageSize = NEWS_PAGE_SIZE,
  className,
}: NewsGridWithMoreProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItems(initialItems);
    setPage(1);
    setHasMore(initialHasMore);
  }, [initialItems, initialHasMore]);

  const handleShowMore = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const params = new URLSearchParams({
        page: String(nextPage),
        limit: String(pageSize),
        locale,
      });
      if (categorySlug) {
        params.set("category", categorySlug);
      }

      const response = await fetch(`/api/news?${params.toString()}`);
      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as {
        items: NewsItem[];
        hasMore: boolean;
      };

      setItems((current) => [...current, ...data.items]);
      setPage(nextPage);
      setHasMore(data.hasMore);
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug, hasMore, isLoading, locale, page, pageSize]);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <NewsGrid items={items} />

      {hasMore ? (
        <Button
          type="button"
          onClick={() => void handleShowMore()}
          disabled={isLoading}
          className={cn(
            "h-[52px] w-full px-6 uppercase sm:w-[308px]",
            panelShadow,
            headingAppearance,
            textBody,
          )}
        >
          {isLoading ? t("loading") : t("showMore")}
        </Button>
      ) : null}
    </div>
  );
}
