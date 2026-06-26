import enMessages from "../../../messages/en.json";
import zhMessages from "../../../messages/zh.json";

export type SeedLocale = "en" | "zh";

type StaticCategories = typeof enMessages.staticCategories;

const messagesByLocale: Record<SeedLocale, { staticCategories: StaticCategories }> =
  {
    en: enMessages,
    zh: zhMessages,
  };

const characteristicTitles: Record<
  SeedLocale,
  Record<string, string>
> = {
  en: {
    length: "Length",
    diameter: "Diameter",
    weight: "Weight",
    material: "Material",
  },
  zh: {
    length: "长度",
    diameter: "直径",
    weight: "重量",
    material: "材料",
  },
};

const materialTranslations: Record<string, Record<SeedLocale, string>> = {
  сталь: { en: "steel", zh: "钢" },
  полиамид: { en: "polyamide", zh: "聚酰胺" },
  "сталь 45": { en: "steel 45", zh: "45号钢" },
};

export function getCategoryTitle(
  slug: string,
  parentSlug: string | null,
  locale: SeedLocale,
): string {
  const categories = messagesByLocale[locale].staticCategories;

  if (parentSlug) {
    const parent = categories[parentSlug as keyof StaticCategories];
    if (parent && "subcategories" in parent) {
      const title = parent.subcategories[slug as keyof typeof parent.subcategories];
      if (title) {
        return title;
      }
    }
  }

  const root = categories[slug as keyof StaticCategories];
  if (root && "title" in root) {
    return root.title;
  }

  return slug;
}

export function getCharacteristicTitle(
  slug: string,
  locale: SeedLocale,
): string {
  return characteristicTitles[locale][slug] ?? slug;
}

export function translateMaterial(
  value: string,
  locale: SeedLocale,
): string {
  return materialTranslations[value]?.[locale] ?? value;
}
