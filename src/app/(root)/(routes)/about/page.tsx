import { Container, ExternalLink, Subtitle, Title } from "@shared/ui";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About - GameHub",
  description: "About GameHub and its founder",
};

export default async function AboutPage() {
  return (
    <section>
      <Container>
        <Title size="large">About GameHub</Title>
        <Subtitle size="large">
          GameHub is a media discovery and tracker platform for video games.
        </Subtitle>
        <Title>Purpose</Title>
        <p className="mb-3">
          GameHub aims to accomplish the following key principles:
        </p>
        <ul className="mb-3 list-disc">
          <li>Intuitive and enjoyable experience through design choices</li>
          <li>Discover and track content based on powerful filtering</li>
          <li>
            Keep in touch with your friends while discussing your favorite games
          </li>
        </ul>
        <Title>Video Game Data</Title>
        <p className="mb-3">
          Video game data is sourced from{" "}
          <ExternalLink href="https://www.igdb.com/about">
            Internet Games Database
          </ExternalLink>{" "}
          (IGDB) which is operated by Twitch. This product uses the IGDB API but
          is not endorsed or certified by Twitch.
        </p>
        <ExternalLink className="mb-3" href="https://www.igdb.com/about">
          <Image
            src={"/images/igdb.png"}
            alt="IGDB Logo"
            width={150}
            height={150}
          />
        </ExternalLink>
        <Title>Founder</Title>
        <ExternalLink href="https://www.linkedin.com/in/volodymyr-mokhun-35005723b/">
          <div className="relative w-60 h-64">
            <Image
              src="/images/founder.jpg"
              alt="Founder of GameHub"
              className="object-cover"
              fill
            />
          </div>
          <p>Volodymyr Mokhun</p>
        </ExternalLink>
      </Container>
    </section>
  );
}
