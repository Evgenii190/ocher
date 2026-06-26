import { cn } from "@/shared/lib/utils";

const headingAppearance =
  "font-heading font-bold tracking-[-5%] leading-none text-balance uppercase";

/** Hero-заголовок страницы (54px → 28px). Использовать на h1 в hero-секциях. */
const textDisplay = "text-display";

/** Заголовок секции (40px → 24px). Использовать на h2 блоков контента. */
const textTitle = "text-title";

/** Подзаголовок блока, акцентные цифры (32px → 20px). Карточки, счётчики, статистика. */
const textSubtitle = "text-subtitle";

/** Лид, описание, подзаголовок под hero (20px → 16px). Абзацы и крупный body-текст. */
const textBodyLg = "text-body-lg";

/** Основной текст, навигация, UI-элементы (16px → 14px). Дефолт для body. */
const textBody = "text-body";

/** Метки, вторичный текст, поля ввода (14px → 12px). */
const textSmall = "text-small";

/** Хлебные крошки, мелкие подписи (12px → 10px). */
const textMicro = "text-micro";

/** Заголовок таблицы сведений об образовательной организации (~27px → 20px). */
const textTablePage = "text-table-page";

/** Заголовок секции внутри таблицы сведений (24px → 18px). */
const textTableSection = "text-table-section";

/** Hero h1: display-размер + heading-стиль. */
const typeDisplay = cn(headingAppearance, textDisplay, "text-foreground");

/** Заголовок секции h2: title-размер + heading-стиль. */
const typeTitle = cn(headingAppearance, textTitle, "text-foreground");

/** Акцентный подзаголовок: subtitle-размер + heading-стиль. */
const typeSubtitle = cn(headingAppearance, textSubtitle, "text-foreground");

export {
  headingAppearance,
  textBody,
  textBodyLg,
  textDisplay,
  textMicro,
  textSmall,
  textSubtitle,
  textTablePage,
  textTableSection,
  textTitle,
  typeDisplay,
  typeSubtitle,
  typeTitle,
};
