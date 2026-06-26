import { Container } from "@/shared/components/container";
import type { EducationRow } from "@/shared/lib/education-disclosure.shared";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { TopBar } from "@/widgets/top-bar/root";
import { EducationTable } from "./education-table";

type EducationViewProps = {
  pageTitle: string;
  rows: EducationRow[];
};

export function EducationView({ pageTitle, rows }: EducationViewProps) {
  return (
    <Container className={cn("flex flex-col pb-section", gapHeading)}>
      <TopBar variant="black" breadcrumbs={[{ label: pageTitle }]} />

      <EducationTable pageTitle={pageTitle} rows={rows} />
    </Container>
  );
}
