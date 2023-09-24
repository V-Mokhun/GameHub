import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const form = await req.formData();

    const { data } = await axios.post<{
      results: {
        status: { code: string; message: string };
        name: string;
        width: number;
        height: number;
        entities: {
          kind: string;
          name: string;
          classes: { nsfw: number; sfw: number };
        }[];
      }[];
    }>("https://nsfw3.p.rapidapi.com/v1/results", form, {
      headers: {
        "X-RapidAPI-Key": process.env.NSFW_API_KEY,
        "X-RapidAPI-Host": process.env.NSFW_API_HOST,
      },
    });
    const probs = data.results[0].entities[0].classes;

    const isNsfw = probs.nsfw > probs.sfw;

    return NextResponse.json({ isNsfw }, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to moderate image");
  }
}
