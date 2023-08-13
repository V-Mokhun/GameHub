"use client";

import { useAuth } from "@clerk/nextjs";
import {
  GAMES_LIMIT_VALUES,
  UserWithFriends,
  getPaginateQuery,
  retrievePaginateFromSearchParams,
  userApi,
} from "@shared/api";
import {
  FRIENDS_RECEIVED_REQUESTS_ROUTE,
  FRIENDS_ROUTE,
  FRIENDS_SENT_REQUESTS_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
  TOAST_TIMEOUT,
} from "@shared/consts";
import {
  Separator,
  Skeleton,
  Title,
  buttonVariants,
  useToast,
} from "@shared/ui";
import { Pagination } from "@widgets/pagination";
import { UsersList, UsersSearch } from "@widgets/users";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { UserMenu } from "../../ui";

interface UserFriendRequestsProps {
  username: string;
  sent?: boolean;
}

export const UserFriendRequests = ({
  username,
  sent,
}: UserFriendRequestsProps) => {
  const { toast } = useToast();
  const { userId: authUserId } = useAuth();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError,
  } = userApi.getOwnProfile(authUserId ?? undefined, {
    includeFullRequests: true,
  });

  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paginate = retrievePaginateFromSearchParams(params);
  const search = useMemo(() => params.get("search") ?? "", [params]);

  if (isError) {
    router.push(HOME_ROUTE);
  }
  if ((userData && userData.username !== username) || authUserId === null) {
    router.push(PROFILE_ROUTE(username));
    setTimeout(() => {
      toast({
        title: "You are not authorized to view this page",
        variant: "destructive",
      });
    }, TOAST_TIMEOUT);
    return null;
  }

  const onPaginateChange = (limit: number, offset: number) => {
    const query = getPaginateQuery(params, limit, offset);

    router.push(`${pathname}${query}`);
  };

  const onSearchChange = (value: string) => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (!value) current.delete("search");
    else current.set("search", value);
    current.delete("offset");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  let requestFriends = userData?.receivedFriendRequests
    ? userData.receivedFriendRequests.map(
        (req) => req.sender as UserWithFriends
      )
    : [];

  if (sent) {
    requestFriends = userData?.sentFriendRequests
      ? userData.sentFriendRequests.map(
          (req) => req.receiver as UserWithFriends
        )
      : [];
  }

  const filteredRequests = requestFriends
    .filter((friend) => friend?.username?.includes(search))
    .slice(paginate.offset, paginate.offset + paginate.limit)
    .map((friend) => ({
      ...friend,
      isFriend: false,
    }));

  return (
    <>
      <UserMenu isLoading={isUserLoading} username={username} />
      {userData && (
        <div className="flex items-center mb-2 lg:mb-3 gap-4">
          <Link
            href={FRIENDS_ROUTE(username)}
            className={buttonVariants({ variant: "secondary" })}
          >
            Friends
          </Link>
          <Link
            href={
              sent
                ? FRIENDS_RECEIVED_REQUESTS_ROUTE(username)
                : FRIENDS_SENT_REQUESTS_ROUTE(username)
            }
            className={buttonVariants({ variant: "secondary" })}
          >
            {!sent && "Sent"} Friend Requests
          </Link>
        </div>
      )}
      <Separator />
      {isUserLoading ? (
        <Skeleton className="w-36 h-9 mb-2 lg:mb-3" />
      ) : (
        <Title>
          {sent && "Sent"} Friend Requests (
          {sent
            ? userData?.sentFriendRequests.length
            : userData?.receivedFriendRequests.length}
          )
        </Title>
      )}
      <UsersSearch
        disabled={isUserLoading}
        onChange={onSearchChange}
        search={search}
      />
      <Separator />
      <UsersList
        notFoundMessage="No Requests Found"
        users={filteredRequests}
        isLoading={isUserLoading}
      />
      <Separator />
      <Pagination
        isFetching={isUserLoading}
        onPaginateChange={onPaginateChange}
        isPreviousData={false}
        hasMore={filteredRequests.length === paginate.limit}
        limit={paginate.limit}
        limitValues={GAMES_LIMIT_VALUES}
        offset={paginate.offset}
        totalPages={Math.ceil(requestFriends.length / paginate.limit)}
      />
    </>
  );
};
