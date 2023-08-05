import { Toaster } from "@shared/ui";
import "@shared/styles/globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider, ThemeProvider } from "./providers";

const font = Open_Sans({
  subsets: ["latin"],
});

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
        <body
          className={`${font.className} selection:text-primary-foreground selection:bg-primary`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
