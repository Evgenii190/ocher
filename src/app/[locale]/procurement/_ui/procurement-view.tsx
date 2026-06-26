import { Container } from "@/shared/components/container";
import type { ProcurementRow } from "@/shared/lib/procurement.shared";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { typeDisplay } from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import { ProcurementTable } from "./procurement-table";

type ProcurementViewProps = {
  pageTitle: string;
  rows: ProcurementRow[];
};

export function ProcurementView({ pageTitle, rows }: ProcurementViewProps) {
  return (
    <Container className={cn("flex flex-col pb-section", gapHeading)}>
      <TopBar variant="black" breadcrumbs={[{ label: pageTitle }]} />

      <div className={cn("flex flex-col", gapHeading)}>
        <h1 className={typeDisplay}>{pageTitle.toLowerCase()}</h1>
        <ProcurementTable rows={rows} />
      </div>
    </Container>
  );
}
