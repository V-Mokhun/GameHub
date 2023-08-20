import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { Container, Separator, Subtitle, Title } from "@shared/ui";
import { AccountForm } from "@widgets/forms";
import { redirect } from "next/navigation";
import { SettingsMenu } from "./ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - GameHub",
  description: "Settings page",
};

export default async function SettingsPage() {
  const { userId } = auth();
  if (!userId) redirect(HOME_ROUTE);

  return (
    <section>
      <Container>
        <Title size="large">Settings</Title>
        <Subtitle size="large">Set your account settings down below</Subtitle>
        <SettingsMenu />
        <Separator />
        <AccountForm />
      </Container>
    </section>
  );
}
