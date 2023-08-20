import { Container } from "@shared/ui";
import { UsersPage } from "./ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community - GameHub",
  description: "Community page",
};

export default async function Users() {
  return (
    <section>
      <Container>
        <UsersPage />
      </Container>
    </section>
  );
}
