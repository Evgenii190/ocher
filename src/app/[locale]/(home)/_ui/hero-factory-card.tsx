"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textBodyLg,
  textSmall,
} from "@/shared/ui/typography";
import type { FactoryItem } from "./data";

type HeroFactoryCardProps = {
  item: FactoryItem;
  compact?: boolean;
};

export function HeroFactoryCard({
  item,
  compact = false,
}: HeroFactoryCardProps) {
  const t = useTranslations("home.factorySlider.workshops");
  const tCommon = useTranslations("common");
  const alt = t(`${item.workshopKey}.alt`);

  return (
    <Link
      href={item.href}
      aria-label={alt}
      className={cn(
        "group flex min-w-0 w-full cursor-pointer items-center overflow-hidden backdrop-blur-[20px] transition-colors duration-300 hover:bg-primary",
        compact ? "gap-3 p-3 pb-4" : "max-h-[196px] gap-5 p-5 pr-4 pb-10",
      )}
    >
      <div
        className={cn(
          "shrink-0 text-white transition-colors duration-300 group-hover:text-primary-foreground",
          compact ? "size-12 [&_svg]:size-full" : "size-30 [&_svg]:size-full",
        )}
      >
        {item.image}
      </div>
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          compact ? "gap-2.5" : "gap-7.5",
        )}
      >
        <h3
          className={cn(
            headingAppearance,
            compact ? cn(textSmall, "lg:text-body leading-snug") : textBodyLg,
            "min-w-0 text-balance text-white transition-colors duration-300 group-hover:text-primary-foreground",
          )}
        >
          {t(`${item.workshopKey}.title`)}
        </h3>
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center whitespace-nowrap bg-primary-foreground text-primary",
            headingAppearance,
            compact ? cn(textSmall, "lg:text-body") : textBodyLg,
            "w-fit max-w-full font-semibold transition-colors duration-300",
            "group-hover:bg-primary-foreground group-hover:text-primary",
            compact ? "h-9 px-4" : "h-12.5 max-w-[180px] w-full px-2.5",
          )}
        >
          {tCommon("readMore")}
        </span>
      </div>
    </Link>
  );
}
