"use client";

import { GAME_CATEGORIES, gamesApi } from "@shared/api";
import { cn, updateSearchParams, useClickOutside } from "@shared/lib";
import { Button, Icon, Overlay, Title } from "@shared/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useBrowseFilterStore } from "../model";
import { BrowseFilterName } from "./browse-filter-name";
import { BrowseFilterRating } from "./browse-filter-rating";
import { BrowseFilterSelect } from "./browse-filter-select";

interface BrowseFilterProps {}

export const BrowseFilter = ({}: BrowseFilterProps) => {
  const isOpen = useBrowseFilterStore((state) => state.isOpen);
  const onClose = useBrowseFilterStore((state) => state.onClose);
  const onOpen = useBrowseFilterStore((state) => state.onOpen);
  const ref = useClickOutside(onClose);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onUpdateParams = useCallback(
    (key: string, value: string) => {
      const query = updateSearchParams(params, key, value);
      router.push(`${pathname}${query}`);
    },
    [params, pathname, router]
  );

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
              params={params}
              onChange={(value) => onUpdateParams("name", value)}
            />
            <BrowseFilterRating onChange={onUpdateParams} params={params} />
            <BrowseFilterSelect
              onSelect={(val) => {
                onUpdateParams("genres", val);
              }}
              title="Genre"
              fetchData={gamesApi.getGenres}
              onFilterOpen={onOpen}
              params={params}
              selectKey="genres"
            />
            <BrowseFilterSelect
              onSelect={(val) => {
                onUpdateParams("themes", val);
              }}
              title="Themes"
              fetchData={gamesApi.getThemes}
              onFilterOpen={onOpen}
              params={params}
              selectKey="themes"
            />
            <BrowseFilterSelect
              onSelect={(val) => {
                onUpdateParams("categories", val);
              }}
              title="Categories"
              fetchData={() => ({ data: GAME_CATEGORIES, isLoading: false })}
              onFilterOpen={onOpen}
              params={params}
              selectKey="categories"
            />
            <BrowseFilterSelect
              onSelect={(val) => {
                onUpdateParams("gameModes", val);
              }}
              title="Modes"
              fetchData={gamesApi.getModes}
              onFilterOpen={onOpen}
              params={params}
              selectKey="gameModes"
            />
          </div>
        </div>
      </aside>
    </>
  );
};
