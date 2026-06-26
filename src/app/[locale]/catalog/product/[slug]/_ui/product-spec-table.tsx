import { getTranslations } from "next-intl/server";
import type {
  ProductSpecTable,
  ProductSpecTableRow,
} from "@/shared/lib/product-spec-table.shared";
import { cn } from "@/shared/lib/utils";
import { textBody, textBodyLg, textSmall } from "@/shared/ui/typography";

const TABLE_BORDER = "border-gray-200";
const ROW_BORDER = "border-[#ECECEC]";
const CELL_PADDING = "px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6";

const labelTextClass = cn(
  textBody,
  "min-w-0 break-words leading-snug tracking-[-0.01em] text-foreground",
);
const labelBoldClass = cn(labelTextClass, "font-bold");
const valueTextClass = cn(
  textBody,
  "min-w-0 break-words leading-snug tracking-[-0.01em] text-foreground",
);
const headerLabelClass = cn(
  textSmall,
  "font-bold leading-snug text-foreground sm:text-body",
);
const tableTitleClass = cn(
  textBodyLg,
  "font-bold leading-snug text-foreground",
);

type ProductSpecTableProps = {
  table: ProductSpecTable;
};

function getTableColumnCount(table: ProductSpecTable): number {
  const inferred = table.rows.reduce((max, row) => {
    if (row.kind !== "data") {
      return max;
    }
    const rowWidth = (row.label ? 1 : 0) + (row.cells?.length ?? 0);
    return Math.max(max, rowWidth);
  }, 0);

  return Math.max(table.columns.length, inferred, 2);
}

function CellValues({
  values,
  inverted,
  align = "center",
}: {
  values: string[];
  inverted?: boolean;
  align?: "left" | "center";
}) {
  const textClass = cn(
    valueTextClass,
    inverted && "text-white",
    align === "center" && "text-center",
  );

  if (values.length <= 1) {
    return <span className={textClass}>{values[0] ?? ""}</span>;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center" : "items-start",
      )}
    >
      {values.map((value) => (
        <span key={value} className={textClass}>
          {value}
        </span>
      ))}
    </div>
  );
}

function RowLabel({
  label,
  accent,
  inverted,
  bold,
}: {
  label: string;
  accent?: boolean;
  inverted?: boolean;
  bold?: boolean;
}) {
  const textClass = inverted
    ? cn(bold ? labelBoldClass : labelTextClass, "text-white")
    : bold
      ? labelBoldClass
      : labelTextClass;

  return (
    <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
      {accent ? (
        <span
          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
          aria-hidden
        />
      ) : null}
      <span className={textClass}>{label}</span>
    </div>
  );
}

function DataRow({
  row,
  columnCount,
  striped,
  isMultiColumn,
}: {
  row: ProductSpecTableRow;
  columnCount: number;
  striped: boolean;
  isMultiColumn: boolean;
}) {
  const highlight = row.highlight ?? false;
  const rowBg = highlight
    ? "bg-primary"
    : striped
      ? "bg-[#F8FAFC]"
      : "bg-white";
  const cellBorder = cn("border-b", ROW_BORDER);
  const verticalBorder = "border-[#E8EDF3] sm:border-r";

  if (row.kind === "section" && row.label) {
    return (
      <tr className={rowBg}>
        <td colSpan={columnCount} className={cn(cellBorder, CELL_PADDING)}>
          <RowLabel label={row.label} accent={row.accent} bold />
        </td>
      </tr>
    );
  }

  if (row.kind === "wide" && row.label) {
    return (
      <tr className={rowBg}>
        <td
          className={cn(
            cellBorder,
            CELL_PADDING,
            "align-middle sm:border-[#E8EDF3] sm:border-r",
          )}
        >
          <RowLabel label={row.label} bold={highlight} inverted={highlight} />
        </td>
        <td
          colSpan={columnCount - 1}
          className={cn(cellBorder, CELL_PADDING, "align-middle")}
        >
          <CellValues
            values={[row.wideValue ?? ""]}
            inverted={highlight}
            align={isMultiColumn ? "center" : "left"}
          />
        </td>
      </tr>
    );
  }

  const cells = row.cells ?? [];
  const hasLabelColumn = Boolean(row.label);
  const dataColumnCount = hasLabelColumn ? columnCount - 1 : columnCount;

  return (
    <tr className={rowBg}>
      {hasLabelColumn ? (
        <td
          className={cn(
            cellBorder,
            CELL_PADDING,
            "align-middle sm:border-[#E8EDF3] sm:border-r",
          )}
        >
          <RowLabel
            label={row.label ?? ""}
            accent={row.accent}
            bold={highlight}
            inverted={highlight}
          />
        </td>
      ) : null}

      {isMultiColumn ? (
        Array.from({ length: dataColumnCount }, (_, index) => {
          const cell = cells[index];
          const values = cell?.values ?? [];

          return (
            <td
              key={`${row.label ?? "row"}-${values[0] ?? "empty"}-${index}`}
              className={cn(
                cellBorder,
                CELL_PADDING,
                "align-middle",
                index < dataColumnCount - 1 && verticalBorder,
              )}
            >
              {values.length > 0 ? (
                <CellValues
                  values={values}
                  inverted={highlight}
                  align="center"
                />
              ) : null}
            </td>
          );
        })
      ) : (
        <td className={cn(cellBorder, CELL_PADDING, "align-middle")}>
          {cells[0]?.values?.length ? (
            <CellValues
              values={cells[0].values}
              inverted={highlight}
              align="left"
            />
          ) : null}
        </td>
      )}
    </tr>
  );
}

export async function ProductSpecTableView({ table }: ProductSpecTableProps) {
  const t = await getTranslations();
  const columnCount = getTableColumnCount(table);
  const isMultiColumn = columnCount > 2;
  const showGrayHeader = table.columns.length > 0;

  let dataRowIndex = 0;

  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-xl border bg-white",
        TABLE_BORDER,
      )}
    >
      <div className={cn("border-gray-200 border-b", CELL_PADDING)}>
        <h2 className={cn(tableTitleClass, "min-w-0 break-words")}>
          {table.title}
        </h2>
      </div>

      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-full table-auto border-collapse">
          {showGrayHeader ? (
            <thead>
              <tr className="border-gray-200 border-b bg-[#F7F9FC]">
                <th
                  className={cn(
                    CELL_PADDING,
                    "min-w-[9rem] text-left align-middle sm:min-w-[11rem] sm:border-[#E8EDF3] sm:border-r",
                  )}
                >
                  <span className={headerLabelClass}>
                    {t("common.parameter")}
                  </span>
                </th>
                {table.columns.map((header) => (
                  <th
                    key={header}
                    className={cn(
                      CELL_PADDING,
                      "min-w-[4.5rem] align-middle sm:min-w-[5.5rem] sm:border-[#E8EDF3] sm:border-r last:sm:border-r-0",
                    )}
                  >
                    <span className={cn(headerLabelClass, "text-center")}>
                      {header}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}

          <tbody>
            {table.rows.map((row, index) => {
              const isDataLike = row.kind === "data" || row.kind === "wide";
              const striped =
                isDataLike && !row.highlight && dataRowIndex % 2 === 1;

              if (isDataLike && !row.highlight) {
                dataRowIndex += 1;
              }

              return (
                <DataRow
                  key={`${row.kind}-${row.label ?? index}`}
                  row={row}
                  columnCount={columnCount}
                  striped={striped}
                  isMultiColumn={isMultiColumn}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
