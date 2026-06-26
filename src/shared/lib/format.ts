export function formatPrice(price: number): string {
  return `${Math.round(price).toLocaleString("ru-RU")} ₽`;
}

/** Итоговая цена с учётом скидки (в процентах). */
export function discountedPrice(
  price: number,
  discountPercent: number,
): number {
  if (discountPercent <= 0) {
    return price;
  }
  return Math.round(price * (1 - discountPercent / 100));
}

const PLURAL_PRODUCT: [string, string, string] = ["товар", "товара", "товаров"];

/** Возвращает форму слова для числа: 1 товар, 2 товара, 5 товаров. */
export function pluralize(count: number, forms = PLURAL_PRODUCT): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return forms[0];
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return forms[1];
  }
  return forms[2];
}
