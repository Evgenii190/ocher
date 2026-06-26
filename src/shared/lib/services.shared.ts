import type { SerializedEditorState } from "lexical";

export const SERVICES_PAGE_TAG = "services-page";

export const SERVICE_SLUG_LIST = [
  "pump-rods-repair",
  "laser-cutting",
  "calibrated-round",
  "laboratory-testing",
  "design-documentation",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUG_LIST)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return SERVICE_SLUG_LIST.includes(value as ServiceSlug);
}

export function serviceHref(slug: string): `/services/${string}` {
  return `/services/${slug}`;
}

export function getServiceContentSectionId(slug: string): string {
  return `service-content-${slug}`;
}

export type ServiceSpec = {
  label: string;
  value: string;
};

export type ServiceView = {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  specs: ServiceSpec[];
  advantages: string[];
  order: number;
};

export type ServiceDetailView = ServiceView & {
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  heroImageAlt: string;
  pageContent: SerializedEditorState | null;
};

export type ServicesPageView = {
  pageTitle: string;
  cardsSectionTitle: string;
  services: ServiceView[];
  bottomContent: SerializedEditorState | null;
};

export type ServiceSeedSlide = {
  file: string;
  alt: string;
};

export type ServiceContentCallout = {
  variant: "primary" | "neutral" | "muted" | "blue" | "green";
  title?: string;
  body: string;
};

export type ServiceContentTwoColumns = {
  leftTitle?: string;
  leftItems: string[];
  rightTitle?: string;
  rightItems: string[];
};

export type ServiceContentBlock =
  | { type: "heading"; text: string; tag?: "h2" | "h3" }
  | { type: "paragraph"; text: string }
  | { type: "bulletList"; items: string[] }
  | { type: "twoColumns"; columns: ServiceContentTwoColumns }
  | { type: "callout"; callout: ServiceContentCallout }
  | { type: "slider"; slidesKey: "primary" | "secondary" };

export type ServiceSeedDefinition = {
  slug: ServiceSlug;
  title: string;
  description: string;
  cardImageFile: string;
  heroTitle: string;
  heroDescription: string;
  heroImageFile: string;
  specs?: ServiceSpec[];
  advantages?: string[];
  order: number;
  contentBlocks: ServiceContentBlock[];
  sliderSlides: ServiceSeedSlide[];
  secondarySliderSlides: ServiceSeedSlide[];
};
