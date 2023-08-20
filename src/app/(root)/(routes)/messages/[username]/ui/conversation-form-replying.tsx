"use client";

import { FullMessage } from "@shared/api";
import { Button, Icon } from "@shared/ui";
import { ConversationReplyBody } from "./conversation-reply-body";

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
      <ConversationReplyBody
        body={replyingMessage.body ?? ""}
        image={replyingMessage.image ?? ""}
        username={replyingMessage.sender.username!}
      />
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
