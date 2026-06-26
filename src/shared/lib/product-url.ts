/** URL карточки товара в каталоге. */
export function productHref(slug: string): string {
  return `/catalog/product/${slug}`;
}
