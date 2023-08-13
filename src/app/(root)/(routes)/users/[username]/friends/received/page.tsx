import { Container } from "@shared/ui";
import { UserFriendRequests } from "../ui";

export default async function UserFriendsReceivedPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <section>
      <Container>
        <UserFriendRequests username={params.username} />
      </Container>
    </section>
  );
}
