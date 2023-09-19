"use client";

import { gamesApi } from "@shared/api";
import { ReviewsGame } from "./reviews-game";
import { ReviewsItem } from "./reviews-item";
import { ReviewsFilter } from "./reviews-filter";

// Total votes, review rating, review date

interface ReviewsPageProps {
  gameId: string;
}

export const ReviewsPage = ({ gameId }: ReviewsPageProps) => {
  const { data: reviews } = gamesApi.getReviews(gameId);

  if (!reviews) return null;

  return (
    <>
      <ReviewsGame gameId={gameId} />
      <p className="text-muted-foreground italic">
        GameHub does not verify whether reviewers have played or purchased the
        game they are reviewing.
      </p>
      <ReviewsFilter />
      <ul>
        {reviews.map((review) => (
          <ReviewsItem review={review} gameId={gameId} key={review.id} />
        ))}
      </ul>
    </>
  );
};
