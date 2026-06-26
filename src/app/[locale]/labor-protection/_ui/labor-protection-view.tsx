import { getTranslations } from "next-intl/server";
import { Container } from "@/shared/components/container";
import type { LaborProtectionDocument } from "@/shared/lib/labor-protection.shared";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { gapHeading } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  textSmall,
  typeDisplay,
} from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";

type LaborProtectionViewProps = {
  documents: LaborProtectionDocument[];
};

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 39 52"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <path
        d="M8 0H23.5L39 15.5V48C39 50.2091 37.2091 52 35 52H8C5.79086 52 4 50.2091 4 48V4C4 1.79086 5.79086 0 8 0Z"
        fill="#DA413B"
      />
      <path
        d="M23.5 0V11.5C23.5 13.7091 25.2909 15.5 27.5 15.5H39"
        fill="#DA413B"
      />
      <path
        d="M10 30H29M10 36H24M10 42H27"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LaborProtectionDocumentCard({
  document,
  downloadLabel,
}: {
  document: LaborProtectionDocument;
  downloadLabel: string;
}) {
  return (
    <li className="h-full">
      <a
        href={document.url}
        target="_blank"
        rel="noopener noreferrer"
        title={document.title}
        className={cn(
          "group flex h-full min-h-18 w-full items-center gap-3 bg-white px-4 py-3 transition-colors sm:min-h-20 sm:gap-4 sm:px-6 sm:py-4 lg:min-h-23.75 lg:gap-6 lg:px-7",
          panelShadow,
        )}
      >
        <PdfIcon className="h-9 w-7 sm:h-10.5 sm:w-8 lg:h-[52px] lg:w-[39px]" />

        <span
          className={cn(
            textBodyLg,
            "line-clamp-2 min-w-0 flex-1 text-foreground/85 leading-normal",
          )}
        >
          {document.title}
        </span>

        {document.fileSizeLabel ? (
          <span
            className={cn(
              textBody,
              "hidden shrink-0 self-center text-foreground/40 sm:inline",
            )}
          >
            {document.fileSizeLabel}
          </span>
        ) : null}

        <span
          className={cn(
            headingAppearance,
            textSmall,
            "inline-flex h-9 w-22 shrink-0 self-center items-center justify-center border-2 border-primary uppercase text-primary transition-colors sm:h-11 sm:w-28 group-hover:bg-primary group-hover:text-white",
          )}
        >
          {downloadLabel}
        </span>
      </a>
    </li>
  );
}

export async function LaborProtectionView({
  documents,
}: LaborProtectionViewProps) {
  const t = await getTranslations("laborProtection");

  return (
    <Container className={cn("flex flex-col", gapHeading)}>
      <TopBar variant="black" breadcrumbs={[{ label: t("breadcrumb") }]} />

      <div className="flex flex-col gap-8">
        <h1 className={typeDisplay}>{t("title")}</h1>

        {documents.length > 0 ? (
          <ul className="grid grid-cols-1 gap-2.5 lg:grid-cols-2 lg:items-stretch lg:gap-2.5">
            {documents.map((document) => (
              <LaborProtectionDocumentCard
                key={document.id}
                document={document}
                downloadLabel={t("download")}
              />
            ))}
          </ul>
        ) : (
          <p className={cn(textBodyLg, "text-foreground/60")}>{t("empty")}</p>
        )}
      </div>
    </Container>
  );
}
