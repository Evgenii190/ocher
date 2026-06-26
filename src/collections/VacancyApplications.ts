import type { CollectionConfig } from "payload";

export const VacancyApplications: CollectionConfig = {
  slug: "vacancy-applications",
  labels: {
    singular: "Отклик на вакансию",
    plural: "Отклики на вакансии",
  },
  admin: {
    useAsTitle: "applicantName",
    defaultColumns: [
      "applicantName",
      "vacancyTitle",
      "categoryTitle",
      "phone",
      "status",
      "createdAt",
    ],
    group: "Вакансии",
    description: "Заявки кандидатов с привязкой к конкретной вакансии.",
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "vacancy",
      type: "relationship",
      relationTo: "vacancies",
      label: "Вакансия",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "vacancyTitle",
      type: "text",
      label: "Название вакансии",
      required: true,
      admin: {
        readOnly: true,
        description: "Сохраняется при отправке отклика для истории.",
      },
    },
    {
      name: "categoryTitle",
      type: "text",
      label: "Категория",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "applicantName",
      type: "text",
      label: "Ф.И.О.",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Телефон",
      required: true,
    },
    {
      name: "about",
      type: "textarea",
      label: "О себе",
      required: true,
    },
    {
      name: "resume",
      type: "upload",
      relationTo: "documents",
      label: "Резюме",
    },
    {
      name: "status",
      type: "select",
      label: "Статус",
      defaultValue: "new",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Новый", value: "new" },
        { label: "Просмотрен", value: "viewed" },
        { label: "Связались", value: "contacted" },
        { label: "Отклонён", value: "rejected" },
      ],
    },
  ],
};
