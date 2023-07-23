"use client";

import { GameStatus, Game as LibraryGame } from "@prisma/client";
import { Game } from "@shared/api";
import { GAMES_ROUTE, SIGN_IN_ROUTE } from "@shared/consts";
import { Icon, buttonVariants, useToast } from "@shared/ui";
import { AlertModal } from "@shared/ui/modal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface GameCardProps {
  game: Game;
  gameStatus?: GameStatus;
  userRating?: number;
  isInLibrary?: boolean;
  userId: string | null;
}

export const GameCard = ({
  game,
  gameStatus,
  isInLibrary,
  userId,
  userRating,
}: GameCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
        variant: "success",
      });
    }
  };

  return (
    <>
      {/* <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isLoading={isLoading}
        onConfirm={() =>
          removeGame(game.id, { onSuccess: () => setIsOpen(false) })
        }
      /> */}
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
          <Image
            className="object-cover"
            fill
            src={game.cover}
            alt={game.name}
          />
        </Link>
        {/* Add to library + user rating + status */}
        <div className="absolute z-[2] bottom-2 left-0 right-0 flex justify-between items-start gap-2 px-2">
          {/* {gameStatus && } */}
        </div>
        <div className="pointer-events-none group-hover:opacity-70 transition-opacity">
          <div className="absolute bottom-0 z-[1] h-1/2 w-full overflow-hidden rounded-md bg-gradient-to-t from-black/70"></div>
          <div className="absolute top-0 z-[1] h-1/2 w-full overflow-hidden rounded-md bg-gradient-to-b from-black/70"></div>
        </div>
      </div>
    </>
  );
};
