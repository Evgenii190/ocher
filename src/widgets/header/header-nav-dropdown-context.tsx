"use client";

import {
  createContext,
  type FocusEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CatalogCategory } from "@/app/[locale]/catalog/_ui/types";
import type { NavDropdownId } from "./nav-items";

type HeaderNavDropdownContextValue = {
  activeDropdown: NavDropdownId | null;
  catalogCategories: CatalogCategory[];
  panelIds: Record<NavDropdownId, string>;
  triggerRefs: Record<NavDropdownId, RefObject<HTMLButtonElement | null>>;
  isOpen: (id: NavDropdownId) => boolean;
  openMenu: (id: NavDropdownId) => void;
  closeMenu: () => void;
  toggleMenu: (id: NavDropdownId) => void;
  scheduleClose: () => void;
  cancelClose: () => void;
  handleTriggerBlur: (
    id: NavDropdownId,
    event: FocusEvent<HTMLButtonElement>,
  ) => void;
};

const HeaderNavDropdownContext =
  createContext<HeaderNavDropdownContextValue | null>(null);

const CLOSE_DELAY_MS = 120;

export function HeaderNavDropdownProvider({
  catalogCategories,
  children,
}: {
  catalogCategories: CatalogCategory[];
  children: ReactNode;
}) {
  const [activeDropdown, setActiveDropdown] = useState<NavDropdownId | null>(
    null,
  );
  const closeTimeoutRef = useRef<number | undefined>(undefined);
  const companyPanelId = useId();
  const productsPanelId = useId();
  const productionPanelId = useId();
  const servicesPanelId = useId();
  const companyTriggerRef = useRef<HTMLButtonElement>(null);
  const productsTriggerRef = useRef<HTMLButtonElement>(null);
  const productionTriggerRef = useRef<HTMLButtonElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);

  const panelIds = useMemo<Record<NavDropdownId, string>>(
    () => ({
      company: companyPanelId,
      products: productsPanelId,
      production: productionPanelId,
      services: servicesPanelId,
    }),
    [companyPanelId, productsPanelId, productionPanelId, servicesPanelId],
  );

  const triggerRefs = useMemo<
    Record<NavDropdownId, RefObject<HTMLButtonElement | null>>
  >(
    () => ({
      company: companyTriggerRef,
      products: productsTriggerRef,
      production: productionTriggerRef,
      services: servicesTriggerRef,
    }),
    [],
  );

  const isOpen = useCallback(
    (id: NavDropdownId) => activeDropdown === id,
    [activeDropdown],
  );

  const openMenu = useCallback((id: NavDropdownId) => {
    window.clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(id);
  }, []);

  const closeMenu = useCallback(() => {
    window.clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(null);
  }, []);

  const toggleMenu = useCallback((id: NavDropdownId) => {
    setActiveDropdown((current) => (current === id ? null : id));
  }, []);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, CLOSE_DELAY_MS);
  }, []);

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimeoutRef.current);
  }, []);

  const handleTriggerBlur = useCallback(
    (id: NavDropdownId, event: FocusEvent<HTMLButtonElement>) => {
      const next = event.relatedTarget as HTMLElement | null;
      if (next?.closest(`#${CSS.escape(panelIds[id])}`)) return;
      scheduleClose();
    },
    [panelIds, scheduleClose],
  );

  return (
    <HeaderNavDropdownContext.Provider
      value={{
        activeDropdown,
        catalogCategories,
        panelIds,
        triggerRefs,
        isOpen,
        openMenu,
        closeMenu,
        toggleMenu,
        scheduleClose,
        cancelClose,
        handleTriggerBlur,
      }}
    >
      {children}
    </HeaderNavDropdownContext.Provider>
  );
}

export function useHeaderNavDropdown() {
  const context = useContext(HeaderNavDropdownContext);
  if (!context) {
    throw new Error(
      "useHeaderNavDropdown must be used within HeaderNavDropdownProvider",
    );
  }
  return context;
}
