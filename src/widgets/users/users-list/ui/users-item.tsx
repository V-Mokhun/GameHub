"use client";
import { UserResource } from "@clerk/types";
import { UserWithFriends } from "@shared/api";
import { PROFILE_ROUTE } from "@shared/consts";
import { cn } from "@shared/lib";
import { useCustomToasts } from "@shared/lib/hooks";
import {
	Avatar,
	AvatarImage,
	Button,
	Icon,
	Link,
	Skeleton,
	Subtitle,
	Title,
} from "@shared/ui";
import NextLink from "next/link";

interface UsersItemProps {
  user: UserWithFriends & { isFriend: boolean };
  authUser?: UserResource | null;
}

export const UsersItemSkeleton = () => (
  <li className="flex items-start gap-4">
    <Skeleton className="w-24 h-24 rounded-full" />
    <div>
      <Skeleton className="w-48 h-8 mb-2 lg:mb-3" />
      <Skeleton className="w-24 h-6" />
    </div>

    <div className="flex items-center self-stretch">
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  </li>
);

export const UsersItem = ({ user, authUser }: UsersItemProps) => {
  const { signInToast } = useCustomToasts();
  const onFriendsButtonClick = () => {
    if (!authUser?.id) {
      signInToast();
    } else {
      if (user.isFriend) {
      } else {
      }
    }
  };

  return (
    <li key={user.id} className="flex items-start gap-4">
      <NextLink href={PROFILE_ROUTE(user.username!)}>
        <Avatar className="w-24 h-24">
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
      <div className="flex items-center self-stretch">
        <Button
          className={cn(
            user.isFriend && "bg-destructive hover:bg-destructive-hover"
          )}
          size="icon"
        >
          <Icon
            className="text-white"
            name={user.isFriend ? "UserX" : "UserCheck"}
          />
        </Button>
      </div>
    </li>
  );
};
