"use client";

import { FullMessage } from "@shared/api";
import { Button, Icon } from "@shared/ui";
import { CldImage } from "next-cloudinary";

interface ConversationFormReplyingProps {
  replyingMessage: FullMessage;
  onClose: () => void;
}

export const ConversationFormReplying = ({
  replyingMessage,
  onClose,
}: ConversationFormReplyingProps) => {
  return (
    <div className="flex items-center justify-between gap-4 text-sm pb-2">
      <Icon name="Reply" className="w-8 h-8 shrink-0" />
      <div className="flex-1 min-w-0 pl-2 relative after:absolute after:top-1 after:bottom-1 after:left-0 after:block after:w-[2px] after:rounded-md after:bg-secondary flex gap-2">
        {replyingMessage.image && (
          <CldImage
            src={replyingMessage.image}
            width={32}
            height={32}
            alt="Image"
            className="rounded-sm object-cover h-8 mt-1"
          />
        )}
        <div className="flex flex-col min-w-0 flex-1">
          <p className="text-secondary">{replyingMessage.sender.username}</p>
          {replyingMessage.image ? (
            <p>Image</p>
          ) : (
            <p className="truncate">{replyingMessage.body}</p>
          )}
        </div>
      </div>
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent"
        onClick={onClose}
      >
        <Icon
          name="XCircle"
          className="hover:text-secondary-hover transition-colors w-6 h-6"
        />
      </Button>
    </div>
  );
};
