"use client";

import { useTranslations } from "next-intl";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/shared/cart/cart-context";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

type CartButtonProps = {
  className?: string;
};

export function CartButton({ className }: CartButtonProps) {
  const t = useTranslations("nav");
  const { totalCount } = useCart();

  return (
    <Button asChild size="icon" className={cn("relative", className)}>
      <Link
        href="/cart"
        aria-label={
          totalCount > 0
            ? t("cartAria", { count: totalCount })
            : t("cartAriaEmpty")
        }
      >
        <IoCartOutline size={20} />
        {totalCount > 0 ? (
          <span className="absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#273A5B] px-1 text-[11px] font-bold text-white tabular-nums">
            {totalCount > 99 ? "99+" : totalCount}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
