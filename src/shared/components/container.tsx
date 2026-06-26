import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Container({
  as: Component = "div",
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component className={cn("container mx-auto px-5", className)} {...props}>
      {children}
    </Component>
  );
}
