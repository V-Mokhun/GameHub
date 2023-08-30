"use client";

import { SearchGame } from "@shared/api";
import { Icon } from "@shared/ui";
import Image from "next/image";

interface SearchedGameProps {
  game: SearchGame;
}

export const SearchedGame = ({ game }: SearchedGameProps) => {
  return (
    <div className="cursor-pointer flex w-full items-start gap-2">
      {game.cover ? (
        <Image
          className="object-cover"
          alt={game.name}
          src={game.cover}
          width={40}
          height={40}
        />
      ) : (
        <div className="w-10 h-10 bg-muted" />
      )}
      <div className="flex flex-1 justify-between gap-1">
        <p>
          {game.name} {""}
          {game.releaseDate && (
            <span className="inline-flex text-muted-foreground">
              ({new Date(game.releaseDate).getFullYear()})
            </span>
          )}
        </p>
        <div className="inline-flex items-start gap-0.5">
          <Icon className="w-3 h-3 mt-1" name="Star" />
          <span className="text-sm">{game.rating}</span>
        </div>
      </div>
    </div>
  );
};
