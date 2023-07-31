import { GameLibraryModal } from "@entities/game";
import { FullGame, NormalizedLibraryGame } from "@shared/api";
import { SIGN_IN_ROUTE, TOAST_TIMEOUT } from "@shared/consts";
import { cn } from "@shared/lib";
import {
  Button,
  Container,
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
  onOpen: () => void;
}

export const GameBanner = ({
  game,
  isLoading,
  userId,
  libraryGame,
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
        <div className="relative -mt-6 h-[30vh] md:h-[50vh] w-full md:-mt-5">
          <div className="absolute inset-x-0 top-0 z-0 h-full overflow-hidden -mx-2 sm:-mx-5 md:-mx-6">
            <Image
              className="w-full h-full object-cover blur-sm"
              fill
              alt={game.name}
              src={game.artworks[0] || game.cover || ""}
            />
            <div className="absolute flex items-end gap-2 top-4 left-4 h-3/4">
              {game.cover && (
                <div className="relative aspect-[3/4] h-full w-full overflow-hidden rounded-md shadow-md">
                  <div className="absolute z-[1] bottom-2 right-2">
                    {libraryGame?.userRating && (
                      <span
                        className={cn(
                          "flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-sm",
                          libraryGame.userRating >= 8
                            ? "bg-success"
                            : libraryGame.userRating >= 5
                            ? "bg-secondary"
                            : "bg-destructive"
                        )}
                      >
                        {libraryGame?.userRating}
                      </span>
                    )}
                  </div>
                  <Image
                    className="object-cover"
                    fill
                    src={game.cover}
                    alt={game.name}
                  />
                </div>
              )}
              <Button
                className="whitespace-nowrap"
                onClick={onLibraryButtonClick}
              >
                {libraryGame ? "Edit In Library" : "Add To Library"}
              </Button>
            </div>
            <div className="hidden md:block absolute bottom-0 inset-x-0 z-10 text-white bg-[rgb(196,102,8)]/80 py-2">
              <Container>
                <Title className="drop-shadow-sm lg:mb-0 mb-0">
                  {game.name}{" "}
                  {game.releaseDate && (
                    <span className="font-medium text-gray-400 dark:text-muted-foreground">
                      ( {new Date(game.releaseDate).getFullYear()} )
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
