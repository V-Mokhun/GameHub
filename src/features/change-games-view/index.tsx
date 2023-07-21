import { cn } from "@shared/lib";
import { Button, Icon } from "@shared/ui";

interface ChangeGamesViewProps extends React.HTMLAttributes<HTMLDivElement> {
  onGridClick: () => void;
  onListClick: () => void;
  activeView: "grid" | "list";
}

export const ChangeGamesView = ({
  onGridClick,
  onListClick,
  activeView,
  className,
  ...props
}: ChangeGamesViewProps) => {
  return (
    <div {...props} className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={onGridClick}
        size="icon"
        variant="secondary"
        className={cn(activeView === "grid" && "bg-secondary-hover")}
      >
        <Icon className="text-white" name="Grid" />
      </Button>
      <Button
        onClick={onListClick}
        size="icon"
        variant="secondary"
        className={cn(activeView === "list" && "bg-secondary-hover")}
      >
        <Icon className="text-white" name="List" />
      </Button>
    </div>
  );
};
