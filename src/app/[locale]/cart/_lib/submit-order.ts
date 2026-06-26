"use server";

import config from "@payload-config";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";

export type OrderItemPayload = {
  productId: string;
  title: string;
  price: number | null;
  discountPercent: number;
  quantity: number;
};

export type PaymentMethod = "cardOffice" | "cashStore";

export type SubmitOrderInput = {
  name: string;
  phone: string;
  address?: string;
  comment?: string;
  paymentMethod: PaymentMethod;
  items: OrderItemPayload[];
};

export type SubmitOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

function discounted(price: number, discountPercent: number): number {
  if (discountPercent <= 0) {
    return price;
  }
  return Math.round(price * (1 - discountPercent / 100));
}

export async function submitOrder(
  input: SubmitOrderInput,
): Promise<SubmitOrderResult> {
  const t = await getTranslations("validation.order");
  const name = input.name?.trim();
  const phone = input.phone?.trim();

  if (!name) {
    return { ok: false, error: t("nameRequired") };
  }
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return { ok: false, error: t("phoneInvalid") };
  }
  if (
    input.paymentMethod !== "cardOffice" &&
    input.paymentMethod !== "cashStore"
  ) {
    return { ok: false, error: t("paymentRequired") };
  }
  if (!Array.isArray(input.items) || input.items.length === 0) {
    return { ok: false, error: t("cartEmpty") };
  }

  let subtotal = 0;
  let total = 0;

  const items = input.items.map((item) => {
    const quantity = Math.max(1, Math.floor(item.quantity || 1));
    if (typeof item.price === "number") {
      subtotal += item.price * quantity;
      total += discounted(item.price, item.discountPercent) * quantity;
    }
    return {
      productId: item.productId,
      title: item.title,
      price: typeof item.price === "number" ? item.price : undefined,
      discountPercent: item.discountPercent ?? 0,
      quantity,
    };
  });

  try {
    const payload = await getPayload({ config });
    const order = await payload.create({
      collection: "orders",
      data: {
        name,
        phone,
        address: input.address?.trim() || undefined,
        comment: input.comment?.trim() || undefined,
        paymentMethod: input.paymentMethod,
        status: "new",
        items,
        subtotal,
        discountTotal: subtotal - total,
        total,
      },
    });

    return { ok: true, orderId: String(order.id) };
  } catch (error) {
    console.error("[order] Не удалось создать заказ:", error);
    return {
      ok: false,
      error: t("submitFailed"),
    };
  }
}
