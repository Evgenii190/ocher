import Image from "next/image";
import { getTranslations } from "next-intl/server";
import equipmentArrow from "@/app/[locale]/production/_ui/_assets/equipment-arrow.svg";
import { Link } from "@/i18n/navigation";
import type { ServiceView } from "@/shared/lib/services.shared";
import { serviceHref } from "@/shared/lib/services.shared";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  headingAppearance,
  textBody,
  textBodyLg,
  textSmall,
} from "@/shared/ui/typography";
import serviceAdvantageCheck from "../_assets/service-advantage-check.svg";
import serviceOrderBadge from "../_assets/service-order-badge.svg";

type ServiceCardProps = {
  item: ServiceView;
  index: number;
};

function ServiceOrderBadge({ index }: { index: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-2 top-1 z-10 h-[3.125rem] w-[4.1875rem]"
    >
      <Image
        src={serviceOrderBadge}
        alt=""
        fill
        className="object-contain object-left-top drop-shadow-[0_4px_10px_rgba(166,166,166,0.18)]"
      />
      <span
        className={cn(
          headingAppearance,
          "absolute left-[0.5625rem] top-0 text-[clamp(1.25rem,0.6vw+0.875rem,1.625rem)] leading-[3.125rem] text-primary",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function ServiceAdvantageCheck() {
  return (
    <Image
      src={serviceAdvantageCheck}
      alt=""
      width={20}
      height={20}
      aria-hidden
      className="mt-0.5 size-5 shrink-0 drop-shadow-[0_2px_4px_rgba(218,65,59,0.35)]"
    />
  );
}

export async function ServiceCard({ item, index }: ServiceCardProps) {
  const t = await getTranslations("common");

  return (
    <article className="relative flex h-full flex-col rounded-[0.625rem] border border-[#FCFCFC] bg-white shadow-[0_20px_13px_rgba(166,166,166,0.07)]">
      <ServiceOrderBadge index={index} />

      <Link
        href={serviceHref(item.slug)}
        className="relative block aspect-[454/229] overflow-hidden p-2.5"
      >
        <div className="relative size-full overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-opacity hover:opacity-90"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-4">
        <h3
          className={cn(textBodyLg, "font-sans font-semibold text-foreground")}
        >
          {item.title}
        </h3>

        <p className={cn(textBody, "font-light text-[#171717]")}>
          {item.description}
        </p>

        {item.advantages.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {item.advantages.map((advantage) => (
              <li key={advantage} className="flex items-start gap-3">
                <ServiceAdvantageCheck />
                <span className={cn(textBody, "font-light text-[#171717]")}>
                  {advantage}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {item.specs.length > 0 ? (
          <dl className="flex flex-col gap-3">
            {item.specs.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-1">
                <dt className={cn(textBody, "font-light text-[#171717]")}>
                  {spec.label}
                </dt>
                <dd
                  className={cn(
                    textBody,
                    "font-sans font-semibold text-foreground",
                  )}
                >
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-auto pt-8">
          <Button
            asChild
            className={cn(
              "h-11 w-fit gap-4 px-[2.125rem] py-3",
              textSmall,
              "font-sans font-semibold uppercase",
            )}
          >
            <Link href={serviceHref(item.slug)}>
              {t("readMore")}
              <Image
                src={equipmentArrow}
                alt=""
                width={21}
                height={21}
                aria-hidden
                className="size-5"
              />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
