import { GameCard } from "@entities/game";
import { NormalizedLibraryGame } from "@shared/api";
import { LIBRARY_ROUTE } from "@shared/consts";
import { Icon, Link, Title } from "@shared/ui";

interface WantedGamesProps {
  games: NormalizedLibraryGame[];
  isOwnProfile: boolean;
  username: string;
  userId?: string | null;
}

export const WantedGames = ({
  games,
  isOwnProfile,
  username,
  userId,
}: WantedGamesProps) => {
  return (
    <div>
      <Title size="small">
        {isOwnProfile
          ? "Games you want to play"
          : `Games ${username} wants to play`}
      </Title>
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
        <span>See more</span>
        <Icon className="text-current" name="ChevronsRight" />
      </Link>
    </div>
  );
};
