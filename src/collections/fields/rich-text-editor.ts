import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
  TextStateFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
import { richTextEditorState } from "@/shared/lib/rich-text-colors";
import {
  RichTextCalloutBlock,
  RichTextImageSliderBlock,
  RichTextTwoColumnsBlock,
  RichTextVideoBlock,
  VacancyImageBlock,
} from "../blocks/rich-text-blocks";
import { richTextImageDisplayFields } from "./rich-text-image-fields";

const replacedDefaultFeatureKeys = new Set(["heading", "upload"]);

/** Общий редактор rich text: заголовки, цвета, изображения, видео, колонки, callout */
export const siteRichTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter(
      (feature) => !replacedDefaultFeatureKeys.has(feature.key),
    ),
    FixedToolbarFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
    TextStateFeature({
      state: richTextEditorState,
    }),
    UploadFeature({
      collections: {
        media: {
          fields: richTextImageDisplayFields,
        },
      },
    }),
    BlocksFeature({
      blocks: [
        VacancyImageBlock,
        RichTextVideoBlock,
        RichTextTwoColumnsBlock,
        RichTextCalloutBlock,
        RichTextImageSliderBlock,
      ],
    }),
  ],
});
