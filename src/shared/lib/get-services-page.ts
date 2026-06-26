import "server-only";

import config from "@payload-config";
import type { SerializedEditorState } from "lexical";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getPayload } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import { SERVICES_PAGE_TAG, type ServicesPageView } from "./services.shared";
import { mapServiceBase, type RawService } from "./services-map.shared";

async function fetchServicesPage(locale: string): Promise<ServicesPageView> {
  try {
    const payload = await getPayload({ config });
    const localeOpts = payloadLocaleOptions(locale);

    const [pageData, servicesResult] = await Promise.all([
      payload.findGlobal({
        slug: "services-page",
        depth: 0,
        overrideAccess: false,
        ...localeOpts,
      }),
      payload.find({
        collection: "services",
        sort: "order",
        depth: 2,
        limit: 100,
        overrideAccess: false,
        ...localeOpts,
      }),
    ]);

    const services = servicesResult.docs
      .map((doc) => mapServiceBase(doc as RawService))
      .filter((service) => service !== null);

    return {
      pageTitle: pageData.pageTitle?.trim() || "",
      cardsSectionTitle: pageData.cardsSectionTitle?.trim() || "",
      services,
      bottomContent:
        (pageData.bottomContent as SerializedEditorState | null | undefined) ??
        null,
    };
  } catch (error) {
    console.error("[services] Не удалось загрузить данные:", error);
    return {
      pageTitle: "",
      cardsSectionTitle: "",
      services: [],
      bottomContent: null,
    };
  }
}

function getCachedServicesPage(locale: string) {
  return unstable_cache(
    () => fetchServicesPage(locale),
    ["services-page", locale],
    { tags: [SERVICES_PAGE_TAG] },
  );
}

export const getServicesPage = cache(async (locale: string) => {
  return getCachedServicesPage(locale)();
});
