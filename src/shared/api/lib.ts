import { ReadonlyURLSearchParams } from "next/navigation";
import { DEFAULT_PAGINATE } from "./games-api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { DEFAULT_LIMIT } from "./consts";

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

export const onPaginate = (data: {
  params: ReadonlyURLSearchParams;
  pathname: string;
  router: AppRouterInstance;
  limit: number;
  offset: number;
}) => {
  const { params, router, limit, offset, pathname } = data;

  const paramsLimit = parseInt(params.get("limit") ?? String(DEFAULT_LIMIT));
  const paramsOffset = parseInt(params.get("offset") ?? "0");
  const query = getPaginateQuery(params, limit, offset);

  if (paramsLimit !== limit || paramsOffset !== offset) {
    router.push(`${pathname}${query}`);
    window.scrollTo({ top: 0 });
  }
};
