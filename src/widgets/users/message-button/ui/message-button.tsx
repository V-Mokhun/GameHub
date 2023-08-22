"use client";

import { MESSAGES_ROUTE } from "@shared/consts";
import { useCustomToasts } from "@shared/lib/hooks";
import { Button, Icon, Link, buttonVariants } from "@shared/ui";
import { useRouter } from "next/navigation";

interface MessageButtonProps {
  isSmall?: boolean;
  username: string;
  isAutheticated: boolean;
}

export const MessageButton = ({
  isSmall,
  username,
  isAutheticated,
}: MessageButtonProps) => {
  const { signInToast } = useCustomToasts();
  const router = useRouter();

  const onClick = () => {
    if (!isAutheticated) {
      signInToast();
    } else {
      router.push(`${MESSAGES_ROUTE}/${username}`);
    }
  };

  return (
    <Button size={isSmall ? "iconSmall" : "icon"} onClick={onClick}>
      <Icon name="MessageSquare" className="text-white" />
    </Button>
  );
};
