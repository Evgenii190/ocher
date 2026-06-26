"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import type { CatalogCategory } from "@/app/[locale]/catalog/_ui/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { gapContent } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textBody,
  textBodyLg,
} from "@/shared/ui/typography";
import { CatalogNavPanel } from "./catalog-nav-panel";
import {
  type NavDropdownPanelTone,
  navDropdownOnDarkSurface,
} from "./nav-dropdown-styles";
import {
  companyNavSections,
  type NavDropdownId,
  type NavDropdownLink,
  type NavDropdownSection,
  productionNavLinks,
  resolveNavLabel,
  servicesNavLinks,
  servicesNavOverview,
} from "./nav-items";

type NavMegaMenuPanelProps = {
  dropdownId: NavDropdownId;
  catalogCategories?: CatalogCategory[];
  variant?: "desktop" | "mobile";
  tone?: NavDropdownPanelTone;
  className?: string;
  renderLink?: (link: ReactNode, key: string) => ReactNode;
};

function defaultRenderLink(link: ReactNode) {
  return link;
}

const dropdownTitleKeys: Partial<Record<NavDropdownId, string>> = {
  company: "nav.megaMenu.company",
  production: "nav.megaMenu.production",
  services: "nav.megaMenu.services",
};

const linkListDropdowns: Partial<Record<NavDropdownId, NavDropdownLink[]>> = {
  production: productionNavLinks,
  services: servicesNavLinks,
};

const dropdownOverviews: Partial<
  Record<NavDropdownId, { titleKey: string; href: string }>
> = {
  services: servicesNavOverview,
};

export function NavMegaMenuPanel({
  dropdownId,
  catalogCategories = [],
  variant = "desktop",
  tone = "hero",
  className,
  renderLink = defaultRenderLink,
}: NavMegaMenuPanelProps) {
  const t = useTranslations();
  const isDesktop = variant === "desktop";
  const onDark = navDropdownOnDarkSurface(isDesktop, tone);

  if (dropdownId === "products") {
    return (
      <CatalogNavPanel
        categories={catalogCategories}
        variant={variant}
        tone={tone}
        className={className}
        renderLink={renderLink}
      />
    );
  }

  const titleKey = dropdownTitleKeys[dropdownId];
  const title = titleKey ? t(titleKey) : "";
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

  if (dropdownId in linkListDropdowns) {
    const links = linkListDropdowns[dropdownId] ?? [];
    const overview = dropdownOverviews[dropdownId];

    return (
      <div
        className={cn(
          "flex flex-col",
          !isDesktop && "gap-6 px-2 pb-2",
          className,
        )}
      >
        {overview ? (
          <DropdownOverviewTitle
            overview={overview}
            titleClassName={titleClassName}
            renderLink={renderLink}
            t={t}
          />
        ) : (
          <p className={titleClassName}>{title}</p>
        )}
        <div aria-hidden className={dividerClassName} />
        <LinkList
          links={links}
          onDark={onDark}
          isDesktop={isDesktop}
          renderLink={renderLink}
          t={t}
        />
      </div>
    );
  }

  if (!isDesktop) {
    return (
      <div className={cn("flex w-full flex-col gap-6 px-2 pb-2", className)}>
        <p className={titleClassName}>{title}</p>
        <div aria-hidden className={dividerClassName} />
        <div className="flex flex-col gap-8">
          {companyNavSections.map((section) => (
            <SectionColumn
              key={section.titleKey}
              section={section}
              onDark={false}
              renderLink={renderLink}
              t={t}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <p className={titleClassName}>{title}</p>
      <div aria-hidden className={dividerClassName} />
      <div
        className={cn(
          "grid grid-cols-[minmax(0,20%)_minmax(0,1fr)] items-start",
          gapContent,
        )}
      >
        {companyNavSections.map((section) => (
          <SectionColumn
            key={section.titleKey}
            section={section}
            onDark={onDark}
            renderLink={renderLink}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}

function DropdownOverviewTitle({
  overview,
  titleClassName,
  renderLink,
  t,
}: {
  overview: { titleKey: string; href: string };
  titleClassName: string;
  renderLink: (link: ReactNode, key: string) => ReactNode;
  t: (key: string) => string;
}) {
  return renderLink(
    <Link
      href={overview.href}
      className={cn(
        titleClassName,
        "group/overview inline-flex w-fit items-center gap-2 transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:text-primary focus-visible:underline focus-visible:underline-offset-4",
      )}
    >
      {resolveNavLabel(t, overview.titleKey)}
      <RiArrowRightSLine
        aria-hidden
        size={20}
        className="shrink-0 text-primary transition-transform duration-200 ease-out group-hover/overview:translate-x-0.5 group-focus-visible/overview:translate-x-0.5"
      />
    </Link>,
    `overview-${overview.href}`,
  );
}

function LinkList({
  links,
  onDark,
  isDesktop,
  renderLink,
  t,
  className,
}: {
  links: NavDropdownLink[];
  onDark: boolean;
  isDesktop: boolean;
  renderLink: (link: ReactNode, key: string) => ReactNode;
  t: (key: string) => string;
  className?: string;
}) {
  const linkClassName = cn(
    headingAppearance,
    textBody,
    "inline-block font-medium uppercase transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:text-primary focus-visible:underline focus-visible:underline-offset-4",
    isDesktop && "whitespace-nowrap",
    onDark ? "text-white" : "text-foreground",
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {links.map((link) =>
        renderLink(
          <Link key={link.href} href={link.href} className={linkClassName}>
            {resolveNavLabel(t, link.labelKey)}
          </Link>,
          link.href,
        ),
      )}
    </div>
  );
}

function SectionColumn({
  section,
  onDark,
  renderLink,
  t,
}: {
  section: NavDropdownSection;
  onDark: boolean;
  renderLink: (link: ReactNode, key: string) => ReactNode;
  t: (key: string) => string;
}) {
  const linkClassName = cn(
    headingAppearance,
    textBody,
    "inline-block font-medium uppercase transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:text-primary focus-visible:underline focus-visible:underline-offset-4",
    onDark ? "text-white" : "text-foreground",
  );

  return (
    <div className="flex flex-col gap-4">
      {renderLink(
        <Link href={section.titleHref} className={linkClassName}>
          {resolveNavLabel(t, section.titleKey)}
        </Link>,
        `title-${section.titleHref}`,
      )}

      {section.links.map((link) =>
        renderLink(
          <Link key={link.href} href={link.href} className={linkClassName}>
            {resolveNavLabel(t, link.labelKey)}
          </Link>,
          link.href,
        ),
      )}
    </div>
  );
}
