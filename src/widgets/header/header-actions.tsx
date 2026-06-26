"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { RiPhoneFill } from "react-icons/ri";
import { SearchDialog } from "@/shared/components/search-dialog";
import type { SiteContactLink } from "@/shared/lib/site-contacts.shared";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { headingAppearance, textBody } from "@/shared/ui/typography";
import { CartButton } from "./cart-button";
import { LocaleSwitcher } from "./locale-switcher";
import MobileMenu from "./mobile-menu";

type HeaderActionsProps = {
  phone: SiteContactLink;
  email: SiteContactLink;
};

export function HeaderActions({ phone, email }: HeaderActionsProps) {
  const t = useTranslations("common.aria");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SearchDialog
        triggerClassName="hidden md:inline-flex xl:hidden"
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
      <a
        href={phone.href}
        className={cn(
          textBody,
          headingAppearance,
          "hidden transition-colors hover:underline 2xl:inline-flex",
        )}
      >
        {phone.label}
      </a>
      <Button asChild size="icon" className="hidden xl:inline-flex">
        <a href={phone.href} aria-label={t("call")}>
          <RiPhoneFill size={20} />
        </a>
      </Button>
      <LocaleSwitcher className="hidden sm:inline-flex" />
      <CartButton className="hidden xl:inline-flex" />
      <MobileMenu
        onOpenSearch={() => setSearchOpen(true)}
        phone={phone}
        email={email}
      />
    </>
  );
}
