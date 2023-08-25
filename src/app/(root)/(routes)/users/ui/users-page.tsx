"use client";
import {
  GAMES_LIMIT_VALUES,
  getPaginateQuery,
  onPaginate,
  retrievePaginateFromSearchParams,
  userApi,
} from "@shared/api";
import { Separator, Title } from "@shared/ui";
import { Pagination } from "@widgets/pagination";
import { UsersList, UsersSearch } from "@widgets/users";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface UsersPageProps {}

export const UsersPage = ({}: UsersPageProps) => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paginate = retrievePaginateFromSearchParams(params);
  const search = useMemo(() => params.get("search") ?? "", [params]);

  const { data, isFetching, isPreviousData } = userApi.getUsers(
    search,
    paginate
  );

  const onSearchChange = (value: string) => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (!value) current.delete("search");
    else current.set("search", value);
    current.delete("offset");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <>
      <Title>Our Community</Title>
      <UsersSearch
        disabled={isFetching}
        onChange={onSearchChange}
        search={search}
      />
      <Separator />
      <UsersList users={data?.users} isLoading={isFetching} />
      <Separator />
      <Pagination
        isFetching={isFetching}
        onPaginateChange={(limit, offset) =>
          onPaginate({
            limit,
            offset,
            params,
            pathname,
            router,
          })
        }
        isPreviousData={isPreviousData}
        hasMore={data?.users.length === paginate.limit}
        limit={paginate.limit}
        limitValues={GAMES_LIMIT_VALUES}
        offset={paginate.offset}
        totalPages={data?.count ? Math.ceil(data.count / paginate.limit) : 0}
      />
    </>
  );
};
