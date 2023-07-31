import { BROWSE_ROUTE } from "@shared/consts";
import { Link } from "@shared/ui";

interface GameSidebarItemProps {
  items: { id: number; name: string }[];
  redirectName: string;
  title: string;
}

export const GameSidebarItem = ({
  items,
  redirectName,
  title,
}: GameSidebarItemProps) => {
  return (
    items.length > 0 && (
      <li className="flex items-start justify-between gap-2">
        <span className="font-semibold shrink-0">{title}:</span>
        <div className="text-right">
          {items.map((item, idx) => (
            <Link
              key={item.id}
              href={BROWSE_ROUTE + `?${redirectName}=${item.id}`}
            >
              {item.name}
              {idx !== items.length - 1 && ", "}
            </Link>
          ))}
        </div>
      </li>
    )
  );
};
