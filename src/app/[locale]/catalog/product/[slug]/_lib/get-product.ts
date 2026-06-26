import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import type {
  ProductSpecTable,
  ProductSpecTableRow,
  ProductSpecTableRowKind,
} from "@/shared/lib/product-spec-table.shared";
import { mapProduct } from "../../../_lib/get-catalog";
import type { ProductDetail, ProductDocument } from "../../../_ui/types";

const CATALOG_TAG = "catalog";

type RawCategory = {
  id: number | string;
  title: string;
  slug?: string | null;
};

type RawFile = {
  id: number | string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  title?: string | null;
};

type RawProductDocument = {
  id?: string | number;
  title?: string | null;
  file?: RawFile | number | string | null;
};

type RawSpecTableRow = {
  kind?: ProductSpecTableRowKind | null;
  label?: string | null;
  wideValue?: string | null;
  highlight?: boolean | null;
  accent?: boolean | null;
  cells?:
    | {
        values?: { text?: string | null }[] | null;
      }[]
    | null;
};

type RawSpecTable = {
  title?: string | null;
  columns?: { header?: string | null }[] | null;
  rows?: RawSpecTableRow[] | null;
};

type RawProduct = Parameters<typeof mapProduct>[0] & {
  gallery?: RawFile[] | RawFile | number | string | null;
  documents?: RawProductDocument[] | null;
  specTables?: RawSpecTable[] | null;
};

function isFileObject(value: unknown): value is RawFile {
  return typeof value === "object" && value !== null && "id" in value;
}

function fileUrl(value: unknown): string | null {
  if (!isFileObject(value)) {
    return null;
  }
  return value.url ?? null;
}

function collectProductImages(product: RawProduct): string[] {
  const urls: string[] = [];
  const push = (url: string | null) => {
    if (url && !urls.includes(url)) {
      urls.push(url);
    }
  };

  push(fileUrl(product.image));

  const gallery = product.gallery;
  if (Array.isArray(gallery)) {
    for (const item of gallery) {
      push(fileUrl(item));
    }
  } else {
    push(fileUrl(gallery));
  }

  return urls;
}

function mapDocuments(
  product: RawProduct,
  documentFallback: string,
): ProductDocument[] {
  return (product.documents ?? []).flatMap((row, index) => {
    const file = isFileObject(row.file) ? row.file : null;
    if (!file?.url) {
      return [];
    }

    return [
      {
        id: String(row.id ?? file.id ?? index),
        title: row.title ?? file.title ?? file.filename ?? documentFallback,
        url: file.url,
        filename: file.filename ?? "file",
        mimeType: file.mimeType ?? null,
      },
    ];
  });
}

function mapSpecTables(product: RawProduct): ProductSpecTable[] {
  return (product.specTables ?? []).flatMap((table) => {
    if (!table.title) {
      return [];
    }

    const columns = (table.columns ?? [])
      .map((column) => column.header?.trim() ?? "")
      .filter((header) => header.length > 0);

    const rows: ProductSpecTableRow[] = [];

    for (const row of table.rows ?? []) {
      const kind = (row.kind ?? "data") as ProductSpecTableRowKind;

      if (kind === "wide") {
        if (!row.label) {
          continue;
        }
        rows.push({
          kind,
          label: row.label,
          wideValue: row.wideValue ?? "",
          highlight: row.highlight ?? false,
          accent: row.accent ?? false,
        });
        continue;
      }

      if (kind === "section") {
        if (!row.label) {
          continue;
        }
        rows.push({
          kind,
          label: row.label,
          accent: row.accent ?? false,
        });
        continue;
      }

      const cells = (row.cells ?? []).map((cell) => ({
        values: (cell.values ?? [])
          .map((value) => value.text?.trim() ?? "")
          .filter((text) => text.length > 0),
      }));

      rows.push({
        kind,
        label: row.label ?? "",
        cells,
        highlight: row.highlight ?? false,
        accent: row.accent ?? false,
      });
    }

    if (rows.length === 0) {
      return [];
    }

    return [
      {
        title: table.title,
        columns,
        rows,
      },
    ];
  });
}

async function fetchProductBySlug(
  slug: string,
  locale: string,
  documentFallback: string,
): Promise<ProductDetail | null> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "products",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
      ...payloadLocaleOptions(locale),
    });

    const product = result.docs[0];
    if (!product) {
      return null;
    }

    const raw = product as RawProduct;
    const categoryById = new Map<string, RawCategory>();

    if (
      raw.category &&
      typeof raw.category === "object" &&
      raw.category !== null &&
      "id" in raw.category
    ) {
      categoryById.set(String(raw.category.id), raw.category as RawCategory);
    }

    const base = mapProduct(raw, categoryById);

    return {
      ...base,
      images: collectProductImages(raw),
      documents: mapDocuments(raw, documentFallback),
      specTables: mapSpecTables(raw),
    };
  } catch (error) {
    console.error(`[catalog] Не удалось загрузить товар «${slug}»:`, error);
    return null;
  }
}

export async function getProductBySlug(
  slug: string,
  locale: string,
): Promise<ProductDetail | null> {
  const t = await getTranslations({ locale, namespace: "common" });
  const documentFallback = t("document");
  const cached = unstable_cache(
    () => fetchProductBySlug(slug, locale, documentFallback),
    ["catalog-product", slug, locale],
    { tags: [CATALOG_TAG], revalidate: 60 },
  );
  return cached();
}
