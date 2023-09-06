"use client";

import { gamesApi } from "@shared/api";
import { REVIEWS_ROUTE, TOAST_TIMEOUT } from "@shared/consts";
import { useToast } from "@shared/ui";
import { useRouter } from "next/navigation";
import { ReviewSidebar } from "../../../ui";
import { ReviewForm } from "@widgets/forms";

interface EditReviewProps {
  gameId: string;
  reviewId: string;
  authUserId: string | null;
}

export const EditReview = ({
  authUserId,
  gameId,
  reviewId,
}: EditReviewProps) => {
  const { data: review, isLoading: isReviewLoading } = gamesApi.getReview(
    gameId,
    reviewId
  );
  const { data: game, isLoading: isGameLoading } = gamesApi.getGame(gameId);

  const router = useRouter();
  const { toast } = useToast();

  const isLoading = isReviewLoading || isGameLoading;

  if (isLoading) return <p>Loading...</p>;

  if (review && review.userId !== authUserId) {
    router.push(REVIEWS_ROUTE(gameId));
    setTimeout(() => {
      toast({
        title: "You can't edit this review",
        description: "You can only edit your own reviews",
        variant: "destructive",
      });
    }, TOAST_TIMEOUT);
    return null;
  }

  return (
    game &&
    review && (
      <div className="flex gap-4">
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
            userId: review.user.id,
            createdAt: review.game.createdAt ?? new Date(),
            updatedAt: review.game.updatedAt ?? new Date(),
            userRating: review.game.userRating || null,
            playTime: review.game.playTime,
            finishedAt: review.game.finishedAt,
            notes: review.game.notes,
            status: review.game.status,
          }}
          gameId={gameId}
          userId={review.user.id}
          userRating={review.game.userRating ?? undefined}
        />
        <ReviewSidebar
          libraryGame={review.game}
          userId={review.user.id}
          username={review.user.username}
          game={game}
        />
      </div>
    )
  );
};
