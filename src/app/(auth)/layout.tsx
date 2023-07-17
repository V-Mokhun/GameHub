import { Logo, Title } from "@shared/ui";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center h-full w-full">
      <div className="flex w-full lg:w-1/2 lg:h-full bg-primary flex-col items-center justify-center relative py-10 px-6 lg:o-0 text-background dark:text-foreground bg-gradient-to-br from-primary from-40% to-secondary to-[125%]">
        <Logo className="static mb-6 lg:mb-0 lg:absolute left-5 top-8" />
        <div className="lg:p-10 text-center max-w-xl mx-auto">
          <Title size="huge" className="mb-8">
            Track your games, <br /> find your friends.
          </Title>
          <p className="text-white opacity-70 uppercase tracking-wide">
            Join to the community of gamers
          </p>
        </div>
      </div>
      <div className="w-full h-full lg:h-auto md:w-1/2 py-10 px-6 lg:p-10 text-center max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
}
