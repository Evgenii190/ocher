"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ReactNode, useId, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { DrawerClose } from "@/shared/ui/drawer";
import { headingAppearance, textBody } from "@/shared/ui/typography";
import { useHeaderNavDropdown } from "./header-nav-dropdown-context";
import { type NavDropdownId, navDropdowns, resolveNavLabel } from "./nav-items";
import { NavMegaMenuPanel } from "./nav-mega-menu-panel";

type MobileNavDropdownSectionProps = {
  dropdownId: NavDropdownId;
  onOpenChange?: (open: boolean) => void;
};

export function MobileNavDropdownSection({
  dropdownId,
  onOpenChange,
}: MobileNavDropdownSectionProps) {
  const t = useTranslations();
  const { catalogCategories } = useHeaderNavDropdown();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const label = resolveNavLabel(t, navDropdowns[dropdownId].labelKey);

  const handleToggle = () => {
    setOpen((current) => {
      const next = !current;
      onOpenChange?.(next);
      return next;
    });
  };

  return (
    <div className="flex w-full flex-col items-center">
      <button
        type="button"
        id={`${panelId}-trigger`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={handleToggle}
        className={cn(
          headingAppearance,
          textBody,
          "inline-flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border-0 bg-transparent py-3 text-foreground transition-colors hover:bg-muted/10 hover:text-primary hover:underline hover:underline-offset-4 focus-visible:text-primary focus-visible:underline focus-visible:underline-offset-4",
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

      <section
        id={panelId}
        aria-labelledby={`${panelId}-trigger`}
        aria-hidden={!open}
        inert={open ? undefined : true}
        className={cn(
          "grid w-full overflow-hidden transition-all duration-200 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <NavMegaMenuPanel
            dropdownId={dropdownId}
            catalogCategories={catalogCategories}
            variant="mobile"
            renderLink={(link: ReactNode, key: string) => (
              <DrawerClose asChild key={key}>
                {link}
              </DrawerClose>
            )}
          />
        </div>
      </section>
    </div>
  );
}
