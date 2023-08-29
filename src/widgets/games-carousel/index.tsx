"use client";

import { GameCard } from "@entities/game";
import { Game, NormalizedLibraryGame } from "@shared/api";
import { CarouselArrow, Skeleton, Subtitle, Title } from "@shared/ui";
import { Fragment, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { useMediaQuery } from "@shared/lib/hooks";
import { cn } from "@shared/lib";

interface GamesCarouselProps {
  title?: string;
  subtitle?: string;
  games: Game[];
  userId?: string | null;
  libraryGames?: NormalizedLibraryGame[];
  username?: string | null;
  isLoading: boolean;
}

export const GamesCarousel = ({
  games = [],
  title,
  libraryGames = [],
  userId,
  username,
  isLoading,
  subtitle,
}: GamesCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const matchesXl = useMediaQuery("(min-width: 1280px)");
  const matchesMd = useMediaQuery("(min-width: 768px)");
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 1px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 4,
          spacing: 10,
        },
      },
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    disabled:
      !isLoading &&
      ((matchesXl && games.length <= 4) ||
        (matchesMd && games.length <= 3) ||
        (!matchesXl && !matchesXl && games.length <= 2)),
    created() {
      setLoaded(true);
    },
  });

  if (isLoading)
    return (
      <div className="mb-4 md:mb-6">
        <Skeleton className="h-9 w-32 lg:mb-3 mb-2" />
        {subtitle && <Skeleton className="h-7 w-56 md:mb-4 mb-3" />}
        <div className="md:mr-10 md:ml-10 xl:mr-5">
          <div className="flex gap-2.5">
            <Skeleton className="flex-1 h-80 sm:h-96 md:h-72 lg:h-80 xl:h-96" />
            <Skeleton className="flex-1 h-80 sm:h-96 md:h-72 lg:h-80 xl:h-96 hidden xs:block" />
            <Skeleton className="flex-1 h-80 sm:h-96 md:h-72 lg:h-80 xl:h-96 hidden md:block" />
            <Skeleton className="flex-1 h-80 sm:h-96 md:h-72 lg:h-80 xl:h-96 hidden xl:block" />
          </div>
        </div>
      </div>
    );

  return (
    games.length > 0 && (
      <div className="mb-4 md:mb-6 min-w-0">
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <div className="relative md:mr-10 md:ml-10 xl:mr-5">
          {loaded &&
            instanceRef.current &&
            !instanceRef.current.options.disabled && (
              <>
                <CarouselArrow
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRef.current?.prev();
                  }}
                  disabled={currentSlide === 0}
                  left
                />
                <CarouselArrow
                  onClick={(e) => {
                    e.stopPropagation();
                    instanceRef.current?.next();
                  }}
                  disabled={
                    currentSlide === instanceRef.current.track.details.maxIdx
                  }
                />
              </>
            )}
          <div
            ref={sliderRef}
            className={cn(
              "keen-slider",
              instanceRef.current?.options.disabled &&
                "flex flex-wrap gap-2 md:gap-x-4"
            )}
          >
            {games.map((game) => {
              const libraryGame = libraryGames?.find(
                (libGame) => libGame.id === game.id
              );
              const content = (
                <GameCard
                  classNames={{
                    link: "h-80",
                  }}
                  game={{
                    category: game.category,
                    id: game.id,
                    name: game.name,
                    cover: game.cover || "",
                    rating: game.rating,
                    themes: game.themes,
                    gameModes: game.gameModes,
                    genres: game.genres,
                    releaseDate: game.releaseDate
                      ? new Date(game.releaseDate)
                      : undefined,
                  }}
                  libraryGameData={libraryGame ?? undefined}
                  isInLibrary={!!libraryGame}
                  userId={userId}
                  username={username ?? undefined}
                />
              );

              return instanceRef.current &&
                instanceRef.current.options.disabled ? (
                <Fragment key={game.id}>{content}</Fragment>
              ) : (
                <div key={game.id} className="keen-slider__slide">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};
