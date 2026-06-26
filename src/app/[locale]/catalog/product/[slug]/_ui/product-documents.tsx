"use client";

import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { headingAppearance, textSmall } from "@/shared/ui/typography";
import type { ProductDocument } from "../../../_ui/types";

function fileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? (parts.at(-1) ?? "").toUpperCase() : "FILE";
}

function DocumentIcon({ mimeType }: { mimeType: string | null }) {
  if (mimeType?.includes("spreadsheet") || mimeType?.includes("excel")) {
    return <FileSpreadsheet className="size-6 text-primary" />;
  }
  return <FileText className="size-6 text-primary" />;
}

type ProductDocumentsProps = {
  documents: ProductDocument[];
};

export function ProductDocuments({ documents }: ProductDocumentsProps) {
  const t = useTranslations();

  if (documents.length === 0) {
    return (
      <div className={cn("flex flex-col gap-3", textSmall, "text-[#7B8990]")}>
        <p>{t("catalog.product.documents.fallback")}</p>
        <Link
          href="/certificates"
          className={cn(
            headingAppearance,
            textSmall,
            "w-fit border-2 border-primary px-5 py-3 uppercase text-primary transition-colors hover:bg-primary hover:text-white",
          )}
        >
          {t("catalog.product.documents.goToCertificates")}
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {documents.map((document) => (
        <li key={document.id}>
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex items-center gap-4 rounded-lg border border-[#F7F7F7] bg-[#FBFBFB] p-4 transition-colors hover:border-primary/30 hover:bg-white",
              panelShadow,
            )}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-white">
              <DocumentIcon mimeType={document.mimeType} />
            </span>

            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  headingAppearance,
                  textSmall,
                  "block truncate normal-case tracking-normal text-foreground",
                )}
              >
                {document.title}
              </span>
              <span className={cn(textSmall, "text-[#7B8990]")}>
                {fileExtension(document.filename)}
              </span>
            </span>

            <span
              className={cn(
                headingAppearance,
                textSmall,
                "flex shrink-0 items-center gap-1.5 uppercase text-primary opacity-0 transition-opacity group-hover:opacity-100",
              )}
            >
              <Download className="size-4" />
              {t("common.download")}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
