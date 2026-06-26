"use client";

import { Loader2, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TbDiscount } from "react-icons/tb";
import { useCart } from "@/shared/cart/cart-context";
import { Container } from "@/shared/components/container";
import { formatPrice } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";
import { gapContent, gapHeading } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  textSmall,
  typeTitle,
} from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import { CartItemRow } from "./cart-item-row";
import { CheckoutForm } from "./checkout-form";
import { EmptyCart } from "./empty-cart";
import { OrderSuccess } from "./order-success";

export function CartView() {
  const t = useTranslations("cart");
  const tCatalog = useTranslations("catalog");
  const tCommon = useTranslations("common");
  const { isLoading, items, totalCount, totals } = useCart();
  const [orderCompleted, setOrderCompleted] = useState(false);

  const breadcrumbs = [
    { label: tCatalog("title"), href: "/catalog" },
    { label: t("breadcrumb") },
  ];

  const pageTitle = orderCompleted
    ? t("titleOrderCompleted")
    : totalCount > 0
      ? tCommon("plural.productInCart", { count: totalCount })
      : t("title");

  return (
    <Container className={cn("flex flex-col pb-section", gapContent)}>
      <TopBar variant="black" breadcrumbs={breadcrumbs} />

      <div className={cn("flex flex-col", gapHeading)}>
        <div className="flex flex-col gap-3">
          <span className={cn(textSmall, "font-medium uppercase text-primary")}>
            {orderCompleted ? t("eyebrowDone") : t("eyebrowCheckout")}
          </span>
          <h1 className={typeTitle}>{pageTitle}</h1>
        </div>

        {isLoading && items.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-lg bg-[#F7F7F7]">
            <div className="flex items-center gap-3 text-primary">
              <Loader2 className="size-5 animate-spin" />
              <span className={cn(headingAppearance, textBody)}>
                {t("updating")}
              </span>
            </div>
          </div>
        ) : orderCompleted ? (
          <OrderSuccess />
        ) : totalCount === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>

              <div className="flex flex-col gap-4 rounded-lg bg-[#F7F7F7] p-6 shadow-[0px_1.85px_3.15px_0px_#0004220f,0px_8.15px_6.52px_0px_#00042208] sm:p-7">
                {totals.discountTotal > 0 ? (
                  <SummaryRow
                    icon={<TbDiscount className="size-6 text-primary" />}
                    label={t("discount")}
                  >
                    <span
                      className={cn(textBodyLg, "font-medium text-[#7B8990]")}
                    >
                      −{formatPrice(totals.discountTotal)}
                    </span>
                  </SummaryRow>
                ) : null}

                <SummaryRow
                  icon={<Wallet className="size-6 text-primary" />}
                  label={t("total")}
                >
                  {totals.discountTotal > 0 ? (
                    <span
                      className={cn(textSmall, "text-[#FF3737] line-through")}
                    >
                      {formatPrice(totals.subtotal)}
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      headingAppearance,
                      "text-2xl normal-case tracking-normal text-foreground",
                    )}
                  >
                    {formatPrice(totals.total)}
                  </span>
                </SummaryRow>

                {totals.hasOnRequest ? (
                  <p className={cn(textSmall, "text-[#7B8990]")}>
                    {t("onRequestNote")}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="lg:sticky lg:top-6">
              <CheckoutForm onSuccess={() => setOrderCompleted(true)} />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

function SummaryRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-end gap-3">
      <span className="flex shrink-0 items-center gap-2.5 pb-0.5">
        {icon}
        <span className={cn(textBodyLg, "font-medium text-foreground")}>
          {label}
        </span>
      </span>
      <span
        aria-hidden
        className="mb-1.5 min-w-6 flex-1 border-[#FB7215] border-b border-dashed"
      />
      <span className="flex shrink-0 items-baseline gap-2.5">{children}</span>
    </div>
  );
}
