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
      <main className="flex-1 sm:pb-4 md:pb-5 pt-20 md:pl-[220px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
