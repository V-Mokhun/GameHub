import { Separator, Subtitle, Title } from "@shared/ui";
import { AccountForm } from "@widgets/forms";

export default async function SettingsPage() {
  return (
    <section className="max-w-7xl px-2 md:px-4">
      <Title size="large">Settings</Title>
      <Subtitle size="large">Set your account settings down below</Subtitle>
      <Separator />
      <AccountForm />
    </section>
  );
}
