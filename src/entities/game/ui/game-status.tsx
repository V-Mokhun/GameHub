import { GameStatus as GameStatuses } from "@prisma/client";
import { cn } from "@shared/lib";
import { Badge } from "@shared/ui";

interface GameStatusProps {
  status: GameStatuses;
  className?: string;
}

export const GameStatus = ({ status, className }: GameStatusProps) => {
  return (
    <Badge
      className={cn(
        className,
        status === GameStatuses.WANT_TO_PLAY && "bg-primary",
        status === GameStatuses.PLAYING &&
          "bg-secondary hover:bg-secondary-hover",
        status === GameStatuses.COMPLETED &&
          "bg-success hover:bg-success-hover",
        status === GameStatuses.ABANDONED &&
          "bg-destructive hover:bg-destructive-hover",
        status === GameStatuses.WANT_TO_REPLAY &&
          "bg-purple-500 dark:bg-purple-600 hover:bg-purple-600 dark:hover:bg-purple-500"
      )}
    >
      {status
        .toLowerCase()
        .split("_")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")}
    </Badge>
  );
};
