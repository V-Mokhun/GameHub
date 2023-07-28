"use client";

import { useUser } from "@clerk/nextjs";
import { SETTINGS_PASSWORD_ROUTE, SETTINGS_ROUTE } from "@shared/consts";
import { MenuItem, Skeleton } from "@shared/ui";
import { usePathname } from "next/navigation";

interface SettingsMenuProps {}

const MENU_ITEMS = (pathname: string) => [
  {
    label: "Profile",
    href: SETTINGS_ROUTE,
    active: pathname === SETTINGS_ROUTE,
  },
  {
    label: "Password",
    href: SETTINGS_PASSWORD_ROUTE,
    active: pathname === SETTINGS_PASSWORD_ROUTE,
  },
];

export const SettingsMenu = ({}: SettingsMenuProps) => {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  if (!isLoaded)
    return (
      <ul className="flex items-center gap-4">
        {[...Array(MENU_ITEMS(pathname).length)].map((_, i) => (
          <Skeleton key={i} className="w-28 h-7" />
        ))}
      </ul>
    );

  if (!user?.passwordEnabled) return null;

  return (
    <ul className="flex items-center">
      {MENU_ITEMS(pathname).map((item) => (
        <MenuItem key={item.href} {...item} />
      ))}
    </ul>
  );
};
