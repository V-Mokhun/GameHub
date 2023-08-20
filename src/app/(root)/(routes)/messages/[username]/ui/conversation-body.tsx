"use client";

import { FullMessage } from "@shared/api";
import { useEffect, useRef, useState } from "react";
import { ConversationMessage } from "./conversation-message";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button, Icon, Skeleton, TextSeparator } from "@shared/ui";
import { cn } from "@shared/lib";
import { pusherClient } from "@shared/config";
import { CREATE_MESSAGE, UPDATE_MESSAGE } from "@shared/consts";
import find from "lodash.find";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

interface ConversationBodyProps {
  messages: FullMessage[];
  conversationId?: string;
  username: string;
  refetchMessages: () => void;
  isLoading: boolean;
  onReplyClick: (message: FullMessage) => void;
}

export const ConversationBodySkeleton = () => (
  <div className="flex-1 overflow-y-auto space-y-2 px-2 md:px-4 mt-2">
    <div className="flex justify-end">
      <Skeleton className="w-32 h-10 rounded-3xl" />
    </div>
    <div className="flex justify-end">
      <Skeleton className="w-[80%] h-16 rounded-3xl" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="w-56 h-10 rounded-3xl" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="w-24 h-10 rounded-3xl" />
    </div>
    <div className="flex justify-end">
      <Skeleton className="w-48 h-10 rounded-3xl" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="w-28 h-10 rounded-3xl" />
    </div>
  </div>
);

export const ConversationBody = ({
  messages,
  conversationId,
  username,
  refetchMessages,
  isLoading,
  onReplyClick,
}: ConversationBodyProps) => {
  const queryClient = useQueryClient();
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    if (!user?.username || !conversationId) return;

    const channel = pusherClient.subscribe(user.username);
    const messageHandler = async () => {
      await axios.patch(`/api/user/conversations/${username}/seen`, {
        conversationId,
      });

      refetchMessages();
      bottomRef.current?.scrollIntoView({
        block: "nearest",
      });
    };

    channel.bind(CREATE_MESSAGE, messageHandler);
    channel.bind(UPDATE_MESSAGE, messageHandler);

    return () => {
      channel.unbind(CREATE_MESSAGE, messageHandler);
      channel.unbind(UPDATE_MESSAGE, messageHandler);
      pusherClient.unsubscribe(user.username!);
    };
  }, [user?.username, refetchMessages, username, conversationId, isLoading]);

  useEffect(() => {
    if (isLoading) return;

    async function updateMessages(id: string) {
      await axios.patch(`/api/user/conversations/${username}/seen`, {
        conversationId,
      });
      queryClient.invalidateQueries(["unseen-messages-count", { id }]);
    }

    const body = bodyRef.current;
    const bottom = bottomRef.current;

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsArrowVisible(false);
        } else {
          setIsArrowVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersection, {
      root: body,
      threshold: 0,
      rootMargin: "0% 0% 200px 0%",
    });

    observer.observe(bottom!);

    if (conversationId && user?.id) {
      updateMessages(user.id);
    }

    return () => {
      observer.unobserve(bottom!);
      observer.disconnect();
    };
  }, [conversationId, username, user?.id, queryClient, isLoading]);

  if (isLoading) return <ConversationBodySkeleton />;

  return (
    <div className="flex-1 overflow-y-auto" ref={bodyRef}>
      {messages.map((message, i) => (
        <>
          {/* render text separator only if message is written not on the same day as last one */}
          {(i === 0 ||
            new Date(message.createdAt).toISOString().split("T")[0] !==
              new Date(messages[i - 1].createdAt)
                .toISOString()
                .split("T")[0]) && (
            <TextSeparator
              key={format(new Date(message.createdAt), "LLLL dd")}
              text={format(new Date(message.createdAt), "LLLL dd")}
            />
          )}
          <ConversationMessage
            onReplyClick={() => onReplyClick(message)}
            isOwn={message.senderId === user?.id}
            key={message.id}
            data={message}
          />
        </>
      ))}
      <Button
        className={cn(
          "absolute bottom-28 left-1/2 -translate-x-1/2 rounded-full bg-secondary hover:bg-secondary-hover h-10 w-10 opacity-0 transition-opacity pointer-events-none z-[1]",
          isArrowVisible && "opacity-100 pointer-events-auto"
        )}
        size="icon"
        onClick={() =>
          bottomRef.current?.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          })
        }
      >
        <Icon name="ArrowBigDown" className="text-white w-8 h-8" />
      </Button>
      <div className="pt-6" ref={bottomRef} />
    </div>
  );
};
