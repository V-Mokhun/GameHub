"use client";

import { useDebouncedValue } from "@shared/lib";
import { Input, Label } from "@shared/ui";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BrowseFilterNameProps {
  onChange: (value: string) => void;
  params: ReadonlyURLSearchParams;
}

export const BrowseFilterName = ({
  onChange,
  params,
}: BrowseFilterNameProps) => {
  const [searchValue, setSearchValue] = useState(
    () => params.get("name") || ""
  );
  const [debouncedSearchValue] = useDebouncedValue(searchValue);

  useEffect(() => {
    if (params.get("name") === debouncedSearchValue) return;

    onChange(debouncedSearchValue);
  }, [onChange, debouncedSearchValue, params]);

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
