"use client";

import { useAuth } from "@clerk/nextjs";
import { GameCard, GameCardSkeleton } from "@entities/game";
import {
  GAMES_LIMIT_VALUES,
  getPaginateQuery,
  retrieveLibraryFiltersFromSearchParams,
  retrieveLibrarySortFromSearchParams,
  retrievePaginateFromSearchParams,
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
  const { userId: authUserId } = useAuth();
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

  const { data, isFetching, isPreviousData, isError } =
    userLibraryApi.getLibrary(
      username,
      { enabled: true, noLimit: false },
      {
        filters,
        paginate,
        sort,
      }
    );

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

  if (isError) {
    router.push(HOME_ROUTE);
  }

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
    <div className="space-y-4 px-2">
      <div className="flex flex-wrap mb-2 gap-2 md:gap-x-4 md:gap-y-6">
        {data.library.map((game) => (
          <GameCard
            key={game.id}
            game={{
              category: game.category,
              id: game.id,
              name: game.name,
              cover: game.coverUrl,
              rating: game.totalRating,
              themes: game.themes,
              gameModes: game.gameModes,
              genres: game.genres,
              releaseDate: game.releaseDate
                ? new Date(game.releaseDate)
                : undefined,
            }}
            libraryGameData={{
              finishedAt: game.finishedAt,
              notes: game.notes,
              playTime: game.playTime,
              status: game.status,
              userRating: game.userRating,
            }}
            isInLibrary
            userId={authUserId}
            username={username}
            disableLibraryButton={!data.isOwnProfile}
          />
        ))}
      </div>
      <Pagination
        isFetching={isFetching}
        onPaginateChange={onPaginateChange}
        isPreviousData={isPreviousData}
        hasMore={data.library.length === paginate.limit}
        limit={paginate.limit}
        limitValues={GAMES_LIMIT_VALUES}
        offset={paginate.offset}
        totalPages={Math.ceil(data.count / paginate.limit)}
      />
    </div>
  ) : (
    <Title size="small">No games found. Please, try again</Title>
  );
};
