import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { catalogCategoryRouteHref } from "@/app/[locale]/catalog/_lib/search-params";
import { Link } from "@/i18n/navigation";
import type { ProductCategoryCard } from "@/shared/catalog/static-categories";
import { cn } from "@/shared/lib/utils";
import {
  headingAppearance,
  textBody,
  textSubtitle,
} from "@/shared/ui/typography";

type ProductCategoryCardProps = {
  card: ProductCategoryCard;
};

function ProductCardWaveOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-5 overflow-hidden"
    >
      <div
        className={cn(
          "absolute inset-y-0 left-0 flex h-full w-[calc(100%+3.5rem)] max-w-none",
          "-translate-x-full",
          "transition-transform duration-900 ease-[cubic-bezier(0.33,1,0.68,1)]",
          "group-hover:translate-x-0 group-focus-visible:translate-x-0",
          "motion-reduce:translate-x-0 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-300",
          "group-hover:motion-reduce:opacity-100 group-focus-visible:motion-reduce:opacity-100",
        )}
      >
        <div className="h-full w-full min-w-0 flex-1 bg-primary/90" />
        <svg
          viewBox="0 0 56 100"
          preserveAspectRatio="none"
          className="h-full w-14 shrink-0 text-primary/90"
          role="presentation"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,0 L0,100 L56,100 C36,86 56,72 36,58 C56,44 36,30 56,16 C36,6 56,0 56,0 Z"
          />
        </svg>
      </div>
    </div>
  );
}

export async function ProductCategoryCardItem({
  card,
}: ProductCategoryCardProps) {
  const t = await getTranslations();
  const catalogHref = catalogCategoryRouteHref(card.slug);

  return (
    <Link
      href={catalogHref}
      aria-label={t("catalog.product.goToCatalogAria", { title: card.title })}
      className={cn(
        "group relative flex min-h-70 flex-col justify-between overflow-hidden border border-[#fcfcfc]",
        "shadow-[0_1.85px_3.15px_0_rgba(0,4,34,0.11),0_8.15px_6.52px_0_rgba(0,4,34,0.08),0_20px_13px_0_rgba(0,4,34,0.07)]",
        "transition-shadow duration-500 hover:shadow-[0_4px_12px_0_rgba(0,4,34,0.14),0_12px_28px_0_rgba(0,4,34,0.12)]",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        "lg:min-h-113.5",
      )}
    >
      <Image
        src={card.imageSrc}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cn(
          "object-cover transition-transform duration-700 ease-out",
          "group-hover:scale-[1.05] group-focus-visible:scale-[1.05]",
          "motion-reduce:transform-none",
        )}
        priority
      />

      <div
        aria-hidden
        className={cn(
          "absolute inset-0 z-1 bg-linear-to-t from-black/55 via-black/15 to-black/30",
          "transition-opacity duration-500 group-hover:opacity-80 group-focus-visible:opacity-80",
        )}
      />

      <ProductCardWaveOverlay />

      <div className="relative z-10 flex min-h-70 flex-col justify-between p-8 lg:min-h-113.5 lg:p-12">
        <h2
          className={cn(
            headingAppearance,
            textSubtitle,
            "max-w-77.75 text-white transition-[transform,color] duration-500 ease-out",
            "group-hover:-translate-y-1 group-focus-visible:-translate-y-1",
            "motion-reduce:transform-none",
          )}
        >
          {card.title}
        </h2>

        <span
          className={cn(
            "inline-flex h-16.25 w-full max-w-60.5 items-center justify-center px-7.5 py-5",
            headingAppearance,
            textBody,
            "bg-primary font-semibold tracking-[-5%] text-primary-foreground uppercase",
            "transition-[background-color,color,transform] duration-500 ease-out delay-150",
            "group-hover:translate-x-1 group-hover:bg-primary-foreground group-hover:text-primary",
            "group-focus-visible:translate-x-1 group-focus-visible:bg-primary-foreground group-focus-visible:text-primary",
            "motion-reduce:transform-none motion-reduce:delay-0",
          )}
        >
          {t("common.goToCatalog")}
        </span>
      </div>
    </Link>
  );
}
