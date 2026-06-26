import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import type { ProcurementRow } from "@/shared/lib/procurement.shared";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textBody,
  textBodyLg,
} from "@/shared/ui/typography";

const TABLE_BORDER = "border-gray-200";
const ROW_BORDER = "border-[#ECECEC]";
const CELL_PADDING = "px-5 py-4 sm:px-6 lg:px-7";
const GRID_COLS = "grid-cols-1 lg:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)]";

const nameTextClass = cn(
  textBody,
  "leading-snug tracking-[-0.01em] text-[#555555]",
);
const groupTitleTextClass = cn(nameTextClass, "font-bold");
const quantityTextClass = cn(
  textBody,
  "font-bold leading-snug tracking-[-0.04em] text-[#555555]",
);
const headerTextClass = cn(headingAppearance, textBodyLg, "text-white");

type ProcurementTableProps = {
  rows: ProcurementRow[];
};

function TableCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function ProcurementDataRow({
  row,
  striped,
  rowKey,
}: {
  row: ProcurementRow;
  striped: boolean;
  rowKey: string;
}) {
  const rowBg = striped ? "bg-[#FAFBFC]" : "bg-white";

  if (row.kind === "group") {
    return (
      <div
        className={cn(
          "col-span-full grid border-b",
          ROW_BORDER,
          GRID_COLS,
          rowBg,
        )}
      >
        <TableCell
          className={cn(
            CELL_PADDING,
            "flex min-h-22 flex-col justify-center gap-2 lg:border-[#ECECEC] lg:border-r",
          )}
        >
          <p className={groupTitleTextClass}>{row.title}</p>
          {row.items.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: CMS rows have no stable ids
            <p key={`${rowKey}-name-${index}`} className={nameTextClass}>
              {item.name}
            </p>
          ))}
        </TableCell>

        <TableCell
          className={cn(
            CELL_PADDING,
            "flex min-h-22 flex-col justify-center gap-2",
          )}
        >
          <span className="min-h-6" aria-hidden />
          {row.items.map((item, index) =>
            item.quantity ? (
              <p
                key={`${rowKey}-qty-${index}-${item.quantity}`}
                className={quantityTextClass}
              >
                {item.quantity}
              </p>
            ) : (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: CMS rows have no stable ids
                key={`${rowKey}-qty-empty-${index}`}
                className="min-h-6"
                aria-hidden
              />
            ),
          )}
        </TableCell>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "col-span-full grid border-b",
        ROW_BORDER,
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
        <p className={nameTextClass}>{row.name}</p>
      </TableCell>

      <TableCell className={cn(CELL_PADDING, "flex min-h-22 items-center")}>
        {row.quantity ? (
          <p className={quantityTextClass}>{row.quantity}</p>
        ) : null}
      </TableCell>
    </div>
  );
}

export async function ProcurementTable({ rows }: ProcurementTableProps) {
  const t = await getTranslations("procurement");
  return (
    <div
      className={cn("overflow-hidden rounded-xl border bg-white", TABLE_BORDER)}
    >
      <div className="min-w-[min(100%,40rem)] lg:min-w-0">
        <div className={cn("grid", GRID_COLS)}>
          <div
            className={cn(
              "col-span-full flex min-h-16 items-center gap-3 bg-primary",
              CELL_PADDING,
            )}
          >
            <span
              className="h-7 w-2 shrink-0 rounded-full bg-white"
              aria-hidden
            />
            <div className={cn("grid flex-1", GRID_COLS)}>
              <span className={headerTextClass}>{t("columns.name")}</span>
              <span
                className={cn(
                  headerTextClass,
                  "border-primary-foreground/20 border-t pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7",
                )}
              >
                {t("columns.quantity")}
              </span>
            </div>
          </div>

          {rows.length > 0 ? (
            rows.map((row, index) => (
              <ProcurementDataRow
                key={
                  row.kind === "group"
                    ? `group-${row.title}`
                    : `row-${row.name}`
                }
                row={row}
                striped={index % 2 === 1}
                rowKey={
                  row.kind === "group"
                    ? `group-${row.title}`
                    : `row-${row.name}`
                }
              />
            ))
          ) : (
            <div className={cn("col-span-full", CELL_PADDING, nameTextClass)}>
              {t("empty")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
