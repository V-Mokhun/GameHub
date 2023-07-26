"use client";

import { useAuth } from "@clerk/nextjs";
import {
  GAMES_LIMIT_VALUES,
  gamesApi,
  retrieveFiltersFromSearchParams,
  retrievePaginateFromSearchParams,
  retrieveSortFromSearchParams,
} from "@shared/api";
import { Title } from "@shared/ui";
import { GameList } from "@widgets/game-list";
import { Pagination } from "@widgets/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BrowseGamesProps {}

export const BrowseGames = ({}: BrowseGamesProps) => {
  const { userId } = useAuth();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const filters = retrieveFiltersFromSearchParams(params);
  const sort = retrieveSortFromSearchParams(params);
  const paginate = retrievePaginateFromSearchParams(params);

  const onPaginateChange = (limit: number, offset: number) => {
    const current = new URLSearchParams(Array.from(params.entries()));

    current.set("limit", String(limit));
    current.set("offset", String(offset));
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const { data, isLoading, isFetching, isPreviousData } = gamesApi.getGames({
    filters,
    paginate,
    sort,
  });

  const { data: gamesCount } = gamesApi.getGamesCount({
    filters,
    paginate,
    sort,
  });

  return data && data.length > 0 ? (
    <div className="space-y-4">
      <GameList userId={userId} games={data || []} />
      <Pagination
        isFetching={isFetching}
        onPaginateChange={onPaginateChange}
        isPreviousData={isPreviousData}
        hasMore={data?.length === paginate.limit}
        limit={paginate.limit}
        limitValues={GAMES_LIMIT_VALUES}
        offset={paginate.offset}
        totalPages={gamesCount ? Math.ceil(gamesCount / paginate.limit) : 0}
      />
    </div>
  ) : (
    <Title size="small">No games found. Please, try again</Title>
  );
};
