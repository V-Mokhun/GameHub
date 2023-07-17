import { cn } from "@shared/lib";

interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "medium" | "large";
}

export const Subtitle = ({
  children,
  className,
  size = "medium",
  ...props
}: SubtitleProps) => {
  return (
    <p
      className={cn(
        "mb-4 text-muted-foreground",
        size === "medium" && "text-sm lg:text-base",
        size === "large" && "text-base lg:text-lg",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
