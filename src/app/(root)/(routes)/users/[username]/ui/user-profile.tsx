"use client";

import { userApi, userLibraryApi } from "@shared/api";
import { UserMenu } from "./user-menu";
import { UserView } from "./user-view";
import { Separator } from "@shared/ui";
import { RatedGames } from "./rated-games";
import { WantedGames } from "./wanted-games";
import { useAuth } from "@clerk/nextjs";

interface UserProfileProps {
  username: string;
}

export const UserProfile = ({ username }: UserProfileProps) => {
  const { userId: authUserId } = useAuth();
  const { data: userData, isLoading: isUserLoading } =
    userApi.getUser(username);
  const { data: library, isLoading: isLibraryLoading } =
    userLibraryApi.getLibrary(userData?.user.username || "");

  const ratedGames =
    userData &&
    userData.libraryIncluded &&
    library
      ?.filter((game) => game.userRating)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 4);

  const wantedGames =
    userData &&
    userData.libraryIncluded &&
    library?.filter((game) => game.status === "WANT_TO_PLAY").slice(0, 4);

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
        {ratedGames && ratedGames.length > 0 && (
          <RatedGames
            games={ratedGames}
            gamesCount={userData.user._count.library}
            isOwnProfile={userData.isOwnProfile}
            isPrivateLibrary={userData.user.isPrivateLibrary}
            username={userData.user.username!}
            userId={authUserId}
          />
        )}
        {wantedGames && wantedGames.length > 0 && (
          <WantedGames
            games={wantedGames}
            isOwnProfile={userData.isOwnProfile}
            username={userData.user.username!}
            userId={authUserId}
          />
        )}
      </div>
    </div>
  );
};
