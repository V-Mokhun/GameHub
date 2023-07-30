"use client";

import { cn } from "@shared/lib";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
}

export const Container = ({
  className,
  as: Component = "div",
  children,
  ...props
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        "max-w-7xl px-2 md:px-4 h-full mx-auto flex flex-col",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
