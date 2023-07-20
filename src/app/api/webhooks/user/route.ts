import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

type AuthUser = {
  id: string;
  username: string | null;
  email_addresses: { id: string; email_address: string }[];
  profile_image_url: string;
  unsafe_metadata: { isPrivateLibrary: boolean };
};

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";

type Event = {
  data: AuthUser;
  object: "event";
  type: EventType;
};

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(req: Request) {
  const payload = await req.json();
  const headersList = headers();

  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    try {
      const { id, email_addresses, username, profile_image_url } = evt.data;

      await db.user.create({
        data: {
          id,
          email: email_addresses[0].email_address,
          username,
          imageUrl: profile_image_url,
        },
      });
    } catch (error) {
      catchError(error, "Could not create your profile");
    }
  } else if (eventType === "user.updated") {
    try {
      const {
        id,
        email_addresses,
        username,
        profile_image_url,
        unsafe_metadata: { isPrivateLibrary },
      } = evt.data;

      await db.user.update({
        where: { id },
        data: {
          email: email_addresses[0].email_address,
          username: username!,
          imageUrl: profile_image_url,
          isPrivateLibrary,
        },
      });
    } catch (error) {
      catchError(error, "Could not update your profile");
    }
  } else if (eventType === "user.deleted") {
    try {
      const { id } = evt.data;
      await db.user.delete({ where: { id } });
    } catch (error) {
      catchError(error, "Could not delete your profile");
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
