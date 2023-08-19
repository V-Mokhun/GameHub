"use client";

import { userApi } from "@shared/api";
import { ConversationsItem } from "./conversations-item";
import { Icon, Link, Skeleton, Title } from "@shared/ui";
import { UPDATE_CONVERSATION, USERS_ROUTE } from "@shared/consts";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { pusherClient } from "@shared/config";

interface ConversationsListProps {}

export const ConversationsList = ({}: ConversationsListProps) => {
  const { userId } = useAuth();
  const {
    data: conversations,
    isLoading,
    refetch,
  } = userApi.getConversations();

  useEffect(() => {
    if (!userId) return;

    const channel = pusherClient.subscribe(userId);
    channel.bind(UPDATE_CONVERSATION, () => {
      refetch();
    });

    return () => {
      channel.unbind(UPDATE_CONVERSATION);
      pusherClient.unsubscribe(userId);
    };
  }, [userId, refetch]);

  if (isLoading)
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            <Skeleton className="w-14 h-14 rounded-full" />
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-5 w-10" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="shrink-0 w-4 h-4 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return conversations && conversations?.length > 0 ? (
    <div className="space-y-4">
      {conversations.map((conv) => (
        <ConversationsItem key={conv.id} data={conv} />
      ))}
    </div>
  ) : (
    <>
      <Title>You have no messages yet</Title>
      <Link className="flex items-center gap-1" href={USERS_ROUTE}>
        <span>Find Friends</span>{" "}
        <Icon name="ArrowRight" className="inline-block text-primary" />
      </Link>
    </>
  );
};
