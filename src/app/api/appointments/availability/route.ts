import { handleCerboRequest } from "@/lib/cerbo";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const data = await handleCerboRequest("GET", "appointments/availability?start_date=2024-09-01&end_date=2024-10-01&provider_ids[]=473&appointment_type_ids[]=8&appointment_type_ids[]=341")
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}