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
        <Container className="px-0 md:px-2">
          <UserMenu className="px-2" username={params.username} />
          <Separator className="mt-0 ml-2 w-[calc(100%-16px)]" />
          <div className="flex items-center justify-between gap-4 mb-4 px-2">
            <Title className="mb-0 lg:mb-0" size="large">
              {params.username}&apos;s Library
            </Title>
            <LibraryChangeView />
          </div>
          <LibraryFilters username={params.username} />
          <Separator className="ml-2 w-[calc(100%-16px)]" />
          <LibraryGames username={params.username} />
        </Container>
      </section>
    </>
  );
}
