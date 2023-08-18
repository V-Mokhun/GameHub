import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const body = await req.json();
    const { conversationId } = z
      .object({ conversationId: z.string().optional() })
      .parse(body);

    if (!conversationId) return NextResponse.json([], { status: 200 });

    const messages = await db.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: true,
        seenBy: true,
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get messages");
  }
}
