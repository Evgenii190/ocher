import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import type {
  EducationDocumentLink,
  EducationRow,
} from "@/shared/lib/education-disclosure.shared";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  textSmall,
  textTablePage,
  textTableSection,
} from "@/shared/ui/typography";

const TABLE_BORDER = "border-gray-200";
const CELL_PADDING = "px-5 py-4 sm:px-6 lg:px-7";
const GRID_COLS =
  "grid-cols-1 lg:grid-cols-[minmax(5rem,6.5rem)_minmax(0,0.95fr)_minmax(0,1.45fr)]";

const nameTextClass = cn(
  textBody,
  "font-bold leading-snug tracking-[-0.01em] text-foreground",
);
const infoTextClass = cn(
  textBody,
  "leading-snug tracking-[-0.01em] text-foreground/70",
);
const infoLinkClass = cn(
  textBody,
  "font-bold leading-snug tracking-[-0.01em] text-primary",
);
const headerTextClass = cn(textBody, "font-bold leading-snug text-foreground");
const docButtonClass = cn(
  textSmall,
  "inline-flex min-h-11 w-full items-center justify-center rounded-lg border-2 px-4 py-2.5 text-center font-bold leading-tight sm:min-h-12",
);

type EducationTableProps = {
  pageTitle: string;
  rows: EducationRow[];
};

function CodeBadge({ code }: { code: string }) {
  return (
    <span
      className={cn(
        textSmall,
        "inline-flex min-h-9 min-w-12 items-center justify-center rounded-lg bg-[#FEE2E2] px-2 py-1 font-bold text-primary sm:min-h-[35px] sm:min-w-[49px]",
      )}
    >
      {code}
    </span>
  );
}

function DocumentButtons({ items }: { items: EducationDocumentLink[] }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {items.map((item) => {
        if (!item.href) {
          return (
            <span key={item.label} className={infoTextClass}>
              {item.label}
            </span>
          );
        }

        const className = cn(
          docButtonClass,
          "border-primary bg-white text-primary transition-colors",
          "hover:border-primary hover:bg-primary hover:text-white",
        );

        return (
          <a
            key={item.label}
            href={item.href}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}

function LinkInfo({ lines, href }: { lines: string[]; href?: string }) {
  if (!href) {
    return (
      <div className="flex flex-col gap-0.5">
        {lines.map((line) => (
          <p key={line} className={infoTextClass}>
            {line}
          </p>
        ))}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download
      className={cn(
        infoLinkClass,
        "flex flex-col gap-0.5 transition-colors hover:underline",
      )}
    >
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </a>
  );
}

function InfoCellContent({
  info,
}: {
  info: Extract<EducationRow, { kind: "row" }>["info"];
}) {
  if (info.type === "documents") {
    return <DocumentButtons items={info.items} />;
  }

  if (info.type === "link") {
    return <LinkInfo lines={info.lines} href={info.href} />;
  }

  return (
    <div className="flex flex-col gap-0.5">
      {info.lines.map((line) => (
        <p key={line} className={infoTextClass}>
          {line}
        </p>
      ))}
    </div>
  );
}

function TableCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function SectionRow({
  title,
  titleStyle = "default",
}: {
  title: string;
  titleStyle?: "default" | "compact";
}) {
  return (
    <div
      className={cn(
        "col-span-full flex min-h-16 items-center gap-3 bg-primary",
        CELL_PADDING,
      )}
    >
      <span className="h-7 w-2 shrink-0 rounded-full bg-white" aria-hidden />
      {titleStyle === "compact" ? (
        <p className={cn(textBodyLg, "font-bold leading-snug text-white")}>
          {title}
        </p>
      ) : (
        <p
          className={cn(
            headingAppearance,
            textTableSection,
            "normal-case text-white",
          )}
        >
          {title}
        </p>
      )}
    </div>
  );
}

function DataRow({
  row,
  striped,
}: {
  row: Extract<EducationRow, { kind: "row" }>;
  striped: boolean;
}) {
  const rowBg = striped ? "bg-[#FAFBFC]" : "bg-white";

  return (
    <div
      className={cn(
        "col-span-full grid border-gray-200 border-b",
        GRID_COLS,
        rowBg,
      )}
    >
      <TableCell
        className={cn(
          CELL_PADDING,
          "flex min-h-22 items-center lg:border-[#ECECEC] lg:border-r",
        )}
      >
        {row.code ? <CodeBadge code={row.code} /> : null}
      </TableCell>

      <TableCell
        className={cn(
          CELL_PADDING,
          "flex min-h-22 items-center lg:border-[#ECECEC] lg:border-r",
        )}
      >
        <p className={nameTextClass}>{row.name}</p>
      </TableCell>

      <TableCell className={cn(CELL_PADDING, "flex min-h-22 items-center")}>
        <InfoCellContent info={row.info} />
      </TableCell>
    </div>
  );
}

export async function EducationTable({ pageTitle, rows }: EducationTableProps) {
  const t = await getTranslations("education");
  let dataRowIndex = 0;

  return (
    <div
      className={cn("overflow-hidden rounded-xl border bg-white", TABLE_BORDER)}
    >
      <div className={cn("border-gray-200 border-b px-5 py-5 sm:px-6 lg:px-7")}>
        <h1
          className={cn(
            headingAppearance,
            textTablePage,
            "normal-case text-foreground",
          )}
        >
          {pageTitle}
        </h1>
      </div>

      <div className="min-w-[min(100%,48rem)] lg:min-w-0">
        <div className={cn("grid", GRID_COLS)}>
          <div
            className={cn(
              "col-span-full grid border-gray-200 border-b bg-[#F7F7F7] lg:contents",
              GRID_COLS,
            )}
          >
            <TableCell
              className={cn(
                CELL_PADDING,
                "flex min-h-22 items-center border-gray-200 border-b lg:border-r",
              )}
            >
              <span className={headerTextClass}>{t("columns.code")}</span>
            </TableCell>
            <TableCell
              className={cn(
                CELL_PADDING,
                "flex min-h-22 items-center border-gray-200 border-b lg:border-r",
              )}
            >
              <span className={headerTextClass}>{t("columns.name")}</span>
            </TableCell>
            <TableCell
              className={cn(
                CELL_PADDING,
                "flex min-h-22 items-center border-gray-200 border-b",
              )}
            >
              <span className={headerTextClass}>{t("columns.info")}</span>
            </TableCell>
          </div>

          {rows.length > 0 ? (
            rows.map((entry, index) => {
              if (entry.kind === "section") {
                dataRowIndex = 0;
                return (
                  <SectionRow
                    key={`section-${entry.title}-${index}`}
                    title={entry.title}
                    titleStyle={entry.titleStyle}
                  />
                );
              }

              const striped = dataRowIndex % 2 === 1;
              dataRowIndex += 1;

              return (
                <DataRow
                  key={`${entry.name}-${index}`}
                  row={entry}
                  striped={striped}
                />
              );
            })
          ) : (
            <div className={cn("col-span-full", CELL_PADDING, infoTextClass)}>
              {t("empty")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
