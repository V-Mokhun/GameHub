"use client";

import {
  GAMES_LIMIT_VALUES,
  gamesApi,
  onPaginate,
  retrievePaginateFromSearchParams,
  retrieveReviewFieldsFromSearchParams,
} from "@shared/api";
import { ReviewsGame } from "./reviews-game";
import { ReviewsItem } from "./reviews-item";
import { ReviewsFilter } from "./reviews-filter";
import { Separator } from "@shared/ui";
import { Pagination } from "@widgets/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  if (!data) return null;

  return (
    <>
      <ReviewsGame gameId={gameId} />
      <p className="text-muted-foreground italic">
        GameHub does not verify whether reviewers have played or purchased the
        game they are reviewing.
      </p>
      <ReviewsFilter />
      <Separator />
      <ul>
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
        limitValues={GAMES_LIMIT_VALUES}
        offset={paginate.offset}
        totalPages={data.count ? Math.ceil(data.count / paginate.limit) : 0}
      />
    </>
  );
};
