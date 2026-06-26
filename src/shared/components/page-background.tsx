import Image from "next/image";
import type { ReactNode } from "react";
import homeBg from "@/shared/assets/home-bg.webp";

export function PageBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Image
        src={homeBg}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
        aria-hidden
      />
      {children}
    </div>
  );
}
