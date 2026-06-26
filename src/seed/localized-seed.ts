import type { getPayload } from "payload";
import type { Locale } from "@/i18n/locales";
import type { Config } from "@/payload-types";

type CollectionSlug = keyof Config["collections"];
type GlobalSlug = keyof Config["globals"];

type LocalizedPayload = Awaited<ReturnType<typeof getPayload>>;
type Row = Record<string, unknown>;

export type LocaleFields<T> = Partial<Record<Locale, Partial<T>>>;

const secondaryLocales = ["en", "zh"] as const satisfies readonly Locale[];

const nestedArrayKeys = ["items", "lines", "buttons"] as const;
const sharedRowKeys = [
  "kind",
  "infoType",
  "titleStyle",
  "file",
  "image",
  "slug",
  "variant",
] as const;

/** Сохраняет id вложенных array-строк при locale update (иначе Payload пересоздаёт массив). */
export function preserveLocalizedArrayIds(
  baseRows: Row[],
  localeRows: Row[],
): Row[] {
  return localeRows.map((localeRow, index) => {
    const baseRow = baseRows[index];
    if (!baseRow) {
      return localeRow;
    }

    const merged: Row = { ...localeRow, id: baseRow.id };

    for (const key of nestedArrayKeys) {
      const localeNested = localeRow[key];
      const baseNested = baseRow[key];
      if (Array.isArray(localeNested) && Array.isArray(baseNested)) {
        merged[key] = preserveLocalizedArrayIds(
          baseNested as Row[],
          localeNested as Row[],
        );
      }
    }

    for (const key of sharedRowKeys) {
      if (merged[key] == null && baseRow[key] != null) {
        merged[key] = baseRow[key];
      }
    }

    return merged;
  });
}

function mergeLocaleGlobalData(
  baseData: Row,
  localeData: Row,
): Row {
  const merged = { ...localeData };

  for (const key of ["entries", "documents", "items"] as const) {
    const localeRows = localeData[key];
    const baseRows = baseData[key];
    if (Array.isArray(localeRows) && Array.isArray(baseRows)) {
      merged[key] = preserveLocalizedArrayIds(
        baseRows as Row[],
        localeRows as Row[],
      );
    }
  }

  return merged;
}

export async function seedLocalizedCreate({
  payload,
  collection,
  ru,
  shared,
  locales,
}: {
  payload: LocalizedPayload;
  collection: CollectionSlug;
  ru: Record<string, unknown>;
  shared?: Record<string, unknown>;
  locales?: LocaleFields<Record<string, unknown>>;
}) {
  const doc = await payload.create({
    collection,
    locale: "ru",
    data: { ...shared, ...ru } as never,
  });

  for (const locale of secondaryLocales) {
    const data = locales?.[locale];
    if (!data || Object.keys(data).length === 0) {
      continue;
    }

    await payload.update({
      collection,
      id: doc.id,
      locale,
      data: data as never,
    });
  }

  return doc;
}

export async function seedLocalizedUpdateGlobal({
  payload,
  slug,
  ru,
  locales,
}: {
  payload: LocalizedPayload;
  slug: GlobalSlug;
  ru: Record<string, unknown>;
  locales?: LocaleFields<Record<string, unknown>>;
}) {
  await payload.updateGlobal({
    slug,
    locale: "ru",
    data: ru as never,
  });

  const baseGlobal = (await payload.findGlobal({
    slug,
    locale: "ru",
    depth: 0,
  })) as unknown as Row;

  for (const locale of secondaryLocales) {
    const data = locales?.[locale];
    if (!data || Object.keys(data).length === 0) {
      continue;
    }

    await payload.updateGlobal({
      slug,
      locale,
      data: mergeLocaleGlobalData(baseGlobal, data as Row) as never,
    });
  }
}

export async function seedLocalizedCreateGlobal({
  payload,
  slug,
  ru,
  locales,
}: {
  payload: LocalizedPayload;
  slug: GlobalSlug;
  ru: Record<string, unknown>;
  locales?: LocaleFields<Record<string, unknown>>;
}) {
  await payload.updateGlobal({
    slug,
    locale: "ru",
    data: ru as never,
  });

  const baseGlobal = (await payload.findGlobal({
    slug,
    locale: "ru",
    depth: 0,
  })) as unknown as Row;

  for (const locale of secondaryLocales) {
    const data = locales?.[locale];
    if (!data || Object.keys(data).length === 0) {
      continue;
    }

    await payload.updateGlobal({
      slug,
      locale,
      data: mergeLocaleGlobalData(baseGlobal, data as Row) as never,
    });
  }
}
