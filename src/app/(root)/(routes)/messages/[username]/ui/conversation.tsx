"use client";

import { userApi } from "@shared/api";
import { ConversationForm } from "./conversation-form";
import { ConversationHeader } from "./conversation-header";
import { ConversationBody } from "./conversation-body";

interface ConversationProps {
  username: string;
}

export const Conversation = ({ username }: ConversationProps) => {
  const { data, isLoading } = userApi.getSingleConversation(username);
  const { data: messages, isLoading: isMessagesLoading } = userApi.getMessages(
    data?.conversation?.id
  );

  if (isLoading) return <>Loading...</>;

  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <ConversationHeader user={data!.user} />
        <ConversationBody />
        <ConversationForm
          username={username}
          conversationId={data?.conversation?.id}
        />
      </div>
    </div>
  );
};
