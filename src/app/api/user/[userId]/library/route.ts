import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: signedInUserId } = auth();
    const { userId } = params;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        library: true,
      },
    });

    if (!user) return new NextResponse("User not found", { status: 404 });

    if (signedInUserId !== userId && user.isPrivateLibrary)
      return new NextResponse("User library is private", { status: 403 });

    return NextResponse.json(user.library, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get user library");
  }
}
