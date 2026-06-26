"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";
import { headingAppearance, textBody, textSmall } from "@/shared/ui/typography";
import type { VacancyCategoryItem } from "../_lib/vacancies-shared";
import { vacancyCategoryHref } from "../_lib/vacancies-shared";
import {
  VacancySalaryBlock,
  vacancyCardMediaHeight,
  vacancyCardMediaInset,
} from "./vacancy-salary-block";

const cardShadow =
  "shadow-[0px_1.85px_3.15px_0px_#00042211,0px_8.15px_6.52px_0px_#00042208,0px_20px_13px_0px_#00042207,0px_38.52px_25.48px_0px_#00042205,0px_64.81px_46.85px_0px_#00042204,0px_100px_80px_0px_#00042203]";

const PLACEHOLDER = "/catalog/product-placeholder.png";

type VacancyCategoryCardProps = {
  category: VacancyCategoryItem;
  activeTypeSlug?: string;
};

export function VacancyCategoryCard({
  category,
  activeTypeSlug,
}: VacancyCategoryCardProps) {
  const t = useTranslations("vacancies");
  const tCommon = useTranslations("common");
  const href = vacancyCategoryHref(category.slug, activeTypeSlug);

  return (
    <article
      className={cn(
        "grid bg-white lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)_220px]",
        cardShadow,
      )}
    >
      <Link
        href={href}
        className={cn("group block", vacancyCardMediaInset)}
        aria-label={t("categoryAria", { title: category.title })}
      >
        <div className={cn("relative overflow-hidden", vacancyCardMediaHeight)}>
          <Image
            src={category.image ?? PLACEHOLDER}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-4 px-4 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="flex flex-col gap-2">
          <Link href={href} className="transition-opacity hover:opacity-80">
            <h2
              className={cn(
                headingAppearance,
                "text-[clamp(1.125rem,0.9rem+0.6vw,1.5rem)] leading-tight text-[#171717]",
              )}
            >
              {category.title}
            </h2>
          </Link>
          <p
            className={cn(
              headingAppearance,
              textBody,
              "font-normal normal-case tracking-[-5%] text-foreground/85",
            )}
          >
            {category.type.title}
          </p>
        </div>

        {category.description ? (
          <p
            className={cn(
              textBody,
              "max-w-xl leading-normal text-foreground/85",
            )}
          >
            {category.description}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2">
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "inverse" }),
              headingAppearance,
              textSmall,
              "inline-flex h-[50px] items-center border-2 border-primary px-10 font-bold uppercase",
            )}
          >
            {tCommon("readMore")}
          </Link>

          {category.publishedAtLabel ? (
            <time
              dateTime={category.publishedAt ?? undefined}
              className={cn(textSmall, "text-foreground/50")}
            >
              {category.publishedAtLabel}
            </time>
          ) : null}
        </div>
      </div>

      <VacancySalaryBlock
        salaryFrom={category.salaryFrom}
        salaryLabel={category.salaryLabel}
      />
    </article>
  );
}
