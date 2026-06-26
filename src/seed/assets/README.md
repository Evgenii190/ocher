# Ассеты для сидирования каталога

Сюда складываются реальные фотографии товаров, которые подхватываются скриптом
`bun run seed`.

## Структура

```
assets/
  categories/          # фото подкатегорий для слайдера на главной: <slug>.png
  products/            # фото товаров: <slug>.png | .jpg | .jpeg | .webp
  oilfield/            # семантические папки-источники по категориям
  metalwork/
  construction/
  calibrated/
  labor-protection/    # PDF для раздела «Охрана труда»: <slug>.pdf
  education/           # PDF для «Сведения об образовательной организации»: <slug>.pdf
  certificates/          # изображения сертификатов: <slug>.jpg
```

## Как добавить фото подкатегории (слайдер на главной)

1. Положите файл в `categories/` с именем, равным `slug` подкатегории из
   `src/shared/catalog/static-categories.ts`.
   Например: `categories/pump-rods.png` для «Штанги насосные».
2. Запустите `bun run seed`.

Подкатегории без файла в `categories/` остаются без картинки в CMS — на главной
им показывается SVG-плейсхолдер `public/catalog/placeholder.svg`, как в каталоге
товаров.

## Как добавить фото товара

1. Положите файл в `products/` с именем, равным `slug` товара из `src/seed/data.ts`.
   Например, для товара со `slug: "pile-sv-108"` — файл `products/pile-sv-108.png`.
2. Убедитесь, что у товара в `data.ts` стоит `withImage: true`.
3. Запустите `bun run seed`.

Если персонального файла нет, для товаров с `withImage: true` берётся общий
плейсхолдер-фото `public/catalog/product-placeholder.png`. Товары с
`withImage: false` остаются без картинки — на фронте им показывается
SVG-плейсхолдер `public/catalog/placeholder.svg`.

Папки по категориям (`oilfield/`, `metalwork/` и т.д.) — рабочие папки-источники,
куда удобно складывать необработанные изображения перед переименованием в `products/`.

## Как добавить PDF для «Сведения об образовательной организации»

1. Положите файл в `education/` с именем из `src/seed/education-disclosure-documents.ts`.
   Например: `education/license-extract.pdf` для строки «Лицензии на осуществление
   образовательной деятельности».
2. Запустите `bun run seed`.

При сидировании старые моковые PDF (`education-*.pdf`, `doc.pdf`) удаляются из коллекции
`documents`, а строки таблицы получают новые вложения.
