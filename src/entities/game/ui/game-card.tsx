"use client";

import { Game as LibraryGame } from "@prisma/client";
import { Game, GameStatus } from "@shared/api";
import { GAMES_ROUTE } from "@shared/consts";
import { Icon } from "@shared/ui";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  game: Game;
  gameStatus?: GameStatus;
  userRating?: number;
  isInLibrary?: boolean;
  onAddToLibrary?: (game: LibraryGame) => void;
  onRemoveFromLibrary?: (id: number) => void;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="group overflow-hidden text-white relative shadow-md rounded-md flex-[0_1_calc(50%-4px)] md:flex-[0_1_calc(25%-12px)]">
      {/* name + rating */}
      <div className="absolute z-[2] top-2 left-0 right-0 flex justify-between items-start gap-2 px-2">
        <p className="text-xs">
          {game.name} ({game.releaseDate.getFullYear()})
        </p>
        <div className="flex items-center gap-1">
          <Icon size={12} name="Star" />
          <span className="text-sm">{Math.ceil(game.rating)}</span>
        </div>
      </div>
      <Link
        href={`${GAMES_ROUTE}/${game.id}`}
        className="block h-80 group-hover:blur-sm"
      >
        <Image className="object-cover" fill src={game.cover} alt={game.name} />
      </Link>
      {/* Add to library + user rating + status */}
      <div className="absolute z-[2] p-2 bg-card"></div>
      <div className="pointer-events-none group-hover:opacity-70 transition-opacity">
        <div className="absolute bottom-0 z-[1] h-1/2 w-full overflow-hidden rounded-md bg-gradient-to-t from-black/70"></div>
        <div className="absolute top-0 z-[1] h-1/2 w-full overflow-hidden rounded-md bg-gradient-to-b from-black/70"></div>
      </div>
    </div>
  );
};
