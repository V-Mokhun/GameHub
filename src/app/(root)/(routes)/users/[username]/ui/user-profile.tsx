"use client";

import { userApi } from "@shared/api";
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
  const { data, isLoading } = userApi.getUser(username);

  const ratedGames =
    data &&
    data.libraryIncluded &&
    data.user.library
      .filter((game) => game.userRating)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 4);

  const wantedGames =
    data &&
    data.libraryIncluded &&
    data.user.library
      .filter((game) => game.status === "WANT_TO_PLAY")
      .slice(0, 4);

  return (
    <div className="pb-4 md:pb-6">
      <UserMenu isLoading={isLoading} username={username} />
      <Separator />
      <UserView
        data={
          data
            ? {
                createDate: data.user.createdAt,
                imageUrl: data.user.imageUrl,
                isOwnProfile: data.isOwnProfile,
                username: data.user.username!,
              }
            : undefined
        }
      />
      <Separator />
      <div className="space-y-6">
        {ratedGames && ratedGames.length > 0 && (
          <RatedGames
            games={ratedGames}
            gamesCount={data.user._count.library}
            isOwnProfile={data.isOwnProfile}
            isPrivateLibrary={data.user.isPrivateLibrary}
            username={data.user.username!}
            userId={authUserId}
          />
        )}
        {wantedGames && wantedGames.length > 0 && (
          <WantedGames
            games={wantedGames}
            isOwnProfile={data.isOwnProfile}
            username={data.user.username!}
            userId={authUserId}
          />
        )}
      </div>
    </div>
  );
};
