"use client";

import { useDebouncedValue } from "@shared/lib";
import { Input, Label } from "@shared/ui";
import { useState } from "react";

interface BrowseFilterNameProps {
}

export const BrowseFilterName = ({}: BrowseFilterNameProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchValue);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="browse-filter-name" className="text-base">
        Name
      </Label>
      <Input
        id="browse-filter-name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};
