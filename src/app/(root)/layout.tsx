import { ActiveStatus } from "@shared/ui/active-status";
import { Footer } from "@widgets/footer";
import { Header } from "@widgets/header";
import { Sidebar } from "@widgets/sidebar";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <Sidebar />
      <ActiveStatus />
      <main className="flex-1 pb-4 md:pb-5 pt-20 md:pl-[190px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
