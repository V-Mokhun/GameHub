"use client";

import { gamesApi } from "@shared/api";
import { REVIEWS_ROUTE, TOAST_TIMEOUT } from "@shared/consts";
import { Title, useToast } from "@shared/ui";
import { useRouter } from "next/navigation";
import { ReviewSidebar, ReviewSidebarSkeleton } from "../../../ui";
import { ReviewForm, ReviewFormSkeleton } from "@widgets/forms";
import { useMediaQuery } from "@shared/lib/hooks";

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
  const isMd = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const { toast } = useToast();

  const isLoading = isReviewLoading || isGameLoading;

  if (isLoading)
    return (
      <div className="flex gap-4">
        <div className="space-y-4 flex-1">
          <Title className="mb-0 lg:mb-0">Edit Review</Title>
          <ReviewFormSkeleton />
        </div>
      </div>
    );

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
        <div className="space-y-4 flex-1">
          <Title className="mb-0 lg:mb-0">Edit Review</Title>
          {!isMd && (
            <ReviewSidebar
              libraryGame={review.game}
              userId={review.user.id}
              username={review.user.username}
              game={game}
            />
          )}
          <ReviewForm
            isEdit
            reviewId={reviewId}
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
            defaultValues={{
              title: review.title,
              body: review.body,
              hasSpoiler: review.hasSpoiler,
              rating: review.rating,
            }}
          />
        </div>
        {isMd && (
          <ReviewSidebar
            libraryGame={review.game}
            userId={review.user.id}
            username={review.user.username}
            game={game}
          />
        )}
      </div>
    )
  );
};
