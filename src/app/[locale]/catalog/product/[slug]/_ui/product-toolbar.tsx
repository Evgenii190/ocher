"use client";

import { AlignLeft, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { headingAppearance, textSmall } from "@/shared/ui/typography";

export function ProductToolbar() {
  const t = useTranslations();
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      <form
        className={cn(
          "flex h-[52px] min-w-0 flex-1 bg-white sm:h-[66px]",
          panelShadow,
        )}
        onSubmit={(event) => {
          event.preventDefault();
          const params = new URLSearchParams();
          const trimmed = query.trim();
          if (trimmed) {
            params.set("q", trimmed);
          }
          const qs = params.toString();
          router.push(qs ? `/catalog?${qs}` : "/catalog");
        }}
      >
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search.placeholderEquipment")}
          className={cn(
            textSmall,
            "h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-5 font-medium shadow-none focus-visible:ring-0",
          )}
        />
        <Button
          type="submit"
          aria-label={t("common.aria.search")}
          className="size-[52px] shrink-0 border-none p-0 sm:size-[66px]"
        >
          <Search className="size-5" />
        </Button>
      </form>

      <Button
        asChild
        className={cn(
          headingAppearance,
          "h-[52px] shrink-0 gap-4 px-6 uppercase sm:h-[66px]",
        )}
      >
        <Link href="/catalog">
          <AlignLeft className="size-6" />
          {t("nav.catalogParts")}
        </Link>
      </Button>
    </div>
  );
}
