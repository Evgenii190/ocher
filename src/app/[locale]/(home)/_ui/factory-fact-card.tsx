"use client";

import { useTranslations } from "next-intl";
import { CompanyStatIcon } from "@/shared/components/company-stat-icon";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textBodyLg,
} from "@/shared/ui/typography";
import type { FactoryFact } from "./data";

type FactoryFactCardProps = {
  item: FactoryFact;
};

export function FactoryFactCard({ item }: FactoryFactCardProps) {
  const t = useTranslations("home.factoryFacts.items");

  return (
    <div className="flex w-full items-start gap-4">
      <div className="flex size-22.5 shrink-0 items-center justify-center rounded-lg bg-primary p-3 text-white">
        <CompanyStatIcon icon={item.icon} className="size-12.5" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3
          className={cn(
            headingAppearance,
            textBodyLg,
            "text-balance leading-tight text-primary",
          )}
        >
          {t(`${item.key}.title`)}
        </h3>
        <p className={cn(textBodyLg, "text-balance leading-snug")}>
          {t(`${item.key}.description`)}
        </p>
      </div>
    </div>
  );
}
