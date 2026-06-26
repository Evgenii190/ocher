import "server-only";

import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getPayload } from "payload";
import {
  CERTIFICATES_TAG,
  type CertificateItem,
} from "./certificates.shared";
import { payloadLocaleOptions } from "./payload-locale";

type MediaObject = {
  id?: number | string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

function isMediaObject(value: unknown): value is MediaObject {
  return typeof value === "object" && value !== null && "url" in value;
}

type RawCertificateRow = {
  id?: number | string;
  slug?: string | null;
  title?: string | null;
  image?: unknown;
  order?: number | null;
};

async function fetchCertificates(locale: string): Promise<CertificateItem[]> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({
      slug: "certificates-page",
      depth: 2,
      overrideAccess: false,
      ...payloadLocaleOptions(locale),
    });

    const mapped = ((data.items ?? []) as RawCertificateRow[]).flatMap(
      (row, index) => {
        const image = isMediaObject(row.image) ? row.image : null;
        if (!image?.url) {
          return [];
        }

        return [
          {
            id: String(row.slug ?? row.id ?? image.id ?? index),
            title: row.title?.trim() || "Certificate",
            url: image.url,
            width: image.width ?? 404,
            height: image.height ?? 631,
            order: row.order ?? index,
          },
        ];
      },
    );

    return mapped
      .toSorted((a, b) => a.order - b.order)
      .map(({ order: _order, ...item }) => item);
  } catch (error) {
    console.error("[certificates] Не удалось загрузить сертификаты:", error);
    return [];
  }
}

function getCachedCertificates(locale: string) {
  return unstable_cache(
    () => fetchCertificates(locale),
    ["certificates-page", locale],
    { tags: [CERTIFICATES_TAG] },
  );
}

export const getCertificates = cache(async (locale: string) => {
  return getCachedCertificates(locale)();
});

export { CERTIFICATES_TAG } from "./certificates.shared";
export type { CertificateItem } from "./certificates.shared";
