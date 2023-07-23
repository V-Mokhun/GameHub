import { Header } from "@widgets/header";
import { Sidebar } from "@widgets/sidebar";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="px-2 sm:px-4 sm:pb-4 md:px-5 md:pb-5 pt-20 md:pl-[240px]">
        {children}
      </main>
    </>
  );
}
