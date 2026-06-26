"use client";

import { useTranslations } from "next-intl";
import { type ReactNode, useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import {
  catalogCategoryRouteHref,
  catalogSubcategoryHref,
} from "@/app/[locale]/catalog/_lib/search-params";
import type { CatalogCategory } from "@/app/[locale]/catalog/_ui/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textBody,
  textBodyLg,
} from "@/shared/ui/typography";
import {
  type NavDropdownPanelTone,
  navDropdownOnDarkSurface,
} from "./nav-dropdown-styles";

type CatalogNavPanelProps = {
  categories: CatalogCategory[];
  variant?: "desktop" | "mobile";
  tone?: NavDropdownPanelTone;
  className?: string;
  renderLink?: (link: ReactNode, key: string) => ReactNode;
};

function defaultRenderLink(link: ReactNode) {
  return link;
}

export function CatalogNavPanel({
  categories,
  variant = "desktop",
  tone = "hero",
  className,
  renderLink = defaultRenderLink,
}: CatalogNavPanelProps) {
  const t = useTranslations();
  const isDesktop = variant === "desktop";
  const onDark = navDropdownOnDarkSurface(isDesktop, tone);
  const [activeCategoryId, setActiveCategoryId] = useState(
    categories[0]?.id ?? "",
  );

  useEffect(() => {
    setActiveCategoryId(categories[0]?.id ?? "");
  }, [categories]);

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ??
    categories[0];

  const titleClassName = cn(
    headingAppearance,
    textBodyLg,
    onDark ? "text-white" : "text-foreground",
  );
  const dividerClassName = isDesktop
    ? onDark
      ? "mt-4 mb-8 h-px w-full bg-[#D4E2E7]/48"
      : "mt-4 mb-8 h-px w-full bg-border"
    : "h-px w-full bg-border";
  const linkClassName = cn(
    headingAppearance,
    textBody,
    "inline-block text-left font-medium uppercase transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:text-primary focus-visible:underline focus-visible:underline-offset-4",
    isDesktop && "whitespace-nowrap",
    onDark ? "text-white" : "text-foreground",
  );

  if (categories.length === 0) {
    return (
      <div className={cn("flex flex-col", className)}>
        <p className={titleClassName}>
          {renderLink(
            <Link href="/products" className={titleClassName}>
              {t("nav.catalogParts")}
            </Link>,
            "products-overview",
          )}
        </p>
        <div aria-hidden className={dividerClassName} />
        {renderLink(
          <Link href="/catalog" className={linkClassName}>
            {t("nav.goToCatalog")}
          </Link>,
          "catalog-empty",
        )}
      </div>
    );
  }

  if (!isDesktop) {
    return (
      <div className={cn("flex w-full flex-col gap-6 px-2 pb-2", className)}>
        <p className={titleClassName}>
          {renderLink(
            <Link href="/products" className={titleClassName}>
              {t("nav.catalogParts")}
            </Link>,
            "products-overview",
          )}
        </p>
        <div aria-hidden className={dividerClassName} />
        <div className="flex w-full flex-col gap-8">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-4">
              {renderLink(
                <Link
                  href={catalogCategoryRouteHref(category.slug)}
                  className={linkClassName}
                >
                  {category.label}
                </Link>,
                `category-${category.id}`,
              )}
              <div className="flex flex-col gap-4 pl-2">
                {category.subcategories.map((subcategory) =>
                  renderLink(
                    <Link
                      key={subcategory.id}
                      href={catalogSubcategoryHref(subcategory.slug)}
                      className={linkClassName}
                    >
                      {subcategory.label}
                    </Link>,
                    subcategory.id,
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <p className={titleClassName}>
        {renderLink(
          <Link href="/products" className={titleClassName}>
            {t("nav.catalogParts")}
          </Link>,
          "products-overview",
        )}
      </p>
      <div aria-hidden className={dividerClassName} />

      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-20">
        <ul className="grid grid-cols-[max-content_max-content] gap-x-8 gap-y-6">
          {categories.map((category) => {
            const isActive = category.id === activeCategory?.id;

            return (
              <li key={category.id} className="contents">
                {renderLink(
                  <Link
                    href={catalogCategoryRouteHref(category.slug)}
                    className={cn(
                      linkClassName,
                      "peer",
                      isActive && "text-primary underline underline-offset-4",
                    )}
                    onMouseEnter={() => setActiveCategoryId(category.id)}
                    onFocus={() => setActiveCategoryId(category.id)}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {category.label}
                  </Link>,
                  `category-${category.id}`,
                )}
                <RiArrowRightSLine
                  aria-hidden
                  size={20}
                  className={cn(
                    "shrink-0 self-center text-primary transition-opacity duration-200 ease-out",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 peer-hover:opacity-100 peer-focus-visible:opacity-100",
                  )}
                />
              </li>
            );
          })}
        </ul>

        <ul
          key={activeCategory?.id}
          className="flex min-h-full flex-col gap-6 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-left-2 motion-safe:duration-200 motion-reduce:animate-none"
        >
          {activeCategory?.subcategories.map((subcategory) => (
            <li key={subcategory.id}>
              {renderLink(
                <Link
                  href={catalogSubcategoryHref(subcategory.slug)}
                  className={linkClassName}
                >
                  {subcategory.label}
                </Link>,
                subcategory.id,
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
