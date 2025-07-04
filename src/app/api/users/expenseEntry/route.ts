import connect from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Expense from "@/models/expense";
import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/helpers/requireUser";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = requireUser(req);
        const expenses = await Expense.find({ userId });
        return Response.json(expenses);
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const userId = requireUser(request);
        const reqBody = await request.json();
        const { date, amount, description, category} = reqBody;
        console.log("Received request body:", reqBody);
        const newExpense = new Expense({
            date,
            amount,
            description,
            category,
            userId,
        });
        const savedExpense = await newExpense.save();
        console.log("Saved Expense:", savedExpense);
        return NextResponse.json({
            message: "Expense created successfully",
            success: true,
            expenseId: savedExpense._id, 
        });
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.error("Error in expense registration:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
