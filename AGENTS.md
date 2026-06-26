<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Правила проекта ochko

## Стек и структура

- Next.js App Router, React 19, Tailwind CSS v4, shadcn/ui, Biome
- Стили: `src/app/_app/globals.css` — единственный источник design tokens (`@theme inline`)
- UI-константы классов: `src/shared/ui/typography.ts`, `src/shared/ui/spacing.ts`
- Утилита классов: `cn()` из `src/shared/lib/utils.ts`
- Компонент `Heading` **не используется** — только семантические теги (`h1`–`h3`, `p`, `span`) + токены типографики

## Design tokens: общие правила

**Все размеры шрифтов и ключевые отступы — fluid через `clamp()`.** Токены задаются в `globals.css`, классы — в Tailwind (`text-display`, `gap-section` и т.д.).

### Когда использовать кастомные токены

Используй токены из `typography.ts` / `spacing.ts`, когда:

- элемент повторяет **устойчивую роль** в дизайн-системе (hero-заголовок, заголовок секции, отступ между секциями);
- размер/отступ **заметно отличается** от соседних значений (≈8px и больше);
- нужна **одинаковая адаптивность** на всём сайте.

### Когда НЕ нужно подставлять кастомные токены

Оставляй стандартные Tailwind-классы (`gap-2`, `gap-4`, `p-6`, `text-base`, `mt-4` и т.п.), когда:

- отступ локальный и **мелкий** (иконка ↔ текст, пункт списка, padding кнопки);
- разница с ближайшим токеном **несущественная** (например, нужно 32px, а есть `gap-content` = 40px — не подменяй без необходимости; лучше `gap-8`);
- это **shadcn/ui** или служебная вёрстка, где уже заложены свои размеры;
- одноразовый layout-хак внутри компонента.

**Не заменяй все `gap-*` / `text-*` / `mt-*` на токены «для порядка».** Токены — для повторяющихся паттернов страницы, не для каждого pixel-perfect отступа.

---

## Типографика

Источник: `globals.css` → `--text-*`, константы → `src/shared/ui/typography.ts`.

| Токен | Desktop → Mobile | Назначение |
|-------|------------------|------------|
| `text-display` | 54px → 28px | Hero h1 |
| `text-title` | 40px → 24px | Заголовок секции (h2) |
| `text-subtitle` | 32px → 20px | Подзаголовок блока, акцентные цифры |
| `text-body-lg` | 20px → 16px | Лид, описание под hero |
| `text-body` | 16px → 14px | Основной текст, навигация (дефолт на `body`) |
| `text-small` | 14px → 12px | Метки, input |
| `text-micro` | 12px → 10px | Хлебные крошки, мелкие подписи |

### Пресеты заголовков

- `headingAppearance` — TT Lakes, bold, uppercase, tight tracking. **Только стиль**, без размера.
- `typeDisplay` — hero h1 (`headingAppearance` + `text-display`)
- `typeTitle` — h2 секции
- `typeSubtitle` — акцентный подзаголовок с heading-стилем

### Примеры

```tsx
import { typeTitle, textBodyLg, headingAppearance } from "@/shared/ui/typography";

<h1 className={cn(typeDisplay, "text-white")}>...</h1>
<h2 className={typeTitle}>каталог продукции</h2>
<p className={textBodyLg}>Описание</p>
<h3 className={cn(headingAppearance, textBodyLg)}>Заголовок карточки</h3>
```

### `cn()` и цвета

Кастомные `text-display`, `text-title` и т.д. — это **размер**, не цвет. При `cn(typeDisplay, "text-white")` размер не должен пропадать: в `utils.ts` они зарегистрированы в `extendTailwindMerge`. Цвета (`text-white`, `text-primary`) добавляй локально в компоненте.

---

## Отступы (spacing)

Источник: `globals.css` → `--spacing-*`, константы → `src/shared/ui/spacing.ts`.

| Токен | Desktop → Mobile | Назначение |
|-------|------------------|------------|
| `section` | 100px → 48px | Между секциями страницы (`gap-section`, `pt-section`) |
| `heading` | 72px → 40px | Между заголовком секции и контентом (`gap-heading`) |
| `content` | 40px → 24px | Стандартный отступ внутри блока (`gap-content`) |

### Примеры

```tsx
import { gapSection, gapHeading, gapContent } from "@/shared/ui/spacing";

<Container className={cn("flex flex-col", gapSection)}>...</Container>
<div className={cn("flex flex-col", gapHeading)}>
  <h2 className={typeTitle}>...</h2>
  <div>...</div>
</div>
<div className={cn("flex flex-col", gapContent)}>
  <h1>...</h1>
  <p>...</p>
</div>
```

Для `gap-content` / `gap-heading` / `gap-section` используй **`flex flex-col`** на родителе, а не `mt-*` на дочернем элементе.

---

## Добавление новых токенов

1. Добавить `--text-*` или `--spacing-*` с `clamp()` в `globals.css` (`@theme inline`) и комментарий с диапазоном px.
2. Экспортировать строку класса в `typography.ts` или `spacing.ts` с JSDoc на русском.
3. Для новых **text-** токенов — добавить имя в `typographyTextSizes` в `utils.ts` (иначе `cn()` будет конфликтовать с `text-white`, `text-primary`).
4. Применить в компонентах; не мигрировать старые места без необходимости.

Формула `clamp`: минимум достигается примерно при ~400px viewport, максимум — при ~1440px (если не указано иное).

---

## Прочее

- Шрифты: `font-sans` (Inter) — body, `font-heading` (TT Lakes) — заголовки через `headingAppearance`
- Контейнер: `Container` из `src/shared/components/container.tsx` (`container mx-auto px-5`)
- Линтер: `bun run lint` (Biome)
- Коммиты и PR — только по явной просьбе пользователя
