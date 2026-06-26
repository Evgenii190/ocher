import "server-only";

import config from "@payload-config";
import type { SerializedEditorState } from "lexical";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import { cache } from "react";
import { ABOUT_PAGE_TAG } from "@/shared/lib/about-page.shared";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";

export type AboutPageView = {
  bottomContent: SerializedEditorState | null;
};

async function fetchAboutPage(locale: string): Promise<AboutPageView> {
  try {
    const payload = await getPayload({ config });
    const pageData = await payload.findGlobal({
      slug: "about-page",
      depth: 0,
      overrideAccess: false,
      ...payloadLocaleOptions(locale),
    });

    return {
      bottomContent:
        (pageData.bottomContent as SerializedEditorState | null | undefined) ??
        null,
    };
  } catch (error) {
    console.error("[about-page] Не удалось загрузить данные:", error);
    return {
      bottomContent: null,
    };
  }
}

function getCachedAboutPage(locale: string) {
  return unstable_cache(() => fetchAboutPage(locale), ["about-page", locale], {
    tags: [ABOUT_PAGE_TAG],
  });
}

export const getAboutPage = cache(async (locale: string) => {
  return getCachedAboutPage(locale)();
});
