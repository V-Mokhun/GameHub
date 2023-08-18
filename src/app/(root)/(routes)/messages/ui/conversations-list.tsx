"use client";

import { userApi } from "@shared/api";
import { ConversationsItem } from "./conversations-item";
import { Icon, Link, Title } from "@shared/ui";
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

  if (isLoading) return <div>Loading...</div>;

  return conversations && conversations?.length > 0 ? (
    conversations.map((conv) => <ConversationsItem key={conv.id} data={conv} />)
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
