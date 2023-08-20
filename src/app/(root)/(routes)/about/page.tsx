import { Container, ExternalLink, Subtitle, Title } from "@shared/ui";
import Image from "next/image";

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
