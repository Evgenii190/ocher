export const WORKSHOP_TAG_PREFIX = "workshop";

export function workshopTag(slug: string): string {
  return `${WORKSHOP_TAG_PREFIX}:${slug}`;
}
