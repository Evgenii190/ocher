import "server-only";

import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getPayload } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import {
  EDUCATION_DISCLOSURE_TAG,
  type EducationDocumentLink,
  type EducationRow,
} from "./education-disclosure.shared";

type FileObject = {
  id?: number | string;
  url?: string | null;
};

type RawLine = {
  text?: string | null;
};

type RawButton = {
  label?: string | null;
  variant?: "filled" | "outline" | null;
  file?: number | string | FileObject | null;
};

type RawEntry = {
  kind?: "section" | "row" | null;
  sectionTitle?: string | null;
  titleStyle?: "default" | "compact" | null;
  code?: string | null;
  name?: string | null;
  infoType?: "text" | "link" | "buttons" | null;
  lines?: RawLine[] | null;
  file?: number | string | FileObject | null;
  buttons?: RawButton[] | null;
};

function isFileObject(value: unknown): value is FileObject {
  return typeof value === "object" && value !== null && "url" in value;
}

function resolveFileUrl(file: unknown): string | undefined {
  if (isFileObject(file) && file.url) {
    return file.url;
  }

  return undefined;
}

function mapLines(lines: RawLine[] | null | undefined): string[] {
  return (lines ?? [])
    .map((line) => line.text?.trim())
    .filter((line): line is string => Boolean(line));
}

function mapEntry(entry: RawEntry): EducationRow | null {
  if (entry.kind === "section") {
    const title = entry.sectionTitle?.trim();
    if (!title) {
      return null;
    }

    return {
      kind: "section",
      title,
      titleStyle: entry.titleStyle ?? "default",
    };
  }

  if (entry.kind !== "row") {
    return null;
  }

  const name = entry.name?.trim();
  if (!name) {
    return null;
  }

  const code = entry.code?.trim() || undefined;
  const infoType = entry.infoType ?? "text";

  if (infoType === "buttons") {
    const items: EducationDocumentLink[] = (entry.buttons ?? []).flatMap(
      (button) => {
        const label = button.label?.trim();
        if (!label) {
          return [];
        }

        return [
          {
            label,
            variant: button.variant ?? "outline",
            href: resolveFileUrl(button.file),
          },
        ];
      },
    );

    return {
      kind: "row",
      code,
      name,
      info: { type: "documents", items },
    };
  }

  const lines = mapLines(entry.lines);
  if (lines.length === 0) {
    return null;
  }

  if (infoType === "link") {
    return {
      kind: "row",
      code,
      name,
      info: {
        type: "link",
        lines,
        href: resolveFileUrl(entry.file),
      },
    };
  }

  return {
    kind: "row",
    code,
    name,
    info: { type: "text", lines },
  };
}

export type EducationDisclosurePage = {
  pageTitle: string;
  rows: EducationRow[];
};

async function fetchEducationDisclosure(
  locale: string,
): Promise<EducationDisclosurePage> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({
      slug: "education-disclosure",
      depth: 2,
      overrideAccess: false,
      ...payloadLocaleOptions(locale),
    });

    const rows = ((data.entries as RawEntry[] | null | undefined) ?? [])
      .map(mapEntry)
      .filter((row): row is EducationRow => row !== null);

    return {
      pageTitle: data.pageTitle?.trim() || "",
      rows,
    };
  } catch (error) {
    console.error("[education-disclosure] Не удалось загрузить данные:", error);
    return { pageTitle: "", rows: [] };
  }
}

function getCachedEducationDisclosure(locale: string) {
  return unstable_cache(
    () => fetchEducationDisclosure(locale),
    ["education-disclosure", locale],
    { tags: [EDUCATION_DISCLOSURE_TAG] },
  );
}

export const getEducationDisclosure = cache(async (locale: string) => {
  return getCachedEducationDisclosure(locale)();
});
