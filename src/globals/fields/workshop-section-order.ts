import type { Field } from "payload";
import {
  DEFAULT_WORKSHOP_SECTION_ORDER,
  WORKSHOP_SECTION_OPTIONS,
} from "@/shared/lib/workshop-sections.shared";

export const workshopSectionOrderField: Field = {
  name: "sectionOrder",
  type: "array",
  label: "Порядок секций после hero",
  labels: {
    singular: "Секция",
    plural: "Секции",
  },
  admin: {
    description:
      "Перетаскивайте строки, чтобы изменить порядок блоков на странице. Каждый тип секции можно использовать один раз.",
    initCollapsed: false,
  },
  defaultValue: DEFAULT_WORKSHOP_SECTION_ORDER.map((section) => ({ section })),
  fields: [
    {
      name: "section",
      type: "select",
      label: "Блок",
      required: true,
      options: [...WORKSHOP_SECTION_OPTIONS],
    },
  ],
};
