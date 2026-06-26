import type { CollectionConfig } from "payload";
import {
  localizedArrayText,
  localizedText,
  localizedTextarea,
} from "./fields/localized";
import {
  WORKSHOP_PAGE_SLUGS,
  workshopEquipmentWorkshopOptions,
} from "@/shared/lib/workshops.shared";
import { requestWorkshopRevalidation } from "@/shared/lib/request-workshop-revalidation";

export const WorkshopEquipment: CollectionConfig = {
  slug: "workshop-equipment",
  labels: {
    singular: "Единица оборудования",
    plural: "Парк оборудования",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "workshop", "order"],
    group: "Производство",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        if (typeof doc.workshop === "string") {
          void requestWorkshopRevalidation(doc.workshop);
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        if (typeof doc.workshop === "string") {
          void requestWorkshopRevalidation(doc.workshop);
        }
      },
    ],
  },
  fields: [
    {
      name: "workshop",
      type: "select",
      label: "Цех",
      required: true,
      defaultValue: WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES,
      options: [...workshopEquipmentWorkshopOptions],
      admin: {
        position: "sidebar",
        description: "Цех, к которому относится единица оборудования.",
      },
    },
    localizedText({
      name: "title",
      label: "Заголовок (краткий)",
      required: true,
      admin: {
        description: "Короткое название для карточки в парке оборудования.",
      },
    }),
    localizedText({
      name: "titleFull",
      label: "Заголовок (полный)",
      admin: {
        description:
          "Развёрнутое название для попапа. Если не заполнено — используется краткий заголовок.",
      },
    }),
    localizedTextarea({
      name: "description",
      label: "Описание (краткое)",
      required: true,
      admin: {
        description: "Короткий текст для карточки и левой колонки попапа.",
      },
    }),
    localizedTextarea({
      name: "descriptionLong",
      label: "Описание (развёрнутое)",
      required: true,
      admin: {
        description: "Полный текст для правой колонки попапа «Подробнее».",
      },
    }),
    {
      name: "features",
      type: "array",
      label: "Преимущества",
      labels: {
        singular: "Преимущество",
        plural: "Преимущества",
      },
      admin: {
        description: "Пункты с красной галочкой в попапе.",
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
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Изображение",
      required: true,
    },
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
