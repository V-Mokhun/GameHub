import { ReadonlyURLSearchParams } from "next/navigation";
import {
  DEFAULT_FILTERS,
  DEFAULT_PAGINATE,
  DEFAULT_SORT,
  GET_GAMES_FIELDS,
  DEFAULT_REVIEW_SORT,
} from ".";
import {
  UseGameApiResponse,
  UseGamesApiResponse,
  UseSearchGamesApiResponse,
} from "./api";
import {
  FullGame,
  Game,
  GameCategories,
  GameFilters,
  GameSorts,
  GameWebsites,
  ImageTypes,
  Paginate,
  ReviewSortFields,
  SearchGame,
  SortFields,
  SortFieldsOrder,
} from "./types";

export const getImageUrl = (
  imageId: string,
  imageType: ImageTypes = ImageTypes.BIG_COVER
) => {
  return `${process.env.NEXT_PUBLIC_GAMES_IMAGES_URL}/t_${imageType}/${imageId}.jpg`;
};

export const normalizeSearchGameProperties = (
  game: UseSearchGamesApiResponse,
  imageType: ImageTypes = ImageTypes.SMALL_COVER
): SearchGame => {
  return {
    id: game.id,
    name: game.name,
    rating: Math.ceil(game.total_rating),
    cover: game.cover?.image_id
      ? getImageUrl(game?.cover?.image_id, imageType)
      : "",
    releaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000)
      : undefined,
  };
};

export const normalizeGameProperties = <T extends UseGamesApiResponse>(
  game: T,
  imageType: ImageTypes = ImageTypes.BIG_COVER
): Game => {
  return {
    id: game.id,
    name: game.name,
    rating: Math.ceil(game.total_rating),
    cover: game.cover?.image_id
      ? getImageUrl(game?.cover?.image_id, imageType)
      : "",
    releaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000)
      : undefined,
    category: game.category,
    themes: game.themes,
    gameModes: game.game_modes,
    genres: game.genres,
  };
};

export const normalizeFullGameProperties = (
  gameData: UseGameApiResponse
): FullGame => {
  const logosArr =
    gameData.involved_companies
      ?.filter(({ company }) => company?.logo?.image_id)
      ?.map(({ company }) => ({
        name: company.name,
        url: getImageUrl(company.logo.image_id, ImageTypes.MEDIUM_LOGO),
      })) || [];
  const logos: typeof logosArr = [];
  for (const logo of logosArr) {
    if (!logos.find((l) => l.name === logo.name)) logos.push(logo);
  }
  const websitesCategories = Object.values(GameWebsites).filter(Number);

  return {
    id: gameData.id,
    name: gameData.name,
    rating: Math.ceil(gameData.total_rating),
    criticsRating:
      gameData.aggregated_rating && Math.ceil(gameData.aggregated_rating),
    cover: gameData.cover?.image_id
      ? getImageUrl(gameData?.cover?.image_id, ImageTypes["1080P"])
      : "",
    releaseDate: gameData.first_release_date
      ? new Date(gameData.first_release_date * 1000)
      : undefined,
    category: gameData.category,
    gameModes: gameData.game_modes || [],
    genres: gameData.genres || [],
    themes: gameData.themes || [],
    storyline: gameData.storyline,
    summary: gameData.summary,
    websites: gameData.websites?.filter((website) =>
      websitesCategories.includes(website.category)
    ),
    artworks:
      gameData.artworks?.map((artwork) =>
        getImageUrl(artwork.image_id, ImageTypes["1080P"])
      ) || [],
    screenshots:
      gameData.screenshots?.map((screenshot) =>
        getImageUrl(screenshot.image_id, ImageTypes.BIG_SCREENSHOT)
      ) || [],
    videos:
      gameData.videos?.map((video) => ({
        url: video.video_id,
        name: video.name,
      })) || [],
    companyLogos: logos,
    similarGames:
      gameData.similar_games
        ?.filter((game) => game.total_rating_count >= 10)
        .map((game) => normalizeGameProperties(game), ImageTypes.BIG_COVER) ||
      [],
    franchise: gameData.franchise
      ? gameData.franchise.games
          .filter(
            (game) =>
              game.total_rating_count >= 10 &&
              (game.category === GameCategories.MAIN_GAME ||
                game.category === GameCategories.REMAKE ||
                game.category === GameCategories.REMASTER)
          )
          .map((game) => normalizeGameProperties(game, ImageTypes.BIG_COVER))
          .sort(
            (a, b) =>
              (a.releaseDate?.getTime() ?? 0) - (b.releaseDate?.getTime() ?? 0)
          )
      : [],
    collection: gameData.collection
      ? gameData.collection.games
          .filter(
            (game) =>
              game.total_rating_count >= 10 &&
              (game.category === GameCategories.MAIN_GAME ||
                game.category === GameCategories.REMAKE ||
                game.category === GameCategories.REMASTER)
          )
          .map((game) => normalizeGameProperties(game, ImageTypes.BIG_COVER))
          .sort(
            (a, b) =>
              (a.releaseDate?.getTime() ?? 0) - (b.releaseDate?.getTime() ?? 0)
          )
      : [],
    dlcs:
      gameData.dlcs
        ?.filter((game) => game.total_rating_count >= 1)
        .map((game) => normalizeGameProperties(game, ImageTypes.BIG_COVER)) ||
      [],
    expansions:
      gameData.expansions
        ?.filter((game) => game.total_rating_count >= 1)
        .map((game) => normalizeGameProperties(game, ImageTypes.BIG_COVER)) ||
      [],
    remakes:
      gameData.remakes
        ?.filter((game) => game.total_rating_count >= 1)
        .map((game) => normalizeGameProperties(game, ImageTypes.BIG_COVER)) ||
      [],
    remasters:
      gameData.remasters
        ?.filter((game) => game.total_rating_count >= 1)
        .map((game) => normalizeGameProperties(game, ImageTypes.BIG_COVER)) ||
      [],
    parent: gameData.parent_game,
  };
};

export const retrieveFiltersFromSearchParams = (
  params: ReadonlyURLSearchParams
): { filters: GameFilters; isDefault: boolean } => {
  const filters = { ...DEFAULT_FILTERS };
  let isDefault = true;
  for (let key of Object.keys(filters) as Array<keyof typeof filters>) {
    if (params.has(key)) {
      const value = params.get(key);
      if (
        key === "categories" ||
        key === "genres" ||
        key === "themes" ||
        key === "gameModes"
      ) {
        filters[key] = value?.split(",").map(Number) ?? [];
        isDefault = false;
      } else if (key === "ratingMin" || key === "ratingMax") {
        filters[key] = Number(value);
        if (filters[key] !== DEFAULT_FILTERS[key]) {
          isDefault = false;
        }
      } else {
        filters[key] = value || "";
        if (value !== "") {
          isDefault = false;
        }
      }
    }
  }

  return { filters, isDefault };
};

export const retrieveSortFromSearchParams = (
  params: ReadonlyURLSearchParams
): GameSorts => {
  const sort = { ...DEFAULT_SORT };
  for (const key of Object.keys(sort) as Array<keyof typeof sort>) {
    if (params.has(key)) {
      const value = params.get(key);
      if (key === "order") {
        sort[key] = value as SortFieldsOrder;
      } else {
        sort[key] = value as SortFields;
      }
    }
  }

  return sort;
};

export const retrievePaginateFromSearchParams = (
  params: ReadonlyURLSearchParams
): Paginate => {
  const paginate = { ...DEFAULT_PAGINATE };
  for (const key of Object.keys(paginate) as Array<keyof typeof paginate>) {
    if (params.has(key)) {
      const value = params.get(key);
      paginate[key] = Number(value);
    }
  }

  return paginate;
};

export const retrieveReviewFieldsFromSearchParams = (
  params: ReadonlyURLSearchParams
) => {
  const sort = { ...DEFAULT_REVIEW_SORT };

  for (const key of Object.keys(sort) as Array<keyof typeof sort>) {
    if (params.has(key)) {
      const value = params.get(key);
      if (key === "order") {
        sort[key] = value as SortFieldsOrder;
      } else if (key === "field") {
        sort[key] = value as ReviewSortFields;
      } else {
        sort[key] = !!value;
      }
    }
  }

  return sort;
};

export const stringifyFilters = (
  params: ReadonlyURLSearchParams,
  filters: GameFilters
) => {
  const current = new URLSearchParams(Array.from(params.entries()));

  for (const key of Object.keys(filters) as Array<keyof typeof filters>) {
    if (!filters[key]) {
      current.delete(key);
      continue;
    }

    if (
      key === "categories" ||
      key === "genres" ||
      key === "themes" ||
      key === "gameModes"
    ) {
      if (filters[key].length > 0) current.set(key, filters[key].join(","));
      else current.delete(key);
    } else {
      if (filters[key] === DEFAULT_FILTERS[key]) current.delete(key);
      else current.set(key, String(filters[key]));
    }
  }

  const search = current.toString();
  const query = search ? `?${search}` : "";

  return query;
};

export const stringifyGetGamesParams = (
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
  const { filters, paginate, sort } = params;

  const filterQuery = `where name ~ *"${filters.name}"*
  ${
    filters.categories.length > 0
      ? `& category = (${filters.categories?.join(", ")})`
      : ""
  } 
  ${
    filters.genres.length > 0
      ? `& genres = (${filters.genres?.join(", ")})`
      : ""
  }
  ${
    filters.themes.length > 0
      ? `& themes = (${filters.themes?.join(", ")})`
      : ""
  } 
  ${
    filters.gameModes.length > 0
      ? `& game_modes = (${filters.gameModes?.join(", ")})`
      : ""
  } 
  & total_rating >= ${filters.ratingMin} & total_rating <= ${
    filters.ratingMax
  } & total_rating_count >= 10;`;
  const sortQuery = `sort ${sort.field} ${sort.order};`;
  const paginateQuery = `limit ${paginate.limit}; offset ${paginate.offset};`;

  const body = `${GET_GAMES_FIELDS}; ${filterQuery} ${sortQuery} ${paginateQuery}`;
  return body;
};

export const createGamesFileds = (name: string) => {
  const fields = `${name}.name, ${name}.cover.image_id, ${name}.first_release_date, ${name}.total_rating, ${name}.total_rating_count, ${name}.category, ${name}.themes, ${name}.game_modes, ${name}.genres`;
  return fields;
};
