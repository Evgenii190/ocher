import { cn } from "@/shared/lib/utils";

export const richTextImageSizeOptions = [
  { label: "На всю ширину", value: "full" },
  { label: "Большая — 75%", value: "large" },
  { label: "Средняя — 50%", value: "medium" },
  { label: "Малая — 33%", value: "small" },
] as const;

export const richTextImageAspectOptions = [
  { label: "Широкая (hero)", value: "wide" },
  { label: "Banner", value: "banner" },
  { label: "16:9", value: "video" },
  { label: "По изображению", value: "auto" },
] as const;

export const richTextImageAlignOptions = [
  { label: "По левому краю", value: "left" },
  { label: "По центру", value: "center" },
  { label: "По правому краю", value: "right" },
] as const;

export type RichTextImageSize =
  (typeof richTextImageSizeOptions)[number]["value"];
export type RichTextImageAspect =
  (typeof richTextImageAspectOptions)[number]["value"];
export type RichTextImageAlign =
  (typeof richTextImageAlignOptions)[number]["value"];

export type RichTextImageDisplayOptions = {
  size?: RichTextImageSize | null;
  aspect?: RichTextImageAspect | null;
  align?: RichTextImageAlign | null;
  caption?: string | null;
};

const sizeClassNames: Record<RichTextImageSize, string> = {
  full: "w-full max-w-full",
  large: "w-full max-w-[75%]",
  medium: "w-full max-w-[50%]",
  small: "w-full max-w-[33%] min-w-[200px]",
};

const aspectClassNames: Record<Exclude<RichTextImageAspect, "auto">, string> = {
  wide: "aspect-[1439/788]",
  banner: "aspect-[1440/811]",
  video: "aspect-video",
};

const alignClassNames: Record<RichTextImageAlign, string> = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

type MediaDimensions = {
  width?: number | null;
  height?: number | null;
};

export function getRichTextImageFigureClassName(
  options: RichTextImageDisplayOptions,
): string {
  const size = options.size ?? "full";
  const aspect = options.aspect ?? "wide";
  const align = options.align ?? "left";

  return cn(
    "relative overflow-hidden",
    sizeClassNames[size],
    size !== "full" ? alignClassNames[align] : null,
    aspect !== "auto" ? aspectClassNames[aspect] : null,
  );
}

export function getRichTextImageSizesAttr(
  size: RichTextImageSize = "full",
): string {
  switch (size) {
    case "large":
      return "(max-width: 768px) 100vw, 960px";
    case "medium":
      return "(max-width: 768px) 100vw, 640px";
    case "small":
      return "(max-width: 768px) 100vw, 420px";
    default:
      return "(max-width: 768px) 100vw, 1280px";
  }
}

export function shouldUseIntrinsicImageLayout(
  aspect: RichTextImageAspect | null | undefined,
  media: MediaDimensions,
): boolean {
  return (
    aspect === "auto" &&
    media.width != null &&
    media.height != null &&
    media.width > 0 &&
    media.height > 0
  );
}
