import { auth } from "@clerk/nextjs";
import { pusherServer } from "@shared/config";
import { UPDATE_CONVERSATION, UPDATE_MESSAGE } from "@shared/consts";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { conversationId } = z
      .object({ conversationId: z.string() })
      .parse(body);

    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation)
      return new NextResponse("Conversation not found", { status: 404 });

    const messages = await db.message.findMany({
      where: {
        conversationId,
        senderId: { not: userId },
        seenBy: { none: { id: userId } },
      },
    });

    await Promise.all(
      messages.map((message) =>
        db.message.update({
          where: { id: message.id },
          data: { seenBy: { connect: { id: userId } } },
        })
      )
    );

    await pusherServer.trigger(userId, UPDATE_CONVERSATION, null);

    if (messages.length > 0)
      await pusherServer.trigger(username, UPDATE_MESSAGE, null);

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to update conversation");
  }
}
