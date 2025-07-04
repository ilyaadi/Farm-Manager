import connect from "@/dbConfig/dbConfig";
import Fruit from "@/models/fruit";
import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/helpers/requireUser";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = requireUser(request);
        console.log('userId in fruitEntry POST:', userId);
        const reqBody = await request.json();
        const { date, row, collumn, count } = reqBody;

        console.log("Received fruit entry body:", reqBody);

        const newFruit = new Fruit({
            date,
            row,
            collumn,
            count,
            userId,
        });

        const savedFruit = await newFruit.save();
        console.log("Saved Fruit Entry:", savedFruit);

        return NextResponse.json({
            message: "Fruit created successfully",
            success: true,
            fruitId: savedFruit._id, 
        });

    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.error("Error in fruit entry registration:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}