"use client";

import { GameCard } from "@entities/game";
import { Game, NormalizedLibraryGame, userLibraryApi } from "@shared/api";

interface GameListProps {
  userId?: string | null;
  games: Game[];
}

export const GameList = ({ games, userId }: GameListProps) => {
  let libraryGames: NormalizedLibraryGame[] = [];

  if (userId) {
    const { data } = userLibraryApi.getUserLibrary(userId);
    libraryGames = data || [];
  }

  return (
    <div className="flex flex-wrap gap-2 md:gap-x-4 md:gap-y-8">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};
