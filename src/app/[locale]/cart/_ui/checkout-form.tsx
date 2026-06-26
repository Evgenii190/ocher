"use client";

import {
  Banknote,
  Check,
  CreditCard,
  type LucideIcon,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useCart } from "@/shared/cart/cart-context";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { headingAppearance, textBody, textSmall } from "@/shared/ui/typography";
import { type PaymentMethod, submitOrder } from "../_lib/submit-order";

const paymentOptionDefs: {
  value: PaymentMethod;
  labelKey: "cardOffice" | "cashStore";
  icon: LucideIcon;
}[] = [
  { value: "cardOffice", labelKey: "cardOffice", icon: CreditCard },
  { value: "cashStore", labelKey: "cashStore", icon: Banknote },
];

const fieldClass =
  "h-14 rounded-md border-[#D4E2E7] bg-white pr-4 pl-[72px] text-body shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.04)] placeholder:text-[#98928B] focus-visible:border-primary";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  const normalized =
    digits.startsWith("8") || digits.startsWith("7")
      ? `7${digits.slice(1)}`
      : `7${digits}`;
  const limited = normalized.slice(0, 11);
  const body = limited.slice(1);
  const parts = [
    body.slice(0, 3),
    body.slice(3, 6),
    body.slice(6, 8),
    body.slice(8, 10),
  ];

  if (body.length === 0) {
    return "+7 ";
  }
  if (body.length <= 3) {
    return `+7 (${parts[0]}`;
  }
  if (body.length <= 6) {
    return `+7 (${parts[0]}) ${parts[1]}`;
  }
  if (body.length <= 8) {
    return `+7 (${parts[0]}) ${parts[1]}-${parts[2]}`;
  }
  return `+7 (${parts[0]}) ${parts[1]}-${parts[2]}-${parts[3]}`;
}

type CheckoutFormProps = {
  onSuccess: () => void;
};

export function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const t = useTranslations("cart.checkout");
  const { items, clear } = useCart();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cardOffice");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError(t("emptyCart"));
      return;
    }

    const payload = {
      name,
      phone,
      address,
      comment,
      paymentMethod: payment,
      items: items.map((item) => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        discountPercent: item.discountPercent,
        quantity: item.quantity,
      })),
    };

    startTransition(async () => {
      const result = await submitOrder(payload);
      if (result.ok) {
        clear();
        onSuccess();
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-lg bg-[#F7F7F7] p-6 shadow-[0px_1.85px_3.15px_0px_#0004220f,0px_8.15px_6.52px_0px_#00042208] sm:p-8"
    >
      <h2
        className={cn(
          headingAppearance,
          "text-center text-xl tracking-normal text-foreground",
        )}
      >
        {t("contactTitle")}
      </h2>

      <div className="flex flex-col gap-3">
        <IconField icon={<User className="size-5" />}>
          <Input
            id="checkout-name"
            aria-label={t("name")}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            required
            className={fieldClass}
          />
        </IconField>

        <IconField icon={<Phone className="size-5" />}>
          <Input
            id="checkout-phone"
            type="tel"
            aria-label={t("phone")}
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
            placeholder={t("phonePlaceholder")}
            autoComplete="tel"
            maxLength={18}
            required
            className={fieldClass}
          />
        </IconField>

        <IconField icon={<MapPin className="size-5" />}>
          <Input
            id="checkout-address"
            aria-label={t("address")}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder={t("addressPlaceholder")}
            autoComplete="street-address"
            className={fieldClass}
          />
        </IconField>

        <Textarea
          id="checkout-comment"
          aria-label={t("comment")}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder={t("commentPlaceholder")}
          rows={3}
          className="rounded-md border-[#D4E2E7] bg-white px-4 py-3.5 text-body shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.04)] placeholder:text-[#98928B] focus-visible:border-primary"
        />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend
          className={cn(
            headingAppearance,
            "mb-1 text-sm tracking-normal text-foreground",
          )}
        >
          {t("paymentTitle")}
        </legend>
        {paymentOptionDefs.map((option) => {
          const Icon = option.icon;
          const isSelected = payment === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                "group flex cursor-pointer items-center gap-3 rounded-md border border-[#D4E2E7] bg-white p-3 transition-colors hover:border-primary",
                isSelected && "border-primary bg-primary/5",
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-[4px] border border-[#D4E2E7] bg-white transition-colors group-hover:border-primary",
                  isSelected && "border-primary bg-primary",
                )}
              >
                {isSelected ? (
                  <Check className="size-3.5 text-white" strokeWidth={3} />
                ) : null}
              </span>
              <input
                type="radio"
                name="payment"
                value={option.value}
                checked={isSelected}
                onChange={() => setPayment(option.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-md bg-[#FEE9E9] text-primary transition-colors",
                  isSelected && "bg-primary text-white",
                )}
              >
                <Icon className="size-5" />
              </span>
              <span
                className={cn(
                  textBody,
                  isSelected ? "font-medium text-foreground" : "text-[#7B8990]",
                )}
              >
                {t(`payment.${option.labelKey}`)}
              </span>
            </label>
          );
        })}
      </fieldset>

      {error ? (
        <p className={cn(textSmall, "font-medium text-primary")}>{error}</p>
      ) : null}

      <Button
        type="submit"
        disabled={isPending || items.length === 0}
        className={cn(
          headingAppearance,
          "h-16 rounded-md text-lg tracking-[0.04em]",
        )}
      >
        {isPending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

function IconField({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-0 left-0 flex size-14 items-center justify-center rounded-md bg-primary text-white">
        {icon}
      </span>
      {children}
    </div>
  );
}
