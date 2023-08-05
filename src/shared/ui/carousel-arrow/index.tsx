import { cn } from "@shared/lib";
import { Button, Icon } from "../primitives";

interface CarouselArrowProps {
  className?: string;
  left?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CarouselArrow = ({
  className,
  disabled,
  left,
  onClick,
}: CarouselArrowProps) => {
  return (
    <Button
      className={cn(
        "inline-flex absolute z-[2] top-1/2 transform -translate-y-1/2",
        left ? "left-2 md:-left-10" : "right-2 md:-right-10",
        className
      )}
      size="icon"
      variant="secondary"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="text-white" name={left ? "ArrowLeft" : "ArrowRight"} />
    </Button>
  );
};
