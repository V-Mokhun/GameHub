"use client";

import { Game } from "@shared/api";
import { GAMES_ROUTE } from "@shared/consts";
import { Icon } from "@shared/ui";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="text-card-foreground rounded-md flex-[0_1_calc(50%-4px)] md:flex-[0_1_calc(25%-12px)]">
      <Link href={`${GAMES_ROUTE}/${game.id}`} className="relative">
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md">
          <Icon name="Star" />
          <span className="text-sm">{game.rating}</span>
        </div>
        <Image
          className="max-w-full h-full object-cover"
          src={game.cover.url}
          width={game.cover.width}
          height={game.cover.height}
          alt={game.name}
        />
      </Link>
      <div className="p-2 bg-card">
        <div className="flex gap-2">
          <p>
            {game.name}{" "}
            <span className="text-muted-foreground">
              ({game.releaseDate.getFullYear()})
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
