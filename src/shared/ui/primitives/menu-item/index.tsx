import { cn } from "@shared/lib";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  label: string;
  href: string;
  active: boolean;
}

export const MenuItem = ({ active, href, label, className }: MenuItemProps) => {
  return (
    <li
      className={cn(
        "relative border-b-2 border-solid border-foreground",
        active && "border-primary",
        !active &&
          "after:block after:absolute after:w-0 after:h-0.5 after:invisible after:bg-primary-hover after:-bottom-0.5 after:border-0 after:transition-all hover:after:visible hover:after:w-full"
      )}
    >
      <Link
        href={href}
        className={cn(
          "block px-4 pb-2 transition-colors",
          active && "font-semibold text-primary",
          !active && "hover:text-primary-hover ",
          className
        )}
      >
        {label}
      </Link>
    </li>
  );
};
