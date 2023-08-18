import { auth, currentUser } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const authUser = await currentUser();

    if (!authUser?.id) return new NextResponse("Unauthorized", { status: 401 });

    const user = await db.user.findUnique({ where: { username } });
    if (!user) return new NextResponse("User not found", { status: 404 });

    const conversations = await db.conversation.findMany({
      where: {
        OR: [
          { userUsernames: `${authUser.username},${username}` },
          { userUsernames: `${username},${authUser.username}` },
        ],
      },
      include: {
        users: true,
      },
    });

    if (conversations.length === 0) {
      return NextResponse.json({ conversation: null, user }, { status: 200 });
    }

    return NextResponse.json(
      { conversation: conversations[0], user },
      { status: 200 }
    );
  } catch (error) {
    return catchError(error, "Failed to get conversation");
  }
}
