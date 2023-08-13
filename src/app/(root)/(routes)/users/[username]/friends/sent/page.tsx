import { Container } from "@shared/ui";
import { UserFriendRequests } from "../ui";

export default async function UserFriendsSentPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <section>
      <Container>
        <UserFriendRequests sent username={params.username} />
      </Container>
    </section>
  );
}
