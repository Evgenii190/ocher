import type { NavDropdownPanelTone } from "@/widgets/header/nav-dropdown-styles";
import {
  WORKSHOP_PAGE_PATHS,
  WORKSHOP_PAGE_SLUG_LIST,
} from "./workshops.shared";

const HERO_DROPDOWN_PATHS = new Set([
  "/",
  ...WORKSHOP_PAGE_SLUG_LIST.map((slug) => WORKSHOP_PAGE_PATHS[slug]),
]);

/** Страницы с hero-выпадашками: прозрачный blur и белый текст в меню. */
export function getNavDropdownPanelTone(
  pathname: string,
): NavDropdownPanelTone {
  return HERO_DROPDOWN_PATHS.has(pathname) ? "hero" : "solid";
}
