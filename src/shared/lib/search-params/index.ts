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
