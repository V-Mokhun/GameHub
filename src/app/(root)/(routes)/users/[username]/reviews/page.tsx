import { Container } from "@shared/ui";
import { UserReviews } from "./ui";
import { Metadata } from "next";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  return {
    title: `${username}'s Reviews - GameHub`,
    description: `${username}'s reviews on GameHub`,
  };
}

export default async function UserReviewsPage({ params }: Props) {
  return (
    <section>
      <Container>
        <UserReviews username={params.username} />
      </Container>
    </section>
  );
}
