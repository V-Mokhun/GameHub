"use client";

import { GameCard } from "@entities/game";
import {
  FullGame,
  NormalizedLibraryGame,
  gamesApi,
  userLibraryApi,
} from "@shared/api";
import { Title } from "@shared/ui";

interface CreateReviewSidebarProps {
  userId?: string;
  username?: string;
  libraryGame?: NormalizedLibraryGame | null;
  game: FullGame | undefined;
}

export const CreateReviewSidebar = ({
  userId,
  username,
  libraryGame,
  game,
}: CreateReviewSidebarProps) => {
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
