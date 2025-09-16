import {  NextRequest, NextResponse } from "next/server";
import { handleCerboRequest } from "@/lib/cerbo";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ resource: string }> }
) {
  try {
    const { resource } = await context.params; // ✅ await params

    const data = await handleCerboRequest("GET", resource || "patients");
    // console.log("get route",data)
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
