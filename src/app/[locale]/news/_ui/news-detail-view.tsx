import { CalendarDays } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/shared/components/container";
import { PayloadRichText } from "@/shared/components/payload-rich-text";
import type { NewsItem } from "@/shared/lib/news.shared";
import { newsIndexHref } from "@/shared/lib/news.shared";
import { cn } from "@/shared/lib/utils";
import { gapContent, gapHeading, gapSection } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  textSmall,
  typeTitle,
} from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";

type NewsDetailViewProps = {
  item: NewsItem;
};

export async function NewsDetailView({ item }: NewsDetailViewProps) {
  const t = await getTranslations("news");

  return (
    <main>
      <Container className={cn("flex flex-col", gapHeading, "pb-section")}>
        <TopBar
          variant="black"
          breadcrumbs={[
            { label: t("breadcrumb"), href: newsIndexHref() },
            {
              label: item.category.title,
              href: newsIndexHref(item.category.slug),
            },
            { label: item.title },
          ]}
        />

        <div className={cn("flex flex-col", gapContent)}>
          <div className="flex flex-col gap-3">
            <p
              className={cn(headingAppearance, textBody, "text-foreground/85")}
            >
              {item.category.title}
            </p>
            <h1 className={typeTitle}>{item.title}</h1>
            {item.description ? (
              <p className={cn(textBodyLg, "text-foreground/85")}>
                {item.description}
              </p>
            ) : null}
          </div>

          {item.publishedAtLabel ? (
            <div
              className={cn(
                textSmall,
                "flex items-center gap-2 text-foreground/50",
              )}
            >
              <CalendarDays className="size-4.5 shrink-0" strokeWidth={1.5} />
              <time dateTime={item.publishedAt ?? undefined}>
                {item.publishedAtLabel}
              </time>
            </div>
          ) : null}
        </div>
      </Container>

      {item.content ? (
        <Container className={cn("flex flex-col", gapSection, "pb-section")}>
          <PayloadRichText content={item.content} />
        </Container>
      ) : null}
    </main>
  );
}
