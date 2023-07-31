"use client";

import { FiltersButton } from "@features/filters-button";
import {
  LibrarySortFields,
  SortFieldsOrder,
  retrieveLibraryFiltersFromSearchParams,
} from "@shared/api";
import { LIBRARY_ROUTE } from "@shared/consts";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";
import { useLibraryFilterStore } from "@widgets/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface LibraryFiltersProps {
  username: string;
}

export const LibraryFilters = ({ username }: LibraryFiltersProps) => {
  const onOpenFilter = useLibraryFilterStore((state) => state.onOpen);
  const resetFilters = useLibraryFilterStore((state) => state.resetFilters);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isDefault } = retrieveLibraryFiltersFromSearchParams(params);

  const onSelectValue = (key: "field" | "order", value: string) => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (key === "field" && value === LibrarySortFields.USER_RATING) {
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
            defaultValue={params.get("field") ?? LibrarySortFields.USER_RATING}
          >
            <SelectTrigger className="md:max-w-xs">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={LibrarySortFields.USER_RATING}>
                User Rating
              </SelectItem>
              <SelectItem value={LibrarySortFields.RATING}>Rating</SelectItem>
              <SelectItem value={LibrarySortFields.RELEASE_DATE}>
                Release Date
              </SelectItem>
              <SelectItem value={LibrarySortFields.PLAY_TIME}>
                Play Time
              </SelectItem>
              <SelectItem value={LibrarySortFields.ADDED_DATE}>
                Date Added
              </SelectItem>
              <SelectItem value={LibrarySortFields.UPDATED_DATE}>
                Date Edited
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
              router.push(LIBRARY_ROUTE(username));
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
              router.push(LIBRARY_ROUTE(username));
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
