import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
  } catch (error) {
    return catchError(error, "Could not import Steam library.");
  }
}
