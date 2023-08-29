"use client";

import { Game, NormalizedLibraryGame } from "@shared/api";
import { Button, Title } from "@shared/ui";
import { GameList } from "@widgets/game-list";
import { useMemo, useState } from "react";

interface GameCollectionProps {
  games?: Game[];
  gameId?: number;
  libraryGames?: NormalizedLibraryGame[];
  username?: string | null;
  userId?: string | null;
  isLoading: boolean;
  title: string;
}

export const GameCollection = ({
  games,
  gameId,
  libraryGames,
  userId,
  username,
  isLoading,
  title,
}: GameCollectionProps) => {
  const [seeAll, setSeeAll] = useState(false);
  const firstGames = useMemo(() => games?.slice(0, 5), [games]);

  if (isLoading) return null;

  return (
    games &&
    games.length > 0 && (
      <div className="my-4">
        <Title>{title}</Title>
        <GameList
          selectedGameId={gameId}
          games={seeAll ? games : firstGames!}
          libraryGames={libraryGames || []}
          userId={userId}
          username={username || ""}
          gamesView="list"
        />
        {games.length > 5 && (
          <div className="mt-2 flex items-center gap-2">
            <Button onClick={() => setSeeAll((prev) => !prev)}>
              {seeAll ? "See First 5" : "See All"}
            </Button>
            {!seeAll && (
              <span className="text-muted-foreground">
                {games.length - 5} more left
              </span>
            )}
          </div>
        )}
      </div>
    )
  );
};
