import { Container, Separator, Title } from "@shared/ui";
import { BrowseFilter } from "@widgets/filter";
import { BrowseChangeView, BrowseFilters } from "./ui";
import { BrowseGames } from "./ui/browse-games";

export default async function BrowsePage() {
  return (
    <>
      <BrowseFilter />
      <section>
        <Container>
          <div className="flex items-center justify-between gap-4 mb-4">
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
