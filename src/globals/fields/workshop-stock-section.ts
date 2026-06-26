import type { Field } from "payload";
import { localizedArrayText, localizedText } from "@/collections/fields/localized";

export const workshopStockSectionField: Field = {
  name: "stockSection",
  type: "group",
  label: "Складской остаток",
  admin: {
    description:
      "Слайдер карточек с фоновым изображением, заголовком и значением (например, «290 м.п.»).",
  },
  fields: [
    localizedText({
      name: "title",
      label: "Заголовок секции",
      admin: {
        description:
          "Заполняйте, если секция «Складской остаток» включена в порядок секций.",
      },
    }),
    {
      name: "items",
      type: "array",
      label: "Карточки слайдера",
      labels: {
        singular: "Карточка",
        plural: "Карточки",
      },
      fields: [
        localizedArrayText({
          name: "title",
          label: "Название",
          required: true,
        }),
        localizedArrayText({
          name: "value",
          label: "Значение",
          required: true,
          admin: {
            description: "Например: 290 м.п.",
          },
        }),
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Фон карточки",
          required: true,
        },
      ],
    },
  ],
};
