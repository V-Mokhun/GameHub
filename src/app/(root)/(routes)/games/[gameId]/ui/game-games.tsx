"use client";

import { GameCard } from "@entities/game";
import { Game, NormalizedLibraryGame } from "@shared/api";
import { Button, CarouselArrow, Icon, Title } from "@shared/ui";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

interface GameGamesProps {
  title: string;
  games: Game[];
  userId?: string | null;
  libraryGames?: NormalizedLibraryGame[];
  username?: string | null;
}

export const GameGames = ({
  games = [],
  title,
  libraryGames = [],
  userId,
  username,
}: GameGamesProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 479px)": {
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
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="mb-4 md:mb-6 min-w-0">
      <Title>{title}</Title>
      <div className="relative md:mr-10 md:ml-10 xl:mr-5">
        {loaded && instanceRef.current && (
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
        <div ref={sliderRef} className="keen-slider">
          {games.map((game) => {
            const libraryGame = libraryGames?.find(
              (libGame) => libGame.id === game.id
            );

            return (
              <div key={game.id} className="keen-slider__slide">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
