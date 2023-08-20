import { Container } from "@shared/ui";
import { UserProfile } from "./ui";
import { Metadata } from "next";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  return {
    title: `${username} - GameHub`,
    description: `${username} on GameHub`,
  };
}

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <section>
      <Container>
        <UserProfile username={params.username} />
      </Container>
    </section>
  );
}
