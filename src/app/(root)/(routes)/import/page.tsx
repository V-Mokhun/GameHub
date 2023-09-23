import { auth } from "@clerk/nextjs";
import { steam } from "@shared/config/steam";
import { HOME_ROUTE } from "@shared/consts";
import { Container, ExternalLink, Subtitle, Title } from "@shared/ui";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Import Games - GameHub",
  description: "Import your games from Steam",
};

export default async function Import() {
  const { userId } = auth();

  if (!userId) redirect(HOME_ROUTE);

  const url = await steam.getRedirectUrl();

  return (
    <section>
      <Container>
        <Title size="large">Import Games</Title>
        <Subtitle size="large">
          You can import your games from Steam, but beware that not all games
          may be imported.
        </Subtitle>
        <ExternalLink aria-label="Click to login through Steam" href={url}>
          <Image src="/images/steam.png" alt="Steam" width={180} height={35} />
        </ExternalLink>
      </Container>
    </section>
  );
}
