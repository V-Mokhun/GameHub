import { cn } from "@shared/lib";
import { HTMLAttributes } from "react";

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

export const Overlay = ({ isOpen, className, ...props }: OverlayProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-all md:hidden",
        isOpen
          ? "animate-in fade-in-0"
          : "animate-out fade-out-0 invisible opacity-0"
      )}
    />
  );
};
