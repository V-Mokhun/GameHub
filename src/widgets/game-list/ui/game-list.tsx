"use client";

import { GameCard } from "@entities/game";
import { Game, userLibraryApi } from "@shared/api";

interface GameListProps {
  userId?: string | null;
  games: Game[];
}

export const GameList = ({ games, userId }: GameListProps) => {
  if (!userId) {
    return (
      <div className="flex flex-wrap gap-2 md:gap-x-4 md:gap-y-6">
        {games.map((game) => (
          <GameCard userId={userId || null} key={game.id} game={game} />
        ))}
      </div>
    );
  }
  const { data: libraryGames = [] } = userLibraryApi.getLibrary(userId);

  return (
    <>
      <div className="flex flex-wrap gap-2 md:gap-x-4 md:gap-y-6">
        {games.map((game) => {
          const libraryGame = libraryGames.find((g) => g.id === game.id);
          if (!libraryGame)
            return (
              <GameCard userId={userId || null} key={game.id} game={game} />
            );

          return (
            <GameCard
              key={game.id}
              game={game}
              gameStatus={libraryGame.status}
              isInLibrary={true}
              userRating={libraryGame.userRating ?? undefined}
              userId={userId || null}
            />
          );
        })}
      </div>
    </>
  );
};
