"use client";

import Image from "next/image";
import serviceAdvantageCheck from "@/app/[locale]/services/_assets/service-advantage-check.svg";
import { cn } from "@/shared/lib/utils";
import type { WorkshopEquipmentView } from "@/shared/lib/workshop-view.shared";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { textBody, textBodyLg, textSmall } from "@/shared/ui/typography";

type EquipmentDetailDialogProps = {
  item: WorkshopEquipmentView | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function FeatureCheck() {
  return (
    <Image
      src={serviceAdvantageCheck}
      alt=""
      width={20}
      height={20}
      aria-hidden
      className="mt-0.5 size-5 shrink-0 drop-shadow-[0_2px_4px_rgba(218,65,59,0.35)]"
    />
  );
}

export function EquipmentDetailDialog({
  item,
  open,
  onOpenChange,
}: EquipmentDetailDialogProps) {
  if (!item) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[calc(100vh-2rem)] max-w-[calc(100%-2rem)] overflow-y-auto rounded-[0.625rem] border border-[#FCFCFC] p-0 sm:max-w-[89.875rem]"
        aria-describedby={undefined}
      >
        <div className="grid lg:grid-cols-[minmax(0,554px)_minmax(0,1fr)]">
          <aside className="flex flex-col gap-4 p-[30px] lg:pb-8">
            <div className="relative aspect-[554/419] overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 554px"
                className="object-cover"
                priority
              />
            </div>

            <h3
              className={cn(
                textBodyLg,
                "font-heading font-semibold text-foreground",
              )}
            >
              {item.title}
            </h3>

            <p className={cn(textSmall, "font-light text-[#171717]")}>
              {item.description}
            </p>

            {item.specs.length > 0 ? (
              <dl className="flex flex-col gap-3">
                {item.specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1">
                    <dt className={cn(textSmall, "font-light text-[#171717]")}>
                      {spec.label}
                    </dt>
                    <dd
                      className={cn(
                        textSmall,
                        "font-sans font-semibold text-foreground",
                      )}
                    >
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </aside>

          <section className="flex flex-col gap-6 px-[30px] pb-8 pt-[37px] pr-20 lg:gap-8">
            <DialogTitle
              className={cn(
                textBodyLg,
                "font-heading text-[clamp(1.25rem,0.6vw+1rem,1.5rem)] font-semibold leading-tight text-foreground",
              )}
            >
              {item.titleFull}
            </DialogTitle>

            {item.features.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <FeatureCheck />
                    <span className={cn(textBody, "font-light text-[#171717]")}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div
              className={cn(
                textBody,
                "whitespace-pre-line font-light leading-[26px] text-foreground",
              )}
            >
              {item.descriptionLong}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
