import { Container } from "@/shared/components/container";
import type { ServiceView } from "@/shared/lib/services.shared";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import { ServiceCard } from "./service-card";

type ServicesGridSectionProps = {
  title: string;
  services: ServiceView[];
};

export function ServicesGridSection({
  title,
  services,
}: ServicesGridSectionProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section>
      <Container className={cn("flex flex-col", gapHeading)}>
        <h2 className={typeTitle}>{title.toLowerCase()}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} item={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
