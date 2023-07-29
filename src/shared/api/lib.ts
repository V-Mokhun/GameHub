import { ReadonlyURLSearchParams } from "next/navigation";

export const getPaginateQuery = (
  params: ReadonlyURLSearchParams,
  limit: number,
  offset: number
) => {
  const current = new URLSearchParams(Array.from(params.entries()));

  current.set("limit", String(limit));
  current.set("offset", String(offset));
  const search = current.toString();
  const query = search ? `?${search}` : "";

  return query;
};
