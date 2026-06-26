import type { GlobalConfig } from "payload";
import { localizedArrayText } from "@/collections/fields/localized";
import { requestCertificatesRevalidation } from "@/shared/lib/request-certificates-revalidation";

export const CertificatesPage: GlobalConfig = {
  slug: "certificates-page",
  label: "Сертификаты",
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
        void requestCertificatesRevalidation();
      },
    ],
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Сертификаты",
      labels: {
        singular: "Сертификат",
        plural: "Сертификаты",
      },
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: "slug",
          type: "text",
          label: "Slug",
          required: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Изображение",
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
