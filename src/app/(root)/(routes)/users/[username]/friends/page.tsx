import { Container } from "@shared/ui";
import { UserFriends } from "./ui";

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
