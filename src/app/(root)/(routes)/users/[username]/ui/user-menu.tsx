"use client";

import {
  FRIENDS_ROUTE,
  LIBRARY_ROUTE,
  PROFILE_ROUTE,
  RATINGS_ROUTE,
} from "@shared/consts";
import { cn } from "@shared/lib";
import { MenuItem, Skeleton } from "@shared/ui";
import { usePathname } from "next/navigation";

interface UserMenuProps {
  username: string;
  isLoading?: boolean;
  includePrivateRoutes?: boolean;
  className?: string;
}

const MENU_ITEMS = (pathname: string, username: string) => [
  {
    label: "Profile",
    href: PROFILE_ROUTE(username),
    active: pathname === PROFILE_ROUTE(username),
  },
  {
    label: "Friends",
    href: FRIENDS_ROUTE(username),
    active: pathname === FRIENDS_ROUTE(username),
  },
];

const PRIVATE_MENU_ITEMS = (pathname: string, username: string) => [
  {
    label: "Library",
    href: LIBRARY_ROUTE(username),
    active: pathname === LIBRARY_ROUTE(username),
  },
  {
    label: "Ratings",
    href: RATINGS_ROUTE(username),
    active: pathname === RATINGS_ROUTE(username),
  },
];

export const UserMenu = ({
  username,
  isLoading,
  includePrivateRoutes = true,
  className,
}: UserMenuProps) => {
  const pathname = usePathname();

  if (isLoading)
    return (
      <ul className={cn("flex items-center gap-4 mb-4", className)}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-28 h-7" />
        ))}
      </ul>
    );

  return (
    <ul
      className={cn(
        "flex items-center pb-4 whitespace-nowrap overflow-x-auto md:whitespace-normal",
        className
      )}
    >
      {MENU_ITEMS(pathname, username).map((item) => (
        <MenuItem key={item.href} {...item} />
      ))}
      {includePrivateRoutes &&
        PRIVATE_MENU_ITEMS(pathname, username).map((item) => (
          <MenuItem key={item.href} {...item} />
        ))}
    </ul>
  );
};
