"use client";

import { Game, NormalizedLibraryGame } from "@shared/api";
import { GAMES_ROUTE } from "@shared/consts";
import { cn } from "@shared/lib";
import { useCustomToasts } from "@shared/lib/hooks";
import {
  Badge,
  Button,
  Link as CustomLink,
  Icon,
  Skeleton,
  TableCell,
  TableRow,
} from "@shared/ui";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GameLibraryModal } from "./game-library-modal";
import { GameStatus } from "./game-status";
import { GameUserRating } from "./game-user-rating";

export type LibraryGameData = Pick<
  NormalizedLibraryGame,
  "finishedAt" | "notes" | "playTime" | "status" | "userRating"
>;

interface GameCardProps {
  game: Game;
  libraryGameData?: LibraryGameData;
  isInLibrary?: boolean;
  userId?: string | null;
  username?: string;
  rank?: number;
  view?: "grid" | "list";
  disableLibraryButton?: boolean;
  classNames?: {
    link?: string;
    name?: string;
  };
  selected?: boolean;
}

export const GameCardSkeleton = () => (
  <Skeleton className="h-72 sm:h-96 md:h-72 lg:h-80 xl:h-96 flex-[0_1_calc(50%-4px)] md:flex-[0_1_calc(33.3%-12px)] lg:flex-[0_1_calc(25%-12px)]" />
);

export const GameCard = ({
  game,
  isInLibrary,
  userId,
  libraryGameData,
  username,
  rank,
  view = "grid",
  disableLibraryButton = false,
  classNames = {},
  selected,
}: GameCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signInToast } = useCustomToasts();

  const onLibraryButtonClick = () => {
    if (disableLibraryButton) return;

    if (userId) {
      setIsOpen(true);
    } else {
      signInToast();
    }
  };

  return (
    <>
      {!disableLibraryButton && (
        <GameLibraryModal
          gameData={game}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          libraryGameData={libraryGameData}
          userId={userId!}
          username={username!}
          isInLibrary={isInLibrary}
        />
      )}
      {view === "grid" ? (
        <div className="group overflow-hidden text-white relative shadow-md rounded-md flex-[0_1_calc(50%-4px)] md:flex-[0_1_calc(33.3%-12px)] lg:flex-[0_1_calc(25%-12px)]">
          {/* name + rating */}
          <div className="absolute z-[2] top-2 left-0 right-0 flex justify-between items-start gap-2 px-2">
            <p className={cn("text-xs", classNames.name)}>
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
            className={cn(
              "relative block h-72 sm:h-96 md:h-72 lg:h-80 xl:h-96 group-hover:blur-sm",
              classNames.link
            )}
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
          <div className="absolute z-[2] bottom-2 left-0 right-0 flex flex-col gap-1 px-2">
            {libraryGameData?.userRating && (
              <GameUserRating userRating={libraryGameData.userRating} />
            )}
            {libraryGameData?.playTime && libraryGameData.playTime > 0 ? (
              <div className="inline-block mt-1">
                <Badge className="inline-flex flex-auto items-center gap-1 text-sm px-2">
                  <Icon className="w-4 h-4" name="Clock" />
                  <span>{libraryGameData.playTime}</span>
                </Badge>
              </div>
            ) : null}
            <div className="flex justify-end items-center gap-2">
              <div className="flex-1">
                {libraryGameData?.status && (
                  <GameStatus status={libraryGameData.status} />
                )}
              </div>
              {!disableLibraryButton && (
                <Button onClick={onLibraryButtonClick} size="icon">
                  <Icon
                    name={!isInLibrary ? "Plus" : "Edit"}
                    className="text-primary-foreground"
                  />
                </Button>
              )}
            </div>
          </div>
          <div className="pointer-events-none group-hover:opacity-70 transition-opacity">
            <div className="absolute bottom-0 z-[1] h-1/2 w-full overflow-hidden rounded-md bg-gradient-to-t from-black/70"></div>
            <div className="absolute top-0 z-[1] h-1/2 w-full overflow-hidden rounded-md bg-gradient-to-b from-black/70"></div>
          </div>
        </div>
      ) : (
        <TableRow className={cn(selected && "bg-muted")}>
          <TableCell className="font-medium text-center">{rank}</TableCell>
          <TableCell>
            <CustomLink
              className="text-foreground"
              href={`${GAMES_ROUTE}/${game.id}`}
            >
              {game.name}
            </CustomLink>
            {game.releaseDate && (
              <span className="text-muted-foreground ml-1 text-sm">
                ({game.releaseDate.getFullYear()})
              </span>
            )}
            {libraryGameData?.userRating && (
              <GameUserRating
                userRating={libraryGameData.userRating}
                className="inline-flex w-5 h-5 md:w-6 md:h-6 text-white ml-2"
              />
            )}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-1">
              <Icon className="w-3 h-3 md:w-4 md:h-4" name="Star" />
              <span className="text-sm md:text-base">{game.rating}</span>
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-end gap-1">
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
