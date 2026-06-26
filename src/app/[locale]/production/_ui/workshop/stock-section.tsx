import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import type { WorkshopStockSectionView } from "@/shared/lib/workshop-view.shared";
import { gapHeading, gapSection } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import { StockSlider } from "./stock-slider";

type StockSectionProps = {
  section: WorkshopStockSectionView | null;
};

export function StockSection({ section }: StockSectionProps) {
  if (!section || section.items.length === 0) {
    return null;
  }

  const title = section.title.trim();

  return (
    <section>
      <Container className={cn("flex flex-col", gapSection)}>
        <div className={cn("flex flex-col", gapHeading)}>
          {title ? <h2 className={typeTitle}>{title}</h2> : null}

          <StockSlider items={section.items} />
        </div>
      </Container>
    </section>
  );
}
