"use client";

import { OwnProfile, userApi } from "@shared/api";
import { useCustomToasts } from "@shared/lib/hooks";
import {
  Button,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  buttonVariants,
} from "@shared/ui";
import { useMemo } from "react";

interface FriendsButtonProps {
  authUser: OwnProfile | undefined;
  userUsername: string | null;
  isUserFriend: boolean;
}

export const FriendsButton = ({
  userUsername,
  isUserFriend,
  authUser,
}: FriendsButtonProps) => {
  const { signInToast } = useCustomToasts();
  const { mutate: sendRequest, isLoading: isSendingRequest } =
    userApi.sendFriendRequest();
  const { mutate: cancelRequest, isLoading: isCancellingRequest } =
    userApi.cancelFriendRequest();
  const { mutate: acceptRequest, isLoading: isAcceptingRequest } =
    userApi.acceptFriendRequest();
  const { mutate: removeFriend, isLoading: isRemovingFriend } =
    userApi.removeFriend();

  const hasSentRequest = useMemo(
    () =>
      authUser?.sentFriendRequests.some(
        (request) => request.receiverUsername === userUsername
      ),
    [authUser?.sentFriendRequests, userUsername]
  );

  const hasRecievedRequest = useMemo(
    () =>
      authUser?.receivedFriendRequests.some(
        (request) => request.senderUsername === userUsername
      ),
    [authUser?.receivedFriendRequests, userUsername]
  );

  const onSend = () => {
    sendRequest({
      senderUsername: authUser!.username!,
      receiverUsername: userUsername!,
      id: authUser!.id,
    });
  };

  const onCancel = () => {
    cancelRequest({
      senderUsername: authUser!.username!,
      receiverUsername: userUsername!,
      id: authUser!.id,
    });
  };

  const onAccept = () => {
    acceptRequest({
      username: authUser?.username!,
      friendUsername: userUsername!,
      id: authUser!.id,
    });
  };

  const onRemove = () => {
    removeFriend({
      username: authUser?.username!,
      friendUsername: userUsername!,
      id: authUser!.id,
    });
  };

  const onFriendsButtonClick = () => {
    if (!authUser?.id) {
      signInToast();
    } else {
      if (isUserFriend) {
        onRemove();
      } else if (hasSentRequest) {
        onCancel();
      } else {
        onSend();
      }
    }
  };

  const isLoading =
    isSendingRequest ||
    isCancellingRequest ||
    isAcceptingRequest ||
    isRemovingFriend;

  return hasRecievedRequest ? (
    <div className="flex gap-3 items-center">
      <Button
        disabled={isLoading}
        onClick={onAccept}
        size="icon"
        className="bg-success hover:bg-success-hover"
      >
        <Icon name="Check" className="text-white" />
      </Button>
      <Button
        disabled={isLoading}
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
              : isUserFriend
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
            name={isUserFriend ? "UserX" : "UserCheck"}
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>
            {hasSentRequest
              ? "Cancel Friend Request"
              : isUserFriend
              ? "Remove Friend"
              : "Send Friend Request"}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
