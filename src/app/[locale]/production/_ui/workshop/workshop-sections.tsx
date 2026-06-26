import { getTranslations } from "next-intl/server";
import {
  WORKSHOP_SECTION_IDS,
  type WorkshopSectionId,
} from "@/shared/lib/workshop-sections.shared";
import type {
  WorkshopAdvantage,
  WorkshopPageView,
} from "@/shared/lib/workshop-view.shared";
import { AboutSection } from "./about-section";
import { AdvantagesSection } from "./advantages-section";
import { EquipmentSection } from "./equipment-section";
import { StockSection } from "./stock-section";

type WorkshopSectionsProps = {
  page: WorkshopPageView;
};

export async function WorkshopSections({ page }: WorkshopSectionsProps) {
  const t = await getTranslations("production");
  const defaultsRaw = t.raw(`defaultAdvantages.${page.slug}`);
  const defaults = Array.isArray(defaultsRaw)
    ? (defaultsRaw as WorkshopAdvantage[])
    : undefined;
  const advantages =
    page.advantageBlocks.length > 0 ? page.advantageBlocks : (defaults ?? []);

  const renderSection = (sectionId: WorkshopSectionId) => {
    switch (sectionId) {
      case WORKSHOP_SECTION_IDS.ABOUT:
        return (
          <AboutSection
            key={sectionId}
            slug={page.slug}
            content={page.aboutContent}
          />
        );
      case WORKSHOP_SECTION_IDS.STOCK:
        return <StockSection key={sectionId} section={page.stockSection} />;
      case WORKSHOP_SECTION_IDS.EQUIPMENT:
        return (
          <EquipmentSection
            key={sectionId}
            items={page.equipment}
            title={t("equipmentTitle")}
          />
        );
      case WORKSHOP_SECTION_IDS.ADVANTAGES:
        return (
          <AdvantagesSection
            key={sectionId}
            title={page.shortTitle}
            items={advantages}
          />
        );
      default:
        return null;
    }
  };

  return page.sectionOrder.map(renderSection);
}
