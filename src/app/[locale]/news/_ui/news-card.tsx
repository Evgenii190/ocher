"use client";

import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NewsItem } from "@/shared/lib/news.shared";
import { newsHref } from "@/shared/lib/news.shared";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  textSmall,
} from "@/shared/ui/typography";

const PLACEHOLDER = "/catalog/product-placeholder.png";

type NewsCardProps = {
  item: NewsItem;
  className?: string;
};

export function NewsCard({ item, className }: NewsCardProps) {
  const t = useTranslations("common");
  const imageSrc = item.image ?? PLACEHOLDER;

  return (
    <Link
      href={newsHref(item.slug)}
      className={cn(
        "group flex min-w-0 flex-col border border-white/10 bg-white p-5 transition-colors hover:border-primary/20",
        className,
      )}
    >
      <div className="relative aspect-432/210 w-full">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-6">
        <h3
          className={cn(
            headingAppearance,
            textBodyLg,
            "leading-snug text-foreground",
          )}
        >
          {item.title}
        </h3>
        {item.description ? (
          <p className={cn(textBody, "text-foreground/85 leading-normal")}>
            {item.description}
          </p>
        ) : null}

        <div
          className={cn(
            "mt-auto gap-4",
            "flex flex-wrap items-center justify-between",
            "md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:items-center",
          )}
        >
          {item.publishedAtLabel ? (
            <div
              className={cn(
                textSmall,
                "flex items-center gap-2 text-foreground/50",
                "md:max-lg:col-start-1 md:max-lg:row-start-1 md:max-lg:justify-self-start",
              )}
            >
              <CalendarDays className="size-4.5 shrink-0" strokeWidth={1.5} />
              <time dateTime={item.publishedAt ?? undefined}>
                {item.publishedAtLabel}
              </time>
            </div>
          ) : null}
          <span
            className={cn(
              buttonVariants({ variant: "inverse" }),
              headingAppearance,
              textSmall,
              "h-auto border-2 border-primary px-10 py-3 font-semibold transition-colors group-hover:bg-primary/90 group-hover:text-primary-foreground",
              "md:max-lg:col-start-2 md:max-lg:row-start-2 md:max-lg:justify-self-end",
            )}
          >
            {t("readMore")}
          </span>
        </div>
      </div>
    </Link>
  );
}
