import { Container } from "@shared/ui";
import { UserFriends } from "./ui";
import { Metadata } from "next";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  return {
    title: `${username}'s Friends - GameHub`,
    description: `${username}'s friends on GameHub`,
  };
}

export default async function UserFriendsPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <section>
      <Container>
        <UserFriends username={params.username} />
      </Container>
    </section>
  );
}
