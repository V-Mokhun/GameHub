import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { Container, Separator, Subtitle, Title } from "@shared/ui";
import { AccountForm } from "@widgets/forms";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { userId } = auth();
  if (!userId) redirect(HOME_ROUTE);

  return (
    <section>
      <Container>
        <Title size="large">Settings</Title>
        <Subtitle size="large">Set your account settings down below</Subtitle>
        <Separator />
        <AccountForm />
      </Container>
    </section>
  );
}
