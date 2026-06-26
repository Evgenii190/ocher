import { randomUUID } from "node:crypto";
import type {
  WorkshopGlobalSlug,
  WorkshopPageSlug,
} from "@/shared/lib/workshops.shared";
import type { SeedLocale } from "./i18n/catalog";
import { workshopTranslations } from "./i18n/workshops";

type LexicalChild = Record<string, unknown>;

const TEXT_BOLD = 1;

export function textNode(text: string, format = 0): LexicalChild {
  return {
    type: "text",
    detail: 0,
    format,
    mode: "normal",
    style: "",
    text,
    version: 1,
  };
}

export function linebreak(): LexicalChild {
  return {
    type: "linebreak",
    version: 1,
  };
}

export function paragraph(text: string): LexicalChild {
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

export function heading(text: string, tag: "h2" | "h3" = "h2"): LexicalChild {
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

export function workshopTitleHeading(
  titleLine1: string,
  titleLine2: string,
): LexicalChild {
  return {
    type: "heading",
    tag: "h2",
    children: [
      textNode(titleLine1),
      linebreak(),
      textNode(titleLine2, TEXT_BOLD),
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

export function imageSliderBlock(
  slides: { mediaId: number | string; alt: string }[],
  slidesPerView: "1" | "2" | "3" | "4" = "3",
): LexicalChild {
  const id = randomUUID();

  return {
    type: "block",
    format: "",
    version: 2,
    fields: {
      id,
      blockName: "",
      blockType: "richTextImageSlider",
      slidesPerView,
      slides: slides.map((slide) => ({
        image: slide.mediaId,
        alt: slide.alt,
      })),
    },
  };
}

export function buildLexicalRoot(children: LexicalChild[]) {
  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

export function buildWorkshopAboutContent(
  options: {
    titleLine1: string;
    titleLine2: string;
    galleryMedia: { id: number | string; alt: string }[];
    sectionHeading: string;
    paragraphs: string[];
  },
  locale?: SeedLocale,
  globalSlug?: WorkshopGlobalSlug,
) {
  let content = options;

  if (locale && globalSlug) {
    const translation = workshopTranslations[locale][globalSlug];
    if (translation) {
      content = {
        titleLine1: translation.about.titleLine1,
        titleLine2: translation.about.titleLine2,
        sectionHeading: translation.about.sectionHeading,
        paragraphs: translation.about.paragraphs,
        galleryMedia: options.galleryMedia.map((item, index) => ({
          ...item,
          alt: translation.about.galleryAlts[index] ?? item.alt,
        })),
      };
    }
  }

  return buildLexicalRoot([
    workshopTitleHeading(content.titleLine1, content.titleLine2),
    imageSliderBlock(
      content.galleryMedia.map((item) => ({
        mediaId: item.id,
        alt: item.alt,
      })),
      "3",
    ),
    heading(content.sectionHeading, "h3"),
    ...content.paragraphs.map((text) => paragraph(text)),
  ]);
}

export type WorkshopSeedEquipmentItem = {
  title: string;
  titleFull?: string;
  description: string;
  descriptionLong: string;
  features: string[];
  imageFile: string;
  specs: { label: string; value: string }[];
};

export type WorkshopGallerySlide = {
  file: string;
  alt: string;
};

export type WorkshopSeedDefinition = {
  pageSlug: WorkshopPageSlug;
  globalSlug: WorkshopGlobalSlug;
  heroDescription: string;
  heroBackgroundFile: string;
  assetsDir: "oilfield" | "metalwork" | "construction";
  sectionOrder: { section: "about" | "stock" | "equipment" | "advantages" }[];
  about: {
    titleLine1: string;
    titleLine2: string;
    sectionHeading: string;
    paragraphs: string[];
    gallery: WorkshopGallerySlide[];
  };
  stock?: {
    title: string;
    items: {
      file: string;
      title: string;
      value: string;
    }[];
  };
  advantages: { title: string; description: string }[];
  equipment: WorkshopSeedEquipmentItem[];
};
