import { cn } from "@shared/lib";

interface GameUserRatingProps {
  userRating: number;
  className?: string;
}

export const GameUserRating = ({
  userRating,
  className,
}: GameUserRatingProps) => {
  return (
    <span
      className={cn(
        "flex items-center justify-center w-6 h-6 rounded-sm",
        className,
        userRating >= 8
          ? "bg-success"
          : userRating >= 5
          ? "bg-secondary"
          : "bg-destructive"
      )}
    >
      {userRating}
    </span>
  );
};
