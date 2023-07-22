import { axiosInstance } from "@shared/config";
import { useQuery } from "@tanstack/react-query";
import { GAMES_LIMIT, MAX_RATING, MIN_RATING } from "./consts";
import {
  GameFilters,
  GameGenre,
  GameMode,
  GamePaginate,
  GameSorts,
  GameTheme,
  SortFields,
  SortFieldsOrder,
} from "./types";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";

export const useGames = (
  filters: GameFilters = {
    name: "",
    categories: [],
    genres: [],
    themes: [],
    ratingMin: MIN_RATING,
    ratingMax: MAX_RATING,
  },
  sort: GameSorts = {
    field: SortFields.RATING,
    order: SortFieldsOrder.DESC,
  },
  paginate: GamePaginate = {
    limit: GAMES_LIMIT,
    offset: 0,
  }
) => {
  const { toast } = useToast();

  useQuery(
    ["browse_games", { filters, sort, paginate }],
    async () => {
      // const { data } = await axiosInstance.post("/games", ``, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
    },
    {
      onError: (error) => {
        return displayError(toast, error);
      },
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
  getGenres: useGenres,
  getThemes: useThemes,
  getModes: useModes,
};
