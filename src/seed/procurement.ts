import fs from "node:fs";
import path from "node:path";
import type { getPayload } from "payload";
import type { ProcurementSeedEntry } from "@/shared/lib/procurement.shared";
import { procurementSeedEntries } from "./procurement-data";
import type { SeedLocale } from "./i18n/catalog";
import {
  buildProcurementLocaleEntries,
  procurementPageTranslations,
} from "./i18n/procurement";
import { seedLocalizedUpdateGlobal } from "./localized-seed";

const secondaryLocales = ["en", "zh"] as const satisfies readonly SeedLocale[];

function toPayloadEntry(entry: ProcurementSeedEntry) {
  if (entry.kind === "group") {
    return {
      kind: "group" as const,
      groupTitle: entry.groupTitle,
      items: entry.items.map((item) => ({
        name: item.name,
        ...(item.quantity ? { quantity: item.quantity } : {}),
      })),
    };
  }

  return {
    kind: "row" as const,
    name: entry.name,
    ...(entry.quantity ? { quantity: entry.quantity } : {}),
  };
}

export async function seedProcurement(
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  payload.logger.info("🌱 Наполнение «Закупки»…");

  await seedLocalizedUpdateGlobal({
    payload,
    slug: "procurement",
    ru: {
      pageTitle: "Закупки",
      entries: procurementSeedEntries.map(toPayloadEntry),
    },
    locales: Object.fromEntries(
      secondaryLocales.map((locale) => [
        locale,
        {
          pageTitle: procurementPageTranslations[locale].pageTitle,
          entries: buildProcurementLocaleEntries(procurementSeedEntries, locale),
        },
      ]),
    ),
  });

  payload.logger.info(
    `📋 Таблица закупок: ${procurementSeedEntries.length} позиций`,
  );
}
