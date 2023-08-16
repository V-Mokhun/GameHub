import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await db.user.findUnique({ where: { username } });
    if (!user) return new NextResponse("User not found", { status: 404 });

    const conversations = await db.conversation.findMany({
      where: {
        users: {
          every: {
            AND: [{ id: userId }, { username }],
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seenBy: true,
          },
        },
      },
    });

    if (conversations.length === 0) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(conversations[0], { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get conversation");
  }
}
