"use client";

import { userApi } from "@shared/api";
import { ConversationForm } from "./conversation-form";
import { ConversationHeader } from "./conversation-header";
import { ConversationBody } from "./conversation-body";
import { useActiveList } from "@shared/lib/hooks";
import { useMemo } from "react";

interface ConversationProps {
  username: string;
}

export const Conversation = ({ username }: ConversationProps) => {
  const { data, isLoading } = userApi.getSingleConversation(username);
  const {
    data: messages,
    isLoading: isLoadingMessages,
    refetch,
  } = userApi.getMessages(data?.conversation?.id);
  const { members } = useActiveList();
  const isActive = useMemo(
    () => members.some((m) => m === data?.user.id),
    [members, data?.user.id]
  );

  if (isLoading) return <>Loading...</>;

  return (
    <div className="h-[calc(100vh-70px)] -mt-5 -mb-4 md:-mt-4 md:-mb-5">
      <div className="h-full flex flex-col relative">
        <ConversationHeader isActive={isActive} user={data!.user} />
        <ConversationBody
          conversationId={data?.conversation?.id}
          username={username}
          isActive={isActive}
          messages={messages || []}
          refetchMessages={() => refetch()}
        />
        <ConversationForm
          username={username}
          conversationId={data?.conversation?.id}
        />
      </div>
    </div>
  );
};
