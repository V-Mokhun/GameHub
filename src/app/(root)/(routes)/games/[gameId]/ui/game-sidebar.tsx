"use client";

import { FullGame, GAME_CATEGORIES } from "@shared/api";
import {
  Separator,
  Title,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shared/ui";
import { format } from "date-fns";
import Image from "next/image";
import { GameSidebarItem } from "./game-sidebar-item";

interface GameSidebarProps {
  game: FullGame;
}

export const GameSidebar = ({ game }: GameSidebarProps) => {
  return (
    <div className="fixed opacity-0 pointer-events-none right-10 top-1/4 xl:opacity-100 xl:static flex-[0_1_25%] min-w-[280px] bg-popover shadow-xl py-4 px-2 rounded-md">
      <Title size="small" className="text-center">
        Game Info
      </Title>
      <Separator />
      <ul className="flex flex-col gap-4">
        {game.releaseDate && (
          <li className="flex items-start justify-between gap-1">
            <span className="font-semibold shrink-0">Release Date:</span>
            <span>{format(new Date(game.releaseDate), "dd/MM/yyyy")}</span>
          </li>
        )}
        <GameSidebarItem
          title="Genre"
          redirectName="genres"
          items={game.genres}
        />
        <GameSidebarItem
          title="Theme"
          redirectName="themes"
          items={game.themes}
        />
        <GameSidebarItem
          title="Modes"
          redirectName="gameModes"
          items={game.gameModes}
        />
        <GameSidebarItem
          title="Category"
          redirectName="categories"
          items={[
            { id: game.category, name: GAME_CATEGORIES[game.category].name },
          ]}
        />
        {game.companyLogos.length > 0 && (
          <li className="flex items-start justify-between gap-2">
            <span className="font-semibold shrink-0">Companies:</span>
            <div className="flex gap-2 text-right">
              {game.companyLogos.map((logo) => (
                <TooltipProvider key={logo.url}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image
                      className="aspect-[4/3] rounded-md"
                        src={logo.url}
                        width={45}
                        height={25}
                        alt={logo.name}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>{logo.name}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};
