import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { WorkshopView } from "@/app/[locale]/production/_ui/workshop/workshop-view";
import { getWorkshopPage } from "@/shared/lib/get-workshop";
import {
  isWorkshopPageSlug,
  WORKSHOP_PAGE_SLUG_LIST,
  type WorkshopPageSlug,
} from "@/shared/lib/workshops.shared";

type WorkshopPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return WORKSHOP_PAGE_SLUG_LIST.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkshopPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isWorkshopPageSlug(slug)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  const workshopSlug = slug as WorkshopPageSlug;

  return {
    title: t(`production.${workshopSlug}.title`),
    description: t(`production.${workshopSlug}.description`),
  };
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { locale, slug } = await params;

  if (!isWorkshopPageSlug(slug)) {
    notFound();
  }

  const page = await getWorkshopPage(slug, locale);

  return (
    <main>
      <WorkshopView page={page} />
    </main>
  );
}
