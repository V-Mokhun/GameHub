"use client";

import { FiltersButton } from "@features/filters-button";
import { SortFields, SortFieldsOrder } from "@shared/api";
import { updateSearchParams } from "@shared/lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";
import { useBrowseFilterStore } from "@widgets/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BrowseFiltersProps {}

export const BrowseFilters = ({}: BrowseFiltersProps) => {
  const onOpenFilter = useBrowseFilterStore((state) => state.onOpen);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectValue = (key: "field" | "order", value: string) => {
    const query = updateSearchParams(params, key, value);
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-2">
      <div className="flex items-center gap-2 flex-auto">
        <Select
          onValueChange={(val) => onSelectValue("field", val)}
          defaultValue={params.get("field") || SortFields.RATING}
        >
          <SelectTrigger className="md:max-w-xs">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortFields.RATING}>Rating</SelectItem>
            <SelectItem value={SortFields.RELEASE_DATE}>
              Release Date
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(val) => onSelectValue("order", val)}
          defaultValue={params.get("order") || SortFieldsOrder.DESC}
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
      <FiltersButton onClick={onOpenFilter} />
    </div>
  );
};
