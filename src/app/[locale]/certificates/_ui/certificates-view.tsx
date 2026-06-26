"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/container";
import type { CertificateItem } from "@/shared/lib/certificates.shared";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { typeDisplay } from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import { CertificateSlider } from "./certificate-slider";

type CertificatesViewProps = {
  items: CertificateItem[];
};

export function CertificatesView({ items }: CertificatesViewProps) {
  const t = useTranslations("certificates");

  return (
    <Container className={cn("flex flex-col", gapHeading)}>
      <TopBar variant="black" breadcrumbs={[{ label: t("breadcrumb") }]} />

      <div className="flex flex-col gap-8">
        <h1 className={typeDisplay}>{t("title")}</h1>
        <CertificateSlider items={items} />
      </div>
    </Container>
  );
}
