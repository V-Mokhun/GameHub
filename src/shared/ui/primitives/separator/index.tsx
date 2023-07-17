"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@shared/lib";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border my-4",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

const TextSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    text?: string;
  }
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      text = "or",
      ...props
    },
    ref
  ) => (
    <div className="relative">
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border my-6",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background uppercase font-bold px-2 text-sm">
        {text}
      </span>
    </div>
  )
);

TextSeparator.displayName = "TextSeparator";

export { Separator, TextSeparator };
