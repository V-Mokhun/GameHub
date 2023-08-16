"use client";

import { userApi } from "@shared/api";
import { ConversationsItem } from "./conversations-item";
import { Icon, Link, Title } from "@shared/ui";
import { USERS_ROUTE } from "@shared/consts";

interface ConversationsListProps {}

export const ConversationsList = ({}: ConversationsListProps) => {
  const { data: conversations, isLoading } = userApi.getConversations();

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
