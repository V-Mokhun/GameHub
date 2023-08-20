import { Container } from "@shared/ui";
import { UserRatings } from "./ui";
import { Metadata } from "next";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  return {
    title: `${username}'s Ratings - GameHub`,
    description: `${username}'s ratings on GameHub`,
  };
}

export default async function UserRatingsPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <section>
      <Container>
        <UserRatings username={params.username} />
      </Container>
    </section>
  );
}
