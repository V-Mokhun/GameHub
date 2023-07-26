import { GAMES_LIMIT } from "@shared/api/consts";
import { MAX_RATING, MIN_RATING } from "@shared/api/games-api/consts";
import { ReadonlyURLSearchParams } from "next/navigation";

export const updateSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  key: string,
  value: string
) => {
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  current.set("offset", "0");

  if (!value && key !== "name") {
    current.delete(key);
  } else {
    current.set(key, value);
  }
  const search = current.toString();
  const query = search ? `?${search}` : "";

  return query;
};

export const resetSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  current.set("offset", "0");
  current.set("limit", GAMES_LIMIT.toString());
  current.set("ratingMin", MIN_RATING.toString());
  current.set("ratingMax", MAX_RATING.toString());
  current.set("name", "");
  current.delete("genres");
  current.delete("themes");
  current.delete("gameModes");
  current.delete("categories");

  const search = current.toString();
  const query = search ? `?${search}` : "";

  return query;
};
