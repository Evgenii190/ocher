import { Mail } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { RiPhoneFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { Link } from "@/i18n/navigation";
import { Container } from "@/shared/components/container";
import { getSiteContacts } from "@/shared/lib/get-site-contacts";
import { cn } from "@/shared/lib/utils";
import { headingAppearance, textBody, textSmall } from "@/shared/ui/typography";

const siteLinkKeys = [
  { href: "/about", labelKey: "footer.links.about" },
  { href: "/certificates", labelKey: "footer.links.certificates" },
  { href: "/history", labelKey: "footer.links.history" },
  { href: "/partners", labelKey: "footer.links.partners" },
  { href: "/procurement", labelKey: "footer.links.procurement" },
  { href: "/vacancies", labelKey: "footer.links.vacancies" },
] as const;

const catalogLinkKeys = [
  { href: "/catalog/elevator", labelKey: "footer.links.elevator" },
  { href: "/catalog/wall", labelKey: "footer.links.wall" },
  { href: "/catalog/floor", labelKey: "footer.links.floor" },
  { href: "/catalog/clamps", labelKey: "footer.links.clamps" },
  { href: "/catalog/screw", labelKey: "footer.links.screw" },
  { href: "/catalog/parts", labelKey: "footer.links.parts" },
] as const;

const socialLinks = [
  {
    href: "https://t.me/ocher",
    labelKey: "footer.socialLabels.telegram",
    icon: FaTelegram,
  },
  {
    href: "https://wa.me/79677828700",
    labelKey: "footer.socialLabels.whatsapp",
    icon: FaWhatsapp,
  },
  {
    href: "mailto:info@ocher.ru",
    labelKey: "footer.socialLabels.gmail",
    icon: SiGmail,
  },
] as const;

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <h3 className={cn(headingAppearance, textSmall, "text-foreground")}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(textSmall, "font-light leading-6 text-foreground/90")}
    >
      {children}
    </Link>
  );
}

function EmailLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className={cn(
        textBody,
        "inline-flex items-center gap-3 font-medium text-foreground",
      )}
    >
      <Mail className="size-6 shrink-0 text-primary" strokeWidth={1.5} />
      {label}
    </a>
  );
}

export default async function Footer() {
  const [contacts, t] = await Promise.all([
    getSiteContacts(),
    getTranslations(),
  ]);

  return (
    <footer className="mt-section">
      <Container className="py-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[1fr_auto] lg:gap-x-8 lg:gap-y-0">
          <FooterColumn title={t("footer.site")}>
            <nav className="flex flex-col gap-2.5">
              {siteLinkKeys.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {t(link.labelKey)}
                </FooterLink>
              ))}
            </nav>
          </FooterColumn>

          <FooterColumn title={t("footer.catalog")}>
            <nav className="flex flex-col gap-2.5">
              {catalogLinkKeys.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {t(link.labelKey)}
                </FooterLink>
              ))}
            </nav>
          </FooterColumn>

          <FooterColumn
            title={t("footer.contacts")}
            className="sm:max-lg:col-span-2 lg:pl-8"
          >
            <ul className="flex flex-col gap-2">
              {contacts.offices.map((contact) => (
                <li key={contact.id} className="flex flex-col gap-1">
                  <span
                    className={cn(textSmall, "font-light text-foreground/90")}
                  >
                    {contact.city}
                  </span>
                  <a
                    href={contact.phone.href}
                    className={cn(
                      textBody,
                      "inline-flex items-center gap-2 font-light text-foreground",
                    )}
                  >
                    <RiPhoneFill
                      className="size-4 shrink-0 text-primary"
                      strokeWidth={1.5}
                    />
                    {contact.phone.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <div className="flex flex-col gap-10 sm:max-lg:col-span-2 lg:pl-8">
            <FooterColumn title={t("footer.email")}>
              <div className="flex flex-col gap-3">
                <EmailLink
                  href={contacts.generalEmail.href}
                  label={contacts.generalEmail.label}
                />
                <p
                  className={cn(
                    textSmall,
                    "max-w-[265px] leading-[18px] text-muted",
                  )}
                >
                  {t("footer.emailHint")}
                </p>
              </div>
            </FooterColumn>

            <FooterColumn title={t("footer.workingHours")}>
              <p
                className={cn(
                  textSmall,
                  "font-light leading-[22px] text-muted",
                )}
              >
                {contacts.workingHours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </FooterColumn>
          </div>

          <div className="col-span-full row-start-2 pt-10 lg:col-span-4">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
              <Link href="/" className="inline-flex max-w-[199px] self-start">
                <Image
                  src="/logo.svg"
                  alt={t("common.omzAlt")}
                  width={199}
                  height={50}
                  priority
                />
              </Link>

              <div className="hidden lg:block" aria-hidden />

              <FooterColumn
                title={t("footer.social")}
                className="sm:max-lg:col-span-2 lg:pl-8"
              >
                <div className="flex items-center gap-4">
                  {socialLinks.map(({ href, labelKey, icon: Icon }) => (
                    <a
                      key={labelKey}
                      href={href}
                      aria-label={t(labelKey)}
                      className="text-primary transition-opacity hover:opacity-80"
                    >
                      <Icon className="size-6" />
                    </a>
                  ))}
                </div>
              </FooterColumn>

              <div className="flex flex-col gap-3 sm:max-lg:col-span-2 lg:pl-8">
                <span
                  className={cn(
                    textSmall,
                    "font-light leading-6 text-foreground/90",
                  )}
                >
                  {t("footer.commercial")}
                </span>
                <EmailLink
                  href={contacts.commercialEmail.href}
                  label={contacts.commercialEmail.label}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-background">
        <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className={cn(textSmall, "font-medium leading-5 text-muted")}>
            {t("footer.copyright")}
          </p>
          <div className="flex flex-wrap gap-6 sm:gap-12">
            <Link
              href="/privacy"
              className={cn(
                textSmall,
                "font-medium leading-6 text-[#787970] underline underline-offset-4",
              )}
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms"
              className={cn(
                textSmall,
                "font-medium leading-6 text-[#787970] underline underline-offset-4",
              )}
            >
              {t("footer.terms")}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
