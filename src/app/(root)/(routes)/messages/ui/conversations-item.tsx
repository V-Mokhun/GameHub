import { useUser } from "@clerk/nextjs";
import { FullConversation } from "@shared/api";
import { MESSAGES_ROUTE } from "@shared/consts";
import { cn } from "@shared/lib";
import { useActiveList, useOtherUser } from "@shared/lib/hooks";
import { ActiveIndicator, Avatar, AvatarImage, Subtitle } from "@shared/ui";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationsItemProps {
  data: FullConversation;
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
    <div className="flex items-start gap-4" onClick={handleClick}>
      <div className="relative">
        <Avatar className={"w-6 h-6 md:w-8 md:h-8"}>
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
        {isActive && <ActiveIndicator size="small" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between items-center mb-1">
          <Subtitle className="mb-0 md:mb-0">{otherUser?.username}</Subtitle>
          {lastMessage?.createdAt && (
            <p className="text-xs text-muted font-light">
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>
        <p className={cn(`truncate text-sm`, hasSeen && "text-muted")}>
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};
