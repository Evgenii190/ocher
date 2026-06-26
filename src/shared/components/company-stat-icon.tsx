import type { ReactNode } from "react";
import { Boxes, Globe2, Maximize2, Users } from "lucide-react";
import type { CompanyStatKey } from "@/shared/lib/company-stats.shared";
import { cn } from "@/shared/lib/utils";

const icons: Record<CompanyStatKey, ReactNode> = {
  area: <Maximize2 aria-hidden className="size-full stroke-[1.5]" />,
  staff: <Users aria-hidden className="size-full stroke-[1.5]" />,
  countries: <Globe2 aria-hidden className="size-full stroke-[1.5]" />,
  directions: <Boxes aria-hidden className="size-full stroke-[1.5]" />,
};

type CompanyStatIconProps = {
  icon: CompanyStatKey;
  className?: string;
};

export function CompanyStatIcon({ icon, className }: CompanyStatIconProps) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      {icons[icon] ?? icons.area}
    </span>
  );
}
