import { cn } from "@shared/lib";
import NextLink from "next/link";
import { forwardRef } from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children?: React.ReactNode;
  href: string;
  prefetch?: boolean;
  replace?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { className, href, prefetch = false, replace = false, children, ...props },
    ref
  ) => {
    return (
      <NextLink
        className={cn(
          "text-primary transition-colors hover:text-primary-hover",
          className
        )}
        href={href}
        prefetch={prefetch}
        replace={replace}
        ref={ref}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export const ExternalLink = ({
  className,
  href,
  children,
}: {
  className?: string;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-block text-primary transition-colors hover:text-primary-hover",
        className
      )}
    >
      {children}
    </a>
  );
};
