import type { StaticImageData } from "next/image";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { headingAppearance, textSmall } from "@/shared/ui/typography";
import q1Image from "../assets/q1.png";
import q2Image from "../assets/q2.png";
import q3Image from "../assets/q3.png";

type PromoLine = {
  key: string;
  href?: string;
};

type PromoCard = {
  id: string;
  lines: PromoLine[];
  image: StaticImageData;
};

const promoCards: PromoCard[] = [
  {
    id: "warranty",
    lines: [
      { key: "catalog.product.promo.lifetime" },
      { key: "catalog.product.promo.lifetimeLink", href: "/catalog" },
    ],
    image: q1Image,
  },
  {
    id: "office",
    lines: [
      { key: "catalog.product.promo.buyParts" },
      { key: "catalog.product.promo.salesOffice", href: "/contacts" },
    ],
    image: q2Image,
  },
  {
    id: "consult",
    lines: [
      { key: "catalog.product.promo.questions" },
      { key: "catalog.product.promo.consult", href: "/contacts" },
    ],
    image: q3Image,
  },
];

export async function ProductPromoCards() {
  const t = await getTranslations();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[295fr_242fr_231fr]">
      {promoCards.map((card) => (
        <article
          key={card.id}
          className={cn(
            "relative flex min-h-[204px] flex-col items-center overflow-hidden rounded-lg border border-[#F7F7F7] bg-white px-4 pt-5 pb-0 text-center",
            panelShadow,
          )}
        >
          <div className="relative z-10 flex shrink-0 flex-col gap-1">
            {card.lines.map((line) =>
              line.href ? (
                <Link
                  key={line.key}
                  href={line.href}
                  className={cn(
                    headingAppearance,
                    textSmall,
                    "uppercase text-primary underline decoration-primary underline-offset-4 transition-opacity hover:opacity-80",
                  )}
                >
                  {t(line.key)}
                </Link>
              ) : (
                <p
                  key={line.key}
                  className={cn(
                    headingAppearance,
                    textSmall,
                    "uppercase text-foreground",
                  )}
                >
                  {t(line.key)}
                </p>
              ),
            )}
          </div>

          <div className="pointer-events-none relative mt-auto shrink-0">
            <Image
              src={card.image}
              alt=""
              width={135}
              height={135}
              className="size-[135px] object-contain object-bottom"
              sizes="135px"
            />
          </div>
        </article>
      ))}
    </div>
  );
}
