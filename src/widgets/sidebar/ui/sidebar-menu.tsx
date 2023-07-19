"use client";

import {
  BROWSE_ROUTE,
  FRIENDS_ROUTE,
  HOME_ROUTE,
  LIBRARY_ROUTE,
  SETTINGS_ROUTE,
  USERS_ROUTE,
} from "@shared/consts";
import { cn } from "@shared/lib";
import { Icon, Link, Subtitle } from "@shared/ui";
import { icons } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { ThemeToggler } from "@features/theme-toggler";
import { SignOutButton } from "@clerk/nextjs";

export type SidebarItemT = {
  text: string;
  href: string;
  iconName: keyof typeof icons;
  isActive: boolean;
};

const MENU_ITEMS = (pathname: string): SidebarItemT[] => [
  {
    text: "Home",
    href: HOME_ROUTE,
    iconName: "Home",
    isActive: pathname === HOME_ROUTE,
  },
  {
    text: "Browse",
    href: BROWSE_ROUTE,
    iconName: "Globe",
    isActive: pathname === BROWSE_ROUTE,
  },
];

const MENU_PRIVATE_ITEMS = (
  pathname: string,
  userId: string
): SidebarItemT[] => [
  {
    text: "Library",
    href: LIBRARY_ROUTE(userId),
    iconName: "Library",
    isActive: pathname === LIBRARY_ROUTE(userId),
  },
];

const SOCIAL_ITEMS = (pathname: string): SidebarItemT[] => [
  {
    text: "Community",
    href: USERS_ROUTE,
    iconName: "User",
    isActive: pathname === USERS_ROUTE,
  },
];

const SOCIAL_PRIVATE_ITEMS = (
  pathname: string,
  userId: string
): SidebarItemT[] => [
  {
    text: "Friends",
    href: FRIENDS_ROUTE(userId),
    iconName: "Users",
    isActive: pathname === FRIENDS_ROUTE(userId),
  },
];

const GENERAL_PRIVATE_ITEMS = (pathname: string): SidebarItemT[] => [
  {
    text: "Settings",
    href: SETTINGS_ROUTE,
    iconName: "Settings",
    isActive: pathname === SETTINGS_ROUTE,
  },
];

interface SidebarMenuProps {
  userId?: string | null;
}

export const SidebarMenu = ({ userId }: SidebarMenuProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <Subtitle className="uppercase font-semibold" size="large">
          Menu
        </Subtitle>
        <ul className="space-y-6 md:space-y-4">
          {MENU_ITEMS(pathname).map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
          {userId &&
            MENU_PRIVATE_ITEMS(pathname, userId).map((item) => (
              <SidebarItem key={item.href} {...item} />
            ))}
        </ul>
      </div>

      <div>
        <Subtitle className="uppercase font-semibold" size="large">
          Social
        </Subtitle>
        <ul className="space-y-6 md:space-y-4">
          {SOCIAL_ITEMS(pathname).map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
          {userId &&
            SOCIAL_PRIVATE_ITEMS(pathname, userId).map((item) => (
              <SidebarItem key={item.href} {...item} />
            ))}
        </ul>
      </div>

      <div>
        <Subtitle className="uppercase font-semibold" size="large">
          General
        </Subtitle>
        <ul className="space-y-6 md:space-y-4">
          <li>
            <ThemeToggler id="sidebar-theme" />
          </li>
          {userId &&
            GENERAL_PRIVATE_ITEMS(pathname).map((item) => (
              <SidebarItem key={item.href} {...item} />
            ))}
          {userId && (
            <li>
              <SignOutButton>
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-2 font-medium transition-colors hover:text-primary"
                  )}
                >
                  <Icon name="LogOut" />
                  <span>Sign Out</span>
                </button>
              </SignOutButton>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
