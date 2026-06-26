import type { CollectionConfig } from "payload";
import {
  localizedArrayText,
  localizedText,
  localizedTextarea,
} from "./fields/localized";
import { slugField } from "./fields/slug";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Товар",
    plural: "Товары",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "availability", "price"],
    group: "Каталог",
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
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Категория / подкатегория",
      required: true,
      admin: {
        description: "Выберите подкатегорию, в которой находится товар.",
      },
    },
    {
      name: "availability",
      type: "select",
      label: "Наличие",
      required: true,
      defaultValue: "inStock",
      options: [
        { label: "В наличии", value: "inStock" },
        { label: "Под заказ", value: "onOrder" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "price",
          type: "number",
          label: "Цена, ₽",
          min: 0,
          admin: {
            width: "50%",
            description: "Пусто — «цена по запросу».",
          },
        },
        {
          name: "discountPercent",
          type: "number",
          label: "Скидка, %",
          min: 0,
          max: 100,
          defaultValue: 0,
          admin: {
            width: "50%",
            description: "0 — без скидки.",
          },
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Основное фото",
      admin: {
        description:
          "Показывается в каталоге и первым в галерее на странице товара.",
      },
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Галерея",
      admin: {
        description:
          "Дополнительные фото. На странице товара — слайдер с превью; если фото одно, слайдер не показывается.",
      },
    },
    {
      name: "popularity",
      type: "number",
      label: "Популярность",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Используется для сортировки «По популярности».",
      },
    },
    localizedTextarea({
      name: "description",
      label: "Описание",
    }),
    {
      name: "documents",
      type: "array",
      label: "Документация",
      labels: {
        singular: "Документ",
        plural: "Документы",
      },
      admin: {
        description: "PDF и другие файлы для вкладки «Документация».",
      },
      fields: [
        localizedArrayText({
          name: "title",
          label: "Название",
          required: true,
        }),
        {
          name: "file",
          type: "upload",
          relationTo: "documents",
          label: "Файл",
          required: true,
        },
      ],
    },
    {
      name: "characteristics",
      type: "array",
      label: "Характеристики",
      labels: {
        singular: "Характеристика",
        plural: "Характеристики",
      },
      admin: {
        description:
          "Добавьте несколько характеристик. Для числовых заполняйте «Значение (число)», для текстовых — «Значение (текст)».",
      },
      fields: [
        {
          name: "characteristic",
          type: "relationship",
          relationTo: "characteristics",
          label: "Характеристика",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "valueNumber",
              type: "number",
              label: "Значение (число)",
              admin: { width: "50%" },
            },
            localizedArrayText({
              name: "valueText",
              label: "Значение (текст)",
              admin: { width: "50%" },
            }),
          ],
        },
      ],
    },
    {
      name: "specTables",
      type: "array",
      label: "Таблицы характеристик",
      labels: {
        singular: "Таблица",
        plural: "Таблицы",
      },
      admin: {
        description:
          "Необязательно. Технические таблицы на странице товара (под блоком с фото и описанием).",
        initCollapsed: true,
      },
      fields: [
        localizedArrayText({
          name: "title",
          label: "Заголовок таблицы",
          required: true,
        }),
        {
          name: "columns",
          type: "array",
          label: "Колонки",
          labels: {
            singular: "Колонка",
            plural: "Колонки",
          },
          admin: {
            description:
              "Заголовки колонок с данными (без «Параметр»). Оставьте пустым для простой таблицы «параметр — значение».",
          },
          fields: [
            localizedArrayText({
              name: "header",
              label: "Заголовок",
              required: true,
            }),
          ],
        },
        {
          name: "rows",
          type: "array",
          label: "Строки",
          labels: {
            singular: "Строка",
            plural: "Строки",
          },
          fields: [
            {
              name: "kind",
              type: "select",
              label: "Тип строки",
              required: true,
              defaultValue: "data",
              options: [
                { label: "Данные", value: "data" },
                {
                  label: "Строка «параметр — значение» на всю ширину",
                  value: "wide",
                },
                { label: "Подзаголовок секции", value: "section" },
              ],
            },
            localizedArrayText({
              name: "label",
              label: "Параметр / подпись",
            }),
            localizedArrayText({
              name: "wideValue",
              label: "Значение на всю ширину",
              admin: {
                condition: (_, siblingData) => siblingData?.kind === "wide",
              },
            }),
            {
              name: "highlight",
              type: "checkbox",
              label: "Красный фон",
              defaultValue: false,
            },
            {
              name: "accent",
              type: "checkbox",
              label: "Маркер перед подписью",
              defaultValue: false,
            },
            {
              name: "cells",
              type: "array",
              label: "Ячейки",
              labels: {
                singular: "Ячейка",
                plural: "Ячейки",
              },
              admin: {
                condition: (_, siblingData) => siblingData?.kind === "data",
                description:
                  "Одна ячейка на колонку. Несколько значений в ячейке — для многострочных данных.",
              },
              fields: [
                {
                  name: "values",
                  type: "array",
                  label: "Значения",
                  labels: {
                    singular: "Значение",
                    plural: "Значения",
                  },
                  fields: [
                    localizedArrayText({
                      name: "text",
                      label: "Текст",
                      required: true,
                    }),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
