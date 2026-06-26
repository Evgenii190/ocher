import type { GlobalConfig } from "payload";
import { siteRichTextEditor } from "@/collections/fields/rich-text-editor";
import { localizedRichText } from "@/collections/fields/localized";
import { requestHomePageRevalidation } from "@/shared/lib/request-home-page-revalidation";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Главная страница",
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
        void requestHomePageRevalidation();
      },
    ],
  },
  fields: [
    localizedRichText({
      name: "aboutContent",
      label: "О заводе",
      admin: {
        description:
          "Текстовый блок внизу главной: заголовки, списки, видео, выделенные блоки и цветовое форматирование.",
      },
      editor: siteRichTextEditor,
    }),
  ],
};
