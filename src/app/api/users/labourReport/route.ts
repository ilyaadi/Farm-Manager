import Labour from "@/models/labour"; // Adjust the import path as necessary
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const session = await getIronSession(cookies(), sessionOptions) as any;
        if (!session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const name = searchParams.get("name");
        const filter: any = { userId: session.userId };
        if (startDate) {
            filter.date = { $gte: new Date(startDate) };
        }
        if (endDate) {
            filter.date = { ...filter.date, $lte: new Date(endDate) };
        }
        if (name) {
            filter.name = name;
        }
        const labours = await Labour.find(filter);
        return NextResponse.json(labours);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
