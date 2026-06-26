"use client";

import { useTranslations } from "next-intl";
import type { NewsItem } from "@/shared/lib/news.shared";
import { cn } from "@/shared/lib/utils";
import { NewsCard } from "./news-card";

type NewsGridProps = {
  items: NewsItem[];
  className?: string;
};

export function NewsGrid({ items, className }: NewsGridProps) {
  const t = useTranslations("news");

  if (items.length === 0) {
    return <p className="text-body text-foreground/70">{t("emptyCategory")}</p>;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
