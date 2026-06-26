import type { GlobalConfig } from "payload";
import { siteRichTextEditor } from "@/collections/fields/rich-text-editor";
import {
  localizedArrayText,
  localizedRichText,
  localizedTextarea,
} from "@/collections/fields/localized";
import { workshopSectionOrderField } from "@/globals/fields/workshop-section-order";
import { workshopStockSectionField } from "@/globals/fields/workshop-stock-section";
import type { WorkshopPageSlug } from "@/shared/lib/workshops.shared";
import { requestWorkshopRevalidation } from "@/shared/lib/request-workshop-revalidation";

type CreateWorkshopGlobalOptions = {
  slug: string;
  label: string;
  pageSlug: WorkshopPageSlug;
  pagePath: string;
};

export function createWorkshopGlobal({
  slug,
  label,
  pageSlug,
  pagePath,
}: CreateWorkshopGlobalOptions): GlobalConfig {
  return {
    slug,
    label,
    admin: {
      group: "Производство",
      description: `Страница ${pagePath} — hero, порядок секций, контент. Оборудование — в коллекции «Парк оборудования».`,
    },
    access: {
      read: () => true,
      update: ({ req }) => Boolean(req.user),
    },
    hooks: {
      afterChange: [
        () => {
          void requestWorkshopRevalidation(pageSlug);
        },
      ],
    },
    fields: [
      localizedTextarea({
        name: "heroDescription",
        label: "Описание в hero",
      }),
      {
        name: "heroBackground",
        type: "upload",
        relationTo: "media",
        label: "Фон hero",
      },
      workshopSectionOrderField,
      localizedRichText({
        name: "aboutContent",
        label: "Rich text",
        admin: {
          description:
            "Rich text: заголовки, текст, слайдер изображений, видео, callout.",
        },
        editor: siteRichTextEditor,
      }),
      workshopStockSectionField,
      {
        name: "advantageBlocks",
        type: "array",
        label: "Блоки преимуществ",
        labels: {
          singular: "Блок",
          plural: "Блоки",
        },
        admin: {
          description:
            "Карточки («Передовое оснащение» и др.). Количество произвольное.",
        },
        fields: [
          localizedArrayText({
            name: "title",
            label: "Заголовок",
            required: true,
          }),
          localizedArrayText({
            name: "description",
            label: "Текст",
            required: true,
          }),
        ],
      },
    ],
  };
}
