"use client";

import { useUser } from "@clerk/nextjs";
import { GameCard, GameCardSkeleton } from "@entities/game";
import { gamesApi, userLibraryApi } from "@shared/api";
import { BROWSE_ROUTE } from "@shared/consts";
import { useCustomToasts } from "@shared/lib/hooks";
import {
  Container,
  Icon,
  Link,
  Subtitle,
  Title,
  buttonVariants,
} from "@shared/ui";
import { GamesCarousel } from "@widgets/games-carousel";
import { ViewedGames } from "@widgets/viewed-games";
import "keen-slider/keen-slider.min.css";
import { useEffect, useMemo } from "react";
import { HomeHero } from "./home-hero";

export function HomePage() {
  const { usernameGeneratedToast } = useCustomToasts();
  const { user, isLoaded } = useUser();
  const { data: libraryData } = userLibraryApi.getLibrary(
    user?.username ?? undefined,
    { noLimit: true, enabled: true }
  );
  const { data: popularGames, isLoading: isPopularGamesLoading } =
    gamesApi.getPopularGames();
  const { data: topGames, isLoading: isTopGamesLoading } = gamesApi.getGames({
    paginate: {
      limit: 10,
      offset: 0,
    },
  });
  const games = useMemo(
    () => [...(popularGames || []), ...(topGames || [])],
    [popularGames, topGames]
  );
  const randomGame = useMemo(
    () => games[Math.floor(Math.random() * games.length)],
    [games]
  );
  const libraryGame = libraryData?.library.find(
    (game) => game.id === randomGame?.id
  );

  useEffect(() => {
    async function updateUsername() {
      if (isLoaded && user && !user.username) {
        const username = user.id.slice(7, 18);
        await user.update({ username });
        usernameGeneratedToast();
      }
    }

    updateUsername();
  }, [isLoaded, user]);

  return (
    <>
      <HomeHero />
      <section>
        <Container>
          <div className="mb-4 md:mb-6">
            <Title className="text-primary" size="large">
              Enrich your Collection with Cards
            </Title>
            <Subtitle size="large">
              Elevate Your Gaming Journey with the Power to Rate, Progress, and
              Personalize – All at Your Fingertips! Try it out by clicking the{" "}
              <span className="bg-primary h-6 w-6 rounded-md inline-flex justify-center items-center">
                <Icon
                  name={"Plus"}
                  size={16}
                  className="text-primary-foreground"
                />
              </span>{" "}
              icon
            </Subtitle>
            <div className="w-1/2 md:w-1/3 lg:w-1/4">
              {isTopGamesLoading || isPopularGamesLoading ? (
                <GameCardSkeleton />
              ) : (
                games.length > 0 && (
                  <GameCard
                    game={{
                      category: randomGame.category,
                      id: randomGame.id,
                      name: randomGame.name,
                      cover: randomGame.cover || "",
                      rating: randomGame.rating,
                      themes: randomGame.themes,
                      gameModes: randomGame.gameModes,
                      genres: randomGame.genres,
                      releaseDate: randomGame.releaseDate
                        ? new Date(randomGame.releaseDate)
                        : undefined,
                    }}
                    libraryGameData={libraryGame ?? undefined}
                    isInLibrary={!!libraryGame}
                    userId={user?.id}
                    username={user?.username ?? undefined}
                  />
                )
              )}
            </div>
          </div>
          <GamesCarousel
            title="Featured"
            subtitle="Most popular games this year"
            userId={user?.id}
            username={user?.username}
            games={popularGames || []}
            libraryGames={libraryData?.library}
            isLoading={isPopularGamesLoading}
          />
          {popularGames && (
            <div className="-mt-2 mb-4 md:mb-6">
              <Link
                href={BROWSE_ROUTE}
                className={buttonVariants({
                  variant: "secondary",
                  className: "hover:text-foreground",
                })}
              >
                See all
                <Icon className="text-foreground ml-1" name="ArrowRight" />
              </Link>
            </div>
          )}
          <GamesCarousel
            title="Top rated games"
            subtitle="Highest rated games of all time"
            userId={user?.id}
            username={user?.username}
            games={topGames || []}
            libraryGames={libraryData?.library}
            isLoading={isTopGamesLoading}
          />
          {topGames && (
            <div className="-mt-2 mb-4 md:mb-6">
              <Link
                href={BROWSE_ROUTE}
                className={buttonVariants({
                  variant: "secondary",
                  className: "hover:text-foreground",
                })}
              >
                See all
                <Icon className="text-foreground ml-1" name="ArrowRight" />
              </Link>
            </div>
          )}
          <ViewedGames
            libraryGames={libraryData?.library}
            userId={user?.id}
            username={user?.username}
          />
        </Container>
      </section>
    </>
  );
}
