import { HTMLAttributes, forwardRef } from "react";
import NextLink from "next/link";
import { cn } from "@shared/lib";

interface LinkProps {
  className?: string;
  children?: React.ReactNode;
  href: string;
  prefetch?: boolean;
  replace?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, href, prefetch = false, replace = false, children }, ref) => {
    return (
      <NextLink
        className={cn("text-secondary hover:text-secondary-hover", className)}
        href={href}
        prefetch={prefetch}
        replace={replace}
        ref={ref}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";
