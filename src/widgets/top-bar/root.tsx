"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { HiMiniHome } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { Link } from "@/i18n/navigation";
import { SearchDialog } from "@/shared/components/search-dialog";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { headingAppearance, textBody, textMicro } from "@/shared/ui/typography";
import { headerEmail } from "@/widgets/header/nav-items";

export type TopBarBreadcrumb = {
  label: string;
  href?: string;
};

type TopBarVariant = "white" | "black";

type TopBarProps = {
  variant?: TopBarVariant;
  breadcrumbs?: TopBarBreadcrumb[];
  className?: string;
};

const variantStyles: Record<
  TopBarVariant,
  { crumb: string; crumbLink: string; email: string }
> = {
  white: {
    crumb: "font-medium text-white",
    crumbLink: "font-medium text-white transition-colors hover:text-white",
    email: "text-primary-foreground",
  },
  black: {
    crumb: "font-medium text-foreground",
    crumbLink:
      "font-medium text-foreground transition-colors hover:text-foreground",
    email: "text-foreground",
  },
};

export function TopBar({
  variant = "white",
  breadcrumbs,
  className,
}: TopBarProps) {
  const t = useTranslations();
  const styles = variantStyles[variant];
  const crumbs = breadcrumbs ?? [{ label: t("common.home") }];

  return (
    <div className={cn("pt-6 sm:pt-8", className)}>
      <div className="flex items-center justify-between gap-4">
        <nav
          aria-label={t("common.aria.breadcrumbs")}
          className="flex min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-hidden sm:gap-4"
        >
          <Button asChild size="icon" className="shrink-0">
            <Link href="/">
              <HiMiniHome size={20} />
            </Link>
          </Button>
          {crumbs.map((item, index) => (
            <Fragment key={`${item.label}-${index}`}>
              <span
                className={cn(styles.crumb, textMicro, "shrink-0")}
                aria-hidden
              >
                /
              </span>
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    styles.crumbLink,
                    textMicro,
                    "min-w-0 truncate",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(styles.crumb, textMicro, "min-w-0 truncate")}
                >
                  {item.label}
                </span>
              )}
            </Fragment>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-4">
          <a
            href={headerEmail.href}
            className={cn(
              headingAppearance,
              textBody,
              styles.email,
              "hidden sm:inline-flex",
            )}
          >
            {headerEmail.label}
          </a>
          <Button asChild size="icon">
            <a href={headerEmail.href} aria-label={t("common.aria.writeEmail")}>
              <MdEmail size={20} />
            </a>
          </Button>
          <SearchDialog triggerClassName="hidden xl:inline-flex" />
        </div>
      </div>
    </div>
  );
}
