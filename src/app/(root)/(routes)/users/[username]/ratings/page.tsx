import { Container, Title } from "@shared/ui";
import { UserRatings } from "./ui";

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
