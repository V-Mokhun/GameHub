"use client";

import { ThemeToggler } from "@features/theme-toggler";
import {
  BROWSE_ROUTE,
  FRIENDS_ROUTE,
  HOME_ROUTE,
  IMPORT_ROUTE,
  LIBRARY_ROUTE,
  MESSAGES_ROUTE,
  SETTINGS_ROUTE,
  USERS_ROUTE,
} from "@shared/consts";
import { cn } from "@shared/lib";
import { Icon, SignOutButton, Subtitle } from "@shared/ui";
import { icons } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

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
  username: string
): SidebarItemT[] => [
  {
    text: "Library",
    href: LIBRARY_ROUTE(username),
    iconName: "Library",
    isActive: pathname === LIBRARY_ROUTE(username),
  },
  {
    text: "Import",
    href: IMPORT_ROUTE,
    iconName: "Download",
    isActive: pathname.includes(IMPORT_ROUTE),
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
  username: string
): SidebarItemT[] => [
  {
    text: "Friends",
    href: FRIENDS_ROUTE(username),
    iconName: "Users",
    isActive: pathname.includes(FRIENDS_ROUTE(username)),
  },
  {
    text: "Messages",
    href: MESSAGES_ROUTE,
    iconName: "MessageCircle",
    isActive: pathname.includes(MESSAGES_ROUTE),
  },
];

interface SidebarMenuProps {
  username?: string | null;
  id?: string;
  onClose: () => void;
}

export const SidebarMenu = ({ onClose, username, id }: SidebarMenuProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <Subtitle className="uppercase font-semibold" size="large">
          Menu
        </Subtitle>
        <ul className="space-y-6 md:space-y-4">
          {MENU_ITEMS(pathname).map((item) => (
            <SidebarItem onClick={onClose} key={item.href} {...item} />
          ))}
          {username &&
            MENU_PRIVATE_ITEMS(pathname, username!).map((item) => (
              <SidebarItem onClick={onClose} key={item.href} {...item} />
            ))}
        </ul>
      </div>

      <div>
        <Subtitle className="uppercase font-semibold" size="large">
          Social
        </Subtitle>
        <ul className="space-y-6 md:space-y-4">
          {SOCIAL_ITEMS(pathname).map((item) => (
            <SidebarItem onClick={onClose} key={item.href} {...item} />
          ))}
          {username &&
            SOCIAL_PRIVATE_ITEMS(pathname, username).map((item) => (
              <SidebarItem onClick={onClose} key={item.href} {...item} />
            ))}
        </ul>
      </div>

      {!username && (
        <div>
          <Subtitle className="uppercase font-semibold" size="large">
            General
          </Subtitle>
          <ul className="space-y-6 md:space-y-4">
            <li>
              <ThemeToggler id="sidebar-theme" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
