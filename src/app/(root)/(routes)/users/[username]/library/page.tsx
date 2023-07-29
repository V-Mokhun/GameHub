import { Container, Separator, Title } from "@shared/ui";
import { LibraryFilter } from "@widgets/filters";
import { LibraryChangeView, LibraryFilters, LibraryGames } from "./ui";
import { UserMenu } from "../ui/user-menu";

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
          <UserMenu username={params.username} />
          <Separator />
          <div className="flex items-center justify-between gap-4 mb-4">
            <Title className="mb-0 lg:mb-0" size="large">
              {params.username}&apos;s Library
            </Title>
            <LibraryChangeView />
          </div>
          <LibraryFilters username={params.username} />
          <Separator />
          <LibraryGames username={params.username} />
        </Container>
      </section>
    </>
  );
}
