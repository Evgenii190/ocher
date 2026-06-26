import type { CollectionConfig } from "payload";
import { localizedText, localizedTextarea } from "./fields/localized";
import { lockedSlugField } from "./fields/slug";

export const VacancyCategories: CollectionConfig = {
  slug: "vacancy-categories",
  labels: {
    singular: "Категория вакансий",
    plural: "Категории вакансий",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "order"],
    group: "Вакансии",
    description:
      "Группы вакансий на главной странице раздела, например «Административно управленческий персонал».",
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
      name: "type",
      type: "relationship",
      relationTo: "vacancy-types",
      label: "Тип работы",
      required: true,
    },
    localizedTextarea({
      name: "description",
      label: "Описание",
    }),
    {
      name: "salaryFrom",
      type: "number",
      label: "Зарплата от, ₽",
      admin: {
        description:
          "Минимальная зарплата для отображения на карточке категории.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Изображение",
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Дата публикации",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
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
