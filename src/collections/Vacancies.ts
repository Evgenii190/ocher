import type { CollectionConfig } from "payload";
import {
  localizedRichText,
  localizedText,
  localizedTextarea,
} from "./fields/localized";
import { siteRichTextEditor } from "./fields/rich-text-editor";
import { slugField } from "./fields/slug";

export const Vacancies: CollectionConfig = {
  slug: "vacancies",
  labels: {
    singular: "Вакансия",
    plural: "Вакансии",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "type", "isActive"],
    group: "Вакансии",
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
    localizedText({
      name: "subtitle",
      label: "Подзаголовок",
      admin: {
        description: "Краткое уточнение для формы отклика и карточки.",
      },
    }),
    localizedTextarea({
      name: "description",
      label: "Описание",
      admin: {
        description:
          "Краткое описание обязанностей и требований для карточки вакансии.",
      },
    }),
    {
      name: "category",
      type: "relationship",
      relationTo: "vacancy-categories",
      label: "Категория",
      required: true,
    },
    {
      name: "type",
      type: "relationship",
      relationTo: "vacancy-types",
      label: "Тип работы",
      required: true,
      admin: {
        description: "Отдельная привязка к типу для фильтрации в рубрикаторе.",
      },
    },
    {
      name: "salaryFrom",
      type: "number",
      label: "Зарплата от, ₽",
    },
    localizedText({
      name: "salaryText",
      label: "Текст зарплаты",
      admin: {
        description: "Необязательно. Если задано, выводится вместо «От N ₽».",
      },
    }),
    localizedText({
      name: "schedule",
      label: "График",
    }),
    localizedText({
      name: "experience",
      label: "Опыт",
    }),
    localizedText({
      name: "location",
      label: "Место работы",
      admin: {
        description: "Например: г. Очёр, ул. Малышева, 1",
      },
    }),
    localizedRichText({
      name: "content",
      label: "Подробное описание",
      admin: {
        description:
          "Основной текст страницы вакансии: заголовки, списки, изображения и блоки в две колонки.",
      },
      editor: siteRichTextEditor,
    }),
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
      name: "isActive",
      type: "checkbox",
      label: "Активна",
      defaultValue: true,
      admin: {
        position: "sidebar",
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
