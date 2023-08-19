import { useUser } from "@clerk/nextjs";
import { FullConversation, FullMessage } from "@shared/api";
import { MESSAGES_ROUTE } from "@shared/consts";
import { cn } from "@shared/lib";
import { useActiveList, useOtherUser } from "@shared/lib/hooks";
import {
  ActiveIndicator,
  Avatar,
  AvatarImage,
  Icon,
  Subtitle,
} from "@shared/ui";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationsItemProps {
  data: FullConversation & { messages: FullMessage[] };
}

export const ConversationsItem = ({ data }: ConversationsItemProps) => {
  const router = useRouter();
  const otherUser = useOtherUser(data);
  const { user } = useUser();

  const { members } = useActiveList();
  const isActive = useMemo(
    () => members.some((m) => m === otherUser.id),
    [members, otherUser.id]
  );

  const handleClick = useCallback(() => {
    router.push(`${MESSAGES_ROUTE}/${otherUser.username}`);
  }, [router, otherUser.username]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userUsername = useMemo(() => user?.username, [user?.username]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seenBy || [];

    if (!userUsername) {
      return false;
    }

    return (
      seenArray.filter((user) => user.username === userUsername).length !== 0
    );
  }, [userUsername, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      className="flex items-start gap-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <Avatar className={"w-14 h-14"}>
          <AvatarImage src={otherUser?.imageUrl} />
        </Avatar>
        {isActive && <ActiveIndicator size="small" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between items-center mb-1">
          <p className="text-lg">{otherUser?.username}</p>
          {lastMessage?.createdAt && (
            <p className="text-sm text-gray-400 font-light">
              {format(new Date(lastMessage.createdAt), "HH:mm")}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className={cn(`truncate text-md`, hasSeen && "text-gray-400")}>
            {lastMessageText}
          </p>
          {lastMessage.senderId === user?.id ? (
            <Icon
              className="shrink-0 w-4 h-4"
              name={lastMessage.seenBy.length > 1 ? "CheckCheck" : "Check"}
            />
          ) : !hasSeen ? (
            <div className="shrink-0 w-4 h-4 rounded-full bg-secondary" />
          ) : null}
        </div>
      </div>
    </div>
  );
};
