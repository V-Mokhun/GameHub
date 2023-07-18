"use client";

import { Command, CommandInput } from "@shared/ui";

interface HeaderSearchProps {}

export const HeaderSearch = ({}: HeaderSearchProps) => {
  return (
    <Command className="max-w-md">
      <CommandInput className="h-10" placeholder="Search games" />
    </Command>
  );
};
