import type { GlobalConfig } from "payload";
import { localizedArrayText, localizedText } from "@/collections/fields/localized";
import { requestProcurementRevalidation } from "@/shared/lib/request-procurement-revalidation";

export const Procurement: GlobalConfig = {
  slug: "procurement",
  label: "Закупки",
  admin: {
    group: "Страницы",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      () => {
        void requestProcurementRevalidation();
      },
    ],
  },
  fields: [
    localizedText({
      name: "pageTitle",
      label: "Заголовок страницы",
      defaultValue: "Закупки",
      required: true,
    }),
    {
      name: "entries",
      type: "array",
      label: "Таблица закупок",
      labels: {
        singular: "Позиция",
        plural: "Позиции",
      },
      admin: {
        description:
          "Порядковый номер проставляется автоматически. Для группы укажите заголовок без номера (например, «Дробь:») и несколько позиций с количеством.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "kind",
          type: "select",
          label: "Тип",
          required: true,
          defaultValue: "row",
          options: [
            { label: "Группа", value: "group" },
            { label: "Строка", value: "row" },
          ],
        },
        localizedArrayText({
          name: "groupTitle",
          label: "Заголовок группы",
          admin: {
            condition: (_, siblingData) => siblingData?.kind === "group",
            description:
              "Без номера — на сайте будет «1. Дробь:», «2. …» и т.д.",
          },
        }),
        {
          name: "items",
          type: "array",
          label: "Позиции группы",
          labels: {
            singular: "Позиция",
            plural: "Позиции",
          },
          admin: {
            condition: (_, siblingData) => siblingData?.kind === "group",
          },
          fields: [
            localizedArrayText({
              name: "name",
              label: "Наименование",
              required: true,
            }),
            localizedArrayText({
              name: "quantity",
              label: "Количество",
            }),
          ],
        },
        localizedArrayText({
          name: "name",
          label: "Наименование",
          admin: {
            condition: (_, siblingData) => siblingData?.kind === "row",
            description: "Без номера — номер добавится на сайте автоматически.",
          },
        }),
        localizedArrayText({
          name: "quantity",
          label: "Количество",
          admin: {
            condition: (_, siblingData) => siblingData?.kind === "row",
          },
        }),
      ],
    },
  ],
};
