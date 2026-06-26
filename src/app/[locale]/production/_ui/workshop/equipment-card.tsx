"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import type { WorkshopEquipmentView } from "@/shared/lib/workshop-view.shared";
import { Button } from "@/shared/ui/button";
import { textBody, textBodyLg, textSmall } from "@/shared/ui/typography";
import equipmentArrow from "../_assets/equipment-arrow.svg";
import { EquipmentDetailDialog } from "./equipment-detail-dialog";

type EquipmentCardProps = {
  item: WorkshopEquipmentView;
};

export function EquipmentCard({ item }: EquipmentCardProps) {
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="flex h-full flex-col rounded-[0.625rem] border border-[#FCFCFC] bg-white shadow-[0_20px_13px_rgba(166,166,166,0.07)]">
        <div className="relative aspect-[454/229] overflow-hidden p-2.5">
          <div className="relative size-full overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-4">
          <h3
            className={cn(
              textBodyLg,
              "font-sans font-semibold text-foreground",
            )}
          >
            {item.title}
          </h3>

          <p className={cn(textBody, "font-light text-[#171717]")}>
            {item.description}
          </p>

          {item.specs.length > 0 ? (
            <dl className="flex flex-col gap-3">
              {item.specs.map((spec) => (
                <div key={spec.label} className="flex flex-col gap-1">
                  <dt className={cn(textBody, "font-light text-[#171717]")}>
                    {spec.label}
                  </dt>
                  <dd
                    className={cn(
                      textBody,
                      "font-sans font-semibold text-foreground",
                    )}
                  >
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-auto pt-8">
            <Button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                "h-11 w-fit gap-4 px-[2.125rem] py-3",
                textSmall,
                "font-sans font-semibold uppercase",
              )}
            >
              {tCommon("readMore")}
              <Image
                src={equipmentArrow}
                alt=""
                width={21}
                height={21}
                aria-hidden
                className="size-5"
              />
            </Button>
          </div>
        </div>
      </article>

      <EquipmentDetailDialog item={item} open={open} onOpenChange={setOpen} />
    </>
  );
}
