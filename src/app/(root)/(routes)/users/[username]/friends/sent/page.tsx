import { Container } from "@shared/ui";
import { UserFriendRequests } from "../ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sent Friend Requests - GameHub",
  description: "Sent friend requests page",
};

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
