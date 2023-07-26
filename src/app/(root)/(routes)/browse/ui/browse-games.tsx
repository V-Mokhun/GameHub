"use client";

import { useAuth } from "@clerk/nextjs";
import {
  gamesApi,
  retrieveFiltersFromSearchParams,
  retrievePaginateFromSearchParams,
  retrieveSortFromSearchParams,
} from "@shared/api";
import { GameList } from "@widgets/game-list";
import { useSearchParams } from "next/navigation";

interface BrowseGamesProps {}

export const BrowseGames = ({}: BrowseGamesProps) => {
  const { userId } = useAuth();
  const params = useSearchParams();
  const filters = retrieveFiltersFromSearchParams(params);
  const sort = retrieveSortFromSearchParams(params);
  const paginate = retrievePaginateFromSearchParams(params);

  const { data, isLoading, isPreviousData } = gamesApi.getGames({ filters, paginate, sort });

  return <GameList userId={userId} games={data || []} />;
};
