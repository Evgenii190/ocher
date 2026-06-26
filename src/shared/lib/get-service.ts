import "server-only";

import config from "@payload-config";
import type { SerializedEditorState } from "lexical";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getPayload } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import {
  SERVICES_PAGE_TAG,
  type ServiceDetailView,
  type ServiceSlug,
} from "./services.shared";
import { mapServiceBase, type RawService } from "./services-map.shared";

async function fetchServiceBySlug(
  slug: ServiceSlug,
  locale: string,
): Promise<ServiceDetailView | null> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
      overrideAccess: false,
      ...payloadLocaleOptions(locale),
    });

    const doc = result.docs[0] as RawService | undefined;
    if (!doc) {
      return null;
    }

    const base = mapServiceBase(doc);
    if (!base) {
      return null;
    }

    const heroTitle = doc.heroTitle?.trim() || base.title;
    const heroDescription = doc.heroDescription?.trim() || base.description;
    const heroMedia = doc.heroImage;

    if (!heroMedia || typeof heroMedia !== "object") {
      return null;
    }

    const heroImageUrl = heroMedia.url?.trim();
    if (!heroImageUrl) {
      return null;
    }

    return {
      ...base,
      heroTitle,
      heroDescription,
      heroImageUrl,
      heroImageAlt: heroMedia.alt?.trim() || heroTitle,
      pageContent:
        (doc.pageContent as SerializedEditorState | null | undefined) ?? null,
    };
  } catch (error) {
    console.error(`[services] Не удалось загрузить услугу «${slug}»:`, error);
    return null;
  }
}

function getCachedServiceBySlug(slug: ServiceSlug, locale: string) {
  return unstable_cache(
    () => fetchServiceBySlug(slug, locale),
    [`service-${slug}`, locale],
    { tags: [SERVICES_PAGE_TAG] },
  );
}

export const getServiceBySlug = cache(
  async (slug: ServiceSlug, locale: string) => {
    return getCachedServiceBySlug(slug, locale)();
  },
);
