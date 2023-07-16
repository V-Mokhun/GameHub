import dynamic from "next/dynamic";
import { dynamicIconImports, LucideProps } from "lucide-react";
import { forwardRef } from "react";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export const Icon = forwardRef<SVGSVGElement | null, IconProps>(
  ({ name, ref, ...props }, iconRef) => {
    const LucideIcon = dynamic(dynamicIconImports[name]);

    return <LucideIcon ref={iconRef} {...props} />;
  }
);

Icon.displayName = "Icon";
