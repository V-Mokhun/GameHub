import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        username: params.username,
      },
    });

    if (!user) return new NextResponse("User not found", { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get user");
  }
}
