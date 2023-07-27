"use client";

import {
  GAME_CATEGORIES,
  MAX_RATING,
  MIN_RATING,
  gamesApi,
  retrieveFiltersFromSearchParams,
  stringifyFilters,
} from "@shared/api";
import { cn, useClickOutside } from "@shared/lib";
import { Button, Icon, Overlay, Title } from "@shared/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useBrowseFilterStore } from "../model";
import { BrowseFilterName } from "./browse-filter-name";
import { BrowseFilterRating } from "./browse-filter-rating";
import { BrowseFilterSelect } from "./browse-filter-select";

interface BrowseFilterProps {}

export const BrowseFilter = ({}: BrowseFilterProps) => {
  const { filters, isOpen, onClose, onOpen, updateFilters, setFilters } =
    useBrowseFilterStore();

  const ref = useClickOutside(onClose);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { filters: defaultFilters } = retrieveFiltersFromSearchParams(params);

    setFilters(defaultFilters);
  }, []);

  useEffect(() => {
    const query = stringifyFilters(params, filters);
    router.push(`${pathname}${query}`);
  }, [filters, params, pathname, router]);

  return (
    <>
      <Overlay isOpen={isOpen} />
      <aside
        ref={ref}
        className={cn(
          "fixed right-0 top-0 z-40 shadow-xl w-[300px] h-screen overflow-hidden flex flex-col transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="relative bg-background p-4 flex-auto overflow-y-auto h-full">
          <Button
            onClick={onClose}
            className="absolute top-2 right-2"
            size="icon"
            variant="destructive"
          >
            <Icon name="X" className="text-white" />
          </Button>
          <Title className="mb-4 lg:mb-6">Filter Games</Title>
          <div className="flex flex-col gap-4">
            <BrowseFilterName
              search={filters.name || ""}
              onChange={(value) => updateFilters("name", value)}
            />
            <BrowseFilterRating
              onChange={updateFilters}
              minRatingValue={filters.ratingMin}
              maxRatingValue={filters.ratingMax}
            />
            <BrowseFilterSelect
              onSelect={(val) => {
                updateFilters("genres", val);
              }}
              title="Genre"
              fetchData={gamesApi.getGenres}
              onFilterOpen={onOpen}
              params={params}
              selectKey="genres"
              filterValue={filters.genres}
            />
            <BrowseFilterSelect
              onSelect={(val) => {
                updateFilters("themes", val);
              }}
              title="Themes"
              fetchData={gamesApi.getThemes}
              onFilterOpen={onOpen}
              params={params}
              selectKey="themes"
              filterValue={filters.themes}
            />
            <BrowseFilterSelect
              onSelect={(val) => {
                updateFilters("categories", val);
              }}
              title="Categories"
              fetchData={() => ({ data: GAME_CATEGORIES, isLoading: false })}
              onFilterOpen={onOpen}
              params={params}
              selectKey="categories"
              filterValue={filters.categories}
            />
            <BrowseFilterSelect
              onSelect={(val) => {
                updateFilters("gameModes", val);
              }}
              title="Modes"
              fetchData={gamesApi.getModes}
              onFilterOpen={onOpen}
              params={params}
              selectKey="gameModes"
              filterValue={filters.gameModes}
            />
          </div>
        </div>
      </aside>
    </>
  );
};
