import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const conversations = await db.conversation.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: {
            sender: true,
            seenBy: true,
          },
        },
      },
    });

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get messages");
  }
}
