"use client";

import {
  DEFAULT_LIBRARY_FILTERS,
  LibrarySortFields,
  MIN_USER_RATING,
  SortFieldsOrder,
  userApi,
  userLibraryApi,
} from "@shared/api";
import { UserMenu } from "./user-menu";
import { UserView } from "./user-view";
import { Separator, Skeleton } from "@shared/ui";
import { RatedGames } from "./rated-games";
import { WantedGames } from "./wanted-games";
import { useAuth } from "@clerk/nextjs";
import { GameCardSkeleton } from "@entities/game";
import { GameStatus } from "@prisma/client";
import { useActiveList } from "@shared/lib/hooks";

interface UserProfileProps {
  username: string;
}

const GamesSkeleton = () => (
  <div>
    <Skeleton className="h-8 w-48 mb-4" />
    <div className="flex flex-wrap mb-2 gap-2 md:gap-x-4 md:gap-y-6">
      {[...Array(4)].map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
    <Skeleton className="h-6 w-28" />
  </div>
);

export const UserProfile = ({ username }: UserProfileProps) => {
  const { userId: authUserId } = useAuth();
  const { members } = useActiveList();

  const { data: userData, isLoading: isUserLoading } =
    userApi.getUser(username);
  const { data: ownProfile, isLoading: isOwnProfileLoading } =
    userApi.getOwnProfile(authUserId ?? undefined, {
      enabled: !isUserLoading && !userData?.isOwnProfile,
      includeFullRequests: false,
    });
  const { data: ratedLibrary, isLoading: isRatedLibraryLoading } =
    userLibraryApi.getLibrary(
      username,
      { enabled: userData?.libraryIncluded || false, noLimit: false },
      {
        filters: {
          ...DEFAULT_LIBRARY_FILTERS,
          userRatingMin: MIN_USER_RATING,
        },
        paginate: {
          limit: 4,
          offset: 0,
        },
        sort: {
          field: LibrarySortFields.UPDATED_DATE,
          order: SortFieldsOrder.DESC,
        },
      }
    );
  const { data: wantedLibrary, isLoading: isWantedLibraryLoading } =
    userLibraryApi.getLibrary(
      username,
      { enabled: userData?.libraryIncluded || false, noLimit: false },
      {
        filters: {
          ...DEFAULT_LIBRARY_FILTERS,
          status: GameStatus.WANT_TO_PLAY,
        },
        paginate: {
          limit: 4,
          offset: 0,
        },
        sort: {
          field: LibrarySortFields.UPDATED_DATE,
          order: SortFieldsOrder.DESC,
        },
      }
    );

  const ratedGames = userData && ratedLibrary;
  const wantedGames = userData && wantedLibrary;
  const isLibraryLoading = isRatedLibraryLoading || isWantedLibraryLoading;

  const showGamesSkeleton =
    (isLibraryLoading && !userData) ||
    (isLibraryLoading && userData && userData.libraryIncluded);

  const ratedGamesContent = ratedGames && ratedGames.library.length > 0 && (
    <RatedGames
      games={ratedGames.library}
      gamesCount={userData.user._count.library}
      isOwnProfile={userData.isOwnProfile}
      isPrivateLibrary={userData.user.isPrivateLibrary}
      username={userData.user.username!}
      userId={authUserId}
    />
  );
  const wantedGamesContent = wantedGames && wantedGames.library.length > 0 && (
    <WantedGames
      games={wantedGames.library}
      isOwnProfile={userData.isOwnProfile}
      username={userData.user.username!}
      userId={authUserId}
    />
  );

  return (
    <div className="pb-4 md:pb-6">
      <UserMenu
        includePrivateRoutes={userData?.libraryIncluded}
        isLoading={isUserLoading}
        username={username}
      />
      <Separator className="mt-0" />
      <UserView
        data={
          userData
            ? {
                createDate: userData.user.createdAt,
                imageUrl: userData.user.imageUrl,
                isOwnProfile: userData.isOwnProfile,
                username: userData.user.username!,
              }
            : undefined
        }
        ownProfile={ownProfile}
        isOwnProfileLoading={isOwnProfileLoading}
        isActive={members.some((member) => member === userData?.user.id)}
      />
      <Separator />
      <div className="space-y-6">
        {showGamesSkeleton ? (
          <>
            <GamesSkeleton />
            <GamesSkeleton />
          </>
        ) : (
          <>
            {ratedGamesContent}
            {wantedGamesContent}
          </>
        )}
      </div>
    </div>
  );
};
