import { Logo, Title } from "@shared/ui";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center h-full w-full">
      <div className="hidden lg:flex w-1/2 h-full bg-primary flex-col items-center justify-center relative text-background dark:text-foreground bg-gradient-to-br from-primary from-40% to-secondary to-[125%]">
        <Logo className="absolute left-5 top-8" />
        <div className="p-10 text-center max-w-xl mx-auto">
          <Title size="huge" className="mb-8">
            Track your games, <br /> find your friends.
          </Title>
          <p className="text-white opacity-70 uppercase tracking-wide">
            Join to the community of gamers
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-10 text-center max-w-md mx-auto">{children}</div>
    </div>
  );
}
