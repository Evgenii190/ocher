import { randomUUID } from "node:crypto";
import {
  buildLexicalRoot,
  heading,
  imageSliderBlock,
  paragraph,
} from "./workshop-content.shared";
import type {
  ServiceContentBlock,
  ServiceSeedDefinition,
  ServiceSlug,
} from "@/shared/lib/services.shared";
import type { SeedLocale } from "./i18n/catalog";
import { serviceTranslations } from "./i18n/services";

type LexicalChild = Record<string, unknown>;

function listItem(text: string): LexicalChild {
  return {
    type: "listitem",
    children: [paragraph(text)],
    direction: "ltr",
    format: "",
    indent: 0,
    value: 1,
    version: 1,
  };
}

function bulletList(items: string[]): LexicalChild {
  return {
    type: "list",
    listType: "bullet",
    tag: "ul",
    children: items.map((item) => listItem(item)),
    direction: "ltr",
    format: "",
    indent: 0,
    start: 1,
    version: 1,
  };
}

function twoColumnsBlock(options: {
  leftTitle?: string;
  leftItems: string[];
  rightTitle?: string;
  rightItems: string[];
}): LexicalChild {
  const id = randomUUID();

  return {
    type: "block",
    format: "",
    version: 2,
    fields: {
      id,
      blockName: "",
      blockType: "vacancyTwoColumns",
      leftTitle: options.leftTitle ?? "",
      leftItems: options.leftItems.map((text) => ({ text })),
      rightTitle: options.rightTitle ?? "",
      rightItems: options.rightItems.map((text) => ({ text })),
    },
  };
}

function calloutBlock(options: {
  variant: "primary" | "neutral" | "muted" | "blue" | "green";
  title?: string;
  body: string;
}): LexicalChild {
  const id = randomUUID();

  return {
    type: "block",
    format: "",
    version: 2,
    fields: {
      id,
      blockName: "",
      blockType: "richTextCallout",
      variant: options.variant,
      title: options.title ?? "",
      body: options.body,
    },
  };
}

type ServicePageContentMedia = {
  primarySlider?: { id: number | string; alt: string }[];
  secondarySlider?: { id: number | string; alt: string }[];
};

function buildSliderNode(
  slides: { id: number | string; alt: string }[] | undefined,
): LexicalChild | null {
  if (!slides || slides.length === 0) {
    return null;
  }

  return imageSliderBlock(
    slides.map((slide) => ({
      mediaId: slide.id,
      alt: slide.alt,
    })),
    "4",
  );
}

function buildContentBlockNode(
  block: ServiceContentBlock,
  media: ServicePageContentMedia,
): LexicalChild | null {
  switch (block.type) {
    case "heading":
      return heading(block.text, block.tag ?? "h2");
    case "paragraph":
      return paragraph(block.text);
    case "bulletList":
      return bulletList(block.items);
    case "twoColumns":
      return twoColumnsBlock(block.columns);
    case "callout":
      return calloutBlock(block.callout);
    case "slider":
      return block.slidesKey === "primary"
        ? buildSliderNode(media.primarySlider)
        : buildSliderNode(media.secondarySlider);
    default:
      return null;
  }
}

export function buildServicePageContent(
  service: Pick<ServiceSeedDefinition, "contentBlocks" | "slug">,
  media: ServicePageContentMedia,
  locale?: SeedLocale,
) {
  const contentBlocks =
    locale && service.slug
      ? serviceTranslations[locale][service.slug as ServiceSlug]?.contentBlocks
      : service.contentBlocks;

  const nodes: LexicalChild[] = [];

  for (const block of contentBlocks ?? service.contentBlocks) {
    const node = buildContentBlockNode(block, media);
    if (node) {
      nodes.push(node);
    }
  }

  return buildLexicalRoot(nodes);
}
