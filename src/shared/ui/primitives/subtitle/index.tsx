import { cn } from "@shared/lib";

interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const Subtitle = ({ children, className, ...props }: SubtitleProps) => {
  return (
    <p
      className={cn("mb-4 text-md text-muted-foreground lg:text-lg", className)}
      {...props}
    >
      {children}
    </p>
  );
};
