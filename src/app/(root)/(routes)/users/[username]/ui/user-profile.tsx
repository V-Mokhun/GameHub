"use client";

import { userApi, userLibraryApi } from "@shared/api";
import { UserMenu } from "./user-menu";
import { UserView } from "./user-view";
import { Separator, Skeleton } from "@shared/ui";
import { RatedGames } from "./rated-games";
import { WantedGames } from "./wanted-games";
import { useAuth } from "@clerk/nextjs";
import { GameCardSkeleton } from "@entities/game";
import { GameStatus } from "@prisma/client";

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
  const { data: userData, isLoading: isUserLoading } =
    userApi.getUser(username);
  const { data: library, isLoading: isLibraryLoading } =
    userLibraryApi.getLibrary(
      userData?.user.username || "",
      userData?.libraryIncluded
    );

  const ratedGames =
    userData &&
    library
      ?.filter((game) => game.userRating)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 4);

  const wantedGames =
    userData &&
    library?.filter((game) => game.status === GameStatus.WANT_TO_PLAY).slice(0, 4);

  const showGamesSkeleton =
    (isLibraryLoading && !userData) ||
    (isLibraryLoading && userData && userData.libraryIncluded);

  const ratedGamesContent = ratedGames && ratedGames.length > 0 && (
    <RatedGames
      games={ratedGames}
      gamesCount={userData.user._count.library}
      isOwnProfile={userData.isOwnProfile}
      isPrivateLibrary={userData.user.isPrivateLibrary}
      username={userData.user.username!}
      userId={authUserId}
    />
  );
  const wantedGamesContent = wantedGames && wantedGames.length > 0 && (
    <WantedGames
      games={wantedGames}
      isOwnProfile={userData.isOwnProfile}
      username={userData.user.username!}
      userId={authUserId}
    />
  );

  return (
    <div className="pb-4 md:pb-6">
      <UserMenu isLoading={isUserLoading} username={username} />
      <Separator />
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
