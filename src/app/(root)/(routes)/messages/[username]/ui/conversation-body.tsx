"use client";

import { FullMessage } from "@shared/api";
import { useEffect, useRef, useState } from "react";
import { ConversationMessage } from "./conversation-message";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button, Icon } from "@shared/ui";
import { cn } from "@shared/lib";
import { pusherClient } from "@shared/config";
import { CREATE_MESSAGE, UPDATE_MESSAGE } from "@shared/consts";
import find from "lodash.find";
import axios from "axios";

interface ConversationBodyProps {
  messages: FullMessage[];
  conversationId?: string;
  username: string;
  isActive: boolean;
  refetchMessages: () => void;
}

export const ConversationBody = ({
  messages,
  isActive,
  conversationId,
  username,
  refetchMessages,
}: ConversationBodyProps) => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
    if (!user?.username || !conversationId) return;

    const channel = pusherClient.subscribe(user.username);
    const messageHandler = async (message: FullMessage) => {
      console.log("create message");

      try {
        await axios.patch(`/api/user/conversations/${username}/seen`, {
          conversationId,
        });
        refetchMessages();
        bottomRef.current?.scrollIntoView({ block: "nearest" });
      } catch (error) {
        console.log(error);
      }
    };

    const updateMessageHandler = async () => {
      console.log("update message");

      await axios.patch(`/api/user/conversations/${username}/seen`, {
        conversationId,
      });
      refetchMessages();
      bottomRef.current?.scrollIntoView({ block: "nearest" });
    };

    channel.bind(CREATE_MESSAGE, messageHandler);
    channel.bind(UPDATE_MESSAGE, updateMessageHandler);

    return () => {
      channel.unbind(CREATE_MESSAGE, messageHandler);
      channel.unbind(UPDATE_MESSAGE, updateMessageHandler);
      pusherClient.unsubscribe(user.username!);
    };
  }, [user?.username, messages, refetchMessages, username, conversationId]);

  useEffect(() => {
    axios.patch(`/api/user/conversations/${username}/seen`, {
      conversationId,
    });

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
      rootMargin: "24px",
    });

    observer.observe(bottom!);

    return () => {
      observer.unobserve(bottom!);
      observer.disconnect();
    };
  }, [conversationId, username]);

  return (
    <div className="flex-1 overflow-y-auto" ref={bodyRef}>
      {messages.map((message, i) => (
        <ConversationMessage
          isOwn={message.senderId === user?.id}
          key={message.id}
          data={message}
        />
      ))}
      <Button
        className={cn(
          "absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-secondary hover:bg-secondary-hover h-10 w-10 opacity-0 transition-opacity pointer-events-none",
          isArrowVisible && "opacity-100 pointer-events-auto"
        )}
        size="icon"
        onClick={() => bottomRef.current?.scrollIntoView({ block: "nearest" })}
      >
        <Icon name="ArrowBigDown" className="text-white w-8 h-8" />
      </Button>
      <div className="pt-6" ref={bottomRef} />
    </div>
  );
};