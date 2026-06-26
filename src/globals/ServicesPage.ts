import type { GlobalConfig } from "payload";
import { siteRichTextEditor } from "@/collections/fields/rich-text-editor";
import {
  localizedRichText,
  localizedText,
} from "@/collections/fields/localized";
import { requestServicesRevalidation } from "@/shared/lib/request-services-revalidation";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: "Страница «Услуги»",
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
        void requestServicesRevalidation();
      },
    ],
  },
  fields: [
    localizedText({
      name: "pageTitle",
      label: "Заголовок страницы",
      defaultValue: "Услуги",
      required: true,
    }),
    localizedText({
      name: "cardsSectionTitle",
      label: "Заголовок блока карточек",
      defaultValue: "Услуги",
      required: true,
    }),
    localizedRichText({
      name: "bottomContent",
      label: "Текстовый блок под карточками",
      editor: siteRichTextEditor,
    }),
  ],
};
