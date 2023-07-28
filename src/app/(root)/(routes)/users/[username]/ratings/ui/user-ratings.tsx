"use client";

import { useAuth } from "@clerk/nextjs";
import { userApi, userLibraryApi } from "@shared/api";
import { Subtitle, Title } from "@shared/ui";

interface UserRatingsProps {
  username: string;
}

export const UserRatings = ({ username }: UserRatingsProps) => {
  const { userId: authUserId } = useAuth();
  const { data: userData, isLoading: isUserLoading } =
    userApi.getUser(username);
  const { data: library, isLoading: isLibraryLoading } =
    userLibraryApi.getLibrary(
      userData?.user.username || "",
      userData?.libraryIncluded
    );

  if (!userData) return null;

  return (
    <div className="pb-4 md:pb-6">
      <Title>
        {userData.isOwnProfile
          ? "Your ratings"
          : `${userData.user.username}'s ratings`}
      </Title>
      <Subtitle size="large">Most recent user&apos;s ratings</Subtitle>
    </div>
  );
};
