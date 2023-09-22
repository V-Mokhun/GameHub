"use client";

import {
  DEFAULT_LIMIT_VALUES,
  gamesApi,
  onPaginate,
  retrievePaginateFromSearchParams,
  retrieveReviewFieldsFromSearchParams,
} from "@shared/api";
import { ReviewsGame } from "./reviews-game";
import { Separator, Title } from "@shared/ui";
import { Pagination } from "@widgets/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReviewsItem, ReviewsItemSkeleton } from "@entities/review";
import { ReviewsFilter } from "@widgets/filters";

interface ReviewsPageProps {
  gameId: string;
}

export const ReviewsPage = ({ gameId }: ReviewsPageProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const paginate = retrievePaginateFromSearchParams(params);
  const fields = retrieveReviewFieldsFromSearchParams(params);

  const { data, isFetching, isPreviousData } = gamesApi.getReviews(
    gameId,
    fields,
    paginate
  );

  return (
    <>
      <ReviewsGame gameId={gameId} />
      <Title className="sm:hidden mb-4" size="large">
        User Reviews
      </Title>
      <p className="text-muted-foreground italic mb-4 md:mb-6">
        GameHub does not verify whether reviewers have played or purchased the
        game they are reviewing.
      </p>
      {data ? (
        data.reviews.length > 0 ? (
          <>
            <ReviewsFilter />
            <Separator />
            <ul className="mb-4">
              {data.reviews.map((review) => (
                <ReviewsItem review={review} gameId={gameId} key={review.id} />
              ))}
            </ul>
            <Pagination
              isFetching={isFetching}
              onPaginateChange={(limit, offset) =>
                onPaginate({
                  limit,
                  offset,
                  params,
                  pathname,
                  router,
                })
              }
              isPreviousData={isPreviousData}
              hasMore={data.reviews.length === paginate.limit}
              limit={paginate.limit}
              limitValues={DEFAULT_LIMIT_VALUES}
              offset={paginate.offset}
              totalPages={
                data.count ? Math.ceil(data.count / paginate.limit) : 0
              }
            />
          </>
        ) : (
          <div className="my-4">
            <ReviewsFilter />
            <Separator />
            <Title>No reviews found</Title>
          </div>
        )
      ) : (
        <>
          <ul>
            {[...Array(5)].map((_, i) => (
              <ReviewsItemSkeleton key={i} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};
