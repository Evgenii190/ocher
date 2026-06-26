import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { headingAppearance, textSmall } from "@/shared/ui/typography";

type YearTimelineProps = {
  years: readonly number[];
  activeYear: number;
  onYearChange: (year: number) => void;
  ariaLabel: string;
  className?: string;
};

export function YearTimeline({
  years,
  activeYear,
  onYearChange,
  ariaLabel,
  className,
}: YearTimelineProps) {
  return (
    <div
      className={cn("flex w-full flex-wrap gap-2", className)}
      role="tablist"
      aria-label={ariaLabel}
    >
      {years.map((year) => {
        const isActive = year === activeYear;

        return (
          <Button
            key={year}
            type="button"
            role="tab"
            aria-selected={isActive}
            variant={isActive ? "default" : "border"}
            onClick={() => onYearChange(year)}
            className={cn(
              "h-[36px] w-[82px] rounded-none p-0 transition-[colors,transform,box-shadow] duration-300 ease-out",
              headingAppearance,
              textSmall,
              isActive && "scale-[1.02] shadow-sm motion-reduce:scale-100",
              !isActive &&
                "border border-primary bg-white text-primary hover:bg-primary/5 hover:text-primary",
            )}
          >
            {year}
          </Button>
        );
      })}
    </div>
  );
}
