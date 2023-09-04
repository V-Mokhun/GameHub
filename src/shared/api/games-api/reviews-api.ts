import { Game, GameReview } from "@prisma/client";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CreateOrUpdateReview, FullGameReview } from "./types";

export const useReviews = (gameId: string) => {
  return useQuery(["reviews", gameId], async () => {
    const { data } = await axios.post<FullGameReview[]>(
      `/game/${gameId}/reviews`
    );
    return data;
  });
};

export const useCreateReview = (gameId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    ["create-review", gameId],
    async ({ review, game }: { review: CreateOrUpdateReview; game: Game }) => {
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
        queryClient.invalidateQueries(["reviews", gameId]);
        toast({
          title: "Review has been created successfully",
          variant: "success",
        });
      },
    }
  );
};
