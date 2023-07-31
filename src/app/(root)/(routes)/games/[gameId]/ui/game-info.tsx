"use client";

import { FullGame } from "@shared/api";
import { GameSidebar } from "./game-sidebar";

interface GameInfoProps {
  game?: FullGame;
  isLoading: boolean;
}

export const GameInfo = ({ game, isLoading }: GameInfoProps) => {
  if (isLoading) return null;

  console.log(game);

  return (
    game && (
      <div className="flex mt-4 gap-2">
        <div className="flex-1"> hi </div>
        <GameSidebar game={game} />
      </div>
    )
  );
};
