import { cn } from "@shared/lib";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  size?: "huge" | "large" | "medium" | "small";
}

export const Title = ({
  size = "medium",
  children,
  className,
  ...props
}: TitleProps) => {
  let content: React.ReactNode;

  if (size === "huge")
    content = (
      <h1
        className={cn(
          "scroll-m-20 mb-4 text-4xl font-bold tracking-wide lg:text-5xl",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  else if (size === "large")
    content = (
      <h2
        className={
          (cn("scroll-m-20 mb-3 text-3xl font-semibold tracking-tight"),
          className)
        }
        {...props}
      >
        {children}
      </h2>
    );
  else if (size === "medium") {
    content = (
      <h3
        className={cn(
          "scroll-m-20 mb-3 text-2xl font-semibold tracking-tight",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  } else
    content = (
      <h4
        className={cn(
          "scroll-m-20 mb-3 text-xl font-semibold tracking-tight",
          className
        )}
        {...props}
      >
        {children}
      </h4>
    );

  return content;
};
