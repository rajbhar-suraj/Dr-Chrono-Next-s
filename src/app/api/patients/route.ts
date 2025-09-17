import { handleCerboRequest } from "@/lib/cerbo"
import { NextResponse } from "next/server"



export async function GET(params: any) {
    try {
        const data = await handleCerboRequest("GET", "patients");
        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
   
        const data = await handleCerboRequest("POST", "patients", body)

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        const { patient_id, ...updateBody } = body;
        const data = await handleCerboRequest("PATCH", `patients/${patient_id}`, updateBody)

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(req: Request) {
    try {
        const { patient_id } = await req.json()
        const data = await handleCerboRequest("DELETE", `patients/${patient_id}`)

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}