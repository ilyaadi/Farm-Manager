import connect from "@/dbConfig/dbConfig";
import Labour from "@/models/labour";
import { NextRequest, NextResponse } from "next/server";



connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { date, shift, name} = reqBody;

        console.log("Received request body:", reqBody);

        const newLabour = new Labour({
            date,
            shift,
            name,
        });

        const savedLabour = await newLabour.save();
        console.log("Saved Labour:", savedLabour);

        return NextResponse.json({
            message: "Labour created successfully",
            success: true,
            LabourId: savedLabour._id, 
        });

    } catch (error: any) {
        console.error("Error in labour registration:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
