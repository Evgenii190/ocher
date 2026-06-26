import "server-only";

import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getPayload } from "payload";
import { formatFileSize } from "./format-file-size";
import {
  LABOR_PROTECTION_TAG,
  type LaborProtectionDocument,
} from "./labor-protection.shared";
import { payloadLocaleOptions } from "./payload-locale";

type FileObject = {
  id?: number | string;
  url?: string | null;
  filename?: string | null;
  filesize?: number | null;
};

function isFileObject(value: unknown): value is FileObject {
  return typeof value === "object" && value !== null && "url" in value;
}

function getDocumentTitle(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot <= 0) {
    return filename;
  }

  return filename.slice(0, lastDot);
}

type RawDocumentRow = {
  id?: number | string;
  title?: string | null;
  file?: unknown;
  order?: number | null;
};

async function fetchLaborProtectionDocuments(
  locale: string,
): Promise<LaborProtectionDocument[]> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({
      slug: "labor-protection",
      depth: 2,
      overrideAccess: false,
      ...payloadLocaleOptions(locale),
    });

    const mapped = ((data.documents ?? []) as RawDocumentRow[]).flatMap(
      (row, index) => {
        const file = isFileObject(row.file) ? row.file : null;
        if (!file?.url) {
          return [];
        }

        const filename = file.filename ?? "document";
        const fileSize = file.filesize ?? null;
        const title = row.title?.trim() || getDocumentTitle(filename);

        return [
          {
            id: String(row.id ?? file.id ?? index),
            title,
            url: file.url,
            fileSize,
            fileSizeLabel: formatFileSize(fileSize),
            order: row.order ?? index,
          },
        ];
      },
    );

    return mapped
      .toSorted((a, b) => a.order - b.order)
      .map(({ order: _order, ...document }) => document);
  } catch (error) {
    console.error("[labor-protection] Не удалось загрузить документы:", error);
    return [];
  }
}

function getCachedLaborProtectionDocuments(locale: string) {
  return unstable_cache(
    () => fetchLaborProtectionDocuments(locale),
    ["labor-protection-documents", locale],
    { tags: [LABOR_PROTECTION_TAG] },
  );
}

export const getLaborProtectionDocuments = cache(async (locale: string) => {
  return getCachedLaborProtectionDocuments(locale)();
});

export { LABOR_PROTECTION_TAG } from "./labor-protection.shared";
export type { LaborProtectionDocument } from "./labor-protection.shared";
