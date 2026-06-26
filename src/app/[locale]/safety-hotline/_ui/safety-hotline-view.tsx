import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { IconType } from "react-icons";
import { MdEmail } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { Container } from "@/shared/components/container";
import type { SiteContacts } from "@/shared/lib/site-contacts.shared";
import { cn } from "@/shared/lib/utils";
import { gapContent, gapHeading } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textBodyLg,
  typeDisplay,
} from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import bannerImage from "../_assets/hotline-banner-154063.png";

type SafetyHotlineViewProps = {
  contacts: Pick<SiteContacts, "hotlinePhone" | "hotlineEmail">;
};

type IntroPart = {
  text: string;
  bold: boolean;
};

const hotlineContactText = cn(
  headingAppearance,
  "text-[clamp(1.125rem,0.95rem+0.6vw,1.5625rem)]",
);

function IntroParagraph({
  parts,
  paragraphKey,
}: {
  parts: IntroPart[];
  paragraphKey: string;
}) {
  return (
    <p
      className={cn(
        textBodyLg,
        "text-justify text-foreground/85 leading-normal",
      )}
    >
      {parts.map((part) =>
        part.bold ? (
          <strong
            key={`${paragraphKey}-${part.text.slice(0, 24)}`}
            className="font-semibold text-foreground/85"
          >
            {part.text}
          </strong>
        ) : (
          <span key={`${paragraphKey}-${part.text.slice(0, 24)}`}>
            {part.text}
          </span>
        ),
      )}
    </p>
  );
}

function HotlineContactLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: IconType;
}) {
  return (
    <a
      href={href}
      className={cn(
        hotlineContactText,
        "group inline-flex items-center gap-3 text-foreground transition-colors hover:text-primary",
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#273A5B] text-white transition-colors group-hover:bg-primary">
        <Icon className="size-[18px]" aria-hidden />
      </span>
      {label}
    </a>
  );
}

function HotlineNoticeItem({ children }: { children: string }) {
  return (
    <li className={cn(textBodyLg, "flex items-start gap-4 text-white")}>
      <span
        aria-hidden
        className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-white"
      >
        <span className="font-heading text-[10px] leading-none font-bold">
          !
        </span>
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  );
}

const introBoldPattern = {
  p1: [true, false, true],
  p2: [false, true, false],
} as const;

function buildIntroParagraph(
  t: Awaited<ReturnType<typeof getTranslations>>,
  key: keyof typeof introBoldPattern,
): IntroPart[] {
  const boldFlags = introBoldPattern[key];

  return boldFlags.map((bold, index) => ({
    text: t(`intro.${key}.part${index + 1}`),
    bold,
  }));
}

export async function SafetyHotlineView({ contacts }: SafetyHotlineViewProps) {
  const t = await getTranslations("safetyHotline");
  const introParagraphs = [
    { parts: buildIntroParagraph(t, "p1"), key: "p1" },
    { parts: buildIntroParagraph(t, "p2"), key: "p2" },
  ];
  const notices = [t("notices.anonymity"), t("notices.reward")];

  return (
    <Container className={cn("flex flex-col", gapHeading)}>
      <TopBar variant="black" breadcrumbs={[{ label: t("breadcrumb") }]} />

      <div className={cn("flex flex-col", gapContent)}>
        <h1 className={typeDisplay}>{t("title")}</h1>

        <div className="flex max-w-360 flex-col gap-8">
          {introParagraphs.map((paragraph) => (
            <IntroParagraph
              key={paragraph.key}
              paragraphKey={paragraph.key}
              parts={paragraph.parts}
            />
          ))}
        </div>

        <div className="relative aspect-1440/744 w-full overflow-hidden">
          <Image
            src={bannerImage}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(min-width: 1440px) 1440px, 100vw"
            priority
          />
        </div>

        <section className="flex max-w-360 flex-col gap-8">
          <h2
            className={cn(
              headingAppearance,
              "text-[clamp(1.125rem,0.9rem+0.75vw,1.625rem)] text-primary",
            )}
          >
            {t("sectionTitle")}
          </h2>

          <p className={cn(textBodyLg, "font-bold text-foreground/85")}>
            {t("reviewNote")}
          </p>

          <ul className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-12 sm:gap-y-4">
            <li>
              <HotlineContactLink
                href={contacts.hotlinePhone.href}
                label={contacts.hotlinePhone.label}
                icon={RiPhoneFill}
              />
            </li>
            <li>
              <HotlineContactLink
                href={contacts.hotlineEmail.href}
                label={contacts.hotlineEmail.label}
                icon={MdEmail}
              />
            </li>
          </ul>
        </section>

        <div className="bg-primary px-6 py-8 sm:px-8 sm:py-10">
          <ul className="flex max-w-252.75 list-none flex-col gap-6">
            {notices.map((notice) => (
              <HotlineNoticeItem key={notice}>{notice}</HotlineNoticeItem>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
