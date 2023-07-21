import { cn } from "@shared/lib";
import { Button, Icon } from "@shared/ui";

interface ChangeGamesViewProps {
  onGridClick: () => void;
  onListClick: () => void;
  activeView: "grid" | "list";
}

export const ChangeGamesView = ({
  onGridClick,
  onListClick,
  activeView,
}: ChangeGamesViewProps) => {
  return (
    <div className="flex items-center gap-2">
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
