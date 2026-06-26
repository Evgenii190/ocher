"use client";

import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  textSmall,
  typeSubtitle,
} from "@/shared/ui/typography";

export function OrderSuccess() {
  const t = useTranslations("cart.success");
  const tCommon = useTranslations("common");

  return (
    <section
      aria-labelledby="order-success-title"
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
            <CheckCircle2
              className="size-11 text-primary"
              strokeWidth={1.5}
              aria-hidden
            />
          </div>
        </div>

        <span className={cn(textSmall, "font-medium uppercase text-primary")}>
          {t("eyebrow")}
        </span>

        <h2
          id="order-success-title"
          className={cn(typeSubtitle, "mt-2 uppercase text-foreground")}
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
      </div>
    </section>
  );
}
