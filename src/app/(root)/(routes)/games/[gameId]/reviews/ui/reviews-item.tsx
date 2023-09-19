"use client";

import { Avatar, AvatarImage, Link, StarIcon, Title } from "@shared/ui";
import NextLink from "next/link";
import { PROFILE_ROUTE, REVIEWS_ROUTE } from "@shared/consts";
import { formatTimeToNow } from "@shared/lib";
import { FullGameReview } from "@shared/api";
import { useState } from "react";

interface ReviewsItemProps {
  gameId: string;
  review: FullGameReview;
}

export const ReviewsItem = ({ review, gameId }: ReviewsItemProps) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <li className="flex gap-4 justify-between items-start border-b border-muted pb-2 mb-2">
      <div className="flex flex-[0_1_20%] gap-2 items-center">
        <NextLink href={PROFILE_ROUTE(review.user.username)}>
          <Avatar>
            <AvatarImage
              src={review.user.imageUrl}
              alt={review.user.username}
            />
          </Avatar>
        </NextLink>
        <div className="flex flex-col">
          <Link href={PROFILE_ROUTE(review.user.username)}>
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
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Title size="small" className="mb-0 lg:mb-0">
            <Link href={`${REVIEWS_ROUTE(gameId)}/${review.id}`}>
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
        <p>
          {isReadMore ? review.body.slice(0, 200) : review.body + " "}
          {review.body.length > 200 && (
            <button
              type="button"
              onClick={toggleReadMore}
              className="text-muted-foreground hover:text-muted-foreground/70 transition-colors"
            >
              {isReadMore ? "...Read More" : "Show Less"}
            </button>
          )}
        </p>
      </div>
    </li>
  );
};
