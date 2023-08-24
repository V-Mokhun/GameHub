"use client";

import { FullMessage, userApi } from "@shared/api";
import { useActiveList } from "@shared/lib/hooks";
import { useMemo, useRef, useState } from "react";
import {
  ConversationBody,
  ConversationBodySkeleton,
} from "./conversation-body";
import {
  ConversationForm,
  ConversationFormSkeleton,
} from "./conversation-form";
import {
  ConversationHeader,
  ConversationHeaderSkeleton,
} from "./conversation-header";

interface ConversationProps {
  username: string;
}

const ConversationSkeleton = () => (
  <div className="h-[calc(100vh-70px)] -mt-5 -mb-4 md:-mt-4 md:-mb-5">
    <div className="h-full flex flex-col relative">
      <ConversationHeaderSkeleton />
      <ConversationBodySkeleton />
      <ConversationFormSkeleton />
    </div>
  </div>
);

export const Conversation = ({ username }: ConversationProps) => {
  const { data, isLoading } = userApi.getSingleConversation(username);
  const {
    data: messages,
    isLoading: isLoadingMessages,
    refetch,
  } = userApi.getMessages(username, data?.conversation?.id);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [replyingMessage, setReplyingMessage] = useState<FullMessage | null>(
    null
  );

  const { members } = useActiveList();
  const isActive = useMemo(
    () => members.some((m) => m === data?.user.id),
    [members, data?.user.id]
  );

  if (isLoading) return <ConversationSkeleton />;

  return (
    <div className="h-[calc(100vh-70px)] -mt-5 -mb-4 md:-mt-4 md:-mb-5">
      <div className="h-full flex flex-col relative">
        <ConversationHeader isActive={isActive} user={data?.user} />
        <ConversationBody
          conversationId={data?.conversation?.id}
          username={username}
          messages={messages || []}
          isLoading={(data?.conversation?.id && isLoadingMessages) || false}
          refetchMessages={() => refetch()}
          onReplyClick={(message) => {
            setReplyingMessage(message);
            textareaRef.current?.focus();
          }}
        />
        <ConversationForm
          isLoading={messages?.length === 1 && messages[0].isSending === true}
          ref={textareaRef}
          replyingMessage={replyingMessage}
          resetReplyingMessage={() => setReplyingMessage(null)}
          username={username}
          conversationId={data?.conversation?.id}
        />
      </div>
    </div>
  );
};
