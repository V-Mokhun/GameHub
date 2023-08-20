"use client";

import {
  DEFAULT_LIBRARY_FILTERS,
  LibrarySortFields,
  MIN_USER_RATING,
  SortFieldsOrder,
  userApi,
  userLibraryApi,
} from "@shared/api";
import { HOME_ROUTE, PROFILE_ROUTE, TOAST_TIMEOUT } from "@shared/consts";
import { Separator, Skeleton, Subtitle, Title, useToast } from "@shared/ui";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { UserMenu } from "../../ui";
import { UserRatingsAreaChart } from "./user-ratings-area-chart";
import { UserRatingsPieChart } from "./user-ratings-pie-chart";

interface UserRatingsProps {
  username: string;
}
export const UserRatings = ({ username }: UserRatingsProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError,
  } = userApi.getUser(username);
  const { data: libraryData, isLoading: isLibraryLoading } =
    userLibraryApi.getLibrary(
      userData?.user.username || "",
      { enabled: userData?.libraryIncluded || false, noLimit: false },
      {
        filters: {
          ...DEFAULT_LIBRARY_FILTERS,
          userRatingMin: MIN_USER_RATING,
        },
        sort: {
          field: LibrarySortFields.UPDATED_DATE,
          order: SortFieldsOrder.ASC,
        },
      }
    );

  if (isError) {
    router.push(HOME_ROUTE);
  }

  if (
    !userData ||
    (isLibraryLoading && !userData) ||
    (isLibraryLoading && userData && userData.libraryIncluded)
  )
    return (
      <div className="pb-4 md:pb-6 overflow-x-auto">
        <UserMenu isLoading={true} username={username} />
        <Skeleton className="mt-10 mb-4 w-48 h-9" />
        <Skeleton className="w-96 h-[60vh] xs:w-full mb-6" />
        <Skeleton className="mb-4 w-52 h-8" />
        <Skeleton className="w-96 h-96 xs:h-[50vh] xs:w-[50vh] rounded-full mx-auto" />
      </div>
    );

  if (!userData.libraryIncluded) {
    router.push(PROFILE_ROUTE(username));
    setTimeout(() => {
      toast({
        title: `${username}'s ratings are private`,
        description: "You can't see their ratings",
        variant: "destructive",
      });
    }, TOAST_TIMEOUT);
    return null;
  }

  const formattedData =
    libraryData &&
    libraryData.library.map((game) => ({
      name: game.name,
      date: format(new Date(game.updatedAt), "dd/MM/yyyy"),
      rating: game.userRating!,
      releaseDate: game.releaseDate,
    }));

  return (
    <div className="pb-4 md:pb-6 overflow-x-auto">
      <UserMenu isLoading={isUserLoading} username={username} />
      <Separator className="mt-0" />
      <Title>
        {userData.isOwnProfile
          ? "Your ratings"
          : `${userData.user.username}'s ratings`}{" "}
        {formattedData && formattedData.length > 0 && (
          <span className="text-muted-foreground">
            ({formattedData.length})
          </span>
        )}
      </Title>
      {formattedData && formattedData.length > 0 ? (
        <>
          <UserRatingsAreaChart formattedData={formattedData} />
          <UserRatingsPieChart data={formattedData.map((d) => d.rating)} />
        </>
      ) : (
        <Subtitle size="large">
          {userData.isOwnProfile
            ? "You have no rated games"
            : `${userData.user.username} has no rated games`}
        </Subtitle>
      )}
    </div>
  );
};
