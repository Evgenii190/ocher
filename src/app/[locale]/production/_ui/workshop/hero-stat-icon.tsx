"use client";

import { GiCrane, GiFactory, GiPipes, GiWeight } from "react-icons/gi";
import { MdOutlineSquareFoot } from "react-icons/md";
import type { WorkshopStatIcon } from "@/shared/lib/workshops.shared";

const icons: Record<WorkshopStatIcon, React.ReactNode> = {
  area: <MdOutlineSquareFoot />,
  capacity: <GiWeight />,
  crane: <GiCrane />,
  pipes: <GiPipes />,
  factory: <GiFactory />,
};

export function HeroStatIcon({ icon }: { icon: WorkshopStatIcon }) {
  return icons[icon] ?? icons.area;
}
