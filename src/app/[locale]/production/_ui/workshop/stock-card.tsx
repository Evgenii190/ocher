"use client";

import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import type { WorkshopStockItemView } from "@/shared/lib/workshop-view.shared";
import { headingAppearance, textBodyLg } from "@/shared/ui/typography";

type StockCardProps = {
  item: WorkshopStockItemView;
};

export function StockCard({ item }: StockCardProps) {
  return (
    <article className="relative flex aspect-[355/348] w-full flex-col overflow-hidden bg-black">
      <Image
        src={item.imageUrl}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 768px) 88vw, (max-width: 1280px) 45vw, 355px"
        className="object-cover"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -left-10 h-24 w-[65%] bg-[#494949]/90 blur-[75px]"
      />

      <div className="relative z-10 mt-auto flex flex-col gap-3 p-8">
        <h3
          className={cn(
            headingAppearance,
            textBodyLg,
            "text-balance text-white uppercase leading-snug",
          )}
        >
          {item.title}
        </h3>

        <p className={cn(textBodyLg, "font-medium text-white leading-snug")}>
          {item.value}
        </p>
      </div>
    </article>
  );
}
