"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { panelShadow } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { textSmall } from "@/shared/ui/typography";

const DEBOUNCE_MS = 350;

type CatalogSearchProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function CatalogSearch({
  value,
  onChange,
  className,
}: CatalogSearchProps) {
  const t = useTranslations();
  const [text, setText] = useState(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Синхронизация с URL (сброс фильтров, навигация назад/вперёд).
  useEffect(() => {
    setText(value);
  }, [value]);

  // Дебаунс: не дёргаем навигацию на каждое нажатие.
  useEffect(() => {
    if (text === value) {
      return;
    }
    const id = setTimeout(() => onChangeRef.current(text), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [text, value]);

  return (
    <form
      className={cn("flex h-[50px] w-full bg-white", panelShadow, className)}
      onSubmit={(event) => {
        event.preventDefault();
        onChangeRef.current(text);
      }}
    >
      <Input
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={t("search.placeholderEquipment")}
        className={cn(
          textSmall,
          "h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-5 font-medium shadow-none focus-visible:ring-0",
        )}
      />
      <Button
        type="submit"
        aria-label={t("common.aria.search")}
        className="size-[50px] shrink-0 border-none p-0"
      >
        <Search className="size-5" />
      </Button>
    </form>
  );
}
