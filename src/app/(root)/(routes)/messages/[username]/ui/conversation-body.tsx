"use client";

import { FullMessage } from "@shared/api";
import { useEffect, useRef, useState } from "react";
import { ConversationMessage } from "./conversation-message";
import { useAuth } from "@clerk/nextjs";
import { Button, Icon } from "@shared/ui";
import { cn } from "@shared/lib";

interface ConversationBodyProps {
  messages: FullMessage[];
  conversationId?: string;
  isActive: boolean;
}

export const ConversationBody = ({
  messages,
  isActive,
  conversationId,
}: ConversationBodyProps) => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  useEffect(() => {
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
    });

    observer.observe(bottom!);

    return () => {
      observer.unobserve(bottom!);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto" ref={bodyRef}>
      {messages.map((message, i) => (
        <ConversationMessage
          isOwn={message.senderId === userId}
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
          isActive={isActive}
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
