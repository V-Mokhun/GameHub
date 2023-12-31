"use client";
import { useAuth } from "@clerk/nextjs";
import {
  DEFAULT_LIMIT_VALUES,
  getPaginateQuery,
  onPaginate,
  retrievePaginateFromSearchParams,
  userApi,
} from "@shared/api";
import {
  FRIENDS_RECEIVED_REQUESTS_ROUTE,
  HOME_ROUTE,
  USERS_ROUTE,
} from "@shared/consts";
import { Separator, Skeleton, Title, buttonVariants } from "@shared/ui";
import { Pagination } from "@widgets/pagination";
import { UsersList, UsersSearch } from "@widgets/users";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { UserMenu } from "../../ui";

interface UserFriendsProps {
  username: string;
}

export const UserFriends = ({ username }: UserFriendsProps) => {
  const { userId: authUserId } = useAuth();

  const {
    data: userData,
    isLoading: isUserLoading,
    isError,
  } = userApi.getUser(username);

  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paginate = retrievePaginateFromSearchParams(params);
  const search = useMemo(() => params.get("search") ?? "", [params]);

  if (isError) {
    router.push(HOME_ROUTE);
  }

  const onSearchChange = (value: string) => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (!value) current.delete("search");
    else current.set("search", value);
    current.delete("offset");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const friends = userData?.user.friends ?? [];
  const filteredFriends = friends
    .filter((friend) => friend.username?.includes(search))
    .slice(paginate.offset, paginate.offset + paginate.limit)
    .map((friend) => ({
      ...friend,
      isFriend:
        userData?.isOwnProfile ||
        friend.friends.some(({ id }) => id === authUserId),
    }));

  return (
    <>
      <UserMenu
        isLoading={isUserLoading}
        username={username}
        includePrivateRoutes={userData?.libraryIncluded}
      />
      {userData?.isOwnProfile && (
        <div className="flex items-center mb-2 lg:mb-3 gap-4">
          <Link
            href={USERS_ROUTE}
            className={buttonVariants({ variant: "secondary" })}
          >
            Find Friends
          </Link>
          <Link
            href={FRIENDS_RECEIVED_REQUESTS_ROUTE(userData.user.username!)}
            className={buttonVariants({ variant: "secondary" })}
          >
            Friend Requests
          </Link>
        </div>
      )}
      <Separator className="md:my-4 my-2" />
      {isUserLoading ? (
        <Skeleton className="w-36 h-9 mb-2 lg:mb-3" />
      ) : (
        <Title>
          {userData?.isOwnProfile ? "Your" : `${username}'s`} Friends (
          {friends.length})
        </Title>
      )}
      <UsersSearch
        disabled={isUserLoading}
        onChange={onSearchChange}
        search={search}
      />
      <Separator />
      <UsersList
        notFoundMessage="No Friends Found"
        users={filteredFriends}
        isLoading={isUserLoading}
      />
      <Separator />
      <Pagination
        isFetching={isUserLoading}
        onPaginateChange={(limit, offset) =>
          onPaginate({
            limit,
            offset,
            params,
            pathname,
            router,
          })
        }
        isPreviousData={false}
        hasMore={filteredFriends.length === paginate.limit}
        limit={paginate.limit}
        limitValues={DEFAULT_LIMIT_VALUES}
        offset={paginate.offset}
        totalPages={Math.ceil(friends.length / paginate.limit)}
      />
    </>
  );
};
