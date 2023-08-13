"use client";

import { UserWithFriends, userApi } from "@shared/api";
import { FRIENDS_RECEIVED_REQUESTS_ROUTE, USERS_ROUTE } from "@shared/consts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Link,
  Separator,
  SignOutButton,
  Skeleton,
  Title,
} from "@shared/ui";
import { UsersList } from "@widgets/users";
import { useState } from "react";

interface HeaderRequestsProps {
  authUserId: string;
}

export const HeaderRequests = ({ authUserId }: HeaderRequestsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userData, isLoading: isUserLoading } = userApi.getOwnProfile(
    authUserId,
    {
      includeFullRequests: true,
    }
  );

  if (isUserLoading)
    return <Skeleton className="w-5 h-5 shrink-0 rounded-md" />;

  const requestFriends = userData?.receivedFriendRequests
    ? userData.receivedFriendRequests
        .slice(0, 5)
        .map((req) => ({ ...(req.sender as UserWithFriends), isFriend: false }))
    : [];

  return (
    userData && (
      <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger className="relative">
          <Icon name="Bell" />
          <span className="absolute -top-2 -right-1 text-xs w-4 h-4 rounded-full bg-accent inline-flex items-center justify-center">
            {(userData?.receivedFriendRequests.length ?? 0) > 9
              ? "9+"
              : userData?.receivedFriendRequests.length}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[200px] max-w-xs">
          <Title size="small">Friend Requests</Title>
          <Separator className="my-2" />
          <UsersList
            isSmall={true}
            isLoading={isUserLoading}
            users={requestFriends}
            notFoundMessage="You have no friend requests at the moment."
          />
          <Separator className="my-2" />
          {userData?.receivedFriendRequests.length > 0 ? (
            <Link
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1"
              href={FRIENDS_RECEIVED_REQUESTS_ROUTE(userData.username!)}
            >
              <span>See all</span>{" "}
              <Icon name="ArrowRight" className="inline-block text-primary" />
            </Link>
          ) : (
            <Link
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1"
              href={USERS_ROUTE}
            >
              <span>Find Friends</span>{" "}
              <Icon name="ArrowRight" className="inline-block text-primary" />
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};
