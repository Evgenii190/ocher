import type { Field } from "payload";
import { localizedArrayText, localizedText } from "./localized";
import {
  richTextImageAlignOptions,
  richTextImageAspectOptions,
  richTextImageSizeOptions,
} from "@/shared/lib/rich-text-image-styles";

export const richTextImageSizeField: Field = {
  name: "size",
  type: "select",
  label: "Ширина",
  defaultValue: "full",
  options: [...richTextImageSizeOptions],
};

export const richTextImageAspectField: Field = {
  name: "aspect",
  type: "select",
  label: "Пропорции",
  defaultValue: "wide",
  options: [...richTextImageAspectOptions],
};

export const richTextImageAlignField: Field = {
  name: "align",
  type: "select",
  label: "Выравнивание",
  defaultValue: "left",
  admin: {
    condition: (_, siblingData) =>
      siblingData?.size != null && siblingData.size !== "full",
  },
  options: [...richTextImageAlignOptions],
};

export const richTextImageCaptionField: Field = localizedText({
  name: "caption",
  label: "Подпись",
});

export const richTextImageDisplayFields: Field[] = [
  richTextImageSizeField,
  richTextImageAspectField,
  richTextImageAlignField,
  richTextImageCaptionField,
];
