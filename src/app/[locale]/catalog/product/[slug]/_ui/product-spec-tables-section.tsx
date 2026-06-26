import type { ProductSpecTable } from "@/shared/lib/product-spec-table.shared";
import { cn } from "@/shared/lib/utils";
import { gapContent } from "@/shared/ui/spacing";
import { ProductSpecTableView } from "./product-spec-table";

type ProductSpecTablesSectionProps = {
  tables: ProductSpecTable[];
};

export function ProductSpecTablesSection({
  tables,
}: ProductSpecTablesSectionProps) {
  if (tables.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col", gapContent)}>
      {tables.map((table) => (
        <ProductSpecTableView key={table.title} table={table} />
      ))}
    </div>
  );
}
