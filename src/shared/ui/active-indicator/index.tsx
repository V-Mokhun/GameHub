import { cn } from "@shared/lib";

interface ActiveIndicatorProps {
  className?: string;
  size?: "small" | "large";
}

export const ActiveIndicator = ({ className, size = "large" }: ActiveIndicatorProps) => {
  return (
    <span
      className={cn(
        "absolute bottom-0 right-0 rounded-full bg-success border-2 border-white border-solid",
        size === "small" && "w-3 h-3",
        size === "large" && "w-5 h-5",
        className
      )}
    />
  );
};
