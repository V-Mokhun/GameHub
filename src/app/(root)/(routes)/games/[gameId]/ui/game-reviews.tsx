"use client";

import { useAuth } from "@clerk/nextjs";
import { ReviewsItem } from "@entities/review";
import { ReviewSortFields, SortFieldsOrder, gamesApi } from "@shared/api";
import { CREATE_REVIEW_ROUTE, REVIEWS_ROUTE } from "@shared/consts";
import { useCustomToasts } from "@shared/lib/hooks";
import { Icon, Link, Subtitle, Title } from "@shared/ui";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

interface GameReviewsProps {
  gameId: string;
}

export const GameReviews = ({ gameId }: GameReviewsProps) => {
  const { userId } = useAuth();
  const { signInToast } = useCustomToasts();
  const router = useRouter();
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
              className="inline-block text-inherit w-7 h-7 md:w-8 md:h-8"
              name="ChevronRight"
            />
          </NextLink>
        </Title>
        {data.reviews.length > 0 ? (
          <>
            <ul>
              {data.reviews.map((review) => (
                <ReviewsItem review={review} gameId={gameId} key={review.id} />
              ))}
            </ul>
            <Link href={REVIEWS_ROUTE(gameId)} className="text-center block">
              See all reviews
            </Link>
          </>
        ) : (
          <Subtitle size="large">
            This game has no reviews yet.{" "}
            <button
              type="button"
              className="text-primary hover:text-primary-hover transition-colors"
              onClick={() => {
                if (!userId) signInToast();

                router.push(CREATE_REVIEW_ROUTE(gameId));
              }}
            >
              Be the one to write the first review! <Icon name="ChevronsRight" className="text-inherit w-6 h-6 inline-block" />
            </button>
          </Subtitle>
        )}
      </div>
    )
  );
};
