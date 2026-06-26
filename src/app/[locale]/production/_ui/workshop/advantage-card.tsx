import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import type { WorkshopAdvantage } from "@/shared/lib/workshop-view.shared";
import { headingAppearance, textBody } from "@/shared/ui/typography";
import advantageArrow from "../_assets/advantage-arrow.svg";

type AdvantageCardProps = {
  item: WorkshopAdvantage;
};

export function AdvantageCard({ item }: AdvantageCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[0.625rem] border border-[#FCFCFC] bg-white p-8 shadow-[0_20px_13px_rgba(166,166,166,0.07)]">
      <div className="min-h-[clamp(3.25rem,1.8vw+2.25rem,4.75rem)]">
        <h3
          className={cn(
            headingAppearance,
            "text-[clamp(1.125rem,0.8vw+0.75rem,1.375rem)] leading-snug text-foreground",
          )}
        >
          {item.title}
        </h3>
      </div>

      <Image
        src={advantageArrow}
        alt=""
        aria-hidden
        className="mt-6 h-3.5 w-full max-w-[19.5rem] shrink-0 object-contain object-left"
      />

      <p className={cn(textBody, "mt-6 text-[#818F9B]")}>{item.description}</p>
    </article>
  );
}
