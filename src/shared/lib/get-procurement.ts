import "server-only";

import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getPayload } from "payload";
import { payloadLocaleOptions } from "@/shared/lib/payload-locale";
import {
  PROCUREMENT_TAG,
  type ProcurementLineItem,
  type ProcurementRow,
} from "./procurement.shared";

type RawLineItem = {
  name?: string | null;
  quantity?: string | null;
};

type RawEntry = {
  kind?: "group" | "row" | null;
  groupTitle?: string | null;
  items?: RawLineItem[] | null;
  name?: string | null;
  quantity?: string | null;
};

function mapLineItems(
  items: RawLineItem[] | null | undefined,
): ProcurementLineItem[] {
  return (items ?? [])
    .map((item) => {
      const name = item.name?.trim();
      if (!name) {
        return null;
      }

      const quantity = item.quantity?.trim();
      return {
        name,
        ...(quantity ? { quantity } : {}),
      };
    })
    .filter((item): item is ProcurementLineItem => item !== null);
}

function mapEntries(entries: RawEntry[] | null | undefined): ProcurementRow[] {
  let counter = 0;

  return (entries ?? [])
    .map((entry) => {
      if (entry.kind === "group") {
        const groupTitle = entry.groupTitle?.trim();
        const items = mapLineItems(entry.items);

        if (!groupTitle || items.length === 0) {
          return null;
        }

        counter += 1;

        return {
          kind: "group" as const,
          title: `${counter}. ${groupTitle}`,
          items,
        };
      }

      if (entry.kind !== "row") {
        return null;
      }

      const name = entry.name?.trim();
      if (!name) {
        return null;
      }

      counter += 1;
      const quantity = entry.quantity?.trim();

      return {
        kind: "row" as const,
        name: `${counter}. ${name}`,
        ...(quantity ? { quantity } : {}),
      };
    })
    .filter((row): row is ProcurementRow => row !== null);
}

export type ProcurementPage = {
  pageTitle: string;
  rows: ProcurementRow[];
};

async function fetchProcurement(locale: string): Promise<ProcurementPage> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({
      slug: "procurement",
      depth: 0,
      overrideAccess: false,
      ...payloadLocaleOptions(locale),
    });

    return {
      pageTitle: data.pageTitle?.trim() || "",
      rows: mapEntries(data.entries as RawEntry[] | null | undefined),
    };
  } catch (error) {
    console.error("[procurement] Не удалось загрузить данные:", error);
    return { pageTitle: "", rows: [] };
  }
}

function getCachedProcurement(locale: string) {
  return unstable_cache(
    () => fetchProcurement(locale),
    ["procurement", locale],
    { tags: [PROCUREMENT_TAG] },
  );
}

export const getProcurement = cache(async (locale: string) => {
  return getCachedProcurement(locale)();
});
