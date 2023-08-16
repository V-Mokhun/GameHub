import { useUser } from "@clerk/nextjs";
import { FullConversation } from "@shared/api";
import { MESSAGES_ROUTE } from "@shared/consts";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationItemProps {
  data: FullConversation;
}

export const ConversationItem = ({ data }: ConversationItemProps) => {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = useCallback(() => {
    router.push(`${MESSAGES_ROUTE}/${data.id}`);
  }, [data.id, router]);

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

  return <>{data.id}</>;
};
