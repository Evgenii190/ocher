"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "@/shared/cart/cart-context";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { headingAppearance, textBody, textSmall } from "@/shared/ui/typography";
import {
  availabilityLabelKeys,
  discountedPrice,
  formatCharacteristicValue,
  formatPrice,
  type ProductDetail,
} from "../../../_ui/types";
import { ProductDocuments } from "./product-documents";

type ProductTab = "specs" | "description" | "docs";

const tabKeys: { id: ProductTab; key: string }[] = [
  { id: "specs", key: "catalog.product.tabs.specs" },
  { id: "description", key: "catalog.product.tabs.description" },
  { id: "docs", key: "catalog.product.tabs.docs" },
];

type ProductInfoProps = {
  product: ProductDetail;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<ProductTab>("specs");
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

  const article = product.slug.toUpperCase();

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col bg-white p-6 sm:p-7 lg:min-h-[620px]",
        panelShadow,
      )}
    >
      <div className="flex flex-col gap-3">
        <h2
          className={cn(
            headingAppearance,
            textBody,
            "text-xl text-foreground sm:text-2xl",
          )}
        >
          {product.title}
        </h2>

        <p className={cn(textSmall, "text-muted")}>
          <span className="text-[#7B8990]">{t("common.article")}</span>{" "}
          <span className="font-medium text-foreground">{article}</span>
        </p>

        {finalPrice !== null ? (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {hasDiscount && product.price !== null ? (
              <span className={cn(textSmall, "text-muted line-through")}>
                {formatPrice(product.price)}
              </span>
            ) : null}
            <span
              className={cn(
                headingAppearance,
                "text-xl normal-case tracking-normal",
                hasDiscount ? "text-primary" : "text-foreground",
              )}
            >
              {formatPrice(finalPrice)}
            </span>
          </div>
        ) : (
          <span
            className={cn(
              headingAppearance,
              "text-lg normal-case tracking-normal text-foreground",
            )}
          >
            {t("common.priceOnRequest")}
          </span>
        )}

        <span
          className={cn(
            textSmall,
            "w-fit px-3 py-1.5 uppercase",
            product.availability === "inStock"
              ? "bg-[#273A5B] text-white"
              : "bg-muted text-white",
          )}
        >
          {t(availabilityLabelKeys[product.availability])}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <div className="flex flex-wrap">
          {tabKeys.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  headingAppearance,
                  textSmall,
                  "min-w-[140px] flex-1 px-4 py-4 uppercase transition-colors sm:min-w-[185px] sm:px-6",
                  isActive
                    ? "bg-primary text-white"
                    : "bg-[#F7F7F7] text-foreground hover:bg-[#EFEFEF]",
                )}
              >
                {t(tab.key)}
              </button>
            );
          })}
        </div>

        <div className="min-h-[180px]">
          {activeTab === "specs" ? (
            specs.length > 0 ? (
              <dl className="flex flex-col gap-2.5">
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
                      )}
                    >
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className={cn(textSmall, "text-[#7B8990]")}>
                {t("catalog.product.specsEmpty")}
              </p>
            )
          ) : null}

          {activeTab === "description" ? (
            product.description ? (
              <div
                className={cn(
                  textSmall,
                  "space-y-4 whitespace-pre-line text-[#7B8990]",
                )}
              >
                {product.description.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className={cn(textSmall, "text-[#7B8990]")}>
                {t("catalog.product.descriptionEmpty")}
              </p>
            )
          ) : null}

          {activeTab === "docs" ? (
            <ProductDocuments documents={product.documents} />
          ) : null}
        </div>
      </div>

      <div className="mt-auto pt-6">
        {inCart ? (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => removeItem(product.id)}
              aria-label={t("common.aria.removeFromCart")}
              className="size-[52px] shrink-0 bg-[#F7F7F7] p-0 text-muted hover:bg-[#F7F7F7] hover:text-primary"
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
            onClick={() =>
              addItem({
                id: product.id,
                slug: product.slug,
              })
            }
            className="h-[52px] gap-7 px-3.5 font-bold uppercase"
          >
            <span>{t("common.addToCart")}</span>
            <div className="flex size-9 shrink-0 items-center justify-center bg-white text-primary">
              <IoCartOutline size={18} />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
