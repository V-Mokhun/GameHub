"use client";

import { useUser } from "@clerk/nextjs";
import { gamesApi, userLibraryApi } from "@shared/api";
import { ReviewForm, ReviewFormSkeleton } from "@widgets/forms";
import { GameStatus } from "@prisma/client";
import { ReviewSidebar, ReviewSidebarSkeleton } from "../../ui";
import { Title } from "@shared/ui";
import { useMediaQuery } from "@shared/lib/hooks";

interface CreateReviewProps {
  gameId: string;
  userId: string;
}

export const CreateReview = ({ gameId, userId }: CreateReviewProps) => {
  const { user } = useUser();
  const { data: game, isLoading: isGameLoading } = gamesApi.getGame(gameId);
  const { data: libraryGame, isLoading: isLibraryGameLoading } =
    userLibraryApi.getLibraryGame(
      gameId,
      user?.id ?? undefined,
      user?.username ?? undefined
    );
  const isMd = useMediaQuery("(min-width: 768px)");

  const isLoading = isGameLoading || isLibraryGameLoading;

  if (isLoading)
    return (
      <div className="flex gap-4">
        <div className="space-y-4 flex-1">
          <Title className="mb-0 lg:mb-0">Create Review</Title>
          <ReviewFormSkeleton />
        </div>
      </div>
    );

  return (
    game && (
      <div className="flex gap-4">
        <div className="space-y-4 flex-1">
          <Title className="mb-0 lg:mb-0">Create Review</Title>
          {!isMd && (
            <ReviewSidebar
              libraryGame={libraryGame}
              userId={userId}
              username={user?.username ?? undefined}
              game={game}
            />
          )}
          <ReviewForm
            game={{
              category: game.category,
              name: game.name,
              id: game.id,
              releaseDate: game.releaseDate || null,
              gameModes: game.gameModes.map((mode) => mode.id)?.join(",") || "",
              genres: game.genres.map((genre) => genre.id)?.join(",") || "",
              themes: game.themes.map((theme) => theme.id)?.join(",") || "",
              totalRating: game.rating,
              coverUrl: game.cover ?? "",
              userId,
              createdAt: libraryGame?.createdAt ?? new Date(),
              updatedAt: libraryGame?.updatedAt ?? new Date(),
              userRating: libraryGame?.userRating || null,
              playTime: libraryGame?.playTime
                ? Number(libraryGame.playTime)
                : null,
              finishedAt: libraryGame?.finishedAt ?? null,
              notes: libraryGame?.notes ?? "",
              status: libraryGame?.status ?? GameStatus.WANT_TO_PLAY,
            }}
            gameId={gameId}
            userId={userId}
            userRating={libraryGame?.userRating ?? undefined}
          />
        </div>
        {isMd && (
          <ReviewSidebar
            libraryGame={libraryGame}
            userId={userId}
            username={user?.username ?? undefined}
            game={game}
          />
        )}
      </div>
    )
  );
};
