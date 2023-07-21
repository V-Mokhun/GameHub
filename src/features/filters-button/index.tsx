"use client";

import { cn } from "@shared/lib";
import { Button, Icon } from "@shared/ui";

interface FiltersButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export const FiltersButton = ({
  onClick,
  className,
  ...props
}: FiltersButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="icon"
      variant="secondary"
      className={cn("w-10 h-10", className)}
      {...props}
    >
      <Icon className="text-white" name="Filter" />
    </Button>
  );
};
