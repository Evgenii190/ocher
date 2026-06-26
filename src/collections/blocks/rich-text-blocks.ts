import type { Block } from "payload";
import { richTextCalloutVariantOptions } from "@/shared/lib/rich-text-colors";
import { richTextSliderPerViewOptions } from "@/shared/lib/rich-text-slider.shared";
import { richTextImageAspectOptions } from "@/shared/lib/rich-text-image-styles";
import {
  localizedArrayText,
  localizedText,
  localizedTextarea,
} from "../fields/localized";
import {
  richTextImageDisplayFields,
  richTextImageSizeField,
} from "../fields/rich-text-image-fields";

export const VacancyImageBlock: Block = {
  slug: "vacancyImage",
  labels: {
    singular: "Изображение",
    plural: "Изображения",
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Изображение",
    },
    ...richTextImageDisplayFields,
  ],
};

export const RichTextTwoColumnsBlock: Block = {
  slug: "vacancyTwoColumns",
  labels: {
    singular: "Две колонки",
    plural: "Две колонки",
  },
  fields: [
    localizedText({
      name: "leftTitle",
      label: "Заголовок слева",
    }),
    {
      name: "leftItems",
      type: "array",
      label: "Список слева",
      admin: {
        initCollapsed: true,
      },
      fields: [
        localizedArrayText({
          name: "text",
          required: true,
          label: "Пункт",
        }),
      ],
    },
    localizedText({
      name: "rightTitle",
      label: "Заголовок справа",
    }),
    {
      name: "rightItems",
      type: "array",
      label: "Список справа",
      admin: {
        initCollapsed: true,
      },
      fields: [
        localizedArrayText({
          name: "text",
          required: true,
          label: "Пункт",
        }),
      ],
    },
  ],
};

/** @deprecated алиас для обратной совместимости seed/CMS */
export const VacancyTwoColumnsBlock = RichTextTwoColumnsBlock;

export const RichTextVideoBlock: Block = {
  slug: "richTextVideo",
  labels: {
    singular: "Видео",
    plural: "Видео",
  },
  fields: [
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Видеофайл",
    },
    richTextImageSizeField,
    {
      name: "aspect",
      type: "select",
      label: "Пропорции",
      defaultValue: "video",
      options: richTextImageAspectOptions.filter((option) =>
        ["wide", "video", "banner"].includes(option.value),
      ),
    },
    localizedText({
      name: "caption",
      label: "Подпись",
    }),
  ],
};

export const RichTextCalloutBlock: Block = {
  slug: "richTextCallout",
  labels: {
    singular: "Выделенный блок",
    plural: "Выделенные блоки",
  },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Цвет",
      defaultValue: "primary",
      options: [...richTextCalloutVariantOptions],
    },
    localizedText({
      name: "title",
      label: "Заголовок",
    }),
    localizedTextarea({
      name: "body",
      required: true,
      label: "Текст",
    }),
  ],
};

export const RichTextImageSliderBlock: Block = {
  slug: "richTextImageSlider",
  labels: {
    singular: "Слайдер изображений",
    plural: "Слайдеры изображений",
  },
  fields: [
    {
      name: "slidesPerView",
      type: "select",
      label: "Слайдов в ряд",
      defaultValue: "3",
      options: [...richTextSliderPerViewOptions],
      admin: {
        description:
          "Сколько изображений видно одновременно на широком экране: от 1 (100%) до 4 (25%).",
      },
    },
    {
      name: "slides",
      type: "array",
      label: "Слайды",
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      labels: {
        singular: "Слайд",
        plural: "Слайды",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Изображение",
        },
        localizedArrayText({
          name: "alt",
          label: "Подпись (alt)",
        }),
      ],
    },
  ],
};
