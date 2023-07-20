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
        "mb-3 text-muted-foreground md:mb-4",
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
