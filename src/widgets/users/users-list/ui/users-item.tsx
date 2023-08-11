"use client";
import { UserResource } from "@clerk/types";
import { OwnProfile, UserWithFriends, userApi } from "@shared/api";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  buttonVariants,
} from "@shared/ui";
import NextLink from "next/link";
import { useMemo } from "react";

interface UsersItemProps {
  user: UserWithFriends & { isFriend: boolean };
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

export const UsersItem = ({ user, authUser }: UsersItemProps) => {
  const { signInToast } = useCustomToasts();
  const { mutate: sendRequest, isLoading: isSendingRequest } =
    userApi.sendFriendRequest();
  const { mutate: cancelRequest, isLoading: isCancellingRequest } =
    userApi.cancelFriendRequest();

  const hasSentRequest = useMemo(
    () =>
      authUser?.sentFriendRequests.some(
        (request) => request.receiverUsername === user.username
      ),
    [authUser?.sentFriendRequests, user.username]
  );

  const hasRecievedRequest = useMemo(
    () =>
      authUser?.receivedFriendRequests.some(
        (request) => request.senderUsername === user.username
      ),
    [authUser?.receivedFriendRequests, user.username]
  );

  const onSend = () => {
    sendRequest({
      senderUsername: authUser!.username!,
      receiverUsername: user.username!,
      id: authUser!.id,
    });
  };

  const onCancel = () => {
    cancelRequest({
      senderUsername: authUser!.username!,
      receiverUsername: user.username!,
    });
  };

  const onAccept = () => {};

  const onFriendsButtonClick = () => {
    if (!authUser?.id) {
      signInToast();
    } else {
      if (user.isFriend) {
      } else if (hasSentRequest) {
        onCancel();
      } else {
        onSend();
      }
    }
  };

  const isLoading = isSendingRequest || isCancellingRequest;

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
      <div className="flex items-center self-stretch flex-1 justify-end md:justify-start">
        {hasRecievedRequest ? (
          <div className="flex gap-3 items-center">
            <Button
              onClick={onAccept}
              size="icon"
              className="bg-success hover:bg-success-hover"
            >
              <Icon name="Check" className="text-white" />
            </Button>
            <Button
              onClick={onCancel}
              size="icon"
              className="bg-destructive hover:bg-destructive-hover"
            >
              <Icon name="X" className="text-white" />
            </Button>
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className={buttonVariants({
                  className: hasSentRequest
                    ? "bg-muted hover:bg-destructive-hover"
                    : user.isFriend
                    ? "bg-destructive hover:bg-destructive-hover"
                    : "bg-primary hover:bg-primary-hover",

                  size: "icon",
                  variant: "link",
                })}
                onClick={onFriendsButtonClick}
                disabled={isLoading}
              >
                <Icon
                  className="text-white"
                  name={user.isFriend ? "UserX" : "UserCheck"}
                />
              </TooltipTrigger>
              <TooltipContent>
                <span>
                  {hasSentRequest
                    ? "Cancel Friend Request"
                    : user.isFriend
                    ? "Delete Friend"
                    : "Send Friend Request"}
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </li>
  );
};
