"use client";

import { ArrowRight, PackageCheck, Phone, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  textSmall,
} from "@/shared/ui/typography";

const perkKeys = ["warranty", "delivery", "manager"] as const;

export function EmptyCart() {
  const t = useTranslations("cart.empty");
  const tCommon = useTranslations("common");

  return (
    <section
      aria-labelledby="empty-cart-title"
      className={cn(
        "relative overflow-hidden rounded-lg bg-[#F7F7F7] px-6 py-12 sm:px-10 sm:py-16",
        panelShadow,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-12 size-56 rounded-full bg-primary/[0.03]"
      />

      <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="relative mb-8">
          <div
            aria-hidden
            className="absolute inset-0 scale-[1.35] rounded-full border border-primary/15 border-dashed"
          />
          <div className="relative flex size-24 items-center justify-center rounded-full bg-white shadow-[0px_8px_24px_0px_#00042212]">
            <IoCartOutline className="size-11 text-primary" aria-hidden />
          </div>
        </div>

        <span className={cn(textSmall, "font-medium uppercase text-primary")}>
          {t("eyebrow")}
        </span>

        <h2
          id="empty-cart-title"
          className={cn(
            headingAppearance,
            "mt-2 text-subtitle uppercase text-foreground",
          )}
        >
          {t("title")}
        </h2>

        <p className={cn(textBodyLg, "mt-4 max-w-md text-muted")}>
          {t("description")}
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button asChild className="h-[52px] px-8 uppercase">
            <Link href="/catalog" className={cn(headingAppearance, textBody)}>
              {tCommon("goToCatalog")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-[52px] border-primary bg-white px-8 uppercase hover:bg-white"
          >
            <a
              href="tel:+79677828700"
              className={cn(headingAppearance, textBody)}
            >
              <Phone className="size-4" />
              {tCommon("call")}
            </a>
          </Button>
        </div>

        <ul className="mt-10 grid w-full gap-3 sm:grid-cols-3">
          {perkKeys.map((key) => (
            <li
              key={key}
              className="flex flex-col items-center gap-2 rounded-md bg-white/70 px-3 py-4"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                {key === "warranty" ? (
                  <PackageCheck className="size-4" aria-hidden />
                ) : key === "delivery" ? (
                  <Truck className="size-4" aria-hidden />
                ) : (
                  <Phone className="size-4" aria-hidden />
                )}
              </span>
              <span className={cn(textSmall, "text-foreground")}>
                {t(`perks.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
