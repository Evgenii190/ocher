import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getServiceBySlug } from "@/shared/lib/get-service";
import {
  isServiceSlug,
  SERVICE_SLUG_LIST,
  type ServiceSlug,
} from "@/shared/lib/services.shared";
import { ServiceDetailView } from "../_ui/service-detail-view";

type ServiceDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUG_LIST.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isServiceSlug(slug)) {
    return {};
  }

  const service = await getServiceBySlug(slug, locale);

  if (!service) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.title", { title: service.heroTitle }),
    description: service.heroDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { locale, slug } = await params;

  if (!isServiceSlug(slug)) {
    notFound();
  }

  const service = await getServiceBySlug(slug as ServiceSlug, locale);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <ServiceDetailView service={service} />
    </main>
  );
}
