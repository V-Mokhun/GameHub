"use client";

import { FullMessage } from "@shared/api";
import { cn } from "@shared/lib";
import { Button, Icon } from "@shared/ui";
import { ImageModal } from "@shared/ui/modal";
import { format } from "date-fns";
import { CldImage } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { ConversationReplyBody } from "./conversation-reply-body";

interface ConversationMessageProps {
  isOwn: boolean;
  data: FullMessage & { isSending?: boolean };
  onReplyClick: () => void;
}

export const ConversationMessage = ({
  data,
  isOwn,
  onReplyClick,
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
        "flex gap-2 px-2 py-2 md:px-4 selection:bg-secondary max-w-[90%] whitespace-pre-wrap group",
        isOwn && "justify-end ml-auto"
      )}
    >
      <div className={cn("flex flex-col gap-2 relative", isOwn && "items-end")}>
        <div
          className={cn(
            "flex flex-col w-fit overflow-hidden",
            isOwn ? "bg-primary text-white" : "dark:bg-gray-600 bg-gray-200",
            data.image ? "rounded-md p-0" : "rounded-3xl py-2 px-3"
          )}
        >
          {data.replyingTo && data.replyingTo[0] && (
            <ConversationReplyBody
              body={data.replyingTo[0].body ?? ""}
              image={data.replyingTo[0].image ?? ""}
              username={data.replyingTo[0].sender.username!}
              className={cn("text-sm", data.image && "mb-1 mx-2")}
            />
          )}
          <div
            className={cn(
              "flex items-end gap-2 justify-between min-w-0",
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
              <p className="hyphens-auto break-all" ref={messageRef}>
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
        <Button
          onClick={onReplyClick}
          className={cn(
            "bg-transparent hover:bg-transparent absolute top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100 md:group-hover:pointer-events-auto transition-opacity md:pointer-events-none",
            isOwn ? "-left-8" : "-right-8"
          )}
          size="icon"
        >
          <Icon
            name="Reply"
            size={24}
            className="hover:text-secondary-hover transition-colors"
          />
        </Button>
      </div>
    </div>
  );
};
