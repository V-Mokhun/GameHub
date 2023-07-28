import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { user } = auth();
    const { username } = params;

    const dbUser = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        library: true,
      },
    });

    if (!dbUser) return new NextResponse("User not found", { status: 404 });

    if (user?.username !== username && dbUser.isPrivateLibrary)
      return new NextResponse("User library is private", { status: 403 });

    return NextResponse.json(dbUser.library, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get user library");
  }
}
