"use client";

import { FiltersButton } from "@features/filters-button";
import {
  SortFields,
  SortFieldsOrder,
  retrieveFiltersFromSearchParams,
} from "@shared/api";
import { BROWSE_ROUTE } from "@shared/consts";
import {
  Button,
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
  const resetFilters = useBrowseFilterStore((state) => state.resetFilters);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isDefault } = retrieveFiltersFromSearchParams(params);

  const onSelectValue = (key: "field" | "order", value: string) => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (key === "field" && value === SortFields.RATING) {
      current.delete(key);
    } else if (key === "order" && value === SortFieldsOrder.DESC) {
      current.delete(key);
    } else {
      current.set(key, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <>
      <div className="sticky top-[58px] md:top-[66px] bg-background z-10 px-2 py-4 flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2 flex-auto">
          <Select
            onValueChange={(val) => onSelectValue("field", val)}
            defaultValue={params.get("field") ?? SortFields.RATING}
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
        {!isDefault && (
          <Button
            className="hidden xl:block"
            onClick={() => {
              resetFilters();
              router.push(BROWSE_ROUTE);
              router.refresh();
            }}
            variant="destructive"
          >
            Clear Filters
          </Button>
        )}
        <FiltersButton onClick={onOpenFilter} />
      </div>
      {!isDefault && (
        <div className="xl:hidden flex justify-end">
          <Button
            onClick={() => {
              resetFilters();
              router.push(BROWSE_ROUTE);
              router.refresh();
            }}
            variant="destructive"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </>
  );
};
