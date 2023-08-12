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
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { UserMenu } from "../../ui";

interface UserRatingsProps {
  username: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  label: string;
  payload: {
    value: number;
    payload: {
      date: string;
      name: string;
      rating: number;
      releaseDate: string;
    };
  }[];
}) => {
  if (!active) return null;

  const { date, name, rating, releaseDate } = payload[0].payload;

  return (
    <div className="z-10 max-w-[200px] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
      <div className="flex flex-col items-center gap-1">
        <span>{rating}</span>
        <p>
          {name}{" "}
          <span className="inline-flex text-muted-foreground">
            ({new Date(releaseDate).getFullYear()})
          </span>
        </p>
        <p>{date}</p>
      </div>
    </div>
  );
};

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
    return router.push(HOME_ROUTE);
  }

  if (
    !userData ||
    (isLibraryLoading && !userData) ||
    (isLibraryLoading && userData && userData.libraryIncluded)
  )
    return (
      <div className="pb-4 md:pb-6 overflow-x-auto">
        <UserMenu isLoading={true} username={username} />
        <Skeleton className="mt-10 mb-4 w-40 h-8" />
        <Skeleton className="w-52 h-6 mb-4" />
        <Skeleton className="w-96 h-[60vh] xs:w-full" />
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
      rating: game.userRating,
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
          <Subtitle size="large">Most recent user&apos;s ratings</Subtitle>
          <div className="w-96 h-[60vh] xs:w-full">
            <ResponsiveContainer
              className={"w-full h-full text-muted-foreground"}
            >
              <AreaChart
                data={formattedData}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  ticks={[
                    formattedData[0].date,
                    formattedData[formattedData.length - 1].date,
                  ]}
                  padding={{ left: 20, right: 20 }}
                  axisLine={{ className: "stroke-muted" }}
                  tickLine={{ className: "stroke-muted" }}
                />
                <YAxis
                  type="number"
                  dataKey="rating"
                  domain={[1, 10]}
                  tickCount={10}
                  axisLine={{ className: "stroke-muted" }}
                  tickLine={false}
                  tick={{ fill: "currentColor" }}
                  padding={{ bottom: 20, top: 20 }}
                />
                {/* @ts-ignore */}
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="rating"
                  stroke="stroke-secondary"
                  fill="fill-primary"
                  className="fill-primary stroke-secondary"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
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
