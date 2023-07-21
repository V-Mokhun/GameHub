import { Container, Separator, Title } from "@shared/ui";
import { BrowseChangeView, BrowseFilters } from "./ui";

export default async function BrowsePage() {
  return (
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
      </Container>
    </section>
  );
}
