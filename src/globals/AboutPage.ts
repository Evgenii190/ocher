import type { GlobalConfig } from "payload";
import { localizedRichText } from "@/collections/fields/localized";
import { siteRichTextEditor } from "@/collections/fields/rich-text-editor";
import { requestAboutPageRevalidation } from "@/shared/lib/request-about-page-revalidation";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "Страница «О компании»",
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
        void requestAboutPageRevalidation();
      },
    ],
  },
  fields: [
    localizedRichText({
      name: "bottomContent",
      label: "Текстовый блок внизу страницы",
      admin: {
        description:
          "Rich-текст под блоком каталога: заголовки, списки, видео и выделенные блоки.",
      },
      editor: siteRichTextEditor,
    }),
  ],
};
