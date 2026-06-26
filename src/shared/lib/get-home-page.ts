import "server-only";

import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import type { SerializedEditorState } from "lexical";
import { getPayload } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import { HOME_PAGE_TAG } from "./home-page.shared";

async function fetchHomePageAboutContent(
  locale: string,
): Promise<SerializedEditorState | null> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({
      slug: "home-page",
      depth: 2,
      overrideAccess: false,
      ...payloadLocaleOptions(locale),
    });

    return (
      (data.aboutContent as SerializedEditorState | null | undefined) ?? null
    );
  } catch (error) {
    console.error("[home-page] Не удалось загрузить контент:", error);
    return null;
  }
}

function getCachedHomePageAboutContent(locale: string) {
  return unstable_cache(
    () => fetchHomePageAboutContent(locale),
    ["home-page-about-content", locale],
    { tags: [HOME_PAGE_TAG] },
  );
}

export const getHomePageAboutContent = cache(async (locale: string) => {
  return getCachedHomePageAboutContent(locale)();
});

export { HOME_PAGE_TAG } from "./home-page.shared";
