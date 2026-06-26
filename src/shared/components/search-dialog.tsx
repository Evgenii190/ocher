"use client";

import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { RiSearchFill } from "react-icons/ri";
import { SearchHints } from "@/shared/components/search-hints";
import { SiteSearchField } from "@/shared/components/site-search-field";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { headingAppearance, textSmall } from "@/shared/ui/typography";

type SearchDialogProps = {
  triggerClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function SearchDialog({
  triggerClassName,
  open,
  onOpenChange,
}: SearchDialogProps) {
  const t = useTranslations();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerClassName ? (
        <DialogTrigger asChild>
          <Button
            size="icon"
            aria-label={t("common.aria.search")}
            className={triggerClassName}
          >
            <RiSearchFill size={20} />
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogContent showCloseButton={false} className="gap-0 sm:max-w-[520px]">
        <DialogHeader className="gap-2 pb-4 pr-6">
          <DialogTitle
            className={cn(
              headingAppearance,
              textSmall,
              "flex w-full items-center justify-between gap-4",
            )}
          >
            <span>{t("search.title")}</span>
            <DialogClose asChild>
              <Button
                type="button"
                size="icon"
                aria-label={t("common.aria.close")}
                className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <XIcon className="size-5" strokeWidth={1.5} />
              </Button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t("search.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 px-6 pb-6">
          <SiteSearchField
            autoFocus
            placeholder={t("search.placeholderExtended")}
          />
          <SearchHints />
        </div>
      </DialogContent>
    </Dialog>
  );
}
