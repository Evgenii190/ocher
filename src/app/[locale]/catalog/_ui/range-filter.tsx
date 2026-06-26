"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { Slider } from "@/shared/ui/slider";
import { textSmall } from "@/shared/ui/typography";

type RangeFilterProps = {
  label: string;
  unit: string;
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (next: { min: number; max: number }) => void;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function RangeFilter({
  label,
  unit,
  min,
  max,
  value,
  onChange,
}: RangeFilterProps) {
  const t = useTranslations();
  const current = {
    min: clamp(value.min, min, max),
    max: clamp(value.max, min, max),
  };

  const handleSlider = (next: number[]) => {
    const [nextMin, nextMax] = next;
    if (typeof nextMin === "number" && typeof nextMax === "number") {
      onChange({ min: nextMin, max: nextMax });
    }
  };

  const handleInput = (key: "min" | "max", raw: string) => {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) {
      return;
    }
    const clamped = clamp(parsed, min, max);
    const next =
      key === "min"
        ? { min: Math.min(clamped, current.max), max: current.max }
        : { min: current.min, max: Math.max(clamped, current.min) };
    onChange(next);
  };

  const unitSuffix = unit ? `, ${unit}` : "";

  return (
    <div className="flex flex-col gap-3">
      <span className={cn(textSmall, "font-medium text-foreground")}>
        {label}
        {unitSuffix}
      </span>
      <Slider
        value={[current.min, current.max]}
        min={min}
        max={max}
        step={1}
        minStepsBetweenThumbs={0}
        onValueChange={handleSlider}
        aria-label={label}
      />
      <div className="flex items-center gap-3">
        <label className="flex min-w-0 flex-1 items-center gap-1.5 border border-primary/20 bg-white px-3 py-2">
          <span className={cn(textSmall, "text-muted")}>
            {t("common.from")}
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            value={current.min}
            onChange={(event) => handleInput("min", event.target.value)}
            className={cn(
              textSmall,
              "w-full min-w-0 border-0 bg-transparent font-medium text-foreground outline-none",
            )}
          />
        </label>
        <span className="h-px w-3 shrink-0 bg-primary/30" aria-hidden />
        <label className="flex min-w-0 flex-1 items-center gap-1.5 border border-primary/20 bg-white px-3 py-2">
          <span className={cn(textSmall, "text-muted")}>{t("common.to")}</span>
          <input
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            value={current.max}
            onChange={(event) => handleInput("max", event.target.value)}
            className={cn(
              textSmall,
              "w-full min-w-0 border-0 bg-transparent font-medium text-foreground outline-none",
            )}
          />
        </label>
      </div>
    </div>
  );
}
