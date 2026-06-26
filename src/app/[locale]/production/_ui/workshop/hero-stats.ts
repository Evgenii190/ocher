import {
  WORKSHOP_PAGE_SLUGS,
  type WorkshopPageSlug,
  type WorkshopStatIcon,
} from "@/shared/lib/workshops.shared";

export type HeroStat = {
  title: string;
  description: string;
  icon: WorkshopStatIcon;
};

type StatConfig = {
  group: "metal" | "oilfield" | "building";
  keys: string[];
  icons: WorkshopStatIcon[];
};

const WORKSHOP_STAT_CONFIG: Record<WorkshopPageSlug, StatConfig> = {
  [WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES]: {
    group: "metal",
    keys: ["area", "capacity", "crane"],
    icons: ["area", "capacity", "crane"],
  },
  [WORKSHOP_PAGE_SLUGS.OILFIELD_EQUIPMENT]: {
    group: "oilfield",
    keys: ["pipes", "factory", "cycle"],
    icons: ["pipes", "factory", "capacity"],
  },
  [WORKSHOP_PAGE_SLUGS.BUILDING_STRUCTURES]: {
    group: "building",
    keys: ["formwork", "stock", "custom"],
    icons: ["factory", "area", "crane"],
  },
};

export function getWorkshopHeroStats(
  slug: WorkshopPageSlug,
  translate: (key: string) => string,
): HeroStat[] {
  const config = WORKSHOP_STAT_CONFIG[slug];

  return config.keys.map((key, index) => ({
    title: translate(`heroStats.${config.group}.${key}.title`),
    description: translate(`heroStats.${config.group}.${key}.description`),
    icon: (config.icons[index] ??
      config.icons[0] ??
      "area") as WorkshopStatIcon,
  }));
}
