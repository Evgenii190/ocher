"use client";

import { useTranslations } from "next-intl";
import { CiSearch } from "react-icons/ci";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

type SiteSearchFieldProps = {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
};

export function SiteSearchField({
  className,
  placeholder,
  autoFocus,
}: SiteSearchFieldProps) {
  const tSearch = useTranslations("search");
  const tCommon = useTranslations("common.aria");

  return (
    <form
      className={cn("relative w-full", className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        placeholder={placeholder ?? tSearch("placeholder")}
        autoFocus={autoFocus}
        className="w-full border border-[#BFBFBF] px-5 placeholder:text-[#BFBFBF]"
      />
      <Button
        type="submit"
        aria-label={tCommon("search")}
        className="absolute top-1/2 right-0.75 size-7.5 -translate-y-1/2 bg-[#DFDFDF] hover:bg-[#DFDFDF]/80"
      >
        <CiSearch size={20} className="text-[#727272]" />
      </Button>
    </form>
  );
}
