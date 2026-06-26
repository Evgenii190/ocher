import type { SerializedEditorState } from "lexical";
import { Container } from "@/shared/components/container";
import { PayloadRichText } from "@/shared/components/payload-rich-text";
import type { ServiceView } from "@/shared/lib/services.shared";
import { cn } from "@/shared/lib/utils";
import { gapSection } from "@/shared/ui/spacing";
import { TopBar } from "@/widgets/top-bar/root";
import { ServicesGridSection } from "./services-grid-section";

type ServicesViewProps = {
  pageTitle: string;
  cardsSectionTitle: string;
  services: ServiceView[];
  bottomContent: SerializedEditorState | null;
};

export function ServicesView({
  pageTitle,
  cardsSectionTitle,
  services,
  bottomContent,
}: ServicesViewProps) {
  return (
    <div className={cn("flex flex-col pb-section", gapSection)}>
      <Container>
        <TopBar variant="black" breadcrumbs={[{ label: pageTitle }]} />
      </Container>

      <ServicesGridSection title={cardsSectionTitle} services={services} />

      {bottomContent ? (
        <section>
          <Container>
            <PayloadRichText content={bottomContent} />
          </Container>
        </section>
      ) : null}
    </div>
  );
}
