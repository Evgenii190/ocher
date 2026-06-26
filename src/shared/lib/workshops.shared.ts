/** Стабильные slug страниц цехов (не меняются). */
export const WORKSHOP_PAGE_SLUGS = {
  METAL_STRUCTURES: "metal-structures",
  OILFIELD_EQUIPMENT: "oilfield-equipment",
  BUILDING_STRUCTURES: "building-structures",
} as const;

export type WorkshopPageSlug =
  (typeof WORKSHOP_PAGE_SLUGS)[keyof typeof WORKSHOP_PAGE_SLUGS];

export type WorkshopGlobalSlug =
  | "workshop-metal-structures"
  | "workshop-oilfield-equipment"
  | "workshop-building-structures";

/** Slug глобала Payload для каждой страницы цеха. */
export const WORKSHOP_GLOBAL_BY_PAGE_SLUG: Record<
  WorkshopPageSlug,
  WorkshopGlobalSlug
> = {
  [WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES]: "workshop-metal-structures",
  [WORKSHOP_PAGE_SLUGS.OILFIELD_EQUIPMENT]: "workshop-oilfield-equipment",
  [WORKSHOP_PAGE_SLUGS.BUILDING_STRUCTURES]: "workshop-building-structures",
};

export const WORKSHOP_PAGE_PATHS: Record<WorkshopPageSlug, string> = {
  [WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES]: "/production/metal-structures",
  [WORKSHOP_PAGE_SLUGS.OILFIELD_EQUIPMENT]: "/production/oilfield-equipment",
  [WORKSHOP_PAGE_SLUGS.BUILDING_STRUCTURES]: "/production/building-structures",
};

export const WORKSHOP_TITLES: Record<WorkshopPageSlug, string> = {
  [WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES]: "Цех металлоконструкций",
  [WORKSHOP_PAGE_SLUGS.OILFIELD_EQUIPMENT]:
    "Производство нефтепромыслового оборудования полного цикла",
  [WORKSHOP_PAGE_SLUGS.BUILDING_STRUCTURES]: "Цех строительных конструкций",
};

/** Короткие названия для блока преимуществ и хлебных крошек. */
export const WORKSHOP_SHORT_TITLES: Record<WorkshopPageSlug, string> = {
  [WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES]: "Цех металлоконструкций",
  [WORKSHOP_PAGE_SLUGS.OILFIELD_EQUIPMENT]:
    "Цех нефтепромыслового оборудования",
  [WORKSHOP_PAGE_SLUGS.BUILDING_STRUCTURES]: "Цех строительных конструкций",
};

export const WORKSHOP_PAGE_SLUG_LIST = Object.values(
  WORKSHOP_PAGE_SLUGS,
) as WorkshopPageSlug[];

export function isWorkshopPageSlug(slug: string): slug is WorkshopPageSlug {
  return WORKSHOP_PAGE_SLUG_LIST.includes(slug as WorkshopPageSlug);
}

export type WorkshopStatIcon =
  | "area"
  | "capacity"
  | "crane"
  | "pipes"
  | "factory";

export const workshopEquipmentWorkshopOptions = [
  {
    label: "Цех металлоконструкций",
    value: WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES,
  },
  {
    label: "Цех нефтепромыслового оборудования",
    value: WORKSHOP_PAGE_SLUGS.OILFIELD_EQUIPMENT,
  },
  {
    label: "Цех строительных конструкций",
    value: WORKSHOP_PAGE_SLUGS.BUILDING_STRUCTURES,
  },
] as const;

export type WorkshopEquipmentWorkshop =
  (typeof workshopEquipmentWorkshopOptions)[number]["value"];
