import type { CollectionConfig } from "payload";
import { siteRichTextEditor } from "@/collections/fields/rich-text-editor";
import {
  localizedArrayText,
  localizedRichText,
  localizedText,
  localizedTextarea,
} from "./fields/localized";
import { requestServicesRevalidation } from "@/shared/lib/request-services-revalidation";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Услуга",
    plural: "Услуги",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order"],
    group: "Страницы",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      () => {
        void requestServicesRevalidation();
      },
    ],
    afterDelete: [
      () => {
        void requestServicesRevalidation();
      },
    ],
  },
  fields: [
    localizedText({
      name: "title",
      label: "Заголовок карточки",
      required: true,
    }),
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "Используется в URL, например pump-rods-repair",
      },
    },
    localizedTextarea({
      name: "description",
      label: "Описание карточки",
      required: true,
    }),
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Изображение карточки",
      required: true,
    },
    localizedText({
      name: "heroTitle",
      label: "Заголовок hero",
    }),
    localizedTextarea({
      name: "heroDescription",
      label: "Текст hero",
    }),
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Фон hero",
    },
    localizedRichText({
      name: "pageContent",
      label: "Контент страницы",
      editor: siteRichTextEditor,
    }),
    {
      name: "specs",
      type: "array",
      label: "Характеристики",
      labels: {
        singular: "Характеристика",
        plural: "Характеристики",
      },
      fields: [
        localizedArrayText({
          name: "label",
          label: "Название",
          required: true,
        }),
        localizedArrayText({
          name: "value",
          label: "Значение",
          required: true,
        }),
      ],
    },
    {
      name: "advantages",
      type: "array",
      label: "Преимущества",
      labels: {
        singular: "Преимущество",
        plural: "Преимущества",
      },
      fields: [
        localizedArrayText({
          name: "text",
          label: "Текст",
          required: true,
        }),
      ],
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
