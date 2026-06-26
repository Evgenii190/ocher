import type { SerializedEditorState } from "lexical";
import { getTranslations } from "next-intl/server";
import { PayloadRichText } from "@/shared/components/payload-rich-text";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";

type AboutSectionProps = {
  content: SerializedEditorState | null;
};

export async function AboutSection({ content }: AboutSectionProps) {
  const t = await getTranslations("home.about");

  if (!content) {
    return null;
  }

  return (
    <section
      aria-labelledby="home-about-heading"
      className={cn("flex min-w-0 flex-col", gapHeading)}
    >
      <h2 id="home-about-heading" className={typeTitle}>
        {t("title")}
      </h2>
      <PayloadRichText content={content} />
    </section>
  );
}
