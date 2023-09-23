import { Container, Separator, Title } from "@shared/ui";
import { LibraryFilter } from "@widgets/filters";
import { UserMenu } from "../ui";
import { LibraryChangeView, LibraryFilters, LibraryGames } from "./ui";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { LibraryDeleteButton } from "./ui";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  return {
    title: `${username}'s Library - GameHub`,
    description: `${username}'s library on GameHub`,
  };
}

export default async function LibraryPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await currentUser();

  return (
    <>
      <LibraryFilter />
      <section>
        <Container className="px-0 md:px-2">
          <UserMenu className="px-2" username={params.username} />
          <Separator className="mt-0 ml-2 w-[calc(100%-16px)]" />
          <div className="flex items-center justify-between gap-4 mb-4 px-2">
            <Title className="mb-0 lg:mb-0" size="large">
              {user?.username === params.username
                ? "Your"
                : `${params.username}'s`}{" "}
              Library
            </Title>
            <LibraryChangeView />
          </div>
          <LibraryFilters username={params.username} />
          <Separator className="ml-2 w-[calc(100%-16px)]" />
          <LibraryGames username={params.username} />
          <Separator className="ml-2 w-[calc(100%-16px)]" />
          {user?.username === params.username && (
            <LibraryDeleteButton username={params.username} />
          )}
        </Container>
      </section>
    </>
  );
}
