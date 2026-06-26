import {
  WORKSHOP_PAGE_SLUGS,
  type WorkshopPageSlug,
} from "@/shared/lib/workshops.shared";
import { createWorkshopGlobal } from "./create-workshop-global";

export const WorkshopMetalStructures = createWorkshopGlobal({
  slug: "workshop-metal-structures",
  label: "Цех металлоконструкций",
  pageSlug: WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES,
  pagePath: "/production/metal-structures",
});

export const WorkshopOilfieldEquipment = createWorkshopGlobal({
  slug: "workshop-oilfield-equipment",
  label: "Цех нефтепромыслового оборудования",
  pageSlug: WORKSHOP_PAGE_SLUGS.OILFIELD_EQUIPMENT,
  pagePath: "/production/oilfield-equipment",
});

export const WorkshopBuildingStructures = createWorkshopGlobal({
  slug: "workshop-building-structures",
  label: "Цех строительных конструкций",
  pageSlug: WORKSHOP_PAGE_SLUGS.BUILDING_STRUCTURES,
  pagePath: "/production/building-structures",
});

export const WORKSHOP_PAGE_METADATA: Record<
  WorkshopPageSlug,
  { title: string; description: string }
> = {
  [WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES]: {
    title: "Цех металлоконструкций | Ochko",
    description:
      "Производство металлоконструкций на АО «Очерский машиностроительный завод» — лазерная и плазменная резка, сварка, антикоррозийная обработка",
  },
  [WORKSHOP_PAGE_SLUGS.OILFIELD_EQUIPMENT]: {
    title: "Цех нефтепромыслового оборудования | Ochko",
    description:
      "Производство нефтепромыслового оборудования полного цикла на АО «ОМЗ» — насосные штанги, штоки, муфты и комплектующие",
  },
  [WORKSHOP_PAGE_SLUGS.BUILDING_STRUCTURES]: {
    title: "Цех строительных конструкций | Ochko",
    description:
      "Производство строительных конструкций и комплектующих для опалубки на АО «Очерский машиностроительный завод»",
  },
};
