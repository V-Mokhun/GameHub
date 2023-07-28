"use client";

import { userApi } from "@shared/api";

interface UserProfileProps {
  isOwnProfile: boolean;
  username: string;
}

export const UserProfile = ({ isOwnProfile, username }: UserProfileProps) => {
  const { data: user, isLoading } = userApi.getUser(username);

  return <>{user?.username}</>;
};
