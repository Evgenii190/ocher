import type { CollectionConfig } from "payload";
import { localizedText } from "./fields/localized";
import { lockedSlugField } from "./fields/slug";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Категория",
    plural: "Категории",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "parent", "order"],
    group: "Каталог",
    description:
      "Корневые категории и их slug заданы статически. Названия и порядок можно менять, slug — нет.",
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
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      label: "Родительская категория",
      admin: {
        description:
          "Оставьте пустым для корневой категории. Заполните, чтобы сделать подкатегорию.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Изображение",
      admin: {
        condition: (data) => Boolean(data?.parent),
        description:
          "Картинка подкатегории для слайдера на главной и других блоков каталога.",
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
