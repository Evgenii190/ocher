"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import {
  RiArrowRightSLine,
  RiCloseLine,
  RiMenuLine,
  RiPhoneFill,
  RiSearchFill,
} from "react-icons/ri";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/shared/cart/cart-context";
import type { SiteContactLink } from "@/shared/lib/site-contacts.shared";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import {
  headingAppearance,
  textBody,
  textMicro,
  textSmall,
  textSubtitle,
} from "@/shared/ui/typography";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNavDropdownSection } from "./mobile-nav-dropdown-section";
import { navItems, resolveNavLabel } from "./nav-items";

type MobileMenuProps = {
  onOpenSearch: () => void;
  phone: SiteContactLink;
  email: SiteContactLink;
};

function Divider({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("h-px w-full bg-border", className)} />
  );
}

export default function MobileMenu({
  onOpenSearch,
  phone,
  email,
}: MobileMenuProps) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const { totalCount } = useCart();

  const handleOpenSearch = () => {
    setOpen(false);
    window.setTimeout(() => onOpenSearch(), 200);
  };

  return (
    <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          aria-label={t("common.aria.openMenu")}
          className="xl:hidden"
        >
          <RiMenuLine size={20} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-6 pb-10">
        <DrawerTitle className="sr-only">
          {t("nav.mobileMenu.title")}
        </DrawerTitle>

        <DrawerClose asChild>
          <Button
            size="icon"
            variant="ghost"
            aria-label={t("common.aria.closeMenu")}
            className="absolute top-4 right-4 text-foreground"
          >
            <RiCloseLine size={22} />
          </Button>
        </DrawerClose>

        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 pt-6">
          <DrawerClose asChild>
            <Link href="/" className="inline-flex">
              <Image
                src="/logo.svg"
                width={176}
                height={44}
                alt={t("common.logoAlt")}
              />
            </Link>
          </DrawerClose>

          <Button
            type="button"
            variant="outline"
            onClick={handleOpenSearch}
            className={cn(
              "h-auto w-full cursor-pointer justify-start gap-3 rounded-lg border-[#BFBFBF] bg-muted/5 px-4 py-3 shadow-none md:hidden",
              "transition-all hover:border-primary/40 hover:bg-muted/10 active:scale-[0.99]",
            )}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <RiSearchFill size={18} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
              <span
                className={cn(headingAppearance, textMicro, "text-foreground")}
              >
                {t("nav.mobileMenu.searchTitle")}
              </span>
              <span
                className={cn(textSmall, "font-normal text-muted-foreground")}
              >
                {t("nav.mobileMenu.searchSubtitle")}
              </span>
            </span>
            <RiArrowRightSLine
              size={20}
              className="shrink-0 text-muted-foreground"
            />
          </Button>

          <DrawerClose asChild>
            <Link
              href="/cart"
              aria-label={
                totalCount > 0
                  ? t("nav.mobileMenu.cartAria", { count: totalCount })
                  : t("nav.mobileMenu.cartAriaEmpty")
              }
              className={cn(
                "flex h-auto w-full items-center justify-start gap-3 rounded-lg border border-[#BFBFBF] bg-muted/5 px-4 py-3 shadow-none",
                "transition-all hover:border-primary/40 hover:bg-muted/10 active:scale-[0.99]",
              )}
            >
              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <IoCartOutline size={18} />
                {totalCount > 0 ? (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#273A5B] px-0.5 text-[10px] font-bold text-white tabular-nums">
                    {totalCount > 99 ? "99+" : totalCount}
                  </span>
                ) : null}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
                <span
                  className={cn(
                    headingAppearance,
                    textMicro,
                    "text-foreground",
                  )}
                >
                  {t("nav.mobileMenu.cart")}
                </span>
                <span
                  className={cn(textSmall, "font-normal text-muted-foreground")}
                >
                  {totalCount > 0
                    ? t("nav.mobileMenu.cartItems", { count: totalCount })
                    : t("nav.mobileMenu.cartEmpty")}
                </span>
              </span>
              <RiArrowRightSLine
                size={20}
                className="shrink-0 text-muted-foreground"
              />
            </Link>
          </DrawerClose>

          <Divider />

          <nav
            aria-label={t("common.aria.mainNav")}
            className="flex w-full flex-col items-center"
          >
            <MobileNavDropdownSection dropdownId="company" />
            <MobileNavDropdownSection dropdownId="products" />
            <MobileNavDropdownSection dropdownId="production" />
            <MobileNavDropdownSection dropdownId="services" />

            {navItems.map((item) => (
              <DrawerClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    headingAppearance,
                    textBody,
                    "w-full rounded-lg py-3 text-center text-foreground transition-colors hover:bg-muted/10 hover:text-primary",
                  )}
                >
                  {resolveNavLabel(t, item.labelKey)}
                </Link>
              </DrawerClose>
            ))}
          </nav>

          <Divider />

          <LocaleSwitcher variant="block" className="w-full" />

          <Divider />

          <div className="flex flex-col items-center gap-3">
            <a
              href={phone.href}
              className={cn(
                headingAppearance,
                textSubtitle,
                "flex items-center gap-2 text-foreground transition-colors hover:text-primary hover:underline",
              )}
            >
              <RiPhoneFill size={20} className="text-primary" />
              {phone.label}
            </a>
            <a
              href={email.href}
              className={cn(
                textBody,
                "flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary",
              )}
            >
              <MdEmail size={18} />
              {email.label}
            </a>
            <span className={cn(textMicro, "text-muted-foreground")}>
              {t("common.workingHoursShort")}
            </span>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
