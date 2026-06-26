import type { CollectionConfig } from "payload";
import { localizedText } from "./fields/localized";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/*", "video/*"],
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
      name: "alt",
      label: "Альтернативный текст",
    }),
  ],
};
