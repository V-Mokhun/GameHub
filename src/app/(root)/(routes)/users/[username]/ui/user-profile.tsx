"use client";

import { userApi } from "@shared/api";
import { UserMenu } from "./user-menu";

interface UserProfileProps {
  username: string;
}

export const UserProfile = ({ username }: UserProfileProps) => {
  const { data, isLoading } = userApi.getUser(username);

  return (
    <>
      <UserMenu isLoading={isLoading} username={username} />
    </>
  );
};
