"use client";

import { Factory, Globe, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textBody,
  textBodyLg,
} from "@/shared/ui/typography";
import {
  deliveryCountries,
  deliveryGeographyStats,
} from "./delivery-geography-data";

type DeliveryGeographyInteractiveProps = {
  mapMarkup: string;
};

const statCardClassName = cn(
  "flex min-h-[10.625rem] flex-col rounded border border-[#F6F6F6] bg-[linear-gradient(220deg,#FFFFFF_0%,#F6F6F6_100%)] p-5",
  "shadow-[-5px_8px_21px_0_#A6A6A61A,-21px_31px_38px_0_#A6A6A617,-48px_71px_51px_0_#A6A6A60D,-85px_126px_61px_0_#A6A6A603,-133px_197px_66px_0_#A6A6A600]",
);

const countriesPanelClassName = cn(
  "rounded border border-[#F6F6F6] bg-[linear-gradient(220deg,#FFFFFF_0%,#F6F6F6_100%)] p-6",
  "shadow-[-5px_8px_21px_0_#A6A6A61A,-21px_31px_38px_0_#A6A6A617,-48px_71px_51px_0_#A6A6A60D,-85px_126px_61px_0_#A6A6A603,-133px_197px_66px_0_#A6A6A600]",
);

const statIcons = {
  globe: Globe,
  "map-pin": MapPin,
  factory: Factory,
} as const;

function StatIcon({ name }: { name: keyof typeof statIcons }) {
  const Icon = statIcons[name];
  return <Icon className="size-7 text-primary" strokeWidth={2} aria-hidden />;
}

export function DeliveryGeographyInteractive({
  mapMarkup,
}: DeliveryGeographyInteractiveProps) {
  const t = useTranslations("home.deliveryGeography");

  return (
    <>
      <style>{`
        .delivery-geography-map path[fill="#E8B1AE"],
        .delivery-geography-map path[fill="#DA413B"] {
          cursor: pointer;
          transition: fill 0.2s ease;
        }

        .delivery-geography-map path[fill="#E8B1AE"]:hover,
        .delivery-geography-map path[fill="#DA413B"]:hover {
          fill: #E6453A;
        }
      `}</style>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] xl:gap-10">
        <div className="flex flex-col gap-6">
          <div
            role="img"
            aria-label={t("mapAria")}
            className="delivery-geography-map w-full [&_svg]:h-auto [&_svg]:w-full"
          >
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted local SVG asset */}
            <div dangerouslySetInnerHTML={{ __html: mapMarkup }} />
          </div>

          <div className="flex items-center gap-3">
            <span
              className="size-3.5 shrink-0 rounded-sm bg-[#F0B7B3]"
              aria-hidden
            />
            <p className={cn(textBody, "text-muted-foreground")}>
              {t("regionsTitle")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            {deliveryGeographyStats.map((stat) => {
              const label = t.raw(`stats.${stat.statKey}`) as string[];

              return (
                <article key={stat.statKey} className={statCardClassName}>
                  <StatIcon name={stat.icon} />
                  <div className="mt-4 flex flex-col gap-1">
                    {label.map((line) => (
                      <span
                        key={line}
                        className={cn(
                          headingAppearance,
                          textBody,
                          "text-foreground",
                        )}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 h-0.5 w-26.5 bg-[#F0B7B3]" />
                  <p className="mt-4 text-[clamp(1.75rem,1.5rem+1vw,2.125rem)] font-bold leading-none text-foreground">
                    {stat.value}
                  </p>
                </article>
              );
            })}
          </div>

          <CountriesPanel />
        </div>
      </div>
    </>
  );
}

function CountriesPanel() {
  const t = useTranslations("home.deliveryGeography");

  return (
    <section
      className={countriesPanelClassName}
      aria-label={t("countriesPanelAria")}
    >
      <h3
        className={cn(
          headingAppearance,
          "text-[clamp(1rem,0.95rem+0.35vw,1.25rem)] text-primary",
        )}
      >
        {t("countriesHeading")}
      </h3>

      <ul className="mt-6 flex flex-col">
        {deliveryCountries.map((country, index) => (
          <li key={country.id}>
            <div className="flex items-center gap-4 py-3">
              <span
                className="size-2 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <span className={textBody}>{t(`countries.${country.id}`)}</span>
            </div>
            {index < deliveryCountries.length - 1 ? (
              <div className="h-px bg-[#E6E8EB]" />
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DeliveryGeographyHeader({
  children,
}: {
  children?: ReactNode;
}) {
  const t = useTranslations("home.deliveryGeography");

  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      {children}
      <div className="flex flex-col gap-2">
        <p className={cn(textBodyLg, "text-muted-foreground")}>
          {t("description.line1")}
        </p>
        <p className={cn(textBodyLg, "text-muted-foreground")}>
          {t("description.line2")}
        </p>
      </div>
    </div>
  );
}
