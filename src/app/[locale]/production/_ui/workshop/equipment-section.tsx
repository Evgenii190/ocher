import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import type { WorkshopEquipmentView } from "@/shared/lib/workshop-view.shared";
import { gapHeading, gapSection } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import { EquipmentCard } from "./equipment-card";

type EquipmentSectionProps = {
  items: WorkshopEquipmentView[];
  title: string;
};

export function EquipmentSection({ items, title }: EquipmentSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section>
      <Container className={cn("flex flex-col", gapSection)}>
        <div className={cn("flex flex-col", gapHeading)}>
          <h2 className={typeTitle}>{title}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <EquipmentCard key={item.title + item.imageUrl} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
