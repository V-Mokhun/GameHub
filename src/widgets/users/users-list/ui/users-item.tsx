"use client";
import { OwnProfile, UserWithFriends } from "@shared/api";
import { PROFILE_ROUTE } from "@shared/consts";
import {
  Avatar,
  AvatarImage,
  Link,
  Skeleton,
  Subtitle,
  Title,
} from "@shared/ui";
import { FriendsButton } from "@widgets/users";
import NextLink from "next/link";

interface UsersItemProps {
  user: UserWithFriends & { isFriend: boolean };
  isSelf?: boolean;
  authUser?: OwnProfile;
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

export const UsersItem = ({ user, authUser, isSelf }: UsersItemProps) => {
  return (
    <li key={user.id} className="flex items-start gap-4">
      <NextLink href={PROFILE_ROUTE(user.username!)}>
        <Avatar className="w-20 h-20 md:w-24 md:h-24">
          <AvatarImage src={user.imageUrl} />
        </Avatar>
      </NextLink>
      <div className="min-w-0">
        <Link className="text-foreground" href={PROFILE_ROUTE(user.username!)}>
          <Title size="small">{user.username}</Title>
        </Link>
        <Subtitle className="md:mb-0 mb-0">
          Friends: {user.friends.length ?? 0}
        </Subtitle>
      </div>
      {!isSelf && (
        <div className="flex items-center self-stretch flex-1 justify-end md:justify-start">
          <FriendsButton
            authUser={authUser}
            isUserFriend={user.isFriend}
            userUsername={user.username}
          />
        </div>
      )}
    </li>
  );
};
