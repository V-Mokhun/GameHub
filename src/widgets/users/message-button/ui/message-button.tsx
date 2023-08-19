"use client";

import { MESSAGES_ROUTE } from "@shared/consts";
import { Icon, Link, buttonVariants } from "@shared/ui";

interface MessageButtonProps {
  isSmall?: boolean;
  username: string;
}

export const MessageButton = ({ isSmall, username }: MessageButtonProps) => {
  return (
    <Link
      className={buttonVariants({
        size: isSmall ? "iconSmall" : "icon",
      })}
      href={`${MESSAGES_ROUTE}/${username}`}
    >
      <Icon name="MessageSquare" className="text-white" />
    </Link>
  );
};
