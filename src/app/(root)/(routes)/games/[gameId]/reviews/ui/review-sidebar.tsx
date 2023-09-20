"use client";

import { GameCard, GameCardSkeleton } from "@entities/game";
import { FullGame, NormalizedLibraryGame } from "@shared/api";

interface ReviewSidebarProps {
  userId?: string;
  username?: string;
  libraryGame?: NormalizedLibraryGame | null;
  game: FullGame;
}

export const ReviewSidebarSkeleton = () => {
  return (
    <div className="w-1/2 sm:w-1/3 lg:w-auto lg:flex-[0_1_25%] space-y-4">
      <GameCardSkeleton />
    </div>
  );
};

export const ReviewSidebar = ({
  userId,
  username,
  libraryGame,
  game,
}: ReviewSidebarProps) => {
  return (
    game && (
      <div className="w-1/2 sm:w-1/3 lg:w-auto lg:flex-[0_1_25%] space-y-4">
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
          <p className="hidden md:block text-sm lg:text-base">
            {game.summary?.slice(0, 200)} {game.summary?.length > 200 && "..."}
          </p>
        )}
      </div>
    )
  );
};
