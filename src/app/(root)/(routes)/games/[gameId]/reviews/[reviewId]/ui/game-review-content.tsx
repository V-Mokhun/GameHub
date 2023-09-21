"use client";

import { ReviewVotes } from "@entities/review";
import { SingleGameReview } from "@shared/api";
import { PROFILE_ROUTE, REVIEWS_ROUTE } from "@shared/consts";
import { formatTimeToNow } from "@shared/lib";
import {
  Avatar,
  AvatarImage,
  Button,
  Icon,
  Skeleton,
  StarIcon,
  Subtitle,
  Title,
  buttonVariants,
} from "@shared/ui";
import { AlertModal } from "@shared/ui/modal";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

interface GameReviewContentProps {
  review: SingleGameReview;
  authUserId: string | null;
}

export const GameReviewContentSkeleton = () => (
  <>
    <div className="flex items-center gap-2 mb-4">
      <Skeleton className="w-10 h-10 shrink-0 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
    <Skeleton className="h-8 w-52 mb-4" />
    <div>
      <Skeleton className="h-6 w-[90%] mb-1" />
      <Skeleton className="h-6 w-[90%] mb-1" />
      <Skeleton className="h-6 w-[70%] mb-1" />
      <Skeleton className="h-6 w-1/2 mb-1" />
    </div>
  </>
);

export const GameReviewContent = ({
  review,
  authUserId,
}: GameReviewContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContent, setShowContent] = useState(() => review.hasSpoiler);

  const deleteReview = async () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteReview}
      />
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Link href={PROFILE_ROUTE(review.user.username)}>
            <Avatar>
              <AvatarImage src={review.user.imageUrl} />
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link
              className="text-secondary hover:text-secondary-hover transition-colors"
              href={PROFILE_ROUTE(review.user.username)}
            >
              {review.user.username}
            </Link>
            <time
              className="text-sm text-muted-foreground"
              dateTime={new Date(review.createdAt).toISOString()}
            >
              {format(new Date(review.createdAt), "MMMM dd, yyyy")}
            </time>
          </div>
        </div>
        {authUserId === review.user.id && (
          <div className="flex gap-2 items-center">
            <Link
              href={`${REVIEWS_ROUTE(String(review.gameId))}/${review.id}/edit`}
              className={buttonVariants({
                variant: "secondary",
                size: "icon",
              })}
            >
              <Icon name="Edit" className="text-white" />
            </Link>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="destructive"
              size={"icon"}
            >
              <Icon name="X" className="text-white" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-start gap-2 justify-between">
        <Title>{review.title}</Title>
        <div className="flex items-center gap-1">
          <StarIcon strokeColor="transparent" className="w-5 h-5" />
          <div className="flex items-end">
            <span>{review.rating}</span>
            <span className="text-muted-foreground text-sm">/10</span>
          </div>
        </div>
      </div>
      {showContent ? (
        <div className="whitespace-pre-wrap text-sm md:text-base">
          {review.body}
        </div>
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
        className="justify-start mt-4"
        gameId={String(review.gameId)}
        reviewId={String(review.id)}
        reviewVotes={review.votes}
      />
    </>
  );
};
