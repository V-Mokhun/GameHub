"use client";
import { OwnProfile, UserWithFriends } from "@shared/api";
import { PROFILE_ROUTE } from "@shared/consts";
import { cn } from "@shared/lib";
import {
  ActiveIndicator,
  Avatar,
  AvatarImage,
  Link,
  Skeleton,
  Subtitle,
  Title,
} from "@shared/ui";
import { FriendsButton, MessageButton } from "@widgets/users";
import NextLink from "next/link";

interface UsersItemProps {
  user: UserWithFriends & { isFriend: boolean };
  isSelf?: boolean;
  authUser?: OwnProfile;
  isSmall?: boolean;
  isActive?: boolean;
  isReceivedRequest?: boolean;
}

export const UsersItemSkeleton = () => (
  <li className="flex items-start gap-4">
    <Skeleton className="w-24 h-24 rounded-full" />
    <div>
      <Skeleton className="w-48 h-8 mb-2 lg:mb-3" />
      <Skeleton className="w-24 h-6" />
    </div>

    <div className="flex items-center self-stretch flex-1 justify-end md:justify-start">
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  </li>
);

export const UsersItem = ({
  user,
  authUser,
  isSelf,
  isSmall,
  isActive,
  isReceivedRequest,
}: UsersItemProps) => {
  return (
    <li
      key={user.id}
      className={cn(
        "flex",
        isSmall ? "items-center gap-2" : "items-start gap-4"
      )}
    >
      <NextLink className="relative" href={PROFILE_ROUTE(user.username!)}>
        <Avatar
          className={cn(
            isSmall ? "w-6 h-6 md:w-8 md:h-8" : "w-20 h-20 md:w-24 md:h-24"
          )}
        >
          <AvatarImage src={user.imageUrl} />
        </Avatar>
        {isActive && <ActiveIndicator size="small" />}
      </NextLink>
      <div className="min-w-0">
        <Link className="text-foreground" href={PROFILE_ROUTE(user.username!)}>
          <Title
            className={isSmall ? "mb-0" : ""}
            size={isSmall ? "xs" : "small"}
          >
            {user.username}
          </Title>
        </Link>
        {!isSmall && (
          <Subtitle className="md:mb-0 mb-0">
            Friends: {user.friends.length ?? 0}
          </Subtitle>
        )}
      </div>
      {!isSelf && (
        <div
          className={cn(
            "flex items-center self-stretch flex-1 justify-end gap-2",
            !isSmall && "md:justify-start"
          )}
        >
          <MessageButton
            isSmall={isSmall}
            username={user.username!}
            isAutheticated={!!authUser?.id}
          />
          <FriendsButton
            isSmall={isSmall}
            authUser={authUser}
            isUserFriend={user.isFriend}
            userUsername={user.username}
            isReceivedRequest={isReceivedRequest}
          />
        </div>
      )}
    </li>
  );
};
