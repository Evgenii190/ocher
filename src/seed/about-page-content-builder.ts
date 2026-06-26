import { randomUUID } from "node:crypto";
import { getAboutBottomCopy } from "./i18n/about";
import type { SeedLocale } from "./i18n/catalog";
import { buildVacancyContent } from "./vacancy-content-builder";

type LexicalChild = Record<string, unknown>;

function textNode(
  text: string,
  options?: { bold?: boolean; color?: string },
): LexicalChild {
  return {
    type: "text",
    detail: 0,
    format: options?.bold ? 1 : 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
    ...(options?.color ? { $: { color: options.color } } : {}),
  };
}

function paragraph(text: string): LexicalChild {
  return {
    type: "paragraph",
    children: [textNode(text)],
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    version: 1,
  };
}

function richParagraph(children: LexicalChild[]): LexicalChild {
  return {
    type: "paragraph",
    children,
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    version: 1,
  };
}

function heading(text: string, tag: "h2" | "h3" = "h2"): LexicalChild {
  return {
    type: "heading",
    tag,
    children: [textNode(text)],
    direction: "ltr",
    format: "",
    indent: 0,
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

function videoBlock(mediaId: number | string, caption?: string): LexicalChild {
  const id = randomUUID();
  return {
    type: "block",
    format: "",
    version: 2,
    fields: {
      id,
      blockName: "",
      blockType: "richTextVideo",
      video: mediaId,
      size: "full",
      aspect: "video",
      caption: caption ?? "",
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

export function buildAboutBottomContent(
  videoId?: number | string,
  locale?: SeedLocale,
) {
  const copy = getAboutBottomCopy(locale);

  const nodes: LexicalChild[] = [
    heading(copy.h1),
    richParagraph(
      copy.introSegments.map((segment) =>
        textNode(segment.text, { bold: segment.bold }),
      ),
    ),
    ...(copy.paragraph1 ? [paragraph(copy.paragraph1)] : []),
    ...(videoId ? [videoBlock(videoId, copy.videoCaption)] : []),
    heading(copy.productsHeading),
    paragraph(copy.productsIntro),
    twoColumnsBlock({
      leftTitle: copy.productsLeftTitle,
      leftItems: copy.productsLeftItems,
      rightTitle: copy.productsRightTitle,
      rightItems: copy.productsRightItems,
    }),
    paragraph(copy.paragraph2),
    heading(copy.metalHeading),
    paragraph(copy.metalParagraph1),
    paragraph(copy.metalParagraph2),
    heading(copy.servicesHeading),
    paragraph(copy.servicesIntro),
    twoColumnsBlock({
      leftTitle: copy.servicesLeftTitle,
      leftItems: copy.servicesLeftItems,
      rightTitle: copy.servicesRightTitle,
      rightItems: copy.servicesRightItems,
    }),
    paragraph(copy.servicesParagraph),
    calloutBlock({
      variant: "primary",
      title: copy.calloutTitle,
      body: copy.calloutBody,
    }),
  ];

  return buildVacancyContent(nodes);
}
