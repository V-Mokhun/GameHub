"use client";

import { useUser } from "@clerk/nextjs";
import { gamesApi } from "@shared/api";
import { Separator, Subtitle } from "@shared/ui";
import { GameReviewCard } from "./game-review-card";

interface GameReviewProps {
  gameId: string;
  reviewId: string;
}

export const GameReview = ({ gameId, reviewId }: GameReviewProps) => {
  const { user } = useUser();
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
          userId={user?.id}
          username={user?.username ?? undefined}
        />
        <Separator />
      </>
    )
  );
};
