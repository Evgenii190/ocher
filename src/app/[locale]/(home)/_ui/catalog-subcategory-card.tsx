"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { catalogSubcategoryHref } from "@/app/[locale]/catalog/_lib/search-params";
import { Link } from "@/i18n/navigation";
import type { CatalogSubcategorySlideItem } from "@/shared/lib/catalog-categories.shared";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";
import {
  headingAppearance,
  textBodyLg,
  textSmall,
} from "@/shared/ui/typography";

const PLACEHOLDER = "/catalog/placeholder.svg";

type CatalogSubcategoryCardProps = {
  item: CatalogSubcategorySlideItem;
  parentSlug: string;
};

export function CatalogSubcategoryCard({
  item,
  parentSlug,
}: CatalogSubcategoryCardProps) {
  const t = useTranslations("staticCategories");
  const tCommon = useTranslations("common");
  const href = catalogSubcategoryHref(item.slug);
  const hasImage = Boolean(item.imageUrl);
  const title = t(`${parentSlug}.subcategories.${item.slug}`);

  return (
    <article
      className={cn(
        "flex w-full flex-col overflow-hidden border border-[#fcfcfc] bg-white",
        "shadow-[0_1.85px_3.15px_0_rgba(0,4,34,0.11),0_8.15px_6.52px_0_rgba(0,4,34,0.08),0_20px_13px_0_rgba(0,4,34,0.07)]",
      )}
    >
      <div className="flex h-[92px] shrink-0 items-center bg-primary px-5 py-0">
        <h3
          className={cn(
            headingAppearance,
            textBodyLg,
            "line-clamp-2 text-balance text-white uppercase leading-snug",
          )}
        >
          {title}
        </h3>
      </div>

      <div className="relative h-[280px] max-h-[280px] shrink-0 bg-white">
        <Image
          src={item.imageUrl ?? PLACEHOLDER}
          alt={hasImage ? item.imageAlt : tCommon("noImage")}
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1280px) 45vw, 353px"
          className={cn(hasImage ? "object-cover" : "object-contain")}
        />
      </div>

      <div className="flex shrink-0 justify-start px-6 pt-4 pb-6">
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "inverse" }),
            headingAppearance,
            textSmall,
            "h-[50px] border-2 border-primary px-10 font-semibold uppercase",
          )}
        >
          {tCommon("readMore")}
        </Link>
      </div>
    </article>
  );
}
