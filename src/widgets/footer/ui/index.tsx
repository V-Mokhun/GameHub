import { ABOUT_ROUTE, PRIVACY_ROUTE, TERMS_ROUTE } from "@shared/consts";
import { Container, Link, Logo } from "@shared/ui";

export const Footer = () => {
  return (
    <footer className="relative z-20 bg-white dark:bg-black p-4">
      <Container>
        <div className="flex flex-col lg:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-2">
            <Logo
              svgProps={{ className: "w-8 h-4 md:w-10 md:h-5" }}
              titleProps={{ className: "text-lg md:text-xl" }}
            />
            <p>
              <span className="block md:inline-block">
                Built by{" "}
                <a
                  className="text-secondary hover:text-secondary-hover transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/V-Mokhun"
                >
                  Volodymyr Mokhun
                </a>
                .{" "}
              </span>{" "}
              <span className="block md:inline-block">
                The source code is available on{" "}
                <a
                  className="text-secondary hover:text-secondary-hover transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/V-Mokhun/GameHub"
                >
                  Github
                </a>
              </span>
            </p>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link href={PRIVACY_ROUTE}>Privacy</Link>
            </li>
            <li>
              <Link href={TERMS_ROUTE}>Terms</Link>
            </li>
            <li>
              <Link href={ABOUT_ROUTE}>About</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};
