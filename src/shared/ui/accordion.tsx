"use client";

import { ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/shared/lib/utils";
import { textBody } from "@/shared/ui/typography";

const panelShadow =
  "shadow-[0px_1.85px_3.15px_0px_#0004221C,0px_8.15px_6.52px_0px_#00042215,0px_20px_13px_0px_#00042211]";

type AccordionItemVariant = "default" | "panel" | "nested";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & {
  variant?: AccordionItemVariant;
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-variant={variant}
      className={cn(
        variant === "default" && "not-last:border-b not-last:border-border",
        variant === "panel" && cn("border-0 bg-[#FBFBFB] p-6", panelShadow),
        variant === "nested" && "border-0",
        className,
      )}
      {...props}
    />
  );
}

type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
> & {
  icon?: "chevron" | "plus-minus";
};

function AccordionTrigger({
  className,
  children,
  icon = "chevron",
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        data-icon={icon}
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-4 border border-transparent text-left transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
          textBody,
          icon === "chevron" &&
            "font-medium text-muted transition-colors hover:text-foreground group-aria-expanded/accordion-trigger:text-foreground",
          icon === "plus-minus" &&
            "font-semibold text-foreground transition-colors hover:text-primary group-aria-expanded/accordion-trigger:text-primary",
          className,
        )}
        {...props}
      >
        {children}
        {icon === "chevron" ? (
          <ChevronDownIcon
            data-slot="accordion-trigger-icon"
            className="pointer-events-none size-3 shrink-0 text-muted transition-transform group-aria-expanded/accordion-trigger:rotate-180"
            strokeWidth={2.5}
          />
        ) : (
          <>
            <div className="flex size-4 shrink-0 items-center justify-center bg-primary text-white group-aria-expanded/accordion-trigger:hidden">
              <PlusIcon data-slot="accordion-trigger-icon" size={12} />
            </div>
            <div className="hidden size-4 shrink-0 items-center justify-center bg-primary text-white group-aria-expanded/accordion-trigger:flex">
              <MinusIcon data-slot="accordion-trigger-icon" size={12} />
            </div>
          </>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

type AccordionContentVariant = "default" | "panel" | "nested";

function AccordionContent({
  variant = "default",
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & {
  variant?: AccordionContentVariant;
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      data-variant={variant}
      className={cn(
        "text-body",
        variant === "default" &&
          "overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up",
        (variant === "panel" || variant === "nested") &&
          "overflow-visible data-[state=open]:h-auto!",
      )}
      {...props}
    >
      <div
        className={cn(
          variant === "default" &&
            "h-(--radix-accordion-content-height) pt-0 pb-2.5",
          variant === "panel" && "pt-4",
          variant === "nested" && "flex flex-col gap-3 pt-3",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  panelShadow,
};
