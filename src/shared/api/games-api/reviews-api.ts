import { useAuth } from "@clerk/nextjs";
import { Game } from "@prisma/client";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DEFAULT_PAGINATE } from "./consts";
import {
  CreateOrEditReview,
  FullGameReview,
  ReviewSorts,
  SingleGameReview,
} from "./types";

export const useReviews = (
  gameId: string,
  sort: ReviewSorts,
  paginate = DEFAULT_PAGINATE
) => {
  return useQuery(
    ["reviews", { gameId, ...sort, ...paginate }],
    async () => {
      const { data } = await axios.post<{
        reviews: FullGameReview[];
        count: number;
      }>(`/api/game/${gameId}/reviews`, { sort, paginate });
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useReview = (gameId: string, reviewId: string) => {
  return useQuery(
    ["reviews", { gameId, reviewId }],
    async (): Promise<SingleGameReview> => {
      const { data } = await axios.get<FullGameReview & { game: Game }>(
        `/api/game/${gameId}/reviews/${reviewId}`
      );

      const updatedReview: SingleGameReview = {
        ...data,
        game: {
          ...data.game,
          themes: data.game.themes.split(",").map(Number),
          gameModes: data.game.gameModes.split(",").map(Number),
          genres: data.game.genres.split(",").map(Number),
        },
      };

      return updatedReview;
    }
  );
};

export const useCreateReview = (gameId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ["create-review", gameId],
    async ({ review, game }: { review: CreateOrEditReview; game: Game }) => {
      const { data } = await axios.post(`/api/game/${gameId}/reviews/new`, {
        review,
        game,
      });
      return data;
    },
    {
      onError: (error: unknown) => {
        return displayError(toast, error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews", { gameId }]);
        toast({
          title: "Review has been created successfully",
          variant: "success",
        });
      },
    }
  );
};

export const useEditReview = (gameId: string, reviewId?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ["edit-review", gameId, reviewId],
    async (review: CreateOrEditReview) => {
      const { data } = await axios.patch(
        `/api/game/${gameId}/reviews/${reviewId}/edit`,
        review
      );
      return data;
    },
    {
      onError: (error: unknown) => {
        return displayError(toast, error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews", { gameId }]);
        toast({
          title: "Review has been edited successfully",
          variant: "success",
        });
      },
    }
  );
};
