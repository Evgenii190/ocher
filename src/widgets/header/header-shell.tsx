"use client";

import type { CatalogCategory } from "@/app/[locale]/catalog/_ui/types";
import { HeaderNavDropdownProvider } from "./header-nav-dropdown-context";
import { NavDropdownPanel } from "./nav-dropdown-panel";

export function HeaderShell({
  catalogCategories,
  children,
  className,
}: {
  catalogCategories: CatalogCategory[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HeaderNavDropdownProvider catalogCategories={catalogCategories}>
      <div className={className}>
        {children}
        <NavDropdownPanel />
      </div>
    </HeaderNavDropdownProvider>
  );
}
