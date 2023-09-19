"use client";

import { ReviewSortFields, SortFieldsOrder } from "@shared/api";
import {
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ReviewsFilterProps {}

export const ReviewsFilter = ({}: ReviewsFilterProps) => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [hideSpoilers, setHideSpoilers] = useState(
    () => params.get("hideSpoilers") === "true"
  );

  const onSelectValue = (
    key: "field" | "order" | "hideSpoilers",
    value: string
  ) => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (key === "field" && value === ReviewSortFields.TOTAL_VOTES) {
      current.delete(key);
    } else if (key === "order" && value === SortFieldsOrder.DESC) {
      current.delete(key);
    } else if (key === "hideSpoilers" && !value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex items-center justify-between gap-2 my-4 md:my-6">
      <div className="flex flex-auto items-center gap-2">
        <Select
          onValueChange={(val) => onSelectValue("field", val)}
          defaultValue={params.get("field") ?? ReviewSortFields.TOTAL_VOTES}
        >
          <SelectTrigger className="md:max-w-xs">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ReviewSortFields.TOTAL_VOTES}>
              Total Votes
            </SelectItem>
            <SelectItem value={ReviewSortFields.RATING}>Rating</SelectItem>
            <SelectItem value={ReviewSortFields.CREATED_AT}>
              Release Date
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(val) => onSelectValue("order", val)}
          defaultValue={params.get("order") ?? SortFieldsOrder.DESC}
        >
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortFieldsOrder.DESC}>Descending</SelectItem>
            <SelectItem value={SortFieldsOrder.ASC}>Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer">
        <Checkbox
          checked={hideSpoilers}
          onCheckedChange={(checked) => {
            setHideSpoilers(!!checked);
            onSelectValue("hideSpoilers", checked ? "true" : "");
          }}
          id="hideSpoilers"
        />
        <label
          htmlFor="hideSpoilers"
          className="cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Hide Spoilers
        </label>
      </div>
    </div>
  );
};
