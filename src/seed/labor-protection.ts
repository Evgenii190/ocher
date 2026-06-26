import fs from "node:fs";
import path from "node:path";
import type { getPayload } from "payload";
import { laborProtectionDocuments } from "./labor-protection-data";
import type { Locale } from "@/i18n/locales";
import type { SeedLocale } from "./i18n/catalog";
import { getLaborProtectionDocumentTitle } from "./i18n/labor-protection";
import { seedLocalizedUpdateGlobal } from "./localized-seed";

const secondaryLocales = ["en", "zh"] as const satisfies readonly SeedLocale[];
const ASSETS_DIR = path.resolve(
  process.cwd(),
  "src/seed/assets/labor-protection",
);

const LEGACY_FILENAMES = ["doc.pdf"];

async function deleteDocumentsByFilenames(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filenames: string[],
) {
  for (const filename of filenames) {
    const existing = await payload.find({
      collection: "documents",
      where: { filename: { equals: filename } },
      limit: 100,
    });

    for (const doc of existing.docs) {
      await payload.delete({
        collection: "documents",
        id: doc.id,
      });
    }
  }
}

async function ensureDocument(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
): Promise<number | string | undefined> {
  const filePath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    payload.logger.warn(
      `Пропущен документ «Охрана труда»: не найден ${filePath}`,
    );
    return undefined;
  }

  await deleteDocumentsByFilenames(payload, [filename]);

  const created = await payload.create({
    collection: "documents",
    data: {},
    filePath,
  });

  return created.id;
}

function buildLocaleDocuments(
  fileIds: Map<string, number | string>,
  locale: Locale,
) {
  return laborProtectionDocuments.flatMap((document) => {
    const fileId = fileIds.get(document.slug);
    if (!fileId) {
      return [];
    }

    return [
      {
        file: fileId,
        title:
          locale === "ru"
            ? document.title
            : getLaborProtectionDocumentTitle(
                document.slug,
                locale,
                document.title,
              ),
        order: document.order,
      },
    ];
  });
}

export async function seedLaborProtection(
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  payload.logger.info("🌱 Наполнение «Охрана труда»…");

  if (!fs.existsSync(ASSETS_DIR)) {
    payload.logger.warn(
      "Пропущено: не найдена папка src/seed/assets/labor-protection",
    );
    return;
  }

  await deleteDocumentsByFilenames(payload, LEGACY_FILENAMES);

  const fileIds = new Map<string, number | string>();
  for (const document of laborProtectionDocuments) {
    const id = await ensureDocument(payload, document.filename);
    if (id) {
      fileIds.set(document.slug, id);
    }
  }

  if (fileIds.size === 0) {
    payload.logger.warn("Документы «Охрана труда» не загружены");
    return;
  }

  await seedLocalizedUpdateGlobal({
    payload,
    slug: "labor-protection",
    ru: {
      documents: buildLocaleDocuments(fileIds, "ru"),
    },
    locales: Object.fromEntries(
      secondaryLocales.map((locale) => [
        locale,
        { documents: buildLocaleDocuments(fileIds, locale) },
      ]),
    ),
  });

  payload.logger.info(`📄 Документов «Охрана труда»: ${fileIds.size}`);
}
