import { axiosInstance } from "@shared/config";
import { BROWSE_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DEFAULT_FILTERS, DEFAULT_PAGINATE, DEFAULT_SORT } from "./consts";
import {
  normalizeFullGameProperties,
  normalizeGameProperties,
  normalizeSearchGameProperties,
  stringifyGetGamesParams,
} from "./lib";
import {
  GameFilters,
  GameGenre,
  GameMode,
  GamePaginate,
  GameSorts,
  GameTheme,
} from "./types";

export type UseSearchGamesApiResponse = {
  id: number;
  cover?: {
    id: number;
    image_id: string;
  };
  first_release_date?: number;
  name: string;
  total_rating: number;
};

export type UseGamesApiResponse = UseSearchGamesApiResponse & {
  category: number;
  themes: number[];
  game_modes: number[];
  genres: number[];
};

type SimilarGameResponse = {
  id: number;
  cover?: {
    id: number;
    image_id: string;
  };
  first_release_date?: number;
  name: string;
  total_rating: number;
  total_rating_count: number;
};

export type UseGameApiResponse = {
  id: number;
  cover?: {
    id: number;
    image_id: string;
  };
  artworks?: {
    id: number;
    image_id: string;
  }[];
  videos?: {
    id: number;
    video_id: string;
  }[];
  first_release_date?: number;
  name: string;
  total_rating: number;
  category: number;
  themes: { id: number; name: string }[];
  genres: { id: number; name: string }[];
  game_modes: { id: number; name: string }[];
  summary?: string;
  storyline?: string;
  similar_games?: SimilarGameResponse[];
  dlcs?: SimilarGameResponse[];
  screenshots?: {
    id: number;
    image_id: string;
  }[];
  involved_companies?: {
    id: number;
    company: {
      id: number;
      logo: {
        id: number;
        image_id: string;
      };
    };
  }[];
  franchises?: [
    {
      id: number;
      games: SimilarGameResponse[];
    }
  ];
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

      return data.map((game) => normalizeGameProperties(game));
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

export const useSearchGames = (search: string) => {
  const { toast } = useToast();

  return useQuery(
    ["search_games", { search }],
    async () => {
      if (!search.trim()) return [];

      const body = `search "${search.toLowerCase()}"; fields name, first_release_date, total_rating, cover.image_id; where total_rating_count >= 10; limit 5;`;
      const { data } = await axiosInstance.post<UseSearchGamesApiResponse[]>(
        "/games",
        body
      );

      return data.map((game) => normalizeSearchGameProperties(game));
    },
    {
      onError: (error) => {
        return displayError(toast, error);
      },
      refetchOnWindowFocus: false,
      enabled: false,
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

export const useGame = (id: string) => {
  const { toast } = useToast();
  const router = useRouter();

  return useQuery(
    ["game", { id }],
    async () => {
      const similarGamesFields = `similar_games.name, similar_games.cover.image_id, similar_games.first_release_date, similar_games.total_rating, similar_games.total_rating_count`;
      const dlcsFields = `dlcs.name, dlcs.cover.image_id, dlcs.first_release_date, dlcs.total_rating`;
      const collectionsFields = `franchises.games.name, franchises.games.cover.image_id, franchises.games.first_release_date, franchises.games.total_rating, franchises.games.total_rating_count`;

      const fields = `fields id, name, cover.image_id, first_release_date, total_rating, artworks.image_id, category, themes.name, game_modes.name, genres.name, screenshots.image_id, storyline, summary, videos.*, involved_companies.company.logo.image_id, ${similarGamesFields}, ${dlcsFields}, ${collectionsFields}`;
      const body = `${fields}; where id = ${id};`;
      const { data } = await axiosInstance.post<[UseGameApiResponse]>(
        "/games",
        body
      );

      return normalizeFullGameProperties(data[0]);
    },
    {
      onError: (error) => {
        displayError(toast, error);
        router.push(BROWSE_ROUTE);
      },
    }
  );
};

export const gamesApi = {
  getGames: useGames,
  getGamesCount: useGamesCount,
  getSearchGames: useSearchGames,
  getGenres: useGenres,
  getThemes: useThemes,
  getModes: useModes,
  getGame: useGame,
};
