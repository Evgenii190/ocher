import type { CollectionConfig } from "payload";
import { localizedText } from "./fields/localized";
import { slugField } from "./fields/slug";

export const Characteristics: CollectionConfig = {
  slug: "characteristics",
  labels: {
    singular: "Характеристика",
    plural: "Характеристики",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "unit", "order"],
    group: "Каталог",
    description:
      "Переиспользуемые характеристики товаров. Числовые участвуют в фильтре-диапазоне, текстовые — в фильтре-списке.",
  },
  access: {
    read: () => true,
  },
  fields: [
    localizedText({
      name: "title",
      label: "Название",
      required: true,
    }),
    slugField("title"),
    {
      name: "type",
      type: "select",
      label: "Тип значения",
      required: true,
      defaultValue: "text",
      options: [
        { label: "Число (фильтр-диапазон)", value: "number" },
        { label: "Текст (фильтр-список)", value: "text" },
      ],
    },
    {
      name: "unit",
      type: "select",
      label: "Единица измерения",
      defaultValue: "none",
      options: [
        { label: "—", value: "none" },
        { label: "мм", value: "mm" },
        { label: "см", value: "cm" },
        { label: "м", value: "m" },
        { label: "кг", value: "kg" },
        { label: "т", value: "t" },
      ],
      admin: {
        condition: (data) => data?.type === "number",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Порядок",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
