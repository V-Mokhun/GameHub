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
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    try {
      const { id, email_addresses, username, profile_image_url } = evt.data;
      let tempUsername = username;

      if (!tempUsername) {
        tempUsername = id.slice(7, 18);
      }

      await db.user.create({
        data: {
          id,
          email: email_addresses[0].email_address,
          username: tempUsername,
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

      const user = await db.user.findUnique({
        where: { id },
      });

      if (!user) return NextResponse.json({}, { status: 200 });
      if (user.username === username) {
        await db.user.update({
          where: { id },
          data: {
            email: email_addresses[0].email_address,
            username,
            imageUrl: profile_image_url,
            isPrivateLibrary,
          },
        });
      } else {
        await db.$transaction([
          db.user.update({
            where: { id },
            data: {
              email: email_addresses[0].email_address,
              username: username!,
              imageUrl: profile_image_url,
              isPrivateLibrary,
            },
          }),
          db.conversation.updateMany({
            where: {
              firstUserUsername: user.username,
            },
            data: {
              firstUserUsername: username!,
            },
          }),
          db.conversation.updateMany({
            where: { secondUserUsername: user.username },
            data: { secondUserUsername: username! },
          }),
        ]);
      }
    } catch (error) {
      catchError(error, "Could not update your profile");
    }
  } else if (eventType === "user.deleted") {
    try {
      const { id } = evt.data;

      const conversations = await db.conversation.findMany({
        where: { users: { some: { id } } },
        select: { id: true },
      });
      const userIds = await db.user.findMany({
        where: {
          conversations: {
            some: {
              id: {
                in: conversations.map((c) => c.id),
              },
            },
          },
          id: {
            not: id,
          },
        },
        select: {
          id: true,
          seenMessages: {
            where: {
              conversationId: {
                notIn: conversations.map((c) => c.id),
              },
            },
            select: {
              id: true,
            },
          },
        },
      });

      await db.$transaction([
        db.$queryRaw`DELETE FROM Message WHERE conversationId IN (${conversations
          .map((c) => c.id)
          .join(",")})`,
        db.conversation.deleteMany({
          where: {
            users: {
              some: {
                id,
              },
            },
          },
        }),
        db.user.delete({ where: { id } }),
      ]);

      await Promise.all(
        userIds.map(async ({ id, seenMessages }) => {
          db.user.update({
            where: { id },
            data: {
              conversations: {
                set: [],
                connect: conversations.map((c) => ({ id: c.id })),
              },
              seenMessages: {
                set: [],
                connect: seenMessages.map((m) => ({ id: m.id })),
              },
              friends: {
                disconnect: { id },
              },
              friendsRelation: {
                disconnect: { id },
              },
            },
          });
        })
      );
    } catch (error) {
      catchError(error, "Could not delete your profile");
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
