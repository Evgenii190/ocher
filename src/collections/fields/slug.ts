import type { Field, FieldHook } from "payload";

const translitMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .split("")
    .map((char) => translitMap[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Заполняет slug из исходного поля, если он не задан вручную.
// Slug генерируется только из русского названия (default locale).
const fillSlug =
  (sourceField: string): FieldHook =>
  ({ value, data, req }) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return slugify(value);
    }

    const locale = req?.locale ?? "ru";
    if (locale !== "ru") {
      return value;
    }

    const source = data?.[sourceField];
    if (typeof source === "string" && source.trim().length > 0) {
      return slugify(source);
    }

    return value;
  };

export function slugField(sourceField = "title"): Field {
  return {
    name: "slug",
    type: "text",
    index: true,
    unique: true,
    admin: {
      position: "sidebar",
      description: "Заполняется автоматически из названия, можно изменить.",
    },
    hooks: {
      beforeValidate: [fillSlug(sourceField)],
    },
  };
}

const preserveSlugOnUpdate: FieldHook = ({ value, operation, originalDoc }) => {
  if (operation === "update" && typeof originalDoc?.slug === "string") {
    return originalDoc.slug;
  }
  return value;
};

/** Slug задаётся при создании и не меняется в админке. */
export function lockedSlugField(sourceField = "title"): Field {
  return {
    name: "slug",
    type: "text",
    index: true,
    unique: true,
    required: true,
    admin: {
      readOnly: true,
      position: "sidebar",
      description:
        "Фиксированный адрес категории. Заполняется автоматически при создании.",
    },
    hooks: {
      beforeValidate: [fillSlug(sourceField)],
      beforeChange: [preserveSlugOnUpdate],
    },
  };
}
