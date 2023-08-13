"use client";

import { useAuth } from "@clerk/nextjs";
import { UserWithFriends, userApi } from "@shared/api";
import { Title } from "@shared/ui";
import { UsersItem, UsersItemSkeleton } from "./users-item";
import { cn } from "@shared/lib";
import { useActiveList } from "@shared/lib/hooks";
import { useEffect, useMemo } from "react";
import { pusherClient } from "@shared/config";
import { SEND_FRIEND_REQUEST } from "@shared/consts";
import { useQueryClient } from "@tanstack/react-query";

interface UsersListProps {
  users?: (UserWithFriends & { isFriend: boolean })[];
  isLoading: boolean;
  notFoundMessage?: string;
  isSmall?: boolean;
}

export const UsersList = ({
  users,
  isLoading,
  notFoundMessage = "No Users Found",
  isSmall,
}: UsersListProps) => {
  const { userId } = useAuth();
  const { members } = useActiveList();
  const { data: ownProfile } = userApi.getOwnProfile(userId ?? undefined);

  if (isLoading)
    return (
      <ul className={cn("flex flex-col", isSmall ? "gap-2" : "gap-4")}>
        {[...Array(5)].map((_, i) => (
          <UsersItemSkeleton key={i} />
        ))}
      </ul>
    );

  return users && users.length > 0 ? (
    <ul className={cn("flex flex-col", isSmall ? "gap-2" : "gap-4")}>
      {users.map((user) => (
        <UsersItem
          isSelf={user.id === userId}
          key={user.id}
          user={user}
          authUser={ownProfile}
          isSmall={isSmall}
          isActive={members?.some((m) => m === user.id)}
        />
      ))}
    </ul>
  ) : (
    <Title size={isSmall ? "xs" : "medium"}>{notFoundMessage}</Title>
  );
};
