import { getDataFromToken } from "@/helpers/getDataFromToken";
import Expense from "@/models/expense";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = getDataFromToken(request);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // Fetch a single expense by id, but only if it belongs to the user
    try {
      const expense = await Expense.findOne({ _id: id, userId });
      if (!expense) {
        return NextResponse.json({ error: "Expense not found" }, { status: 404 });
      }
      return NextResponse.json(expense);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Fetch all expenses for the user
    try {
      const expenses = await Expense.find({ userId });
      return NextResponse.json(expenses);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

// Update an expense by ID
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Expense ID is required" }, { status: 400 });
  }

  const body = await request.json();
  const { date, amount, category, description } = body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { date, amount, category, description },
      { new: true }
    );

    if (!updatedExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ success: "Expense updated successfully", updatedExpense });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete an expense by ID
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Expense ID is required" }, { status: 400 });
  }

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ success: "Expense deleted successfully." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
