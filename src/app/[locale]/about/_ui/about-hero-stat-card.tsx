"use client";

import { CompanyStatIcon } from "@/shared/components/company-stat-icon";
import type { CompanyStat } from "@/shared/lib/company-stats.shared";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textBody,
  textBodyLg,
} from "@/shared/ui/typography";

type AboutHeroStatCardProps = {
  item: CompanyStat & { title: string; description: string };
};

export function AboutHeroStatCard({ item }: AboutHeroStatCardProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full min-w-0 items-center overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-[15px]",
        "gap-3 p-3 sm:gap-4 sm:p-4 lg:gap-5 lg:p-5",
      )}
    >
      <div className="size-14 shrink-0 text-white sm:size-16 lg:size-[4.5rem]">
        <CompanyStatIcon icon={item.icon} className="size-full" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-3 lg:gap-5">
        <h3
          className={cn(
            headingAppearance,
            textBodyLg,
            "min-w-0 text-balance leading-tight text-primary",
          )}
        >
          {item.title}
        </h3>
        <p className={cn(textBody, "text-white/90 leading-snug")}>
          {item.description}
        </p>
      </div>
    </div>
  );
}
