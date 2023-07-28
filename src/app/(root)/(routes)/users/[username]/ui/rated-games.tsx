import { GameCard } from "@entities/game";
import { Game } from "@prisma/client";
import { NormalizedLibraryGame } from "@shared/api";
import { LIBRARY_ROUTE, SETTINGS_ROUTE } from "@shared/consts";
import { Icon, Link, Subtitle, Title, buttonVariants } from "@shared/ui";

interface RatedGamesProps {
  games: NormalizedLibraryGame[];
  isOwnProfile: boolean;
  gamesCount: number;
  isPrivateLibrary: boolean;
  username: string;
  userId?: string | null;
}

export const RatedGames = ({
  games,
  gamesCount,
  isOwnProfile,
  isPrivateLibrary,
  username,
  userId,
}: RatedGamesProps) => {
  return (
    <div>
      <Title className="lg:mb-2" size="small">
        {isOwnProfile ? "Your ratings" : `${username}'s ratings`}
      </Title>
      <Subtitle size="large">Most recently rated</Subtitle>
      <div className="flex flex-wrap mb-2 gap-2 md:gap-x-4 md:gap-y-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={{
              category: game.category,
              id: game.id,
              name: game.name,
              cover: game.coverUrl,
              rating: game.totalRating,
              themes: game.themes,
              gameModes: game.gameModes,
              genres: game.genres,
              releaseDate: game.releaseDate
                ? new Date(game.releaseDate)
                : undefined,
            }}
            libraryGameData={{
              finishedAt: game.finishedAt,
              notes: game.notes,
              playTime: game.playTime,
              status: game.status,
              userRating: game.userRating,
            }}
            isInLibrary
            userId={userId}
            username={username}
            disableLibraryButton={!isOwnProfile}
          />
        ))}
      </div>
      <Link className="flex items-center gap-1" href={LIBRARY_ROUTE(username)}>
        <span>See all {gamesCount > 4 ? `${gamesCount}` : ""} games</span>
        <Icon className="text-current" name="ChevronsRight" />
      </Link>
      {isOwnProfile && (
        <div className="mt-3 flex flex-col md:flex-row items-start md:items-center gap-2">
          <Subtitle className="mb-0 md:mb-0">
            {isPrivateLibrary
              ? "Your library is private"
              : "Your library is public"}
          </Subtitle>
          <Link
            href={SETTINGS_ROUTE}
            className={buttonVariants({
              size: "sm",
              variant: "secondary",
              className: "hover:text-current",
            })}
          >
            {isPrivateLibrary ? "Make library public" : "Make library private"}
          </Link>
        </div>
      )}
    </div>
  );
};
