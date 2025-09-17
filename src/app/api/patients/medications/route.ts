import { handleCerboRequest } from "@/lib/cerbo"
import { NextResponse } from "next/server"



export async function GET(params: any) {
    try {
        const data = await handleCerboRequest("GET", "patients/{patient_id}/rxs");
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
