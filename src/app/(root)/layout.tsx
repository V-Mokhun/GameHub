import { Header } from "@widgets/header";
import { Sidebar } from "@widgets/sidebar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
}
