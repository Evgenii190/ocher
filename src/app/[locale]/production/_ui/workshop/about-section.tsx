import type { SerializedEditorState } from "lexical";
import { Container } from "@/shared/components/container";
import { PayloadRichText } from "@/shared/components/payload-rich-text";
import { cn } from "@/shared/lib/utils";
import type { WorkshopPageSlug } from "@/shared/lib/workshops.shared";
import { gapSection } from "@/shared/ui/spacing";
import { getAboutSectionId } from "./data";

type AboutSectionProps = {
  slug: WorkshopPageSlug;
  content: SerializedEditorState | null;
};

export function AboutSection({ slug, content }: AboutSectionProps) {
  if (!content) {
    return null;
  }

  return (
    <section id={getAboutSectionId(slug)} className="scroll-mt-8">
      <Container className={cn("flex flex-col", gapSection)}>
        <PayloadRichText content={content} />
      </Container>
    </section>
  );
}
