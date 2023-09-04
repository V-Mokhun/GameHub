"use client";

import { GameCard } from "@entities/game";
import { NormalizedLibraryGame, gamesApi, userLibraryApi } from "@shared/api";
import { Title } from "@shared/ui";

interface CreateReviewSidebarProps {
  gameId: string;
  userId?: string;
  username?: string;
  libraryGame?: NormalizedLibraryGame | null;
}

export const CreateReviewSidebar = ({
  gameId,
  userId,
  username,
  libraryGame,
}: CreateReviewSidebarProps) => {
  const { data: game, isLoading } = gamesApi.getGame(gameId);

  if (isLoading) return <div>Loading...</div>;

  return (
    game && (
      <div className="flex-[0_1_25%] space-y-4">
        <GameCard
          game={{
            category: game.category,
            id: game.id,
            name: game.name,
            cover: game.cover || "",
            rating: game.rating,
            themes: game.themes.map((theme) => theme.id),
            gameModes: game.gameModes.map((gameMode) => gameMode.id),
            genres: game.genres.map((genre) => genre.id),
            releaseDate: game.releaseDate
              ? new Date(game.releaseDate)
              : undefined,
          }}
          libraryGameData={libraryGame ?? undefined}
          isInLibrary={!!libraryGame}
          userId={userId}
          username={username}
          disableLibraryButton
        />
        {game.summary && (
          <p>
            {game.summary?.slice(0, 200)} {game.summary?.length > 200 && "..."}
          </p>
        )}
      </div>
    )
  );
};
