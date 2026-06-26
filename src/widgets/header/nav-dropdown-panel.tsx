"use client";

import { useTranslations } from "next-intl";
import {
  cloneElement,
  isValidElement,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
} from "react";
import { usePathname } from "@/i18n/navigation";
import { Container } from "@/shared/components/container";
import { getNavDropdownPanelTone } from "@/shared/lib/header-hero-paths";
import { cn } from "@/shared/lib/utils";
import { useHeaderNavDropdown } from "./header-nav-dropdown-context";
import { navDropdownPanelClassName } from "./nav-dropdown-styles";
import { navDropdowns } from "./nav-items";
import { NavMegaMenuPanel } from "./nav-mega-menu-panel";

export function NavDropdownPanel() {
  const t = useTranslations();
  const {
    activeDropdown,
    catalogCategories,
    panelIds,
    triggerRefs,
    closeMenu,
    cancelClose,
    scheduleClose,
  } = useHeaderNavDropdown();
  const pathname = usePathname();
  const panelTone = getNavDropdownPanelTone(pathname);

  const open = activeDropdown !== null;
  const panelId = activeDropdown ? panelIds[activeDropdown] : undefined;
  const triggerRef = activeDropdown ? triggerRefs[activeDropdown] : undefined;
  const ariaLabel = activeDropdown
    ? t(navDropdowns[activeDropdown].ariaLabelKey)
    : undefined;

  const renderLink = useCallback(
    (link: ReactNode, key: string) => {
      if (!isValidElement<{ onClick?: (event: MouseEvent) => void }>(link)) {
        return link;
      }

      const originalOnClick = link.props.onClick;

      return cloneElement(link, {
        key,
        onClick: (event: MouseEvent) => {
          originalOnClick?.(event);
          closeMenu();
        },
      });
    },
    [closeMenu],
  );

  useEffect(() => {
    if (!open || !activeDropdown) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        triggerRef?.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeDropdown, closeMenu, open, triggerRef]);

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full z-50 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        open
          ? "pointer-events-auto visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0",
      )}
      aria-hidden={!open}
      inert={open ? undefined : true}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <Container>
        {activeDropdown && panelId && ariaLabel ? (
          <nav
            key={activeDropdown}
            id={panelId}
            aria-labelledby={`${panelId}-trigger`}
            aria-label={ariaLabel}
            className={navDropdownPanelClassName(panelTone)}
            onBlur={(event) => {
              const next = event.relatedTarget as Node | null;
              if (!event.currentTarget.contains(next)) {
                scheduleClose();
              }
            }}
          >
            <NavMegaMenuPanel
              dropdownId={activeDropdown}
              catalogCategories={catalogCategories}
              variant="desktop"
              tone={panelTone}
              renderLink={renderLink}
            />
          </nav>
        ) : null}
      </Container>
    </div>
  );
}
