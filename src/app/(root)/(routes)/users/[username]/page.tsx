import { Container } from "@shared/ui";
import { UserProfile } from "./ui";

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
