import { cn } from "@shared/lib";
import { Icon } from "../primitives";

interface PlayIconProps {
  wrapperClassName?: string;
  iconClassName?: string;
}

export const PlayIcon = ({
  iconClassName,
  wrapperClassName,
}: PlayIconProps) => {
  return (
    <div
      className={cn(
        "absolute z-[1] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-destructive w-11 h-7 rounded-xl",
        wrapperClassName
      )}
    >
      <Icon
        name="Play"
        className={cn(
          "text-white absolute z-[1] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          iconClassName
        )}
        aria-label="Play"
      />
    </div>
  );
};
