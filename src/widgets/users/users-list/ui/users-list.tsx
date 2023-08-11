"use client";

import { useAuth } from "@clerk/nextjs";
import { UserWithFriends, userApi } from "@shared/api";
import { Title } from "@shared/ui";
import { UsersItem, UsersItemSkeleton } from "./users-item";

interface UsersListProps {
  users?: (UserWithFriends & { isFriend: boolean })[];
  isLoading: boolean;
}

export const UsersList = ({ users, isLoading }: UsersListProps) => {
  const { userId } = useAuth();
  const { data: ownProfile } = userApi.getOwnProfile(userId ?? undefined);

  if (isLoading)
    return (
      <ul className="flex flex-col gap-4">
        {[...Array(10)].map((_, i) => (
          <UsersItemSkeleton key={i} />
        ))}
      </ul>
    );

  return users && users.length > 0 ? (
    <ul className="flex flex-col gap-4">
      {users.map((user) => (
        <UsersItem key={user.id} user={user} authUser={ownProfile} />
      ))}
    </ul>
  ) : (
    <Title>No users found</Title>
  );
};
