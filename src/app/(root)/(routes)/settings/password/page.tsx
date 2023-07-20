import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { Container, Separator, Title } from "@shared/ui";
import { PasswordForm } from "@widgets/forms";
import { redirect } from "next/navigation";

export default async function SettingsPasswordPage() {
  const { userId } = auth();
  if (!userId) redirect(HOME_ROUTE);

  return (
    <section>
      <Container>
        <Title size="large">Change your password</Title>
        <Separator />
        <PasswordForm />
      </Container>
    </section>
  );
}
