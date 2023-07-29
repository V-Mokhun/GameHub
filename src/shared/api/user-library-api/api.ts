import { Game as LibraryGame } from "@prisma/client";
import { HOME_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DEFAULT_PAGINATE, GamePaginate } from "../games-api";
import { DEFAULT_LIBRARY_FILTERS, DEFAULT_LIBRARY_SORT } from "./consts";
import { normalizeLibraryGameProperties } from "./lib";
import {
  LibraryGameFilters,
  LibraryGameSorts,
  NormalizedLibraryGame,
} from "./types";

type UseLibraryApiResponse = {
  library: LibraryGame[];
  count: number;
  isPrivateLibrary: boolean;
  isOwnProfile: boolean;
};

const useLibrary = (
  username?: string,
  enabled = true,
  params: {
    filters?: LibraryGameFilters;
    sort?: LibraryGameSorts;
    paginate?: GamePaginate;
  } = {
    filters: DEFAULT_LIBRARY_FILTERS,
    sort: DEFAULT_LIBRARY_SORT,
    paginate: DEFAULT_PAGINATE,
  }
) => {
  const router = useRouter();
  const { toast } = useToast();

  if (!params.filters) params.filters = DEFAULT_LIBRARY_FILTERS;
  if (!params.sort) params.sort = DEFAULT_LIBRARY_SORT;
  if (!params.paginate) params.paginate = DEFAULT_PAGINATE;

  const page = Math.floor(params.paginate.offset / params.paginate.limit) + 1;

  return useQuery(
    [`library`, { username, page, params }],
    async () => {
      const { data } = await axios.post<UseLibraryApiResponse>(
        `/api/user/${username}/library`,
        params
      );

      return {
        count: data.count,
        library: data.library.map(
          normalizeLibraryGameProperties
        ) as NormalizedLibraryGame[],
        isPrivateLibrary: data.isPrivateLibrary,
        isOwnProfile: data.isOwnProfile,
      };
    },
    {
      onError: (error) => {
        displayError(toast, error);
        router.push(HOME_ROUTE);
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      enabled: !!username && enabled,
    }
  );
};

const useAddGameToLibrary = (username: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  let params: {
    filters?: LibraryGameFilters;
    sort?: LibraryGameSorts;
    paginate?: GamePaginate;
  };

  return useMutation(
    async (options: {
      game: LibraryGame;
      params: {
        filters?: LibraryGameFilters;
        sort?: LibraryGameSorts;
        paginate?: GamePaginate;
      };
    }) => {
      const { game } = options;

      const { data } = await axios.post<LibraryGame>(
        `/api/user/library/${game.id}`,
        game
      );

      return normalizeLibraryGameProperties(data);
    },
    {
      onMutate: async ({ game: newGame, params: optParams }) => {
        params = optParams;

        if (!params.filters) params.filters = DEFAULT_LIBRARY_FILTERS;
        if (!params.sort) params.sort = DEFAULT_LIBRARY_SORT;
        if (!params.paginate) params.paginate = DEFAULT_PAGINATE;

        const page =
          Math.floor(params.paginate.offset / params.paginate.limit) + 1;

        await queryClient.cancelQueries({
          queryKey: ["library", { username, page, params }],
        });

        const previousLibrary = queryClient.getQueryData([
          "library",
          { username, page, params },
        ]);

        queryClient.setQueryData(
          ["library", { username, page, params }],
          (
            oldLibrary:
              | (Omit<UseLibraryApiResponse, "library"> & {
                  library: NormalizedLibraryGame[];
                })
              | undefined
          ) => {
            return {
              count: oldLibrary?.count || 0,
              isOwnProfile: oldLibrary?.isOwnProfile || false,
              isPrivateLibrary: oldLibrary?.isPrivateLibrary || false,
              library: [
                ...(oldLibrary?.library || []).filter(
                  (game) => game.id !== newGame.id
                ),
                normalizeLibraryGameProperties(newGame),
              ],
            };
          }
        );

        return { previousLibrary };
      },
      onError: (err, { params: optParams }, context) => {
        params = optParams;

        if (!params.filters) params.filters = DEFAULT_LIBRARY_FILTERS;
        if (!params.sort) params.sort = DEFAULT_LIBRARY_SORT;
        if (!params.paginate) params.paginate = DEFAULT_PAGINATE;

        const page =
          Math.floor(params.paginate.offset / params.paginate.limit) + 1;

        queryClient.setQueryData(
          ["library", { username, page, params }],
          context?.previousLibrary
        );
        displayError(toast, err, "Failed to add game from library");
      },
      onSettled: () => {
        if (!params) params = {};

        if (!params.filters) params.filters = DEFAULT_LIBRARY_FILTERS;
        if (!params.sort) params.sort = DEFAULT_LIBRARY_SORT;
        if (!params.paginate) params.paginate = DEFAULT_PAGINATE;

        const page =
          Math.floor(params.paginate.offset / params.paginate.limit) + 1;

        queryClient.invalidateQueries({
          queryKey: ["library", { username, page, params }],
        });
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
