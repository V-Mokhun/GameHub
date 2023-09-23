import { axiosInstance } from "@shared/config";
import { BROWSE_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  DEFAULT_FILTERS,
  DEFAULT_PAGINATE,
  DEFAULT_SORT,
  GET_GAMES_FIELDS,
} from "./consts";
import {
  createGamesFileds,
  normalizeFullGameProperties,
  normalizeGameProperties,
  normalizeSearchGameProperties,
  stringifyGetGamesParams,
} from "./lib";
import {
  GameFilters,
  GameGenre,
  GameMode,
  GameSorts,
  GameTheme,
  Paginate,
} from "./types";
import {
  useCreateReview,
  useEditReview,
  useReview,
  useReviews,
} from "./reviews-api";

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
    name: string;
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
  similar_games?: (UseGamesApiResponse & { total_rating_count: number })[];
  dlcs?: (UseGamesApiResponse & { total_rating_count: number })[];
  expansions?: (UseGamesApiResponse & { total_rating_count: number })[];
  remakes?: (UseGamesApiResponse & { total_rating_count: number })[];
  remasters?: (UseGamesApiResponse & { total_rating_count: number })[];
  screenshots?: {
    id: number;
    image_id: string;
  }[];
  involved_companies?: {
    id: number;
    company: {
      id: number;
      name: string;
      logo: {
        id: number;
        image_id: string;
      };
    };
  }[];
  websites?: {
    category: number;
    url: string;
  }[];
  franchise?: {
    id: number;
    games: (UseGamesApiResponse & { total_rating_count: number })[];
  };
  collection?: {
    id: number;
    games: (UseGamesApiResponse & { total_rating_count: number })[];
  };
  parent_game?: {
    id: number;
    name: string;
  };
  aggregated_rating?: number;
};

export const useGames = (
  params: {
    filters?: GameFilters;
    sort?: GameSorts;
    paginate?: Paginate;
  } = {
    filters: DEFAULT_FILTERS,
    sort: DEFAULT_SORT,
    paginate: DEFAULT_PAGINATE,
  }
) => {
  const { toast } = useToast();

  if (!params.filters) params.filters = DEFAULT_FILTERS;
  if (!params.sort) params.sort = DEFAULT_SORT;
  if (!params.paginate) params.paginate = DEFAULT_PAGINATE;

  const page = Math.floor(params.paginate.offset / params.paginate.limit) + 1;

  return useQuery(
    ["browse_games", { page, params }],
    async () => {
      const body = stringifyGetGamesParams(
        params as {
          filters: GameFilters;
          sort: GameSorts;
          paginate: Paginate;
        }
      );
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

export const usePopularGames = () => {
  const { toast } = useToast();
  const year = new Date().getFullYear();
  const secondsInYear = 315_360_00;
  const yearDiff = year - 1970;
  const secondsThisYear = yearDiff * secondsInYear;
  const secondsNow = Math.floor(Date.now() / 1000);

  return useQuery(
    ["popular_games"],
    async () => {
      const body = `${GET_GAMES_FIELDS}; where total_rating_count >= 10 & first_release_date >= ${secondsThisYear} & first_release_date <= ${secondsNow}; sort total_rating desc; limit 10;`;
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
      refetchOnWindowFocus: false,
    }
  );
};

export const useGamesCount = (
  params: {
    filters: GameFilters;
    sort: GameSorts;
    paginate: Paginate;
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
      const similarGamesFields = createGamesFileds("similar_games");
      const dlcsFields = createGamesFileds("dlcs");
      const franchiseFields = createGamesFileds("franchise.games");
      const parentFields = `parent_game.id, parent_game.name`;
      const collectionFields = createGamesFileds("collection.games");
      const expansionFields = createGamesFileds("expansions");
      const remakesFields = createGamesFileds("remakes");
      const remastersFields = createGamesFileds("remasters");

      const fields = `fields id, name, cover.image_id, first_release_date, total_rating, aggregated_rating, artworks.image_id, category, themes.name, game_modes.name, genres.name, screenshots.image_id, storyline, summary, videos.*, involved_companies.company.name, involved_companies.company.logo.image_id, websites.category, websites.url, ${similarGamesFields}, ${dlcsFields}, ${franchiseFields}, ${parentFields}, ${collectionFields}, ${expansionFields}, ${remakesFields}, ${remastersFields}`;
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

export const useGamesFromSteam = (appIds: number[]) => {
  return useQuery(["steam-games", { appIds }], async () => {
    const url = `https://store.steampowered.com/app`;
    const websiteUrls = appIds.map((appId) => `'${url}/${appId}'`);
    const { data } = await axiosInstance.post<UseGamesApiResponse[]>(
      "/games",
      `${GET_GAMES_FIELDS}; where websites.url = (${websiteUrls.join(
        ","
      )}) & category = 0 & total_rating_count >= 10;`
    );

    return data;
  });
};

export const gamesApi = {
  getGames: useGames,
  getPopularGames: usePopularGames,
  getGamesCount: useGamesCount,
  getSearchGames: useSearchGames,
  getGenres: useGenres,
  getThemes: useThemes,
  getModes: useModes,
  getGame: useGame,

  getReviews: useReviews,
  getReview: useReview,
  createReview: useCreateReview,
  editReview: useEditReview,
};
