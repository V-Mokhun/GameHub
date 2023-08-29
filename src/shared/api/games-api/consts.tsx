import { Icon } from "@shared/ui";
import { GAMES_LIMIT } from "../consts";
import {
  GameCategories,
  GameFilters,
  GameSorts,
  GameWebsites,
  Paginate,
  SortFields,
  SortFieldsOrder,
} from "./types";
import Image from "next/image";

export const MIN_RATING = 0;
export const MAX_RATING = 100;

export const GET_GAMES_FIELDS = `fields name, cover.image_id, first_release_date, total_rating, category, themes, game_modes, genres`;

export const GAME_CATEGORIES: { [key: number]: string } = {
  [GameCategories.MAIN_GAME]: "Main Game",
  [GameCategories.DLC_ADDON]: "DLC / Addon",
  [GameCategories.EXPANSION]: "Expansion",
  [GameCategories.REMAKE]: "Remake",
  [GameCategories.REMASTER]: "Remaster",
  [GameCategories.MOD]: "Mod",
  [GameCategories.BUNDLE]: "Bundle",
  [GameCategories.STANDALONE_EXPANSION]: "Standalone Expansion",
  [GameCategories.EPISODE]: "Episode",
  [GameCategories.SEASON]: "Season",
  [GameCategories.EXPANDED_GAME]: "Expanded Game",
  [GameCategories.PORT]: "Port",
  [GameCategories.FORK]: "Fork",
  [GameCategories.PACK]: "Pack",
  [GameCategories.UPDATE]: "Update",
};

export const GAME_WEBSITES: {
  [key: number]: { Icon: React.ReactNode; name: string };
} = {
  [GameWebsites.OFFICIAL]: {
    Icon: (
      <span className="inline-flex justify-center items-center w-8 h-8 rounded-sm bg-secondary">
        <Icon name="ArrowUpRightSquare" className="w-6 h-6 text-white" />
      </span>
    ),
    name: "Official Website",
  },
  [GameWebsites.TWITCH]: {
    Icon: (
      <span className="inline-flex justify-center items-center w-8 h-8 rounded-sm bg-purple-600 dark:bg-purple-500">
        <Icon name="Twitch" className="w-6 h-6 text-white" />
      </span>
    ),
    name: "Twitch",
  },
  [GameWebsites.YOUTUBE]: {
    Icon: (
      <span className="inline-flex justify-center items-center w-8 h-8 rounded-sm bg-destructive">
        <Icon name="Youtube" className="w-6 h-6 text-white" />
      </span>
    ),
    name: "YouTube",
  },
  [GameWebsites.STEAM]: {
    Icon: (
      <Image
        unoptimized
        width={32}
        height={32}
        src={"/icons/steam.svg"}
        alt="Steam"
      />
    ),
    name: "Steam",
  },
  [GameWebsites.EPICGAMES]: {
    Icon: (
      <Image
        unoptimized
        width={32}
        height={32}
        src={"/icons/epic.svg"}
        alt="Epic Games"
      />
    ),
    name: "Epic",
  },
};

export const DEFAULT_FILTERS: GameFilters = {
  name: "",
  categories: [],
  genres: [],
  themes: [],
  gameModes: [],
  ratingMin: MIN_RATING,
  ratingMax: MAX_RATING,
};

export const DEFAULT_SORT: GameSorts = {
  field: SortFields.RATING,
  order: SortFieldsOrder.DESC,
};

export const DEFAULT_PAGINATE: Paginate = {
  limit: GAMES_LIMIT,
  offset: 0,
};
