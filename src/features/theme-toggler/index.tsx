"use client";

import { Icon, Skeleton, Switch } from "@shared/ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggler = ({ id }: { id?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-[24px] w-[44px] rounded-full" />
      </div>
    );

  return (
    <div className="flex items-center gap-2 w-full">
      <label className="relative" htmlFor="theme">
        <Icon name="Moon" />
      </label>
      <Switch
        id={id || "theme"}
        checked={resolvedTheme === "dark"}
        onClick={() => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }}
      />
    </div>
  );
};
