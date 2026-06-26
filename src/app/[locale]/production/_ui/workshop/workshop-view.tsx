import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import type { WorkshopPageView } from "@/shared/lib/workshop-view.shared";
import { DEFAULT_WORKSHOP_SECTION_ORDER } from "@/shared/lib/workshop-view.shared";
import { WORKSHOP_PAGE_SLUGS } from "@/shared/lib/workshops.shared";
import { gapSection } from "@/shared/ui/spacing";
import { HeroSection } from "./hero-section";
import { WorkshopSections } from "./workshop-sections";

type WorkshopViewProps = {
  page?: WorkshopPageView | null;
};

export async function WorkshopView({ page }: WorkshopViewProps) {
  const t = await getTranslations("production");
  const slug = page?.slug ?? WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES;
  const data =
    page ??
    ({
      slug,
      title: t(`pageTitles.${slug}.title`),
      shortTitle: t(`pageTitles.${slug}.shortTitle`),
      heroDescription: t("workshops.metal.cta"),
      heroBackgroundUrl: null,
      sectionOrder: DEFAULT_WORKSHOP_SECTION_ORDER,
      aboutContent: null,
      stockSection: null,
      advantageBlocks: [],
      equipment: [],
    } satisfies WorkshopPageView);

  return (
    <div className={cn("flex flex-col", gapSection)}>
      <HeroSection
        slug={data.slug}
        title={data.title}
        shortTitle={data.shortTitle}
        description={data.heroDescription}
        backgroundUrl={data.heroBackgroundUrl}
      />
      <WorkshopSections page={data} />
    </div>
  );
}
