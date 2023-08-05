"use client";

import { FullGame, GAME_CATEGORIES } from "@shared/api";
import {
  Button,
  Icon,
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
import { useRef, useState } from "react";
import { cn, useClickOutside } from "@shared/lib";

interface GameSidebarProps {
  game: FullGame;
}

export const GameSidebar = ({ game }: GameSidebarProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useClickOutside(() => setOpen(false), [buttonRef.current]);

  return (
    <>
      <Button
        ref={buttonRef}
        className="xl:hidden fixed right-2 sm:right-10 top-[calc(25%-36px)] rounded-full shadow-md"
        onClick={() => setOpen((prev) => !prev)}
        size="icon"
      >
        <Icon className="text-white" name="BadgeInfo" />
      </Button>
      <div
        ref={ref}
        className={cn(
          "fixed max-w-xs transition-opacity pointer-events-none right-2 sm:right-10 top-1/4 xl:opacity-100 xl:static xl:flex-[0_1_25%] xl:min-w-[280px] bg-popover shadow-xl py-4 px-2 rounded-md text-sm sm:text-base",
          open && "opacity-100 pointer-events-auto",
          !open && "opacity-0"
        )}
      >
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
    </>
  );
};
