export const WORKSHOP_SECTION_IDS = {
  ABOUT: "about",
  STOCK: "stock",
  EQUIPMENT: "equipment",
  ADVANTAGES: "advantages",
} as const;

export type WorkshopSectionId =
  (typeof WORKSHOP_SECTION_IDS)[keyof typeof WORKSHOP_SECTION_IDS];

export const WORKSHOP_SECTION_OPTIONS: {
  label: string;
  value: WorkshopSectionId;
}[] = [
  { label: "Rich text (контент)", value: WORKSHOP_SECTION_IDS.ABOUT },
  { label: "Складской остаток", value: WORKSHOP_SECTION_IDS.STOCK },
  { label: "Парк оборудования", value: WORKSHOP_SECTION_IDS.EQUIPMENT },
  { label: "Преимущества", value: WORKSHOP_SECTION_IDS.ADVANTAGES },
];

/** Порядок по умолчанию: rich → склад → парк → преимущества. */
export const DEFAULT_WORKSHOP_SECTION_ORDER: WorkshopSectionId[] = [
  WORKSHOP_SECTION_IDS.ABOUT,
  WORKSHOP_SECTION_IDS.STOCK,
  WORKSHOP_SECTION_IDS.EQUIPMENT,
  WORKSHOP_SECTION_IDS.ADVANTAGES,
];

const VALID_SECTION_IDS = new Set<string>(Object.values(WORKSHOP_SECTION_IDS));

export function normalizeWorkshopSectionOrder(
  order: unknown,
): WorkshopSectionId[] {
  if (!Array.isArray(order)) {
    return DEFAULT_WORKSHOP_SECTION_ORDER;
  }

  const seen = new Set<WorkshopSectionId>();
  const normalized: WorkshopSectionId[] = [];

  for (const item of order) {
    const section =
      item &&
      typeof item === "object" &&
      "section" in item &&
      typeof item.section === "string"
        ? item.section
        : null;

    if (!section || !VALID_SECTION_IDS.has(section)) {
      continue;
    }

    const id = section as WorkshopSectionId;
    if (seen.has(id)) {
      continue;
    }

    seen.add(id);
    normalized.push(id);
  }

  for (const id of DEFAULT_WORKSHOP_SECTION_ORDER) {
    if (!seen.has(id)) {
      normalized.push(id);
    }
  }

  return normalized.length > 0 ? normalized : DEFAULT_WORKSHOP_SECTION_ORDER;
}
