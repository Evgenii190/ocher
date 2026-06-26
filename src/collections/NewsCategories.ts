import type { CollectionConfig } from "payload";
import { requestNewsRevalidation } from "@/shared/lib/request-news-revalidation";
import { localizedText } from "./fields/localized";
import { lockedSlugField } from "./fields/slug";

export const NewsCategories: CollectionConfig = {
  slug: "news-categories",
  labels: {
    singular: "Категория новостей",
    plural: "Категории новостей",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
    group: "Новости",
    description:
      "Рубрики пресс-центра: «Жизнь завода», «Производство» и другие. Фильтр «все» на сайте не требует отдельной записи.",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        void requestNewsRevalidation();
      },
    ],
  },
  fields: [
    localizedText({
      name: "title",
      label: "Название",
      required: true,
    }),
    lockedSlugField("title"),
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
};
