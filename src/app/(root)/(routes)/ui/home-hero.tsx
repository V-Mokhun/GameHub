import { BROWSE_ROUTE } from "@shared/consts";
import { Container, Title, buttonVariants } from "@shared/ui";
import Image from "next/image";
import Link from "next/link";

export const HomeHero = ({}) => {
  return (
    <section className="relative -mt-6 md:-mt-4 flex flex-col items-center justify-center min-h-[30vh] mb-4 md:mb-6 overflow-hidden after:block after:absolute after:left-0 after:top-0 after:bg-black/20 after:z-[1] after:w-full after:h-full">
      <div className="absolute left-0 right-0 h-full z-0">
        <Image
          src={"/images/home-banner.jpg"}
          fill
          className="aspect-video object-cover blur-[2px]"
          alt="Games banner"
          priority
        />
      </div>
      <Container className="relative z-[2]">
        <div className="text-white text-center py-12 md:py-16">
          <Title size="huge" className="drop-shadow-lg">
            Unlock Your Gaming Journey
          </Title>
          <Title size="small" className="drop-shadow-lg">
            Your one-stop destination for game information, library management,
            and community engagement.
          </Title>
          <Link
            href={BROWSE_ROUTE}
            className={buttonVariants({
              size: "lg",
              className: "md:mt-6 mt-4 md:text-lg",
            })}
          >
            Browse Games
          </Link>
        </div>
      </Container>
    </section>
  );
};
