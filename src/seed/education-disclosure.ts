import fs from "node:fs";
import path from "node:path";
import type { getPayload } from "payload";
import type { EducationRow } from "@/shared/lib/education-disclosure.shared";
import { educationRows } from "./education-disclosure-data";
import {
  educationButtonDocuments,
  educationLegacyFilenames,
  educationLinkDocuments,
} from "./education-disclosure-documents";
import type { SeedLocale } from "./i18n/catalog";
import {
  buildEducationLocaleEntries,
  educationPageTranslations,
} from "./i18n/education";
import { seedLocalizedUpdateGlobal } from "./localized-seed";

const secondaryLocales = ["en", "zh"] as const satisfies readonly SeedLocale[];
const ASSETS_DIR = path.resolve(
  process.cwd(),
  "src/seed/assets/education",
);

const LINK_ROW_FILES = Object.fromEntries(
  educationLinkDocuments.map((document) => [
    document.rowName,
    document.filename,
  ]),
) as Record<string, string>;

const BUTTON_FILES = Object.fromEntries(
  educationButtonDocuments.map((document) => [
    document.buttonLabel,
    document.filename,
  ]),
) as Record<string, string>;

async function deleteDocumentsByFilenames(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filenames: readonly string[],
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
      `Пропущен документ «Сведения об образовательной организации»: не найден ${filePath}`,
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

async function loadDocuments(
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<Map<string, number | string>> {
  const filenames = new Set([
    ...educationLinkDocuments.map((document) => document.filename),
    ...educationButtonDocuments.map((document) => document.filename),
  ]);
  const ids = new Map<string, number | string>();

  for (const filename of filenames) {
    const id = await ensureDocument(payload, filename);
    if (id) {
      ids.set(filename, id);
    }
  }

  return ids;
}

function toPayloadEntry(
  row: EducationRow,
  documentIds: Map<string, number | string>,
) {
  if (row.kind === "section") {
    return {
      kind: "section" as const,
      sectionTitle: row.title,
      titleStyle: row.titleStyle ?? "default",
    };
  }

  if (row.info.type === "documents") {
    return {
      kind: "row" as const,
      code: row.code,
      name: row.name,
      infoType: "buttons" as const,
      buttons: row.info.items.map((item) => {
        const filename = BUTTON_FILES[item.label];
        const fileId = filename ? documentIds.get(filename) : undefined;

        return {
          label: item.label,
          variant: item.variant,
          ...(fileId ? { file: fileId } : {}),
        };
      }),
    };
  }

  if (row.info.type === "link") {
    const filename = LINK_ROW_FILES[row.name];
    const fileId = filename ? documentIds.get(filename) : undefined;

    return {
      kind: "row" as const,
      code: row.code,
      name: row.name,
      infoType: "link" as const,
      lines: row.info.lines.map((text) => ({ text })),
      ...(fileId ? { file: fileId } : {}),
    };
  }

  return {
    kind: "row" as const,
    code: row.code,
    name: row.name,
    infoType: "text" as const,
    lines: row.info.lines.map((text) => ({ text })),
  };
}

function attachDocumentsToLocaleEntries(
  localeEntries: ReturnType<typeof buildEducationLocaleEntries>,
  documentIds: Map<string, number | string>,
) {
  let rowIndex = 0;

  return localeEntries.map((entry) => {
    if (entry.kind === "section") {
      return entry;
    }

    while (
      rowIndex < educationRows.length &&
      educationRows[rowIndex]?.kind === "section"
    ) {
      rowIndex += 1;
    }

    const sourceRow = educationRows[rowIndex];
    rowIndex += 1;

    if (!sourceRow || sourceRow.kind === "section") {
      return entry;
    }

    if (
      entry.infoType === "buttons" &&
      sourceRow.info.type === "documents"
    ) {
      const documentItems = sourceRow.info.items;
      return {
        ...entry,
        buttons: entry.buttons.map((button, index) => {
          const sourceLabel = documentItems[index]?.label;
          const filename = sourceLabel ? BUTTON_FILES[sourceLabel] : undefined;
          const fileId = filename ? documentIds.get(filename) : undefined;
          return fileId ? { ...button, file: fileId } : button;
        }),
      };
    }

    if (entry.infoType === "link") {
      const filename = LINK_ROW_FILES[sourceRow.name];
      const fileId = filename ? documentIds.get(filename) : undefined;
      return fileId ? { ...entry, file: fileId } : entry;
    }

    return entry;
  });
}

export async function seedEducationDisclosure(
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  payload.logger.info(
    "🌱 Наполнение «Сведения об образовательной организации»…",
  );

  if (!fs.existsSync(ASSETS_DIR)) {
    payload.logger.warn(
      "Пропущены PDF: не найдена папка src/seed/assets/education",
    );
  }

  await deleteDocumentsByFilenames(payload, educationLegacyFilenames);

  const documentIds = fs.existsSync(ASSETS_DIR)
    ? await loadDocuments(payload)
    : new Map<string, number | string>();

  await seedLocalizedUpdateGlobal({
    payload,
    slug: "education-disclosure",
    ru: {
      pageTitle: "Сведения об образовательной организации",
      entries: educationRows.map((row) => toPayloadEntry(row, documentIds)),
    },
    locales: Object.fromEntries(
      secondaryLocales.map((locale) => [
        locale,
        {
          pageTitle: educationPageTranslations[locale].pageTitle,
          entries: attachDocumentsToLocaleEntries(
            buildEducationLocaleEntries(educationRows, locale),
            documentIds,
          ),
        },
      ]),
    ),
  });

  payload.logger.info(
    `📋 Таблица сведений: ${educationRows.length} элементов, ${documentIds.size} PDF`,
  );
}
