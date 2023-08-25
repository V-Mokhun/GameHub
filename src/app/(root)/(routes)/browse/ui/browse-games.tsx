"use client";

import { useUser } from "@clerk/nextjs";
import { GameCardSkeleton } from "@entities/game";
import {
  GAMES_LIMIT_VALUES,
  gamesApi,
  onPaginate,
  retrieveFiltersFromSearchParams,
  retrievePaginateFromSearchParams,
  retrieveSortFromSearchParams,
  userLibraryApi
} from "@shared/api";
import { Title } from "@shared/ui";
import { GameList } from "@widgets/game-list";
import { Pagination } from "@widgets/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

interface BrowseGamesProps {}

export const BrowseGames = ({}: BrowseGamesProps) => {
  const { user } = useUser();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { filters } = retrieveFiltersFromSearchParams(params);
  const sort = retrieveSortFromSearchParams(params);
  const paginate = retrievePaginateFromSearchParams(params);
  const topRef = useRef<HTMLDivElement | null>(null);

  const { data, isFetching, isPreviousData } = gamesApi.getGames({
    filters,
    paginate,
    sort,
  });

  const { data: libraryData } = userLibraryApi.getLibrary(
    user?.username || "",
    { noLimit: true, enabled: true }
  );

  const { data: gamesCount } = gamesApi.getGamesCount({
    filters,
    paginate,
    sort,
  });

  if (isFetching) {
    return (
      <div className="space-y-4 px-2">
        <div className="flex flex-wrap gap-2 md:gap-x-4 md:gap-y-6">
          {[...Array(10)].map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
        <Pagination
          isFetching={isFetching}
          onPaginateChange={(limit, offset) =>
            onPaginate({
              limit,
              offset,
              params,
              pathname,
              router,
            })
          }
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
    <div ref={topRef} className="space-y-4 px-2">
      <GameList
        userId={user?.id}
        username={user?.username || ""}
        libraryGames={libraryData?.library || []}
        games={data || []}
      />
      <Pagination
        isFetching={isFetching}
        onPaginateChange={(limit, offset) =>
          onPaginate({
            limit,
            offset,
            params,
            pathname,
            router,
          })
        }
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
