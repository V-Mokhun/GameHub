import { Container, Separator, Title } from "@shared/ui";
import { LibraryFilter } from "@widgets/filters";
import { LibraryChangeView, LibraryFilters, LibraryGames } from "./ui";

export default async function LibraryPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <>
      <LibraryFilter />
      <section>
        <Container>
          <div className="flex items-center justify-between gap-4 mb-4">
            <Title className="mb-0 lg:mb-0" size="large">
              Library
            </Title>
            <LibraryChangeView />
          </div>
          <LibraryFilters username={params.username} />
          <Separator />
          <LibraryGames />
        </Container>
      </section>
    </>
  );
}
