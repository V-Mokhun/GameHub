import { User } from "@clerk/nextjs/server";
import { db } from "@shared/lib/db";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";

type Event = {
  data: User;
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
    const { id, ...attr } = evt.data;
    console.log(id, attr);
  }

  return NextResponse.json({}, { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
