import { currentUser } from "@clerk/nextjs";
import { pusherServer } from "@shared/config";
import { CREATE_MESSAGE, UPDATE_CONVERSATION } from "@shared/consts";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) return new NextResponse("Unauthorized", { status: 401 });
    const { username } = params;

    const body = await req.json();
    const { message, image, conversationId, replyingMessage } = z
      .object({
        message: z.string().max(1000).optional(),
        image: z.string().optional(),
        conversationId: z.string().optional(),
        replyingMessage: z.any(),
      })
      .parse(body);

    let convId = conversationId;
    if (!convId) {
      const conversation = await db.conversation.create({
        data: {
          firstUserUsername: user.username!,
          secondUserUsername: username,
          users: { connect: [{ id: user.id }, { username }] },
        },
      });
      convId = conversation.id;
    }

    const data: any = {
      body: message,
      image,
      conversation: {
        connect: {
          id: convId,
        },
      },
      sender: {
        connect: {
          id: user.id,
        },
      },
      seenBy: {
        connect: {
          id: user.id,
        },
      },
    };

    if (replyingMessage) {
      data.replyingTo = {
        connect: {
          id: replyingMessage.id,
        },
      };
    }

    const { id } = await db.message.create({
      data,
      include: {
        seenBy: true,
        sender: true,
        replyingTo: true,
      },
    });

    const updatedConversation = await db.conversation.update({
      where: { id: convId },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id,
          },
        },
      },
      include: {
        users: true,
      },
    });

    await pusherServer.trigger(username, CREATE_MESSAGE, null);

    updatedConversation.users.forEach((user) => {
      pusherServer.trigger(user.id, UPDATE_CONVERSATION, null);
    });

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to send message");
  }
}
