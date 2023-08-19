"use client";

import { FullMessage } from "@shared/api";
import { cn } from "@shared/lib";
import { Avatar, AvatarImage, Icon } from "@shared/ui";
import { ImageModal } from "@shared/ui/modal";
import { format } from "date-fns";
import { CldImage } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";

interface ConversationMessageProps {
  isOwn: boolean;
  data: FullMessage & { isSending?: boolean };
}

export const ConversationMessage = ({
  data,
  isOwn,
}: ConversationMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isInfoOnSameLine, setIsInfoOnSameLine] = useState(true);

  useEffect(() => {
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
        <Avatar className={"w-10 h-10"}>
          <AvatarImage src={data.sender.imageUrl} />
        </Avatar>
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
              <CldImage
                src={data.image}
                alt="Image"
                height="288"
                width="288"
                onClick={() => setImageModalOpen(true)}
                className="object-cover cursor-pointer hover:scale-110 transition-all"
              />
            </>
          ) : (
            <p className="hyphens-auto" ref={messageRef}>
              {data.body}
            </p>
          )}
          {isOwn && (
            <div
              className={cn(
                "flex items-center gap-1 justify-end pr-1",
                (!isInfoOnSameLine || data.image) && "w-full"
              )}
            >
              <time
                dateTime={new Date(data.createdAt).toLocaleString()}
                className="text-xs text-secondary"
              >
                {format(new Date(data.createdAt), "HH:mm")}
              </time>
              <Icon
                className="w-4 h-4"
                name={
                  data.isSending
                    ? "Timer"
                    : isOwn && data.seenBy.length > 1
                    ? "CheckCheck"
                    : "Check"
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};