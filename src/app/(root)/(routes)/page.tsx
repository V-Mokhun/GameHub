"use client";

import "keen-slider/keen-slider.min.css";
import { useUser } from "@clerk/nextjs";
import { SETTINGS_ROUTE } from "@shared/consts";
import { Container, Link, buttonVariants, useToast } from "@shared/ui";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { HomeHero } from "./ui";
import { gamesApi, userLibraryApi } from "@shared/api";
import { GamesCarousel } from "@widgets/games-carousel";

export default function Home() {
  const { user, isLoaded } = useUser();
  const { data: libraryData } = userLibraryApi.getLibrary(
    user?.username ?? undefined,
    { noLimit: true, enabled: true }
  );
  const { data: popularGames, isLoading: isPopularGamesLoading } =
    gamesApi.getPopularGames();
  const { toast } = useToast();

  useEffect(() => {
    async function updateUsername() {
      if (isLoaded && user && !user.username) {
        await user.update({ username: nanoid(10) });
        const { dismiss } = toast({
          title: "Username has been generated",
          description:
            "Your username has been automatically generated. You can change it in your profile settings.",
          action: (
            <Link
              onClick={() => dismiss()}
              className={buttonVariants({
                variant: "default",
                size: "sm",
                className: "w-max self-end text-sm hover:text-white",
              })}
              href={SETTINGS_ROUTE}
            >
              Change username
            </Link>
          ),
          variant: "success",
        });
      }
    }

    updateUsername();
  }, [isLoaded, user, toast]);

  return (
    <>
      <HomeHero />
      <section>
        <Container>
          <GamesCarousel
            title="Popular Games"
            subtitle="Most popular games this year"
            userId={user?.id}
            username={user?.username}
            games={popularGames || []}
            libraryGames={libraryData?.library}
            isLoading={isPopularGamesLoading}
          />
        </Container>
      </section>
    </>
  );
}
