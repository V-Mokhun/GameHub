import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const data = await db.user.findUnique({
      where: { id: userId },
      select: {
        conversations: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!data) return NextResponse.json(0, { status: 200 });

    const count = await db.message.count({
      where: {
        senderId: { not: userId },
        seenBy: { none: { id: userId } },
        conversationId: { in: data.conversations.map((c) => c.id) },
      },
    });

    return NextResponse.json(count ?? 0, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get unseen messages");
  }
}
