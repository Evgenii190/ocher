"use client";

import { cn } from "@/shared/lib/utils";
import { textBody } from "@/shared/ui/typography";

type FilterCheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  count?: number;
};

export function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
  count,
}: FilterCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="group flex cursor-pointer items-center gap-4 transition-colors hover:text-primary"
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center border border-primary/25 transition-colors group-hover:border-primary",
          checked && "border-primary bg-primary",
        )}
      >
        {checked ? (
          <svg
            viewBox="0 0 12 12"
            className="size-2.5 text-primary-foreground"
            aria-hidden="true"
          >
            <path
              d="M2 6l3 3 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          textBody,
          "flex min-w-0 flex-1 items-center justify-between gap-2 font-light transition-colors",
          checked ? "text-primary" : "text-foreground",
        )}
      >
        <span className="min-w-0">{label}</span>
        {count !== undefined ? (
          <span className="shrink-0 tabular-nums text-muted-foreground">
            {count}
          </span>
        ) : null}
      </span>
    </label>
  );
}

type FilterRadioProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function FilterRadio({
  id,
  label,
  checked,
  onChange,
}: FilterRadioProps) {
  return (
    <label
      htmlFor={id}
      className="group flex cursor-pointer items-center gap-4 transition-colors hover:text-primary"
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full border border-[#D4E2E7] transition-colors group-hover:border-primary",
          checked && "border-primary",
        )}
      >
        {checked ? <span className="size-2 rounded-full bg-primary" /> : null}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={cn(
          textBody,
          "font-medium transition-colors",
          checked ? "text-primary" : "text-foreground",
        )}
      >
        {label}
      </span>
    </label>
  );
}
