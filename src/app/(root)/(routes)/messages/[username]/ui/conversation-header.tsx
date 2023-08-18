"use client";

import { User } from "@prisma/client";
import { PROFILE_ROUTE } from "@shared/consts";
import { useActiveList } from "@shared/lib/hooks";
import { ActiveIndicator, Avatar, AvatarImage } from "@shared/ui";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationHeaderProps {
  user: User;
}

export const ConversationHeader = ({ user }: ConversationHeaderProps) => {
  const router = useRouter();
  const { members } = useActiveList();
  const isActive = useMemo(
    () => members.some((m) => m === user.id),
    [members, user.id]
  );
  const handleClick = useCallback(() => {
    router.push(PROFILE_ROUTE(user.username!));
  }, [router, user.username]);

  return (
    <div onClick={handleClick} className="p-2 shadow-lg cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className={"w-10 h-10"}>
            <AvatarImage src={user.imageUrl} />
          </Avatar>
          {isActive && <ActiveIndicator size="small" />}
        </div>
        <p className="text-lg font-medium">{user.username}</p>
      </div>
    </div>
  );
};
