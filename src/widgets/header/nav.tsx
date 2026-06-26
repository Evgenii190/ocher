import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { textBody } from "@/shared/ui/typography";
import { NavDropdownTrigger } from "./nav-dropdown-trigger";
import { navItems, resolveNavLabel } from "./nav-items";

export default async function HeaderNav() {
  const t = await getTranslations();

  return (
    <nav
      aria-label={t("common.aria.mainNav")}
      className="hidden items-center gap-12.5 xl:flex"
    >
      <NavDropdownTrigger dropdownId="company" />
      <NavDropdownTrigger dropdownId="products" />
      <NavDropdownTrigger dropdownId="production" />
      <NavDropdownTrigger dropdownId="services" />
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(textBody, "transition-colors hover:text-primary")}
        >
          {resolveNavLabel(t, item.labelKey)}
        </Link>
      ))}
    </nav>
  );
}
