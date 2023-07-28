import { UserProfile } from "./ui";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  return <UserProfile username={params.username} />;
}
