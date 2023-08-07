import { Container, Subtitle, Title } from "@shared/ui";
import Image from "next/image";

export const HomeHero = ({}) => {
  return (
    <section className="relative -mt-5 md:-mt-3 flex flex-col items-center justify-center min-h-[30vh] mb-4 md:mb-6">
      <div className="absolute left-0 right-0 h-full">
        <Image
          src={"/images/home-banner.jpg"}
          fill
          className="aspect-video object-cover blur-sm"
          alt="Games banner"
        />
      </div>
      <Container>
        <div className="text-white relative z-[1] text-center py-12 md:py-16">
          <Title size="large" className="drop-shadow-lg">
            Unlock Your Gaming Journey
          </Title>
          <Title size="small" className="drop-shadow-lg">
            Your one-stop destination for game information, library management,
            and community engagement.
          </Title>
        </div>
      </Container>
    </section>
  );
};
