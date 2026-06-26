import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { getCatalogNavCategories } from "@/app/[locale]/catalog/_lib/get-catalog";
import { Link } from "@/i18n/navigation";
import { Container } from "@/shared/components/container";
import { getSiteContacts } from "@/shared/lib/get-site-contacts";
import { HeaderActions } from "./header-actions";
import { HeaderShell } from "./header-shell";
import HeaderNav from "./nav";

export default async function Header() {
  const locale = await getLocale();
  const [categories, contacts, t] = await Promise.all([
    getCatalogNavCategories(locale),
    getSiteContacts(),
    getTranslations(),
  ]);

  return (
    <HeaderShell catalogCategories={categories} className="relative z-40">
      <header className="relative h-21.25 overflow-visible bg-cover bg-center bg-no-repeat shadow-[0px_1.85px_3.15px_0px_#0004221C,0px_8.15px_6.52px_0px_#00042215,0px_20px_13px_0px_#00042211]">
        <Container className="relative flex h-full items-center justify-between gap-2">
          <Link href="/" className="inline-flex shrink-0">
            <Image
              src="/logo.svg"
              width={198}
              height={50}
              alt={t("common.logoAlt")}
              className="h-[50px] w-[198px]"
            />
          </Link>
          <HeaderNav />
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <HeaderActions
              phone={contacts.headerPhone}
              email={contacts.headerEmail}
            />
          </div>
        </Container>
      </header>
    </HeaderShell>
  );
}
