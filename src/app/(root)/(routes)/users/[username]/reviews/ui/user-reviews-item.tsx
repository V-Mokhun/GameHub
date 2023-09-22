"use client";

import { UserReview } from "@shared/api";
import { useState } from "react";
import Image from "next/image";
import { Link, Skeleton, StarIcon, Subtitle, Title } from "@shared/ui";
import { GAMES_ROUTE, REVIEWS_ROUTE } from "@shared/consts";
import { format } from "date-fns";
import NextLink from "next/link";
import { cn } from "@shared/lib";
import { ReviewVotes } from "@entities/review";

interface UserReviewsItemProps {
  review: UserReview;
}

export const UserReviewsItemSkeleton = () => (
  <li className="flex items-start gap-2 border-b border-muted pb-2 mb-2">
    <Skeleton className="rounded-md overflow-hidden w-28 h-40 md:w-32 md:h-44 lg:w-40 lg:h-52 xl:w-48 xl:h-60 shrink-0" />
    <div className="flex-auto">
      <Skeleton className="h-8 w-[70%] mb-3" />
      <Skeleton className="h-6 w-24 mb-1" />
      <Skeleton className="h-9 w-[90%] mb-3" />
      <Skeleton className="h-6 w-full mb-1" />
      <Skeleton className="h-6 w-full mb-1" />
      <Skeleton className="h-6 w-[60%] mb-1" />
    </div>
  </li>
);

export const UserReviewsItem = ({ review }: UserReviewsItemProps) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const [showContent, setShowContent] = useState(() => !review.hasSpoiler);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <li className="sm:flex items-start gap-2 border-b border-muted pb-2 mb-2">
      <NextLink
        href={`${GAMES_ROUTE}/${review.gameId}`}
        className="float-left mr-2 sm:mr-0 sm:float-none relative rounded-md overflow-hidden w-28 h-40 md:w-32 md:h-44 lg:w-40 lg:h-52 xl:w-48 xl:h-60 shrink-0"
      >
        {review.game.coverUrl ? (
          <Image
            className="object-cover"
            src={review.game.coverUrl}
            fill
            sizes="(min-width: 768px) 128px, 112px"
            alt={review.game.name}
          />
        ) : (
          <div className="absolute w-full h-full bg-muted"></div>
        )}
      </NextLink>
      <div className="flex-auto">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Title size="small" className="mb-0 lg:mb-0">
            <Link href={`${GAMES_ROUTE}/${review.gameId}`}>
              {review.game.name}
              {review.game.releaseDate && (
                <span className="inline-block ml-1 text-muted-foreground font-normal text-lg lg:text-xl">
                  ( {format(new Date(review.game.releaseDate), "yyyy")} )
                </span>
              )}
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
        <time
          className="text-sm text-muted-foreground"
          dateTime={new Date(review.createdAt).toISOString()}
        >
          {format(new Date(review.createdAt), "MMMM dd, yyyy")}
        </time>
        <Title className="text-xl">
          <Link href={`${REVIEWS_ROUTE(String(review.gameId))}/${review.id}`}>
            {review.title}
          </Link>
        </Title>
        {showContent ? (
          <>
            {review.hasSpoiler && (
              <Subtitle className="text-destructive font-medium md:mb-3 mb-2">
                Warning: Spoilers
              </Subtitle>
            )}
            <p
              className={cn(
                "text-sm md:text-base",
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
          gameId={String(review.gameId)}
          reviewId={String(review.id)}
          reviewVotes={review.votes}
        />
      </div>
    </li>
  );
};
