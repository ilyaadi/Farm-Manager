import connect from "@/dbConfig/dbConfig";
import Expense from "@/models/expense";
import { NextRequest, NextResponse } from "next/server";



connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { date, amount, description, category} = reqBody;

        console.log("Received request body:", reqBody);

        const newExpense = new Expense({
            date,
            amount,
            description,
            category,
        });

        const savedExpense = await newExpense.save();
        console.log("Saved Expense:", savedExpense);

        return NextResponse.json({
            message: "Expense created successfully",
            success: true,
            expenseId: savedExpense._id, 
        });

    } catch (error: any) {
        console.error("Error in expense registration:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
