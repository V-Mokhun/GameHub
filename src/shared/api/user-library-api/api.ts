import { Game as LibraryGame } from "@prisma/client";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { normalizeLibraryGameProperties } from "./lib";
import { useRouter } from "next/navigation";
import { HOME_ROUTE } from "@shared/consts";
import { NormalizedLibraryGame } from "./types";

const useLibrary = (username?: string) => {
  const router = useRouter();
  const { toast } = useToast();

  return useQuery(
    [`library`, username],
    async () => {
      const { data } = await axios.get<LibraryGame[]>(
        `/api/user/${username}/library`
      );

      return data.map(
        normalizeLibraryGameProperties
      ) as NormalizedLibraryGame[];
    },
    {
      onError: (error) => {
        displayError(toast, error);
        router.push(HOME_ROUTE);
      },
      enabled: !!username,
    }
  );
};

const useAddGameToLibrary = (username: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    async (game: LibraryGame) => {
      const { data } = await axios.post<LibraryGame>(
        `/api/user/library/${game.id}`,
        game
      );

      return normalizeLibraryGameProperties(data);
    },
    {
      onMutate: async (newGame) => {
        await queryClient.cancelQueries({ queryKey: ["library", username] });
        const previousLibrary = queryClient.getQueryData(["library", username]);
        queryClient.setQueryData(
          ["library", username],
          (oldLibrary: NormalizedLibraryGame[] = []) => [
            ...oldLibrary.filter((game) => game.id !== newGame.id),
            normalizeLibraryGameProperties(newGame),
          ]
        );

        return { previousLibrary };
      },
      onError: (err, newGame, context) => {
        queryClient.setQueryData(
          ["library", username],
          context?.previousLibrary
        );
        displayError(toast, err, "Failed to add game from library");
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["library", username] });
      },
      onSuccess: () => {
        toast({ title: "Game was saved to your library", variant: "success" });
        if (onSuccess) onSuccess();
      },
    }
  );
};

const useRemoveGameFromLibrary = (username: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    async (gameId) => {
      const { data } = await axios.delete<LibraryGame>(
        `/api/user/library/${gameId}`
      );

      return data.id;
    },
    {
      onMutate: async (deletedGameId: number) => {
        await queryClient.cancelQueries({ queryKey: ["library", username] });
        const previousLibrary = queryClient.getQueryData(["library", username]);
        queryClient.setQueryData(
          ["library", username],
          (oldLibrary: NormalizedLibraryGame[] = []) =>
            oldLibrary.filter((game) => game.id !== deletedGameId)
        );
        return { previousLibrary };
      },
      onError: (err, deletedGameId, context) => {
        queryClient.setQueryData(
          ["library", username],
          context?.previousLibrary
        );
        displayError(toast, err, "Failed to remove game from library");
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["library", username] });
      },
      onSuccess: () => {
        toast({
          title: "Game was removed from your library",
          variant: "success",
        });
        if (onSuccess) onSuccess();
      },
    }
  );
};

export const userLibraryApi = {
  getLibrary: useLibrary,
  removeGame: useRemoveGameFromLibrary,
  addGame: useAddGameToLibrary,
};
