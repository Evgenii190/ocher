import type { SerializedEditorState } from "lexical";
import { CatalogSubcategoriesSection } from "@/app/[locale]/(home)/_ui/catalog-subcategories-section";
import { PartnersSection } from "@/app/[locale]/(home)/_ui/partners-section";
import { Container } from "@/shared/components/container";
import { PayloadRichText } from "@/shared/components/payload-rich-text";
import type { CatalogParentGroup } from "@/shared/lib/catalog-categories.shared";
import type { ServiceView } from "@/shared/lib/services.shared";
import { cn } from "@/shared/lib/utils";
import { gapSection } from "@/shared/ui/spacing";
import { AboutCapabilitiesSection } from "./about-capabilities-section";
import { AboutFullCycleSection } from "./about-full-cycle-section";
import { AboutHeroSection } from "./about-hero-section";
import { AboutIntroSection } from "./about-intro-section";

type AboutViewProps = {
  services: ServiceView[];
  catalogGroups: CatalogParentGroup[];
  bottomContent: SerializedEditorState | null;
};

export function AboutView({
  services,
  catalogGroups,
  bottomContent,
}: AboutViewProps) {
  return (
    <main>
      <AboutHeroSection />

      <Container
        className={cn("flex flex-col pb-section pt-section", gapSection)}
      >
        <AboutFullCycleSection />
        <AboutIntroSection />
        <AboutCapabilitiesSection services={services} />
        <PartnersSection />
        <CatalogSubcategoriesSection groups={catalogGroups} />

        {bottomContent ? (
          <section aria-labelledby="about-bottom-content">
            <PayloadRichText content={bottomContent} />
          </section>
        ) : null}
      </Container>
    </main>
  );
}
