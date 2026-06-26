"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { textBody } from "@/shared/ui/typography";
import { useHeaderNavDropdown } from "./header-nav-dropdown-context";
import { type NavDropdownId, navDropdowns, resolveNavLabel } from "./nav-items";

type NavDropdownTriggerProps = {
  dropdownId: NavDropdownId;
};

export function NavDropdownTrigger({ dropdownId }: NavDropdownTriggerProps) {
  const t = useTranslations();
  const {
    panelIds,
    triggerRefs,
    isOpen,
    openMenu,
    toggleMenu,
    scheduleClose,
    cancelClose,
    handleTriggerBlur,
  } = useHeaderNavDropdown();

  const open = isOpen(dropdownId);
  const panelId = panelIds[dropdownId];
  const label = resolveNavLabel(t, navDropdowns[dropdownId].labelKey);

  return (
    <button
      ref={triggerRefs[dropdownId]}
      type="button"
      id={`${panelId}-trigger`}
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls={panelId}
      onMouseEnter={() => {
        cancelClose();
        openMenu(dropdownId);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        openMenu(dropdownId);
      }}
      onBlur={(event) => handleTriggerBlur(dropdownId, event)}
      onClick={() => toggleMenu(dropdownId)}
      className={cn(
        textBody,
        "group/trigger inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:text-primary focus-visible:underline focus-visible:underline-offset-4",
        open && "text-primary underline underline-offset-4",
      )}
    >
      {label}
      <ChevronDown
        aria-hidden
        className={cn(
          "size-4 shrink-0 text-current transition-[transform,color] duration-200 ease-out",
          open && "rotate-180 text-primary",
        )}
      />
    </button>
  );
}
