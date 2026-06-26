"use client";

import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textBodyLg,
  textSmall,
} from "@/shared/ui/typography";
import { HeroStatIcon } from "./hero-stat-icon";
import type { HeroStat } from "./hero-stats";

type HeroStatCardProps = {
  item: HeroStat;
  compact?: boolean;
};

export function HeroStatCard({ item, compact = false }: HeroStatCardProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-[15px] transition-colors duration-300",
        compact ? "gap-3 p-3 pb-4" : "max-h-[196px] gap-5 p-5 pr-4 pb-10",
      )}
    >
      <div
        className={cn(
          "shrink-0 text-white",
          compact ? "size-12 [&_svg]:size-full" : "size-30 [&_svg]:size-full",
        )}
      >
        <HeroStatIcon icon={item.icon} />
      </div>
      <div
        className={cn(
          "flex min-w-0 max-w-[80%] flex-1 flex-col",
          compact ? "gap-2.5" : "gap-7.5",
        )}
      >
        <h3
          className={cn(
            headingAppearance,
            compact ? cn(textSmall, "lg:text-body leading-snug") : textBodyLg,
            "min-w-0 text-balance text-primary leading-none",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            compact ? cn(textSmall, "lg:text-body") : textBodyLg,
            "text-white",
          )}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}
