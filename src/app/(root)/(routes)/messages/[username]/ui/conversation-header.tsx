"use client";

import { User } from "@prisma/client";
import { MESSAGES_ROUTE, PROFILE_ROUTE } from "@shared/consts";
import {
  ActiveIndicator,
  Avatar,
  AvatarImage,
  Icon,
  Skeleton,
} from "@shared/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ConversationHeaderProps {
  user: User;
  isActive: boolean;
}

export const ConversationHeaderSkeleton = () => (
  <div className="p-2 flex items-center gap-4">
    <Skeleton className="w-8 h-8 md:hidden" />
    <div className="flex items-center gap-2">
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="w-24 h-7" />
    </div>
  </div>
);

export const ConversationHeader = ({
  user,
  isActive,
}: ConversationHeaderProps) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(PROFILE_ROUTE(user.username!));
  }, [router, user.username]);

  return (
    <div className="p-2 flex items-center gap-4 shadow-lg">
      <Link href={MESSAGES_ROUTE} className="md:hidden">
        <Icon name="ArrowLeft" aria-label="Go to messages" size={32} />
      </Link>
      <div
        onClick={handleClick}
        className="flex items-center gap-2 cursor-pointer"
      >
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
