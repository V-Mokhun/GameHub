"use client";

import {
  DEFAULT_LIMIT_VALUES,
  onPaginate,
  retrievePaginateFromSearchParams,
  retrieveReviewFieldsFromSearchParams,
  userApi,
} from "@shared/api";
import { HOME_ROUTE } from "@shared/consts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserMenu } from "../../ui";
import { Separator, Skeleton, Title } from "@shared/ui";
import { ReviewsFilter } from "@widgets/filters";
import { Pagination } from "@widgets/pagination";
import { UserReviewsItem, UserReviewsItemSkeleton } from "./user-reviews-item";

interface UserReviewsProps {
  username: string;
}

export const UserReviews = ({ username }: UserReviewsProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const paginate = retrievePaginateFromSearchParams(params);
  const fields = retrieveReviewFieldsFromSearchParams(params);

  const {
    data: userData,
    isLoading: isUserLoading,
    isError,
  } = userApi.getUser(username);

  const {
    data: reviewsData,
    isFetching,
    isPreviousData,
  } = userApi.getReviews(username, fields, paginate);

  if (isError) {
    router.push(HOME_ROUTE);
  }

  return (
    <>
      <UserMenu
        isLoading={isUserLoading}
        username={username}
        includePrivateRoutes={userData?.libraryIncluded}
      />
      <Separator className="md:my-4 my-2" />

      {isUserLoading ? (
        <Skeleton className="w-36 h-9 mb-2 lg:mb-3" />
      ) : (
        <Title>
          {userData?.isOwnProfile ? "Your reviews" : `${username}'s reviews`}{" "}
        </Title>
      )}
      {reviewsData ? (
        reviewsData.reviews.length > 0 ? (
          <div className="my-4">
            <ReviewsFilter />
            <Separator />
            <ul className="mb-4">
              {reviewsData.reviews.map((review) => (
                <UserReviewsItem review={review} key={review.id} />
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
              hasMore={reviewsData.reviews.length === paginate.limit}
              limit={paginate.limit}
              limitValues={DEFAULT_LIMIT_VALUES}
              offset={paginate.offset}
              totalPages={
                reviewsData.count
                  ? Math.ceil(reviewsData.count / paginate.limit)
                  : 0
              }
            />
          </div>
        ) : (
          <div className="my-4">
            <ReviewsFilter />
            <Separator />
            <Title>No reviews found</Title>
          </div>
        )
      ) : (
        <>
          <ul className="my-4">
            {[...Array(5)].map((_, i) => (
              <UserReviewsItemSkeleton key={i} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};
