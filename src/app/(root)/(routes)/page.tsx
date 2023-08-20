import { Metadata } from "next";
import { HomePage } from "./ui";

export const metadata: Metadata = {
  title: "Home - GameHub",
  description: "Welcome to GameHub!",
};

export default async function Home() {
  return <HomePage />;
}
