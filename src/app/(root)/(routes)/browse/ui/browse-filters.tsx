"use client";

import { FiltersButton } from "@features/filters-button";
import { SortFields, SortFieldsOrder } from "@shared/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";
import { useBrowseFilterStore } from "@widgets/filter";

interface BrowseFiltersProps {}

export const BrowseFilters = ({}: BrowseFiltersProps) => {
  const onOpenFilter = useBrowseFilterStore((state) => state.onOpen);

  const onSortFieldChange = () => {};

  return (
    <div className="flex items-center justify-between gap-4 mb-2">
      <div className="flex items-center gap-2 flex-auto">
        <Select defaultValue={SortFields.RATING}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortFields.RATING}>Rating</SelectItem>
            <SelectItem value={SortFields.RELEASE_DATE}>
              Release Date
            </SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue={SortFieldsOrder.DESC}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortFieldsOrder.DESC}>Descending</SelectItem>
            <SelectItem value={SortFieldsOrder.ASC}>Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <FiltersButton onClick={onOpenFilter} />
    </div>
  );
};
