"use client";

import { Game, NormalizedLibraryGame } from "@shared/api";
import { GAMES_ROUTE, SIGN_IN_ROUTE } from "@shared/consts";
import {
  Badge,
  Button,
  Icon,
  TableCell,
  TableRow,
  buttonVariants,
  useToast,
} from "@shared/ui";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GameLibraryModal } from "./game-library-modal";
import { useGameListStore } from "@widgets/game-list";
import { cn } from "@shared/lib";

export type LibraryGameData = Pick<
  NormalizedLibraryGame,
  "finishedAt" | "notes" | "playTime" | "status" | "userRating"
>;

interface GameCardProps {
  game: Game;
  libraryGameData?: LibraryGameData;
  isInLibrary?: boolean;
  userId?: string | null;
  rank: number;
}

export const GameCard = ({
  game,
  isInLibrary,
  userId,
  libraryGameData,
  rank,
}: GameCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const view = useGameListStore((state) => state.view);
  const { toast } = useToast();

  const onLibraryButtonClick = () => {
    if (userId) {
      setIsOpen(true);
    } else {
      const { dismiss } = toast({
        title: "Sign in to add games to your library",
        action: (
          <Link
            onClick={() => dismiss()}
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "w-max self-end text-sm hover:text-white",
            })}
            href={SIGN_IN_ROUTE}
          >
            Sign in
          </Link>
        ),
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <GameLibraryModal
        gameData={game}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        libraryGameData={libraryGameData}
        userId={userId!}
        isInLibrary={isInLibrary}
      />
      {view === "grid" ? (
        <div className="group overflow-hidden text-white relative shadow-md rounded-md flex-[0_1_calc(50%-4px)] md:flex-[0_1_calc(33.3%-12px)] lg:flex-[0_1_calc(25%-12px)]">
          {/* name + rating */}
          <div className="absolute z-[2] top-2 left-0 right-0 flex justify-between items-start gap-2 px-2">
            <p className="text-xs">
              {game.name}{" "}
              {game.releaseDate ? `${game.releaseDate.getFullYear()}` : ""}
            </p>
            <div className="flex items-center gap-1">
              <Icon size={12} name="Star" />
              <span className="text-sm">{game.rating}</span>
            </div>
          </div>
          <Link
            href={`${GAMES_ROUTE}/${game.id}`}
            className="relative block h-72 sm:h-96 md:h-72 lg:h-80 xl:h-96 group-hover:blur-sm"
          >
            {game.cover ? (
              <Image
                className="object-cover"
                fill
                src={game.cover}
                alt={game.name}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-muted"></div>
            )}
          </Link>
          {/* Add to library + user rating + status */}
          <div className="absolute z-[2] bottom-2 left-0 right-0 flex flex-col gap-2 px-2">
            {libraryGameData?.userRating && (
              <span
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-sm",
                  libraryGameData.userRating >= 8
                    ? "bg-success"
                    : libraryGameData.userRating >= 5
                    ? "bg-secondary"
                    : "bg-destructive"
                )}
              >
                {libraryGameData?.userRating}
              </span>
            )}
            <div className="flex justify-end items-center gap-2">
              <div className="flex-1">
                {libraryGameData?.status && (
                  <Badge>
                    {libraryGameData?.status
                      .toLowerCase()
                      .split("_")
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Badge>
                )}
              </div>
              <Button onClick={onLibraryButtonClick} size="icon">
                <Icon
                  name={!isInLibrary ? "Plus" : "Edit"}
                  className="text-primary-foreground"
                />
              </Button>
            </div>
          </div>
          <div className="pointer-events-none group-hover:opacity-70 transition-opacity">
            <div className="absolute bottom-0 z-[1] h-1/2 w-full overflow-hidden rounded-md bg-gradient-to-t from-black/70"></div>
            <div className="absolute top-0 z-[1] h-1/2 w-full overflow-hidden rounded-md bg-gradient-to-b from-black/70"></div>
          </div>
        </div>
      ) : (
        <TableRow>
          <TableCell className="font-medium text-center">{rank}</TableCell>
          <TableCell>
            <span className="mr-2">{game.name}</span>
            {libraryGameData?.userRating && (
              <span
                className={cn(
                  "inline-flex items-center justify-center w-5 h-5 rounded-sm",
                  libraryGameData.userRating >= 8
                    ? "bg-success"
                    : libraryGameData.userRating >= 5
                    ? "bg-secondary"
                    : "bg-destructive"
                )}
              >
                {libraryGameData?.userRating}
              </span>
            )}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-1">
              <Icon className="w-3 h-3 md:w-4 md:h-4" name="Star" />
              <span className="text-sm md:text-base">{game.rating}</span>
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex items-center gap-1">
              <Button
                onClick={onLibraryButtonClick}
                variant="link"
                className="h-auto p-0"
              >
                {!isInLibrary ? "Add" : "Edit"}
              </Button>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
