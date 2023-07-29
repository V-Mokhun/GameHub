"use client";

import { GameCardSkeleton } from "@entities/game";
import {
  GAMES_LIMIT_VALUES,
  getPaginateQuery,
  retrieveLibraryFiltersFromSearchParams,
  retrieveLibrarySortFromSearchParams,
  retrievePaginateFromSearchParams,
  userApi,
  userLibraryApi,
} from "@shared/api";
import { HOME_ROUTE, PROFILE_ROUTE, TOAST_TIMEOUT } from "@shared/consts";
import { Title, useToast } from "@shared/ui";
import { Pagination } from "@widgets/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface LibraryGamesProps {
  username: string;
}

export const LibraryGames = ({ username }: LibraryGamesProps) => {
  const { toast } = useToast();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const sort = retrieveLibrarySortFromSearchParams(params);
  const paginate = retrievePaginateFromSearchParams(params);
  const { filters } = retrieveLibraryFiltersFromSearchParams(params);

  const onPaginateChange = (limit: number, offset: number) => {
    const query = getPaginateQuery(params, limit, offset);

    router.push(`${pathname}${query}`);
  };

  // const { data: userData, isLoading: isUserLoading } =
  //   userApi.getUser(username);

  const { data, isFetching, isPreviousData } =
    userLibraryApi.getFilteredLibrary(username, {
      filters,
      paginate,
      sort,
    });

  if (data?.isPrivateLibrary) {
    router.push(PROFILE_ROUTE(username));
    setTimeout(() => {
      toast({
        title: `${username}'s library is private`,
        description: "You can't see their library",
        variant: "destructive",
      });
    }, TOAST_TIMEOUT);
    return null;
  }

  if (isFetching) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 md:gap-x-4 md:gap-y-6">
          {[...Array(10)].map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
        <Pagination
          isFetching={isFetching}
          onPaginateChange={onPaginateChange}
          isPreviousData={isPreviousData}
          hasMore={data?.library.length === paginate.limit}
          limit={paginate.limit}
          limitValues={GAMES_LIMIT_VALUES}
          offset={paginate.offset}
          totalPages={data?.count ? Math.ceil(data.count / paginate.limit) : 0}
        />
      </div>
    );
  }

  return data && data.library.length > 0 ? (
    <>games</>
  ) : (
    <Title size="small">No games found. Please, try again</Title>
  );
};
