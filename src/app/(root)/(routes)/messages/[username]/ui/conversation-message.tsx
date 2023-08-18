"use client";

import { FullMessage } from "@shared/api";
import { cn } from "@shared/lib";
import { ActiveIndicator, Avatar, AvatarImage, Icon } from "@shared/ui";
import { ImageModal } from "@shared/ui/modal";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ConversationMessageProps {
  isLast: boolean;
  isOwn: boolean;
  isActive: boolean;
  data: FullMessage;
}

export const ConversationMessage = ({
  data,
  isLast,
  isOwn,
  isActive,
}: ConversationMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isInfoOnSameLine, setIsInfoOnSameLine] = useState(true);

  useEffect(() => {
    console.log(messageRef.current);

    if (
      messageRef.current &&
      messageRef.current.getBoundingClientRect().height > 24
    ) {
      setIsInfoOnSameLine(false);
    } else {
      setIsInfoOnSameLine(true);
    }
  }, []);

  return (
    <div
      className={cn(
        "flex gap-2 px-2 py-2 md:px-4 selection:bg-secondary max-w-[90%] whitespace-pre-wrap",
        isOwn && "justify-end ml-auto"
      )}
    >
      {!isOwn && (
        <div className="relative">
          <Avatar className={"w-10 h-10"}>
            <AvatarImage src={data.sender.imageUrl} />
          </Avatar>
          {isActive && <ActiveIndicator size="small" />}
        </div>
      )}
      <div className={cn("flex flex-col gap-2 relative", isOwn && "items-end")}>
        <div
          className={cn(
            "flex items-end gap-2 w-fit overflow-hidden",
            isOwn ? "bg-primary text-white" : "dark:bg-gray-600 bg-gray-200",
            data.image ? "rounded-md p-0" : "rounded-3xl py-2 px-3",
            (!isInfoOnSameLine || data.image) && "flex-col gap-1 items-start"
          )}
        >
          {data.image ? (
            <>
              <ImageModal
                src={data.image}
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
              />
              <Image
                alt="Image"
                height="288"
                width="288"
                onClick={() => setImageModalOpen(true)}
                src={data.image}
                className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition-all
              "
              />
            </>
          ) : (
            <p ref={messageRef}>{data.body}</p>
          )}
          <div
            className={cn(
              "flex items-center gap-1 justify-end",
              (!isInfoOnSameLine || data.image) && "w-full"
            )}
          >
            <time className="text-xs text-secondary">
              {format(new Date(data.createdAt), "HH:mm")}
            </time>
            <Icon className="w-4 h-4" name="Check" />
          </div>
        </div>
      </div>
    </div>
  );
};
