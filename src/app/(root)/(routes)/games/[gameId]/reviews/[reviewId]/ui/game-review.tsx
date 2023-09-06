"use client";

import { gamesApi } from "@shared/api";
import { Separator, Subtitle } from "@shared/ui";
import { GameReviewCard } from "./game-review-card";
import { GameReviewContent } from "./game-review-content";

interface GameReviewProps {
  gameId: string;
  reviewId: string;
  authUserId: string | null;
}

export const GameReview = ({
  gameId,
  reviewId,
  authUserId,
}: GameReviewProps) => {
  const { data: review, isLoading } = gamesApi.getReview(gameId, reviewId);

  if (isLoading) return <p>Loading...</p>;

  return (
    review && (
      <>
        <Subtitle>
          GameHub does not verify whether reviewers have played or purchased the
          game they are reviewing.
        </Subtitle>
        <GameReviewCard
          gameId={gameId}
          review={review}
          userId={review.user.id}
          username={review.user.username}
        />
        <Separator />
        <GameReviewContent review={review} authUserId={authUserId} />
      </>
    )
  );
};
