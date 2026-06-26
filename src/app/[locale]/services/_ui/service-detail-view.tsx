import { Container } from "@/shared/components/container";
import { PayloadRichText } from "@/shared/components/payload-rich-text";
import type { ServiceDetailView as ServiceDetailData } from "@/shared/lib/services.shared";
import { getServiceContentSectionId } from "@/shared/lib/services.shared";
import { cn } from "@/shared/lib/utils";
import { gapSection } from "@/shared/ui/spacing";
import { ServiceHeroSection } from "./service-hero-section";

type ServiceDetailViewProps = {
  service: ServiceDetailData;
};

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <div className={cn("flex flex-col pb-section", gapSection)}>
      <ServiceHeroSection
        slug={service.slug}
        title={service.heroTitle}
        description={service.heroDescription}
        backgroundUrl={service.heroImageUrl}
        backgroundAlt={service.heroImageAlt}
      />

      {service.pageContent ? (
        <section
          id={getServiceContentSectionId(service.slug)}
          className="scroll-mt-8"
        >
          <Container>
            <PayloadRichText content={service.pageContent} />
          </Container>
        </section>
      ) : null}
    </div>
  );
}
