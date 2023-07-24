"use client";

import { GameCard } from "@entities/game";
import { Game, userLibraryApi } from "@shared/api";

interface GameListProps {
  userId?: string | null;
  games: Game[];
}

export const GameList = ({ games, userId }: GameListProps) => {
  const { data: libraryGames = [] } = userLibraryApi.getLibrary(userId || "");

  return (
    <>
      <div className="flex flex-wrap gap-2 md:gap-x-4 md:gap-y-6">
        {games.map((game) => {
          const libraryGame = libraryGames.find((g) => g.id === game.id);
          if (!libraryGame)
            return (
              <GameCard userId={userId} key={game.id} game={game} />
            );

          return (
            <GameCard
              key={game.id}
              game={game}
              isInLibrary={true}
              userId={userId!}
              libraryGameData={{
                finishedAt: libraryGame.finishedAt,
                notes: libraryGame.notes,
                playTime: libraryGame.playTime,
                status: libraryGame.status,
                userRating: libraryGame.userRating,
              }}
            />
          );
        })}
      </div>
    </>
  );
};
