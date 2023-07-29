import { axiosInstance } from "@shared/config";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_FILTERS, DEFAULT_PAGINATE, DEFAULT_SORT } from "./consts";
import { normalizeGameProperties, stringifyGetGamesParams } from "./lib";
import {
  GameFilters,
  GameGenre,
  GameMode,
  GamePaginate,
  GameSorts,
  GameTheme,
} from "./types";

export type UseGamesApiResponse = {
  id: number;
  cover?: {
    id: number;
    image_id: string;
    width?: number;
    height?: number;
  };
  first_release_date?: number;
  name: string;
  total_rating: number;
  category: number;
  themes: number[];
  game_modes: number[];
  genres: number[];
};

export const useGames = (
  params: {
    filters: GameFilters;
    sort: GameSorts;
    paginate: GamePaginate;
  } = {
    filters: DEFAULT_FILTERS,
    sort: DEFAULT_SORT,
    paginate: DEFAULT_PAGINATE,
  }
) => {
  const { toast } = useToast();
  const page = Math.floor(params.paginate.offset / params.paginate.limit) + 1;

  return useQuery(
    ["browse_games", { page, params }],
    async () => {
      const body = stringifyGetGamesParams(params);
      const { data } = await axiosInstance.post<UseGamesApiResponse[]>(
        "/games",
        body
      );

      return data.map(normalizeGameProperties);
    },
    {
      onError: (error) => {
        return displayError(toast, error);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGamesCount = (
  params: {
    filters: GameFilters;
    sort: GameSorts;
    paginate: GamePaginate;
  } = {
    filters: DEFAULT_FILTERS,
    sort: DEFAULT_SORT,
    paginate: DEFAULT_PAGINATE,
  }
) => {
  const { toast } = useToast();

  return useQuery(
    ["browse_games_count", { params }],
    async () => {
      const body = stringifyGetGamesParams(params);
      const { data } = await axiosInstance.post<{ count: number }>(
        "/games/count",
        body
      );

      return data.count;
    },
    {
      onError: (error) => {
        return displayError(toast, error);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGenres = () => {
  const { toast } = useToast();

  return useQuery(
    ["genres"],
    async () => {
      const { data } = await axiosInstance.post<GameGenre[]>(
        "/genres",
        `fields id, name, slug; limit 50;`
      );
      return data;
    },
    {
      onError: (error) => {
        return displayError(toast, error);
      },
    }
  );
};

export const useThemes = () => {
  const { toast } = useToast();

  return useQuery(
    ["themes"],
    async () => {
      const { data } = await axiosInstance.post<GameTheme[]>(
        "/themes",
        `fields id, name, slug; limit 50;`
      );
      return data;
    },
    {
      onError: (error) => {
        return displayError(toast, error);
      },
    }
  );
};

export const useModes = () => {
  const { toast } = useToast();

  return useQuery(
    ["modes"],
    async () => {
      const { data } = await axiosInstance.post<GameMode[]>(
        "/game_modes",
        `fields id, name, slug; limit 50;`
      );
      return data;
    },
    {
      onError: (error) => {
        return displayError(toast, error);
      },
    }
  );
};

export const gamesApi = {
  getGames: useGames,
  getGamesCount: useGamesCount,
  getGenres: useGenres,
  getThemes: useThemes,
  getModes: useModes,
};
