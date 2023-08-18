"use client";

import { FullMessage } from "@shared/api";
import { cn } from "@shared/lib";
import { ActiveIndicator, Avatar, AvatarImage } from "@shared/ui";
import { ImageModal } from "@shared/ui/modal";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

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
  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex gap-2 px-2 py-2 md:px-4 selection:bg-secondary",
        isOwn && "justify-end"
      )}
    >
      {!isOwn && (
        <div className="relative">
          <Avatar className={"w-8 h-8"}>
            <AvatarImage src={data.sender.imageUrl} />
          </Avatar>
          {isActive && <ActiveIndicator size="small" />}
        </div>
      )}
      <div className={cn("flex flex-col gap-2", isOwn && "items-end")}>
        <div
          className={cn(
            "w-fit overflow-hidden",
            isOwn ? "bg-primary text-white" : "dark:bg-gray-500 bg-gray-300",
            data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
          )}
        >
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
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
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && data.seenBy.length > 1 && (
          <div className="text-sm font-light text-gray-500">Seen</div>
        )}
      </div>
    </div>
  );
};
