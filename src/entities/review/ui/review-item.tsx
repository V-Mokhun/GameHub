"use client";

import { FullGameReview } from "@shared/api";
import { PROFILE_ROUTE, REVIEWS_ROUTE } from "@shared/consts";
import { cn, formatTimeToNow } from "@shared/lib";
import {
  Avatar,
  AvatarImage,
  Button,
  Link,
  Skeleton,
  StarIcon,
  Subtitle,
  Title,
} from "@shared/ui";
import NextLink from "next/link";
import { useState } from "react";
import { ReviewVotes } from "./review-votes";

interface ReviewsItemProps {
  gameId: string;
  review: FullGameReview;
}

export const ReviewsItemSkeleton = () => {
  return (
    <li className="flex gap-2 sm:gap-4 flex-col sm:flex-row justify-between items-start border-b border-muted pb-2 mb-2">
      <div className="flex sm:flex-[0_1_20%] gap-2 items-center">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="flex flex-col">
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="flex-auto">
        <Skeleton className="h-7 md:h-8 w-48 mb-3" />
        <Skeleton className="h-6 w-72 mb-1" />
        <Skeleton className="h-6 w-48" />
      </div>
    </li>
  );
};

export const ReviewsItem = ({ review, gameId }: ReviewsItemProps) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const [showContent, setShowContent] = useState(() => !review.hasSpoiler);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <li className="flex gap-2 sm:gap-4 flex-col sm:flex-row justify-between items-start border-b border-muted pb-2 mb-2">
      <div className="flex sm:flex-[0_0_20%] sm:w-[20%] sm:min-w-[140px] gap-2 items-center">
        <NextLink href={PROFILE_ROUTE(review.user.username)}>
          <Avatar>
            <AvatarImage
              src={review.user.imageUrl}
              alt={review.user.username}
            />
          </Avatar>
        </NextLink>
        <div className="flex flex-col truncate">
          <Link
            className="text-secondary hover:text-secondary-hover"
            href={PROFILE_ROUTE(review.user.username)}
          >
            {review.user.username}
          </Link>
          <time
            className="text-muted-foreground text-sm"
            dateTime={new Date(review.createdAt).toISOString()}
          >
            {formatTimeToNow(new Date(review.createdAt))}
          </time>
        </div>
      </div>
      <div className="flex-auto">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Title size="small" className="mb-0 lg:mb-0">
            <Link
              className="break-all"
              href={`${REVIEWS_ROUTE(gameId)}/${review.id}`}
            >
              {review.title}
            </Link>
          </Title>
          <div className="flex items-center gap-1">
            <StarIcon strokeColor="transparent" className="w-5 h-5" />
            <div className="flex items-end">
              <span>{review.rating}</span>
              <span className="text-muted-foreground text-sm">/10</span>
            </div>
          </div>
        </div>
        {showContent ? (
          <>
            {review.hasSpoiler && (
              <Subtitle className="text-destructive font-medium md:mb-3 mb-2">
                Warning: Spoilers
              </Subtitle>
            )}
            <p
              className={cn(
                "text-sm md:text-base break-all",
                !isReadMore && "whitespace-pre-wrap"
              )}
            >
              {isReadMore ? review.body.slice(0, 300) : review.body + " "}
              {review.body.length > 300 && (
                <button
                  type="button"
                  onClick={toggleReadMore}
                  className="text-muted-foreground hover:text-muted-foreground/70 transition-colors"
                >
                  {isReadMore ? "...Read More" : "Show Less"}
                </button>
              )}
            </p>
          </>
        ) : (
          <>
            <Subtitle
              size="large"
              className="text-destructive font-medium md:mb-3 mb-2"
            >
              Warning: Spoilers
            </Subtitle>
            <button
              className="text-secondary hover:text-secondary-hover transition-colors"
              onClick={() => setShowContent(true)}
            >
              Show Review
            </button>
          </>
        )}
        <ReviewVotes
          className="mt-2"
          gameId={gameId}
          reviewId={String(review.id)}
          reviewVotes={review.votes}
        />
      </div>
    </li>
  );
};
