import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

  try {
    const response = await axios.post(
      process.env.DRCHRONO_TOKEN_URL!,
      new URLSearchParams({
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.DRCHRONO_REDIRECT_URI!,
        client_id: process.env.DRCHRONO_CLIENT_ID!,
        client_secret: process.env.DRCHRONO_CLIENT_SECRET!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = response.data;

    // For now, we’ll use a dummy user id or create a User record
    const userId = "demo-user-id";

    // Save tokens in DB
    await prisma.drChronoAuth.upsert({
      where: { userId },
      update: {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: new Date(Date.now() + data.expires_in * 1000),
      },
      create: {
        userId,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: new Date(Date.now() + data.expires_in * 1000),
      },
    });

    return NextResponse.redirect("/dashboard"); // frontend page after success
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    return NextResponse.json({ error: "OAuth token exchange failed" }, { status: 500 });
  }
}
