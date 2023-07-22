"use client";

import { cn, useClickOutside } from "@shared/lib";
import { Title } from "@shared/ui";
import { useBrowseFilterStore } from "../model";
import { BrowseFilterName } from "./browse-filter-name";
import { BrowseFilterRating } from "./browse-filter-rating";
import { BrowseFilterSelect } from "./browse-filter-select";
import { GAME_CATEGORIES, gamesApi } from "@shared/api";

interface BrowseFilterProps {}

export const BrowseFilter = ({}: BrowseFilterProps) => {
  const isOpen = useBrowseFilterStore((state) => state.isOpen);
  const onClose = useBrowseFilterStore((state) => state.onClose);
  const ref = useClickOutside(onClose);

  return (
    <aside
      ref={ref}
      className={cn(
        "fixed right-0 top-0 z-40 shadow-xl w-[300px] h-screen overflow-hidden flex flex-col transition-transform",
        !isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}
    >
      <div className="bg-background p-4 flex-auto overflow-y-auto h-full">
        <Title className="mb-4 lg:mb-6">Filter Games</Title>
        <div className="flex flex-col gap-4">
          <BrowseFilterName />
          <BrowseFilterRating />
          <BrowseFilterSelect title="Genre" fetchData={gamesApi.getGenres} />
          <BrowseFilterSelect title="Themes" fetchData={gamesApi.getThemes} />
          <BrowseFilterSelect title="Categories" data={GAME_CATEGORIES} />
          <BrowseFilterSelect title="Modes" fetchData={gamesApi.getModes} />
        </div>
      </div>
    </aside>
  );
};
