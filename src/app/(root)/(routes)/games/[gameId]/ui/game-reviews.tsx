"use client";

import { ReviewsItem } from "@entities/review";
import { ReviewSortFields, SortFieldsOrder, gamesApi } from "@shared/api";
import { REVIEWS_ROUTE } from "@shared/consts";
import { Icon, Link, Title } from "@shared/ui";
import NextLink from "next/link";

interface GameReviewsProps {
  gameId: string;
}

export const GameReviews = ({ gameId }: GameReviewsProps) => {
  const { data } = gamesApi.getReviews(
    gameId,
    {
      field: ReviewSortFields.TOTAL_VOTES,
      order: SortFieldsOrder.DESC,
      hideSpoilers: false,
    },
    { limit: 5, offset: 0 }
  );

  return (
    data && (
      <div className="my-4 md:my-6">
        <Title>
          <NextLink
            className="transition-colors hover:text-primary-hover"
            href={REVIEWS_ROUTE(gameId)}
          >
            User Reviews{" "}
            <Icon
              className="inline-block text-inherit w-8 h-8"
              name="ChevronRight"
            />
          </NextLink>
        </Title>
        <ul>
          {data.reviews.map((review) => (
            <ReviewsItem review={review} gameId={gameId} key={review.id} />
          ))}
        </ul>
        <Link href={REVIEWS_ROUTE(gameId)} className="text-center block">See all reviews</Link>
      </div>
    )
  );
};
