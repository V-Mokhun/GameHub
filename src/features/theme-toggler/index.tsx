"use client";

import { Icon, Switch } from "@shared/ui";
import { useTheme } from "next-themes";

export const ThemeToggler = ({}) => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 w-full">
      <label className="relative" htmlFor="theme">
        <Icon name="Moon" />
      </label>
      <Switch
        id="theme"
        checked={resolvedTheme === "dark"}
        onClick={() => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }}
      />
    </div>
  );
};
