"use client";

import { useAuth } from "@clerk/nextjs";
import {
  GAMES_LIMIT_VALUES,
  gamesApi,
  retrieveFiltersFromSearchParams,
  retrievePaginateFromSearchParams,
  retrieveSortFromSearchParams,
} from "@shared/api";
import { Skeleton, Title } from "@shared/ui";
import { GameList } from "@widgets/game-list";
import { Pagination } from "@widgets/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BrowseGamesProps {}

export const BrowseGames = ({}: BrowseGamesProps) => {
  const { userId } = useAuth();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { filters } = retrieveFiltersFromSearchParams(params);
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

  const { data, isFetching, isPreviousData } = gamesApi.getGames({
    filters,
    paginate,
    sort,
  });

  const { data: gamesCount } = gamesApi.getGamesCount({
    filters,
    paginate,
    sort,
  });

  if (isFetching) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 md:gap-x-4 md:gap-y-6">
          {[...Array(10)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-72 sm:h-96 md:h-72 lg:h-80 xl:h-96 flex-[0_1_calc(50%-4px)] md:flex-[0_1_calc(33.3%-12px)] lg:flex-[0_1_calc(25%-12px)]"
            />
          ))}
        </div>
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
    );
  }

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
