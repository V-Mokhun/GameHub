import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { Separator, Subtitle, Title } from "@shared/ui";
import { AccountForm } from "@widgets/forms";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { userId } = auth();
  if (!userId) redirect(HOME_ROUTE);

  return (
    <section className="max-w-7xl px-2 md:px-4 h-full flex flex-col">
      <Title size="large">Settings</Title>
      <Subtitle size="large">Set your account settings down below</Subtitle>
      <Separator />
      <AccountForm />
    </section>
  );
}
