import { GameCard, GameLibraryModal } from "@entities/game";
import { FullGame, NormalizedLibraryGame } from "@shared/api";
import { SIGN_IN_ROUTE, TOAST_TIMEOUT } from "@shared/consts";
import { cn } from "@shared/lib";
import {
  Button,
  Container,
  Icon,
  Link,
  Title,
  buttonVariants,
  useToast,
} from "@shared/ui";
import Image from "next/image";

interface GameBannerProps {
  game?: FullGame;
  isLoading: boolean;
  userId?: string | null;
  libraryGame?: NormalizedLibraryGame | null;
  username?: string | null;
  onOpen: () => void;
}

export const GameBanner = ({
  game,
  isLoading,
  userId,
  libraryGame,
  username,
  onOpen,
}: GameBannerProps) => {
  const { toast } = useToast();

  const onLibraryButtonClick = () => {
    if (userId) {
      onOpen();
    } else {
      const { dismiss } = toast({
        title: "Sign in to add games to your library",
        action: (
          <Link
            onClick={() => {
              setTimeout(() => {
                dismiss();
              }, TOAST_TIMEOUT);
            }}
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "w-max self-end text-sm hover:text-white",
            })}
            href={SIGN_IN_ROUTE}
          >
            Sign in
          </Link>
        ),
        variant: "destructive",
      });
    }
  };

  if (isLoading) return null;

  return (
    game && (
      <>
        <div className="relative -mt-6 h-[40vh] md:h-[50vh] w-full md:-mt-5">
          <div className="absolute inset-x-0 top-0 z-0 h-full overflow-hidden -mx-2 sm:-mx-5 md:-mx-6">
            <Image
              className="w-full h-full object-cover blur-sm"
              fill
              alt={game.name}
              src={game.artworks[0] || game.cover || ""}
            />

            <div className="absolute top-6 left-4 h-3/4 w-1/2 sm:w-1/3 lg:w-1/4">
              <GameCard
                key={game.id}
                game={{
                  category: game.category,
                  id: game.id,
                  name: game.name,
                  cover: game.cover || "",
                  rating: game.rating,
                  themes: game.themes.map((theme) => theme.id),
                  gameModes: game.gameModes.map((gameMode) => gameMode.id),
                  genres: game.genres.map((genre) => genre.id),
                  releaseDate: game.releaseDate
                    ? new Date(game.releaseDate)
                    : undefined,
                }}
                libraryGameData={libraryGame ?? undefined}
                isInLibrary
                userId={userId}
                username={username ?? undefined}
                classNames={{
                  name: "hidden md:block",
                  link: "h-[35vh] sm:h-[35vh] md:h-[37.5vh] lg:h-[37.5vh] xl:h-[37.5vh]",
                }}
              />
            </div>
            <div className="hidden md:block absolute bottom-0 inset-x-0 z-10 text-white bg-[rgb(196,102,8)]/80 py-2">
              <Container>
                <Title className="drop-shadow-sm lg:mb-0 mb-0">
                  {game.name}{" "}
                  {game.releaseDate && (
                    <span className="font-medium text-gray-400 dark:text-muted-foreground">
                      ({new Date(game.releaseDate).getFullYear()})
                    </span>
                  )}
                </Title>
              </Container>
            </div>
          </div>
        </div>
        <div className="block md:hidden text-white -mx-2 sm:-mx-4 bg-[rgb(196,102,8)] py-2">
          <Container>
            <Title size="small" className="drop-shadow-sm lg:mb-0 mb-0">
              {game.name}{" "}
              {game.releaseDate && (
                <span className="font-medium text-gray-400 dark:text-muted-foreground">
                  ({new Date(game.releaseDate).getFullYear()})
                </span>
              )}
            </Title>
          </Container>
        </div>
      </>
    )
  );
};
