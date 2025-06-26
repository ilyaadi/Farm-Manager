import Labour from "@/models/labour"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const name = searchParams.get("name");

    const filter: any = {};

    if (startDate) {
        filter.date = { $gte: new Date(startDate) }; // Greater than or equal to startDate
    }

    if (endDate) {
        filter.date = { ...filter.date, $lte: new Date(endDate) }; // Less than or equal to endDate
    }

    if (name) {
        filter.name = name; // Filter by name
    }

    try {
        const labours = await Labour.find(filter); // Fetch labours with filters
        return NextResponse.json(labours);
    } catch (error) {
        console.error("Error fetching labours:", error);
        return NextResponse.error();
    }
}
