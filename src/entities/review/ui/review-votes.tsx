"use client";

import { useAuth } from "@clerk/nextjs";
import { GameReviewVote, VoteType } from "@prisma/client";
import { gamesApi } from "@shared/api";
import { cn } from "@shared/lib";
import { useCustomToasts, usePrevious } from "@shared/lib/hooks";
import { Icon, useToast } from "@shared/ui";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";

interface ReviewVotesProps {
  gameId: string;
  reviewId: string;
  reviewVotes: GameReviewVote[];
  className?: string;
}

export const ReviewVotes = ({
  gameId,
  reviewId,
  reviewVotes,
  className,
}: ReviewVotesProps) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const { signInToast } = useCustomToasts();

  const [currentVote, setCurrentVote] = useState(
    () => reviewVotes.find((vote) => vote.userId === userId)?.type
  );
  const [votesAmount, setVotesAmount] = useState(() => {
    const positive = reviewVotes.filter(
      (votes) => votes.type === VoteType.UP
    ).length;

    return {
      positive,
      negative: reviewVotes.length - positive,
    };
  });
  const previousVote = usePrevious(currentVote);

  const { mutate: vote, isLoading } = useMutation(
    ["vote-review", { gameId, reviewId }],
    async (voteType: VoteType) => {
      await axios.post(`/api/game/${gameId}/reviews/${reviewId}/vote`, {
        voteType,
        userId,
      });
    },
    {
      onMutate: async (voteType) => {
        if (currentVote === voteType) {
          setCurrentVote(undefined);
          if (voteType === "UP")
            setVotesAmount((prev) => ({
              positive: prev.positive - 1,
              negative: prev.negative,
            }));
          else
            setVotesAmount((prev) => ({
              positive: prev.positive,
              negative: prev.negative - 1,
            }));
        } else {
          setCurrentVote(voteType);
          if (voteType === "UP")
            setVotesAmount((prev) => ({
              positive: prev.positive + 1,
              negative: prev.negative - (currentVote ? 1 : 0),
            }));
          else
            setVotesAmount((prev) => ({
              positive: prev.positive - (currentVote ? 1 : 0),
              negative: prev.negative + 1,
            }));
        }
      },
      onError(error, voteType) {
        if (voteType === VoteType.UP) {
          setVotesAmount((votes) => ({
            positive: votes.positive - 1,
            negative: votes.negative,
          }));
        } else {
          setVotesAmount((votes) => ({
            positive: votes.positive,
            negative: votes.negative - 1,
          }));
        }

        setCurrentVote(previousVote);

        return toast({
          title: "Something went wrong...",
          description: "Your vote was not registered. Please, try again",
          variant: "destructive",
        });
      },
    }
  );

  return (
    <div className={cn("flex items-center justify-end gap-4", className)}>
      <div className="flex items-center gap-1">
        <button
          className="disabled:opacity-50 disabled:pointer-events-none"
          disabled={isLoading}
          onClick={() => {
            if (!userId) return signInToast();

            vote(VoteType.UP);
          }}
          type="button"
        >
          <Icon
            name="ThumbsUp"
            className={cn(
              "transition-colors hover:text-success-hover",
              currentVote === VoteType.UP && "text-success"
            )}
          />
        </button>
        <span className="text-muted-foreground">{votesAmount.positive}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="disabled:opacity-50 disabled:pointer-events-none"
          disabled={isLoading}
          onClick={() => {
            if (!userId) return signInToast();

            vote(VoteType.DOWN);
          }}
          type="button"
        >
          <Icon
            name="ThumbsDown"
            className={cn(
              "transition-colors hover:text-destructive-hover",
              currentVote === VoteType.DOWN && "text-destructive"
            )}
          />
        </button>
        <span className="text-muted-foreground">{votesAmount.negative}</span>
      </div>
    </div>
  );
};
