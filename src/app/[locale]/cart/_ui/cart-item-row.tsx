"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CartItem } from "@/shared/cart/cart-context";
import { useCart } from "@/shared/cart/cart-context";
import { discountedPrice, formatPrice } from "@/shared/lib/format";
import { productHref } from "@/shared/lib/product-url";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  headingAppearance,
  textBody,
  textMicro,
  textSmall,
} from "@/shared/ui/typography";

const PLACEHOLDER = "/catalog/placeholder.svg";

export function CartItemRow({ item }: { item: CartItem }) {
  const t = useTranslations();
  const tAria = useTranslations("common.aria");
  const { increment, decrement, removeItem } = useCart();

  const availabilityLabel = t("common.availabilityLabel");
  const hasDiscount = item.price !== null && item.discountPercent > 0;
  const unitPrice =
    item.price !== null
      ? discountedPrice(item.price, item.discountPercent)
      : null;
  const lineTotal = unitPrice !== null ? unitPrice * item.quantity : null;
  const availabilitySpec = item.specs.find(
    (spec) => spec.label === availabilityLabel,
  );
  const specs = availabilitySpec
    ? [
        availabilitySpec,
        ...item.specs.filter((spec) => spec.label !== availabilityLabel),
      ]
    : item.specs;

  const href = productHref(item.slug);

  return (
    <article className="flex flex-col gap-5 rounded-lg bg-[#F7F7F7] p-4 shadow-[0px_1.85px_3.15px_0px_#0004220f,0px_8.15px_6.52px_0px_#00042208] sm:min-h-[264px] sm:flex-row sm:gap-6 sm:p-5">
      <Link
        href={href}
        className="relative aspect-square w-full shrink-0 overflow-hidden rounded-md bg-white transition-opacity hover:opacity-95 sm:size-[200px] lg:size-[224px]"
      >
        <Image
          src={item.image ?? PLACEHOLDER}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 224px"
          className="object-contain p-4"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <h3
          className={cn(
            headingAppearance,
            textBody,
            "max-w-[560px] normal-case tracking-normal text-foreground",
          )}
        >
          <Link href={href} className="transition-colors hover:text-primary">
            {item.title}
          </Link>
        </h3>

        {specs.length > 0 ? (
          <dl className="flex max-w-[560px] flex-col gap-2.5">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-end gap-1.5">
                <dt className={cn(textSmall, "shrink-0 text-[#7B8990]")}>
                  {spec.label}
                </dt>
                <span
                  aria-hidden
                  className="mb-[5px] min-w-4 flex-1 border-[#D4E2E7] border-b border-dotted"
                />
                <dd
                  className={cn(
                    textSmall,
                    "shrink-0 text-right font-medium text-foreground",
                    spec.label === availabilityLabel && "text-primary",
                  )}
                >
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-col gap-4 sm:w-[188px] sm:border-[#7B8990]/10 sm:border-l sm:pl-6">
        {lineTotal !== null ? (
          <div className="flex flex-col gap-0.5 sm:items-end">
            {hasDiscount && item.price !== null ? (
              <span className={cn(textSmall, "text-[#7B8990] line-through")}>
                {formatPrice(item.price * item.quantity)}
              </span>
            ) : null}
            <span
              className={cn(
                headingAppearance,
                "text-xl normal-case tracking-normal",
                hasDiscount ? "text-primary" : "text-foreground",
              )}
            >
              {formatPrice(lineTotal)}
            </span>
          </div>
        ) : (
          <span
            className={cn(
              textSmall,
              "font-medium text-[#7B8990] sm:text-right",
            )}
          >
            {t("common.priceOnRequest")}
          </span>
        )}

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex h-[52px] items-stretch overflow-hidden rounded-md">
            <Button
              type="button"
              variant="ghost"
              onClick={() => decrement(item.id)}
              aria-label={tAria("decreaseQty")}
              className="h-full w-[52px] shrink-0 rounded-none bg-white p-0 text-primary hover:bg-primary/90 hover:text-white"
            >
              <Minus className="size-4" />
            </Button>
            <span
              className={cn(
                "flex flex-1 items-center justify-center bg-primary px-2 text-center font-semibold text-white tabular-nums",
                textBody,
              )}
            >
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => increment(item.id)}
              aria-label={tAria("increaseQty")}
              className="h-full w-[52px] shrink-0 rounded-none bg-white p-0 text-primary hover:bg-primary/90 hover:text-white"
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={() => removeItem(item.id)}
            className="h-[52px] gap-2 rounded-md bg-white text-primary hover:bg-primary hover:text-white"
          >
            <Trash2 className="size-4" />
            <span className={cn(headingAppearance, textMicro)}>
              {t("common.clear")}
            </span>
          </Button>
        </div>
      </div>
    </article>
  );
}
