"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/shared/cart/cart-context";
import { productHref } from "@/shared/lib/product-url";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  headingAppearance,
  textBody,
  textMicro,
  textSmall,
} from "@/shared/ui/typography";
import {
  availabilityLabelKeys,
  type CatalogProduct,
  discountedPrice,
  formatCharacteristicValue,
  formatPrice,
} from "./types";

const cardShadow =
  "shadow-[0px_1.85px_3.15px_0px_#00042211,0px_8.15px_6.52px_0px_#00042208,0px_20px_13px_0px_#00042207]";

const PLACEHOLDER = "/catalog/placeholder.svg";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const t = useTranslations();
  const { addItem, getQuantity, increment, decrement, removeItem } = useCart();

  const quantity = getQuantity(product.id);
  const inCart = quantity > 0;

  const hasDiscount = product.price !== null && product.discountPercent > 0;
  const finalPrice =
    product.price !== null
      ? discountedPrice(product.price, product.discountPercent)
      : null;

  const specs = product.characteristics
    .map((characteristic) => ({
      label: characteristic.label,
      value: formatCharacteristicValue(characteristic, t),
    }))
    .filter((spec) => spec.value.length > 0);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
    });
  };

  const href = productHref(product.slug);

  return (
    <article className={cn("flex flex-col bg-[#F7F7F7]", cardShadow)}>
      <Link
        href={href}
        className="group flex flex-1 flex-col transition-opacity hover:opacity-95"
      >
        <div className="relative h-[214px] bg-white">
          <Image
            src={product.image ?? PLACEHOLDER}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-4"
          />
          {hasDiscount ? (
            <span
              className={cn(
                "absolute top-0 right-0 bg-primary px-3 py-1.5 font-bold text-primary-foreground",
                textMicro,
              )}
            >
              −{product.discountPercent}%
            </span>
          ) : null}
          <span
            className={cn(
              "absolute bottom-0 left-0 px-4 py-2 uppercase",
              textMicro,
              product.availability === "inStock"
                ? "bg-[#273A5B] text-white"
                : "bg-muted text-white",
            )}
          >
            {t(availabilityLabelKeys[product.availability])}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <h3
            className={cn(
              "font-heading font-semibold transition-colors group-hover:text-primary",
              textBody,
            )}
          >
            {product.title}
          </h3>
          {specs.length > 0 ? (
            <>
              <div className="relative -left-5 h-px w-[calc(100%+40px)] bg-[#7B8990]/12" />
              <dl className="flex flex-col gap-2">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-start justify-between gap-4"
                  >
                    <dt className={cn(textSmall, "font-medium text-muted")}>
                      {spec.label}
                    </dt>
                    <dd
                      className={cn(
                        textSmall,
                        "text-right font-medium text-[#2E3237]",
                      )}
                    >
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-col gap-1 px-5 pb-5">
        <div className="relative -left-5 mb-4 h-px w-[calc(100%+40px)] bg-[#7B8990]/12" />
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className={cn(textSmall, "font-medium text-muted")}>
              {t("common.cost")}
            </span>
            {finalPrice !== null ? (
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                {hasDiscount && product.price !== null ? (
                  <span
                    className={cn(
                      textSmall,
                      "font-medium text-muted line-through",
                    )}
                  >
                    {formatPrice(product.price)}
                  </span>
                ) : null}
                <span
                  className={cn(
                    headingAppearance,
                    "text-lg leading-[26px] tracking-normal text-foreground normal-case",
                    hasDiscount && "text-primary",
                  )}
                >
                  {formatPrice(finalPrice)}
                </span>
              </div>
            ) : (
              <span
                className={cn(
                  headingAppearance,
                  "text-lg leading-[26px] tracking-normal text-foreground normal-case",
                )}
              >
                {t("common.priceOnRequestUpper")}
              </span>
            )}
          </div>
          {inCart ? (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeItem(product.id)}
                aria-label={t("common.aria.removeFromCart")}
                className="size-[52px] shrink-0 bg-white p-0 text-muted hover:bg-white hover:text-primary"
              >
                <Trash2 className="size-5" />
              </Button>
              <div className="flex h-[52px] items-stretch bg-primary text-primary-foreground">
                <Button
                  type="button"
                  onClick={() => decrement(product.id)}
                  aria-label={t("common.aria.decreaseQty")}
                  className="h-full w-11 bg-transparent p-0 text-primary-foreground hover:bg-white/15"
                >
                  <Minus className="size-4" />
                </Button>
                <span
                  aria-live="polite"
                  className={cn(
                    headingAppearance,
                    "flex min-w-9 items-center justify-center px-1 text-base tracking-normal tabular-nums",
                  )}
                >
                  {quantity}
                </span>
                <Button
                  type="button"
                  onClick={() => increment(product.id)}
                  aria-label={t("common.aria.increaseQty")}
                  className="h-full w-11 bg-transparent p-0 text-primary-foreground hover:bg-white/15"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="button"
              onClick={handleAddToCart}
              className="h-[52px] gap-7 px-3.5 font-bold uppercase"
            >
              <span className="max-sm:hidden">{t("common.addToCart")}</span>
              <div className="flex size-9 shrink-0 items-center justify-center bg-white text-primary">
                <IoCartOutline size={18} />
              </div>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
