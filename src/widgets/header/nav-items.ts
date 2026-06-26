import { defaultSiteContacts } from "@/shared/lib/site-contacts.shared";

export type NavItem = {
  href: string;
  labelKey: string;
};

export type NavDropdownLink = {
  href: string;
  labelKey: string;
};

export type NavDropdownSection = {
  titleKey: string;
  titleHref: string;
  links: NavDropdownLink[];
};

export type NavDropdownId = "company" | "production" | "products" | "services";

export const companyNavSections: NavDropdownSection[] = [
  {
    titleKey: "nav.companySections.about.title",
    titleHref: "/about",
    links: [
      { href: "/history", labelKey: "nav.companySections.history" },
      { href: "/certificates", labelKey: "nav.companySections.certificates" },
      { href: "/partners", labelKey: "nav.companySections.partners" },
      { href: "/vacancies", labelKey: "nav.companySections.vacancies" },
    ],
  },
  {
    titleKey: "nav.companySections.procurement.title",
    titleHref: "/procurement",
    links: [
      {
        href: "/safety-hotline",
        labelKey: "nav.companySections.safetyHotline",
      },
      {
        href: "/education",
        labelKey: "nav.companySections.education",
      },
      {
        href: "/labor-protection",
        labelKey: "nav.companySections.laborProtection",
      },
    ],
  },
];

export const productionNavLinks: NavDropdownLink[] = [
  {
    href: "/production/oilfield-equipment",
    labelKey: "nav.productionLinks.oilfield",
  },
  {
    href: "/production/metal-structures",
    labelKey: "nav.productionLinks.metal",
  },
  {
    href: "/production/building-structures",
    labelKey: "nav.productionLinks.building",
  },
];

export const servicesNavOverview = {
  titleKey: "nav.services.label",
  href: "/services",
};

export const servicesNavLinks: NavDropdownLink[] = [
  {
    href: "/services/pump-rods-repair",
    labelKey: "nav.servicesLinks.pumpRodsRepair",
  },
  {
    href: "/services/laser-cutting",
    labelKey: "nav.servicesLinks.laserCutting",
  },
  {
    href: "/services/calibrated-round",
    labelKey: "nav.servicesLinks.calibratedRound",
  },
  {
    href: "/services/laboratory-testing",
    labelKey: "nav.servicesLinks.laboratoryTesting",
  },
  {
    href: "/services/design-documentation",
    labelKey: "nav.servicesLinks.designDocumentation",
  },
  { href: "/services/delivery", labelKey: "nav.servicesLinks.delivery" },
];

export const navDropdowns: Record<
  NavDropdownId,
  { labelKey: string; ariaLabelKey: string }
> = {
  company: {
    labelKey: "nav.company.label",
    ariaLabelKey: "nav.company.ariaLabel",
  },
  products: {
    labelKey: "nav.products.label",
    ariaLabelKey: "nav.products.ariaLabel",
  },
  production: {
    labelKey: "nav.production.label",
    ariaLabelKey: "nav.production.ariaLabel",
  },
  services: {
    labelKey: "nav.services.label",
    ariaLabelKey: "nav.services.ariaLabel",
  },
};

export const navItems: NavItem[] = [
  { href: "/news", labelKey: "nav.news" },
  { href: "/contacts", labelKey: "nav.contacts" },
];

export const headerPhone = defaultSiteContacts.headerPhone;
export const headerEmail = defaultSiteContacts.headerEmail;

export function resolveNavLabel(
  t: (key: string) => string,
  labelKey: string,
): string {
  return t(labelKey);
}
