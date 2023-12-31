"use client";

import { FullGame, GAME_CATEGORIES } from "@shared/api";
import { cn } from "@shared/lib";
import { useClickOutside } from "@shared/lib/hooks";
import {
  Button,
  Icon,
  Separator,
  Skeleton,
  Title,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shared/ui";
import { format } from "date-fns";
import Image from "next/image";
import { useRef, useState } from "react";
import { GameSidebarItem } from "./game-sidebar-item";

interface GameSidebarProps {
  game?: FullGame;
  isLoading: boolean;
}

export const GameSidebar = ({ game, isLoading }: GameSidebarProps) => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  if (isLoading)
    return (
      <Skeleton
        className={"w-72 h-80 flex-[0_1_25%] rounded-md hidden xl:block"}
      />
    );

  return (
    game && (
      <>
        <Button
          className="xl:hidden fixed z-[5] right-2 sm:right-10 top-[calc(25%-36px)] rounded-full shadow-md"
          onClick={() => setOpen((prev) => !prev)}
          size="icon"
        >
          <Icon className="text-white" name="BadgeInfo" />
        </Button>
        <div
          ref={ref}
          className={cn(
            "fixed z-[5] max-w-xs transition-opacity pointer-events-none xl:pointer-events-auto right-2 sm:right-10 top-1/4 xl:opacity-100 xl:sticky xl:top-20 xl:right-0 xl:flex-[0_1_25%] xl:min-w-[18rem] bg-popover shadow-xl py-4 px-2 rounded-md text-sm sm:text-base",
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
            {game.criticsRating && (
              <li className="flex items-start justify-between gap-1">
                <span className="font-semibold shrink-0">Critics Rating:</span>
                <span
                  className={cn(
                    "p-1 rounded-sm text-sm",
                    game.criticsRating < 50 && "bg-destructive",
                    game.criticsRating < 75 &&
                      game.criticsRating >= 50 &&
                      "bg-secondary",
                    game.criticsRating >= 75 && "bg-success"
                  )}
                >
                  {game.criticsRating}
                </span>
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
                {
                  id: game.category,
                  name: GAME_CATEGORIES[game.category],
                },
              ]}
            />
            {game.companyLogos.length > 0 && (
              <li className="flex items-start justify-between gap-2">
                <span className="font-semibold shrink-0">Companies:</span>
                <div className="flex gap-2 text-right flex-wrap">
                  {game.companyLogos.map((logo) => (
                    <TooltipProvider key={logo.url}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Image
                            className="aspect-[4/3] rounded-md w-10 h-8"
                            src={logo.url}
                            width={40}
                            height={32}
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
    )
  );
};
