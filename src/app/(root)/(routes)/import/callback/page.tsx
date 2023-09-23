import { auth } from "@clerk/nextjs";
import { steam } from "@shared/config/steam";
import { HOME_ROUTE } from "@shared/consts";
import { Container, ExternalLink, Subtitle, Title } from "@shared/ui";
import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Import Games - GameHub",
  description: "Import your games from Steam",
};

export default async function ImportCallback({
  searchParams,
}: {
  searchParams: { "openid.claimed_id": string };
}) {
  const { userId } = auth();
  if (!userId) redirect(HOME_ROUTE);
  const profileId = searchParams["openid.claimed_id"].split("/").pop();

  return <section></section>;
}
