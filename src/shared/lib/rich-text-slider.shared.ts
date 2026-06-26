export const richTextSliderPerViewOptions = [
  { label: "1 — на всю ширину (100%)", value: "1" },
  { label: "2 — по половине (50%)", value: "2" },
  { label: "3 — по трети (~33%)", value: "3" },
  { label: "4 — по четверти (25%)", value: "4" },
] as const;

export type RichTextSliderPerView = 1 | 2 | 3 | 4;

export function parseRichTextSliderPerView(
  value: string | number | null | undefined,
): RichTextSliderPerView {
  const parsed = Number(value);
  if (parsed >= 1 && parsed <= 4) {
    return parsed as RichTextSliderPerView;
  }
  return 3;
}

/** Класс ширины слайда: на мобилке всегда 1, на lg — выбранное количество. */
export function richTextSliderSlideClassName(
  perView: RichTextSliderPerView,
): string {
  switch (perView) {
    case 1:
      return "flex-[0_0_100%]";
    case 2:
      return "flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.375rem)]";
    case 3:
      return "flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.375rem)] lg:flex-[0_0_calc(33.333%-0.667rem)]";
    case 4:
      return "flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.375rem)] lg:flex-[0_0_calc(33.333%-0.667rem)] xl:flex-[0_0_calc(25%-0.75rem)]";
    default:
      return "flex-[0_0_100%]";
  }
}
