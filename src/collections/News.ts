import type { CollectionConfig } from "payload";
import { requestNewsRevalidation } from "@/shared/lib/request-news-revalidation";
import {
  localizedRichText,
  localizedText,
  localizedTextarea,
} from "./fields/localized";
import { siteRichTextEditor } from "./fields/rich-text-editor";
import { slugField } from "./fields/slug";

export const News: CollectionConfig = {
  slug: "news",
  labels: {
    singular: "Новость",
    plural: "Новости",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "isActive"],
    group: "Новости",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        void requestNewsRevalidation();
      },
    ],
  },
  fields: [
    localizedText({
      name: "title",
      label: "Заголовок",
      required: true,
    }),
    slugField("title"),
    localizedTextarea({
      name: "description",
      label: "Краткое описание",
      admin: {
        description: "Текст для карточки новости в списке и на главной.",
      },
    }),
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Изображение для карточки",
      admin: {
        description: "Превью в сетке и карусели новостей.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "news-categories",
      label: "Категория",
      required: true,
    },
    localizedRichText({
      name: "content",
      label: "Текст новости",
      admin: {
        description:
          "Полный текст: заголовки, списки, изображения, видео, выделение и цветовое форматирование.",
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
      label: "Опубликована",
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
