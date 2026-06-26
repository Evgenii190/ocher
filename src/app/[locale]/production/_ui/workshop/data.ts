import type { WorkshopPageSlug } from "@/shared/lib/workshops.shared";

export function getAboutSectionId(slug: WorkshopPageSlug): string {
  return `${slug}-about`;
}
