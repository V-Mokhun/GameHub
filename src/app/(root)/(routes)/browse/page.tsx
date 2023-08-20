import { Container, Separator, Title } from "@shared/ui";
import { BrowseFilter } from "@widgets/filters";
import { BrowseChangeView, BrowseFilters } from "./ui";
import { BrowseGames } from "./ui/browse-games";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse - GameHub",
  description: "Browse games on GameHub",
};

export default async function BrowsePage() {
  return (
    <>
      <BrowseFilter />
      <section>
        <Container className="px-0 md:px-2">
          <div className="flex items-center justify-between gap-4 mb-4 px-2">
            <Title className="mb-0 lg:mb-0" size="large">
              Browse Games
            </Title>
            <BrowseChangeView />
          </div>
          <BrowseFilters />
          <Separator />
          <BrowseGames />
        </Container>
      </section>
    </>
  );
}
