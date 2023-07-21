import { Icon, Link } from "@shared/ui";
import { SidebarItemT } from "./sidebar-menu";
import { cn } from "@shared/lib";

export const SidebarItem = ({
  href,
  iconName,
  isActive,
  text,
  onClick,
}: SidebarItemT & { onClick: () => void }) => {
  return (
    <li onClick={onClick}>
      <Link
        className={cn(
          "flex items-center text-foreground gap-2 text-base font-medium",
          isActive && "font-semibold text-primary hover:text-primary"
        )}
        href={href}
      >
        <Icon name={iconName} />
        <span>{text}</span>
      </Link>
    </li>
  );
};
