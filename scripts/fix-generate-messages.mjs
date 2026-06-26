import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const gmPath = join(root, "scripts/generate-messages.mjs");
const ruJson = JSON.parse(
  readFileSync(join(root, "messages/ru.json"), "utf8"),
);
const aboutCopy = JSON.parse(
  readFileSync(join(root, "scripts/about-copy.json"), "utf8"),
);

function jsonToJs(value, indent = 0) {
  const sp = " ".repeat(indent);
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.every((item) => typeof item === "string")) {
      return `[\n${value
        .map((item) => `${sp}  ${JSON.stringify(item)},`)
        .join("\n")}\n${sp}]`;
    }
    return `[\n${value
      .map((item) => `${sp}  ${jsonToJs(item, indent + 2)},`)
      .join("\n")}\n${sp}]`;
  }
  const entries = Object.entries(value);
  return `{\n${entries
    .map(([key, item]) => {
      const keyStr = /^[A-Za-z_$][\w$]*$/.test(key)
        ? key
        : JSON.stringify(key);
      return `${sp}  ${keyStr}: ${jsonToJs(item, indent + 2)},`;
    })
    .join("\n")}\n${sp}}`;
}

const navTail = `    companySections: {
      about: { title: "О компании", href: "/about" },
      history: "История",
      certificates: "Сертификаты",
      partners: "Партнерам",
      vacancies: "Вакансии",
      procurement: {
        title: "Закупки",
        href: "/procurement",
      },
      safetyHotline: "Горячая линия безопасности",
      education: "Сведения об образовательной организации",
      laborProtection: "Охрана труда",
    },
    productionLinks: ${jsonToJs(ruJson.nav.productionLinks, 4)},
    servicesLinks: ${jsonToJs(ruJson.nav.servicesLinks, 4)},
    megaMenu: ${jsonToJs(ruJson.nav.megaMenu, 4)},
    mobileMenu: ${jsonToJs(ruJson.nav.mobileMenu, 4)},
    cartAria: ${JSON.stringify(ruJson.nav.cartAria)},
    cartAriaEmpty: ${JSON.stringify(ruJson.nav.cartAriaEmpty)},
  },
  footer: ${jsonToJs(ruJson.footer, 2)},
  search: ${jsonToJs(ruJson.search, 2)},
  home: ${jsonToJs(ruJson.home, 2)},
  catalog: ${jsonToJs(ruJson.catalog, 2)},
  cart: ${jsonToJs(ruJson.cart, 2)},
  products: ${jsonToJs(ruJson.products, 2)},
  about: ${jsonToJs(aboutCopy, 2)},
  vacancies: {`;

const gm = readFileSync(gmPath, "utf8");
const pattern =
  /    companySections: \{[\s\S]*?\n  \},\n  vacancies: \{/;
if (!pattern.test(gm)) {
  throw new Error("Broken about/nav block not found");
}

writeFileSync(gmPath, gm.replace(pattern, navTail), "utf8");
console.log("generate-messages.mjs repaired");
