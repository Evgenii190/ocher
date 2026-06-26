import type { CollectionConfig } from "payload";
import { localizedText } from "./fields/localized";
import { lockedSlugField } from "./fields/slug";

export const VacancyTypes: CollectionConfig = {
  slug: "vacancy-types",
  labels: {
    singular: "Тип вакансии",
    plural: "Типы вакансий",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order"],
    group: "Вакансии",
    description:
      "Направления работы для рубрикатора: Офис, Производство, Инженерия и т.д.",
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
    lockedSlugField("title"),
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
