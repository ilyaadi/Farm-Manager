import connect from "@/dbConfig/dbConfig";
import Expense from "@/models/expense";
import { NextRequest, NextResponse } from "next/server";

// Ensure the database is connected
connect();


// GET: Fetch all expenses
export async function GET(request: NextRequest) {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from the database
    console.log("Fetched Expenses:", expenses);

    return NextResponse.json(expenses); // Return the list of expenses as JSON
  } catch (error: any) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
