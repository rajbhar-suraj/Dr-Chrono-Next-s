import { NextResponse } from "next/server";
import { handleCerboRequest } from "@/lib/cerboClient";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const resource = url.searchParams.get("resource") || "patients";

    const data = await handleCerboRequest("GET", resource);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
