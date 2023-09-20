"use client";

import { gamesApi } from "@shared/api";
import { Separator, Subtitle, useToast } from "@shared/ui";
import { GameReviewCard, GameReviewCardSkeleton } from "./game-review-card";
import {
  GameReviewContent,
  GameReviewContentSkeleton,
} from "./game-review-content";
import { useRouter } from "next/navigation";
import { REVIEWS_ROUTE, TOAST_TIMEOUT } from "@shared/consts";

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
  const router = useRouter();
  const { toast } = useToast();

  if (isLoading)
    return (
      <>
        <Subtitle>
          GameHub does not verify whether reviewers have played or purchased the
          game they are reviewing.
        </Subtitle>
        <GameReviewCardSkeleton />
        <Separator />
        <GameReviewContentSkeleton />
      </>
    );

  if (!isLoading && !review) {
    router.push(REVIEWS_ROUTE(gameId));
    setTimeout(() => {
      toast({
        title: "Review not found",
        description: "The review you are looking for does not exist",
        variant: "destructive",
      });
    }, TOAST_TIMEOUT);
    return null;
  }

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
