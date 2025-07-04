import connect from "@/dbConfig/dbConfig";
import Labour from "@/models/labour";
import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/helpers/requireUser";



connect();

export async function POST(request: NextRequest) {
    try {
        const userId = requireUser(request);
        const reqBody = await request.json();
        const { date, shift, name} = reqBody;

        console.log("Received request body:", reqBody);

        const newLabour = new Labour({
            date,
            shift,
            name,
            userId,
        });

        const savedLabour = await newLabour.save();
        console.log("Saved Labour:", savedLabour);

        return NextResponse.json({
            message: "Labour created successfully",
            success: true,
            LabourId: savedLabour._id, 
        });

    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.error("Error in labour registration:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
