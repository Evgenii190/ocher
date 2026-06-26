import type { CollectionConfig } from "payload";
import { localizedText } from "./fields/localized";

export const Documents: CollectionConfig = {
  slug: "documents",
  labels: {
    singular: "Документ",
    plural: "Документы",
  },
  upload: {
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/rtf",
      "text/rtf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/zip",
      "text/plain",
    ],
  },
  admin: {
    useAsTitle: "filename",
    group: "Каталог",
  },
  access: {
    read: () => true,
  },
  fields: [
    localizedText({
      name: "title",
      label: "Название для отображения",
      admin: {
        description: "Если пусто — используется имя файла.",
      },
    }),
  ],
};
