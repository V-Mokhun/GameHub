"use client";

import { useDebouncedValue } from "@shared/lib/hooks";
import { Input, Label } from "@shared/ui";
import { useEffect, useState } from "react";

interface UsersSearchProps {
  onChange: (value: string) => void;
  search: string;
}

export const UsersSearch = ({ onChange, search }: UsersSearchProps) => {
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearchValue] = useDebouncedValue(searchValue);

  useEffect(() => {
    onChange(debouncedSearchValue);
  }, [debouncedSearchValue]);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <Input
      id="user-name"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search..."
    />
  );
};
