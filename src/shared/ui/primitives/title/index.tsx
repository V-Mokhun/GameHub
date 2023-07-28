import { cn } from "@shared/lib";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  size?: "huge" | "large" | "medium" | "small" | "xs";
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
          "break-words scroll-m-20 mb-4 text-4xl font-bold tracking-wide lg:text-5xl",
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
        className={cn(
          "break-words scroll-m-20 mb-2 text-3xl font-bold tracking-tight lg:mb-3 lg:text-4xl",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  else if (size === "medium") {
    content = (
      <h3
        className={cn(
          "break-words scroll-m-20 mb-2 text-2xl font-bold tracking-tight lg:mb-3 lg:text-3xl",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  } else if (size === "small")
    content = (
      <h4
        className={cn(
          "break-words scroll-m-20 mb-2 text-xl font-bold tracking-tight lg:mb-3 lg:text-2xl",
          className
        )}
        {...props}
      >
        {children}
      </h4>
    );
  else {
    <h5
      className={cn(
        "break-words scroll-m-20 mb-2 text-lg font-bold tracking-tight lg:mb-3 lg:text-xl",
        className
      )}
      {...props}
    >
      {children}
    </h5>;
  }

  return content;
};
