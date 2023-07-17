import { Toaster } from "@shared/ui";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameHub",
  description: "A place to explore games and share your experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className} dar`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
