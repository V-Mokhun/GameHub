"use client";

import { OwnProfile } from "@shared/api";
import { SETTINGS_ROUTE } from "@shared/consts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Skeleton,
  Subtitle,
  Title,
  buttonVariants,
} from "@shared/ui";
import { FriendsButton } from "@widgets/users";
import { format } from "date-fns";
import Link from "next/link";

interface UserViewProps {
  data?: {
    imageUrl: string;
    username: string;
    createDate: Date;
    isOwnProfile: boolean;
  };
  ownProfile: OwnProfile | undefined;
  isOwnProfileLoading: boolean;
}

export const UserViewSkeleton = () => (
  <div className="flex gap-4 items-start">
    <Skeleton className="shrink-0 rounded-full w-28 h-28 md:w-36 md:h-36"></Skeleton>
    <div className="space-y-4 w-full">
      <Skeleton className="w-32 h-9" />
      <Skeleton className="w-full xs:w-72 h-6" />
      <Skeleton className="w-16 h-8" />
    </div>
  </div>
);

export const UserView = ({
  data,
  ownProfile,
  isOwnProfileLoading,
}: UserViewProps) => {
  if (!data) return <UserViewSkeleton />;

  const { imageUrl, username, createDate, isOwnProfile } = data;

  return (
    <div className="flex gap-4 items-start">
      <Avatar className="w-28 h-28 md:w-36 md:h-36">
        <AvatarImage src={imageUrl} />
        <AvatarFallback />
      </Avatar>
      <div className="min-w-0">
        <Title>{username}</Title>
        <Subtitle>
          GameHub member since {format(new Date(createDate), "MMM YYY")}
        </Subtitle>
        {isOwnProfile && (
          <Link className={buttonVariants()} href={SETTINGS_ROUTE}>
            Edit Profile
          </Link>
        )}

        {isOwnProfileLoading && !isOwnProfile ? (
          <div className="flex items-center self-stretch flex-1 justify-end md:justify-start">
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        ) : (
          !isOwnProfile && (
            <FriendsButton
              authUser={ownProfile}
              isUserFriend={
                ownProfile?.friends.find(
                  (friend) => friend.username === username
                ) != undefined
              }
              userUsername={username}
            />
          )
        )}
      </div>
    </div>
  );
};
