import "server-only";

import config from "@payload-config";
import type { SerializedEditorState } from "lexical";
import type { WorkshopMetalStructure } from "@/payload-types";
import { unstable_cache } from "next/cache";
import { getTranslations } from "next-intl/server";
import { cache } from "react";
import { getPayload } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import {
  WORKSHOP_GLOBAL_BY_PAGE_SLUG,
  type WorkshopPageSlug,
} from "@/shared/lib/workshops.shared";
import type {
  WorkshopEquipmentView,
  WorkshopPageView,
  WorkshopStockSectionView,
} from "./workshop-view.shared";
import { workshopTag } from "./workshop.shared";
import { normalizeWorkshopSectionOrder } from "./workshop-sections.shared";

type MediaDoc = {
  url?: string | null;
  alt?: string | null;
};

function resolveMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== "object") {
    return null;
  }

  const url = (media as MediaDoc).url;
  return typeof url === "string" && url.length > 0 ? url : null;
}

function resolveMediaAlt(media: unknown, fallback: string): string {
  if (media && typeof media === "object") {
    const alt = (media as MediaDoc).alt;
    if (typeof alt === "string" && alt.trim().length > 0) {
      return alt;
    }
  }

  return fallback;
}

function parseStockSection(stock: unknown): WorkshopStockSectionView | null {
  if (!stock || typeof stock !== "object") {
    return null;
  }

  const group = stock as Record<string, unknown>;
  const title = typeof group.title === "string" ? group.title : "";

  const items = Array.isArray(group.items)
    ? group.items.flatMap((item) => {
        if (!item || typeof item !== "object") {
          return [];
        }

        const record = item as Record<string, unknown>;
        const imageUrl = resolveMediaUrl(record.image);
        const itemTitle = typeof record.title === "string" ? record.title : "";
        const value = typeof record.value === "string" ? record.value : "";

        if (!imageUrl || !itemTitle || !value) {
          return [];
        }

        return [
          {
            title: itemTitle,
            value,
            imageUrl,
            imageAlt: resolveMediaAlt(record.image, itemTitle),
          },
        ];
      })
    : [];

  if (!title && items.length === 0) {
    return null;
  }

  return {
    title,
    items,
  };
}

async function fetchWorkshopPage(
  pageSlug: WorkshopPageSlug,
  locale: string,
): Promise<WorkshopPageView | null> {
  const t = await getTranslations({ locale, namespace: "production" });
  const globalSlug = WORKSHOP_GLOBAL_BY_PAGE_SLUG[pageSlug];
  if (!globalSlug) {
    return null;
  }

  try {
    const payload = await getPayload({ config });
    const localeOpts = payloadLocaleOptions(locale);

    const workshop = (await payload.findGlobal({
      slug: globalSlug,
      depth: 2,
      overrideAccess: false,
      ...localeOpts,
    })) as WorkshopMetalStructure;

    const equipmentResult = await payload.find({
      collection: "workshop-equipment",
      where: {
        workshop: { equals: pageSlug },
      },
      sort: "order",
      depth: 2,
      limit: 100,
      overrideAccess: false,
      ...localeOpts,
    });

    const advantageBlocks = Array.isArray(workshop.advantageBlocks)
      ? workshop.advantageBlocks.flatMap((block) => {
          if (
            !block ||
            typeof block !== "object" ||
            typeof block.title !== "string" ||
            typeof block.description !== "string"
          ) {
            return [];
          }

          return [
            {
              title: block.title,
              description: block.description,
            },
          ];
        })
      : [];

    const equipment: WorkshopEquipmentView[] = equipmentResult.docs.flatMap(
      (item) => {
        const imageUrl = resolveMediaUrl(item.image);
        if (
          typeof item.title !== "string" ||
          typeof item.description !== "string" ||
          !imageUrl
        ) {
          return [];
        }

        const specs = Array.isArray(item.specs)
          ? item.specs.flatMap((spec) => {
              if (
                !spec ||
                typeof spec !== "object" ||
                typeof spec.label !== "string" ||
                typeof spec.value !== "string"
              ) {
                return [];
              }

              return [{ label: spec.label, value: spec.value }];
            })
          : [];

        const features = Array.isArray(item.features)
          ? item.features.flatMap((feature) => {
              if (
                !feature ||
                typeof feature !== "object" ||
                typeof feature.text !== "string" ||
                feature.text.trim().length === 0
              ) {
                return [];
              }

              return [feature.text];
            })
          : [];

        const titleFull =
          typeof item.titleFull === "string" && item.titleFull.trim().length > 0
            ? item.titleFull
            : item.title;

        const descriptionLong =
          typeof item.descriptionLong === "string" &&
          item.descriptionLong.trim().length > 0
            ? item.descriptionLong
            : item.description;

        return [
          {
            title: item.title,
            titleFull,
            description: item.description,
            descriptionLong,
            imageUrl,
            imageAlt: resolveMediaAlt(item.image, item.title),
            features,
            specs,
          },
        ];
      },
    );

    return {
      slug: pageSlug,
      title: t(`pageTitles.${pageSlug}.title`),
      shortTitle: t(`pageTitles.${pageSlug}.shortTitle`),
      heroDescription:
        typeof workshop.heroDescription === "string"
          ? workshop.heroDescription
          : "",
      heroBackgroundUrl: resolveMediaUrl(workshop.heroBackground),
      sectionOrder: normalizeWorkshopSectionOrder(workshop.sectionOrder),
      aboutContent:
        (workshop.aboutContent as SerializedEditorState | null | undefined) ??
        null,
      stockSection: parseStockSection(workshop.stockSection),
      advantageBlocks,
      equipment,
    };
  } catch (error) {
    console.error(`[workshop:${pageSlug}] Не удалось загрузить данные:`, error);
    return null;
  }
}

function getCachedWorkshopPage(pageSlug: WorkshopPageSlug, locale: string) {
  return unstable_cache(
    () => fetchWorkshopPage(pageSlug, locale),
    [`workshop-page-${pageSlug}-${locale}`],
    {
      tags: [workshopTag(pageSlug)],
    },
  )();
}

export const getWorkshopPage = cache(
  (pageSlug: WorkshopPageSlug, locale: string) =>
    getCachedWorkshopPage(pageSlug, locale),
);

export { workshopTag } from "./workshop.shared";
