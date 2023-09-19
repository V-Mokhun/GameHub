"use client";

import { userApi } from "@shared/api";
import { pusherClient } from "@shared/config";
import { MESSAGES_ROUTE, UPDATE_CONVERSATION } from "@shared/consts";
import { Icon, Link } from "@shared/ui";
import { useEffect } from "react";

interface HeaderMessagesProps {
  authUserId: string;
}

export const HeaderMessages = ({ authUserId }: HeaderMessagesProps) => {
  const { data: unseenMessagesCount, refetch } =
    userApi.getUnseenMessagesCount();

  useEffect(() => {
    if (!authUserId) return;

    const channel = pusherClient.subscribe(authUserId);
    channel.bind(UPDATE_CONVERSATION, () => {
      refetch();
    });

    return () => {
      channel.unbind(UPDATE_CONVERSATION);
      pusherClient.unsubscribe(authUserId);
    };
  }, [authUserId, refetch]);

  return (
    <Link href={MESSAGES_ROUTE} className="relative">
      <Icon name="MessageCircle" />
      {(unseenMessagesCount ?? 0) > 0 && (
        <span className="absolute -top-2 -right-1 text-xs w-4 h-4 rounded-full bg-accent text-white inline-flex items-center justify-center">
          {(unseenMessagesCount ?? 0) > 9 ? "9+" : unseenMessagesCount}
        </span>
      )}
    </Link>
  );
};
