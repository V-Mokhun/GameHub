"use client";

import { userApi } from "@shared/api";
import { UserMenu } from "./user-menu";
import { UserView } from "./user-view";
import { Separator } from "@shared/ui";

interface UserProfileProps {
  username: string;
}

export const UserProfile = ({ username }: UserProfileProps) => {
  const { data, isLoading } = userApi.getUser(username);

  return (
    <>
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
    </>
  );
};
