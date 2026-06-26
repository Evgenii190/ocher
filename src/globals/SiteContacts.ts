import type { GlobalConfig } from "payload";
import { localizedArrayText, localizedTextarea } from "@/collections/fields/localized";
import { requestSiteContactsRevalidation } from "@/shared/lib/request-site-contacts-revalidation";

export const SiteContacts: GlobalConfig = {
  slug: "site-contacts",
  label: "Контакты сайта",
  admin: {
    group: "Настройки",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      () => {
        void requestSiteContactsRevalidation();
      },
    ],
  },
  fields: [
    {
      type: "collapsible",
      label: "Шапка сайта",
      fields: [
        {
          name: "headerPhone",
          type: "text",
          label: "Телефон в шапке",
          required: true,
          admin: {
            description: "Отображается в шапке и мобильном меню.",
          },
        },
        {
          name: "headerEmail",
          type: "email",
          label: "Почта в шапке",
          required: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Горячая линия безопасности",
      fields: [
        {
          name: "hotlinePhone",
          type: "text",
          label: "Телефон горячей линии",
          required: true,
        },
        {
          name: "hotlineEmail",
          type: "email",
          label: "Почта горячей линии",
          required: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Подвал сайта",
      fields: [
        {
          name: "generalEmail",
          type: "email",
          label: "Общая почта",
          required: true,
          admin: {
            description: "Блок «Почта» в подвале.",
          },
        },
        {
          name: "commercialEmail",
          type: "email",
          label: "Почта для коммерческих предложений",
          required: true,
        },
        localizedTextarea({
          name: "workingHours",
          label: "Часы работы",
          admin: {
            description: "Каждая строка отображается отдельно.",
          },
        }),
        {
          name: "offices",
          type: "array",
          label: "Офисы по городам",
          labels: {
            singular: "Офис",
            plural: "Офисы",
          },
          admin: {
            description:
              "Контактные телефоны по городам для подвала и страницы контактов.",
          },
          fields: [
            localizedArrayText({
              name: "city",
              label: "Город",
              required: true,
            }),
            {
              name: "phone",
              type: "text",
              label: "Контактный телефон",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
