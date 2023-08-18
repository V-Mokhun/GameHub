"use client";

import { userApi } from "@shared/api";
import { ConversationForm } from "./conversation-form";

interface ConversationProps {
  username: string;
}

export const Conversation = ({ username }: ConversationProps) => {
  const { data: conversation, isLoading } =
    userApi.getSingleConversation(username);
  const { data: messages, isLoading: isMessagesLoading } = userApi.getMessages(
    conversation?.id
  );

  if (isLoading) return <>Loading...</>;

  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <ConversationForm
          username={username}
          conversationId={conversation?.id}
        />
      </div>
    </div>
  );
};
