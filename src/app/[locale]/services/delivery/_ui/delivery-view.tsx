import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import { gapContent, gapHeading } from "@/shared/ui/spacing";
import { textBody, textBodyLg, typeDisplay } from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import deliveryImage from "../_assets/delivery-truck-with-logo.png";

type TextPart = {
  text: string;
  bold: boolean;
};

const paragraphBoldPattern = [
  [false, true, false, true, false],
  [true, false, true, false],
] as const;

const noticeBoldPattern = [false, true] as const;

function DeliveryParagraph({
  parts,
  paragraphKey,
}: {
  parts: TextPart[];
  paragraphKey: string;
}) {
  return (
    <p className={cn(textBodyLg, "text-justify text-[#273A5B] leading-normal")}>
      {parts.map((part) =>
        part.bold ? (
          <strong
            key={`${paragraphKey}-${part.text.slice(0, 24)}`}
            className="font-semibold text-[#273A5B]"
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

function DeliveryNotice({ parts }: { parts: TextPart[] }) {
  return (
    <div className="flex items-center gap-4 rounded-[10px] bg-primary p-4">
      <span
        aria-hidden
        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-white"
      >
        <span className="font-heading text-[10px] leading-none font-bold text-white">
          !
        </span>
      </span>
      <p className={cn(textBody, "min-w-0 flex-1 text-white leading-normal")}>
        {parts.map((part) =>
          part.bold ? (
            <strong
              key={part.text.slice(0, 24)}
              className="font-semibold text-white"
            >
              {part.text}
            </strong>
          ) : (
            <span key={part.text.slice(0, 24)}>{part.text}</span>
          ),
        )}
      </p>
    </div>
  );
}

function buildParagraphParts(
  t: Awaited<ReturnType<typeof getTranslations>>,
  paragraphKey: "p1" | "p2",
  boldPattern: readonly boolean[],
): TextPart[] {
  return boldPattern.map((bold, index) => ({
    text: t(`delivery.paragraphs.${paragraphKey}.part${index + 1}`),
    bold,
  }));
}

export async function DeliveryView() {
  const t = await getTranslations("services");
  const deliveryParagraphs = [
    buildParagraphParts(t, "p1", paragraphBoldPattern[0]),
    buildParagraphParts(t, "p2", paragraphBoldPattern[1]),
  ];
  const noticeParts = noticeBoldPattern.map((bold, index) => ({
    text: t(`delivery.notice.part${index + 1}`),
    bold,
  }));

  return (
    <div className={cn("flex flex-col", gapHeading)}>
      <Container>
        <TopBar
          variant="black"
          breadcrumbs={[{ label: t("delivery.breadcrumb") }]}
        />
      </Container>

      <div className="relative">
        <Container className="relative z-10">
          <div className={cn("flex max-w-[640px] flex-col", gapContent)}>
            <h1 className={typeDisplay}>{t("delivery.title")}</h1>

            <div className="flex flex-col gap-8">
              {deliveryParagraphs.map((parts, index) => (
                <DeliveryParagraph
                  key={parts[0]?.text.slice(0, 32) ?? `paragraph-${index}`}
                  paragraphKey={
                    parts[0]?.text.slice(0, 32) ?? `paragraph-${index}`
                  }
                  parts={parts}
                />
              ))}
            </div>

            <DeliveryNotice parts={noticeParts} />
          </div>
        </Container>

        <div className="pointer-events-none absolute top-1/2 right-0 hidden aspect-1422/948 w-[clamp(12rem,calc(55vw-10rem),55rem)] -translate-y-1/2 xl:block">
          <Image
            src={deliveryImage}
            alt={t("delivery.truckAlt")}
            fill
            className="object-cover object-right"
            sizes="(min-width: 1280px) clamp(12rem, calc(30vw - 10rem), 50rem), 0px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
