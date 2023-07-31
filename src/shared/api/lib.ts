import { ReadonlyURLSearchParams } from "next/navigation";
import { DEFAULT_PAGINATE } from "./games-api";

export const getPaginateQuery = (
  params: ReadonlyURLSearchParams,
  limit: number,
  offset: number
) => {
  const current = new URLSearchParams(Array.from(params.entries()));

  limit === DEFAULT_PAGINATE.limit
    ? current.delete("limit")
    : current.set("limit", String(limit));

  offset === DEFAULT_PAGINATE.offset
    ? current.delete("offset")
    : current.set("offset", String(offset));

  const search = current.toString();
  const query = search ? `?${search}` : "";

  return query;
};
