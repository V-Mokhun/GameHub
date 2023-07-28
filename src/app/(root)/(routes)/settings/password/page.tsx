import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { Container, Separator, Title } from "@shared/ui";
import { PasswordForm } from "@widgets/forms";
import { redirect } from "next/navigation";
import { SettingsMenu } from "../ui";

export default async function SettingsPasswordPage() {
  const { userId } = auth();
  if (!userId) redirect(HOME_ROUTE);

  return (
    <section>
      <Container>
        <Title className="lg:mb-4" size="large">Change your password</Title>
        <SettingsMenu />
        <Separator />
        <PasswordForm />
      </Container>
    </section>
  );
}
