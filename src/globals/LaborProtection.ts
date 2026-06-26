import type { GlobalConfig } from "payload";
import { localizedArrayText } from "@/collections/fields/localized";
import { requestLaborProtectionRevalidation } from "@/shared/lib/request-labor-protection-revalidation";

export const LaborProtection: GlobalConfig = {
  slug: "labor-protection",
  label: "Охрана труда",
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
        void requestLaborProtectionRevalidation();
      },
    ],
  },
  fields: [
    {
      name: "documents",
      type: "array",
      label: "Документы",
      labels: {
        singular: "Документ",
        plural: "Документы",
      },
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: "file",
          type: "upload",
          relationTo: "documents",
          label: "Файл",
          required: true,
        },
        localizedArrayText({
          name: "title",
          label: "Название",
          required: true,
        }),
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
    },
  ],
};
