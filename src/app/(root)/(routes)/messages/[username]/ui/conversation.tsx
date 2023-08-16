"use client";

import { userApi } from "@shared/api";
import { ConversationForm } from "./conversation-form";

interface ConversationProps {
  username: string;
}

export const Conversation = ({ username }: ConversationProps) => {
  const { data: conversation, isLoading } =
    userApi.getSingleConversation(username);

  if (isLoading) return <>Loading...</>;

  console.log(conversation);

  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <ConversationForm />
      </div>
    </div>
  );
};
