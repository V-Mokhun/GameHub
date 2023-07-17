import { icons, LucideProps } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@shared/lib";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

export const Icon = forwardRef<SVGSVGElement | null, IconProps>(
  ({ name, ref, className, ...props }, iconRef) => {
    const LucideIcon = icons[name];

    return (
      <LucideIcon
        size={20}
        ref={iconRef}
        className={cn("text-secondary", className)}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";
