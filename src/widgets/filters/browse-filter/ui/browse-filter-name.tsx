"use client";

import { useDebouncedValue } from "@shared/lib";
import { Input, Label } from "@shared/ui";
import { useEffect, useState } from "react";

interface BrowseFilterNameProps {
  onChange: (value: string) => void;
  search: string;
}

export const BrowseFilterName = ({
  onChange,
  search,
}: BrowseFilterNameProps) => {
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearchValue] = useDebouncedValue(searchValue);

  useEffect(() => {
    onChange(debouncedSearchValue);
  }, [debouncedSearchValue]);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

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
