// app/api/appointments/route.ts or wherever your route is
import { handleCerboRequest } from "@/lib/cerbo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        // Extract query params from the request
        const limit = searchParams.get("limit") || "100";
        const page = searchParams.get("page") || "1";
        const start_date = searchParams.get("start_date") || "2025-05-01";
        const end_date = searchParams.get("end_date") || "2025-09-16";
        const status = searchParams.get("status") || ""; // confirmed, pending, cancelled
 
        // Calculate offset for pagination
        const offset = (parseInt(page) - 1) * parseInt(limit);

        // Build Cerbo API URL with query params
        const cerboUrl = `appointments?limit=${limit}&offset=${offset}&start_date=${start_date}&end_date=${end_date}${status ? `&status=${status}` : ""}`;

        const data = await handleCerboRequest("GET", cerboUrl);

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
