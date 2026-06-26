"use client";

import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import {
  type JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState, SerializedTextNode } from "lexical";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import {
  getRichTextCalloutClassName,
  getRichTextStateStyles,
  type RichTextCalloutVariant,
} from "@/shared/lib/rich-text-colors";
import {
  getRichTextImageFigureClassName,
  getRichTextImageSizesAttr,
  shouldUseIntrinsicImageLayout,
  type RichTextImageDisplayOptions,
} from "@/shared/lib/rich-text-image-styles";
import {
  headingAppearance,
  textBodyLg,
  typeSubtitle,
  textTitle,
} from "@/shared/ui/typography";
import { gapContent, gapHeading } from "@/shared/ui/spacing";
import { RichTextImageSlider } from "@/shared/components/rich-text-image-slider";

type MediaDoc = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
};

type VacancyImageBlockFields = {
  blockType: "vacancyImage";
  image?: MediaDoc | number | string | null;
  /** @deprecated используйте aspect */
  variant?: "hero" | "banner" | null;
  size?: RichTextImageDisplayOptions["size"];
  aspect?: RichTextImageDisplayOptions["aspect"];
  align?: RichTextImageDisplayOptions["align"];
  caption?: string | null;
};

type VacancyTwoColumnsBlockFields = {
  blockType: "vacancyTwoColumns";
  leftTitle?: string | null;
  rightTitle?: string | null;
  leftItems?: { text?: string | null; id?: string | null }[] | null;
  rightItems?: { text?: string | null; id?: string | null }[] | null;
};

type RichTextVideoBlockFields = {
  blockType: "richTextVideo";
  video?: MediaDoc | number | string | null;
  size?: RichTextImageDisplayOptions["size"];
  aspect?: RichTextImageDisplayOptions["aspect"];
  caption?: string | null;
};

type RichTextCalloutBlockFields = {
  blockType: "richTextCallout";
  variant?: RichTextCalloutVariant | null;
  title?: string | null;
  body?: string | null;
};

type RichTextImageSliderBlockFields = {
  blockType: "richTextImageSlider";
  slidesPerView?: string | number | null;
  slides?:
    | {
        image?: MediaDoc | number | string | null;
        alt?: string | null;
        id?: string | null;
      }[]
    | null;
};

type SiteRichTextNodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | VacancyImageBlockFields
      | VacancyTwoColumnsBlockFields
      | RichTextVideoBlockFields
      | RichTextCalloutBlockFields
      | RichTextImageSliderBlockFields
    >
  | SerializedUploadNode;

/** Предотвращает горизонтальный скролл от длинных слов, URL и названий в flex-раскладке. */
const richTextWrap = "min-w-0 max-w-full [overflow-wrap:anywhere] hyphens-auto";

const TEXT_FORMAT = {
  IS_BOLD: 1,
  IS_ITALIC: 2,
  IS_STRIKETHROUGH: 4,
  IS_UNDERLINE: 8,
  IS_CODE: 16,
  IS_SUBSCRIPT: 32,
  IS_SUPERSCRIPT: 64,
} as const;

function resolveMedia(
  value: MediaDoc | number | string | null | undefined,
): MediaDoc | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  return value;
}

function applyTextFormat(content: ReactNode, format: number): ReactNode {
  let result = content;

  if (format & TEXT_FORMAT.IS_BOLD) {
    result = <strong>{result}</strong>;
  }
  if (format & TEXT_FORMAT.IS_ITALIC) {
    result = <em>{result}</em>;
  }
  if (format & TEXT_FORMAT.IS_STRIKETHROUGH) {
    result = <span style={{ textDecoration: "line-through" }}>{result}</span>;
  }
  if (format & TEXT_FORMAT.IS_UNDERLINE) {
    result = <span style={{ textDecoration: "underline" }}>{result}</span>;
  }
  if (format & TEXT_FORMAT.IS_CODE) {
    result = <code className="break-all whitespace-pre-wrap">{result}</code>;
  }
  if (format & TEXT_FORMAT.IS_SUBSCRIPT) {
    result = <sub>{result}</sub>;
  }
  if (format & TEXT_FORMAT.IS_SUPERSCRIPT) {
    result = <sup>{result}</sup>;
  }

  return result;
}

function ColumnList({
  title,
  items,
}: {
  title?: string | null;
  items?: { text?: string | null }[] | null;
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {title ? (
        <h3 className={cn(headingAppearance, typeSubtitle, "text-foreground")}>
          {title}
        </h3>
      ) : null}
      <ul className="flex flex-col gap-2">
        {items.map((item) =>
          item.text ? (
            <li
              key={item.text}
              className={cn(
                textBodyLg,
                richTextWrap,
                "leading-[1.59] text-foreground/85",
              )}
            >
              <span className="mr-2 text-primary">—</span>
              {item.text}
            </li>
          ) : null,
        )}
      </ul>
    </div>
  );
}

function normalizeImageDisplayOptions(
  options: RichTextImageDisplayOptions & { variant?: "hero" | "banner" | null },
): RichTextImageDisplayOptions {
  if (options.aspect) {
    return options;
  }

  if (options.variant === "banner") {
    return { ...options, aspect: "banner" };
  }

  if (options.variant === "hero") {
    return { ...options, aspect: "wide" };
  }

  return { ...options, aspect: options.aspect ?? "wide" };
}

function RichTextImageFigure({
  media,
  display,
  priority = false,
}: {
  media: MediaDoc;
  display: RichTextImageDisplayOptions & { variant?: "hero" | "banner" | null };
  priority?: boolean;
}) {
  if (!media.url) {
    return null;
  }

  const options = normalizeImageDisplayOptions(display);
  const size = options.size ?? "full";
  const aspect = options.aspect ?? "wide";
  const caption = options.caption;
  const alt = media.alt ?? caption ?? "";
  const figureClassName = getRichTextImageFigureClassName(options);
  const sizes = getRichTextImageSizesAttr(size);

  if (shouldUseIntrinsicImageLayout(aspect, media)) {
    return (
      <figure className={figureClassName}>
        <Image
          src={media.url}
          alt={alt}
          width={media.width ?? 1200}
          height={media.height ?? 800}
          sizes={sizes}
          className="h-auto w-full object-contain"
          priority={priority}
        />
        {caption ? (
          <figcaption className={cn(textBodyLg, "mt-2 text-foreground/70")}>
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={figureClassName}>
      <Image
        src={media.url}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
      {caption ? (
        <figcaption
          className={cn(
            textBodyLg,
            "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/50 to-transparent px-5 py-4 text-white",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function RichTextVideoFigure({
  media,
  display,
}: {
  media: MediaDoc;
  display: RichTextImageDisplayOptions;
}) {
  const t = useTranslations("common");

  if (!media.url) {
    return null;
  }

  const options = normalizeImageDisplayOptions(display);
  const figureClassName = cn(
    getRichTextImageFigureClassName(options),
    "bg-black",
  );
  const caption = options.caption;

  return (
    <figure className="flex w-full flex-col gap-2">
      <div className={figureClassName}>
        <video
          src={media.url}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={media.alt ?? caption ?? t("videoProductionAlt")}
        >
          <track kind="captions" />
        </video>
      </div>
      {caption ? (
        <figcaption className={cn(textBodyLg, "text-foreground/70")}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function VacancyImageFigure({
  image,
  size,
  aspect,
  align,
  caption,
  variant,
}: VacancyImageBlockFields) {
  const media = resolveMedia(image);
  if (!media) {
    return null;
  }

  return (
    <RichTextImageFigure
      media={media}
      display={{ size, aspect, align, caption, variant }}
      priority={aspect === "wide" || variant === "hero"}
    />
  );
}

function RichTextVideoBlockFigure({
  video,
  size,
  aspect,
  caption,
}: RichTextVideoBlockFields) {
  const media = resolveMedia(video);
  if (!media) {
    return null;
  }

  return (
    <RichTextVideoFigure
      media={media}
      display={{ size, aspect: aspect ?? "video", caption }}
    />
  );
}

function RichTextCallout({ variant, title, body }: RichTextCalloutBlockFields) {
  if (!body) {
    return null;
  }

  return (
    <aside
      className={cn(
        richTextWrap,
        "rounded-2xl border px-6 py-5 md:px-8 md:py-6",
        getRichTextCalloutClassName(variant),
      )}
    >
      {title ? (
        <h3
          className={cn(
            headingAppearance,
            typeSubtitle,
            richTextWrap,
            "mb-3 text-foreground",
          )}
        >
          {title}
        </h3>
      ) : null}
      <p
        className={cn(
          textBodyLg,
          richTextWrap,
          "leading-[1.59] text-foreground/85",
        )}
      >
        {body}
      </p>
    </aside>
  );
}

function RichTextImageSliderBlockView({
  slides,
  slidesPerView,
}: RichTextImageSliderBlockFields) {
  if (!slides?.length) {
    return null;
  }

  const resolvedSlides = slides.flatMap((slide) => {
    const media = resolveMedia(slide.image);
    if (!media?.url) {
      return [];
    }

    return [
      {
        url: media.url,
        alt: slide.alt ?? media.alt ?? "",
      },
    ];
  });

  return (
    <RichTextImageSlider
      slides={resolvedSlides}
      slidesPerView={slidesPerView}
    />
  );
}

const siteRichTextConverters: JSXConvertersFunction<SiteRichTextNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag;
    const isH2 = Tag === "h2";

    return (
      <Tag
        className={cn(
          richTextWrap,
          "font-heading uppercase tracking-[-5%] text-balance text-foreground not-first:mt-2",
          isH2
            ? cn(
                "font-heading uppercase tracking-[-5%] leading-tight",
                textTitle,
              )
            : cn(typeSubtitle, "font-bold leading-tight"),
        )}
      >
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    );
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    if (!children?.length) {
      return null;
    }
    return (
      <p
        className={cn(
          textBodyLg,
          richTextWrap,
          "leading-[1.59] text-foreground/85",
        )}
      >
        {children}
      </p>
    );
  },
  list: ({ node, nodesToJSX }) => {
    const Tag = node.tag;
    return (
      <Tag className="flex flex-col gap-2">
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    );
  },
  listitem: ({ node, nodesToJSX }) => (
    <li
      className={cn(
        textBodyLg,
        richTextWrap,
        "leading-[1.59] text-foreground/85",
      )}
    >
      <span className="mr-2 text-primary">—</span>
      {nodesToJSX({ nodes: node.children })}
    </li>
  ),
  text: ({ node }) => {
    const textNode = node as SerializedTextNode & {
      $?: Record<string, string>;
    };
    let content: ReactNode = textNode.text;
    content = applyTextFormat(content, textNode.format);

    const stateStyles = getRichTextStateStyles(textNode);
    if (stateStyles) {
      content = <span style={stateStyles}>{content}</span>;
    }

    return content;
  },
  upload: ({ node }) => {
    const uploadNode = node as SerializedUploadNode;
    if (typeof uploadNode.value !== "object" || !uploadNode.value) {
      return null;
    }

    const media = uploadNode.value as MediaDoc;
    const fields = (uploadNode.fields ?? {}) as RichTextImageDisplayOptions & {
      variant?: "hero" | "banner" | null;
    };

    if (media.mimeType?.startsWith("video/")) {
      return (
        <RichTextVideoFigure
          media={media}
          display={{
            size: fields.size,
            aspect: fields.aspect ?? "video",
            align: fields.align,
            caption: fields.caption,
          }}
        />
      );
    }

    if (media.mimeType && !media.mimeType.startsWith("image/")) {
      return null;
    }

    return (
      <RichTextImageFigure
        media={media}
        display={{
          size: fields.size,
          aspect: fields.aspect,
          align: fields.align,
          caption: fields.caption,
          variant: fields.variant,
        }}
      />
    );
  },
  blocks: {
    vacancyImage: ({ node }) => {
      const fields = node.fields as VacancyImageBlockFields;
      return <VacancyImageFigure {...fields} />;
    },
    vacancyTwoColumns: ({ node }) => {
      const fields = node.fields as VacancyTwoColumnsBlockFields;
      return (
        <div className="grid gap-content md:grid-cols-2">
          <ColumnList title={fields.leftTitle} items={fields.leftItems} />
          <ColumnList title={fields.rightTitle} items={fields.rightItems} />
        </div>
      );
    },
    richTextVideo: ({ node }) => {
      const fields = node.fields as RichTextVideoBlockFields;
      return <RichTextVideoBlockFigure {...fields} />;
    },
    richTextCallout: ({ node }) => {
      const fields = node.fields as RichTextCalloutBlockFields;
      return <RichTextCallout {...fields} />;
    },
    richTextImageSlider: ({ node }) => {
      const fields = node.fields as RichTextImageSliderBlockFields;
      return <RichTextImageSliderBlockView {...fields} />;
    },
  },
});

type PayloadRichTextProps = {
  content: SerializedEditorState | null | undefined;
  className?: string;
};

export function PayloadRichText({ content, className }: PayloadRichTextProps) {
  const locale = useLocale();

  if (!content) {
    return null;
  }

  return (
    <div
      lang={locale}
      className={cn(
        richTextWrap,
        "flex w-full flex-col",
        gapHeading,
        className,
      )}
    >
      <RichText
        data={content}
        converters={siteRichTextConverters}
        className={cn(richTextWrap, "flex w-full flex-col", gapContent)}
      />
    </div>
  );
}
