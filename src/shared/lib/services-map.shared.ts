import type { ServiceSpec, ServiceView } from "./services.shared";

export type MediaDoc = {
  url?: string | null;
  alt?: string | null;
};

type RawSpec = {
  label?: string | null;
  value?: string | null;
};

type RawAdvantage = {
  text?: string | null;
};

export type RawService = {
  slug?: string | null;
  title?: string | null;
  description?: string | null;
  image?: MediaDoc | number | string | null;
  heroTitle?: string | null;
  heroDescription?: string | null;
  heroImage?: MediaDoc | number | string | null;
  pageContent?: unknown;
  specs?: RawSpec[] | null;
  advantages?: RawAdvantage[] | null;
  order?: number | null;
};

function resolveMedia(
  media: MediaDoc | number | string | null | undefined,
  fallbackAlt: string,
): { imageUrl: string; imageAlt: string } | null {
  if (!media || typeof media !== "object") {
    return null;
  }

  const url = media.url?.trim();
  if (!url) {
    return null;
  }

  return {
    imageUrl: url,
    imageAlt: media.alt?.trim() || fallbackAlt,
  };
}

function mapSpecs(specs: RawSpec[] | null | undefined): ServiceSpec[] {
  return (specs ?? [])
    .map((spec) => {
      const label = spec.label?.trim();
      const value = spec.value?.trim();
      if (!label || !value) {
        return null;
      }

      return { label, value };
    })
    .filter((spec): spec is ServiceSpec => spec !== null);
}

function mapAdvantages(
  advantages: RawAdvantage[] | null | undefined,
): string[] {
  return (advantages ?? [])
    .map((item) => item.text?.trim())
    .filter((text): text is string => Boolean(text));
}

export function mapServiceBase(doc: RawService): ServiceView | null {
  const slug = doc.slug?.trim();
  const title = doc.title?.trim();
  const description = doc.description?.trim();

  if (!slug || !title || !description) {
    return null;
  }

  const media = resolveMedia(doc.image, title);
  if (!media) {
    return null;
  }

  return {
    slug,
    title,
    description,
    imageUrl: media.imageUrl,
    imageAlt: media.imageAlt,
    specs: mapSpecs(doc.specs),
    advantages: mapAdvantages(doc.advantages),
    order: doc.order ?? 0,
  };
}
