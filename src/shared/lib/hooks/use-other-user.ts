"use client";

import { useAuth } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { FullConversation } from "@shared/api";
import { useMemo } from "react";

export const useOtherUser = (conversation: FullConversation) => {
  const { userId } = useAuth();

  const otherUser = useMemo(() => {
    const diffUser = conversation.users.filter((user) => user.id !== userId);

    return diffUser[0];
  }, [userId, conversation.users]);

  return otherUser;
};
