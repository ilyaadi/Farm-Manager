import Fruit from "@/models/fruit";
import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/helpers/requireUser";

// Fetch an expense by ID
export async function GET(request: NextRequest) {
  try {
    const userId = requireUser(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Fruit ID is required" }, { status: 400 });
    }
    const fruit = await Fruit.findOne({ _id: id, userId });
    if (!fruit) {
      return NextResponse.json({ error: "Fruit not found" }, { status: 404 });
    }
    return NextResponse.json(fruit);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update an expense by ID
export async function PUT(request: NextRequest) {
  try {
    const userId = requireUser(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Fruit ID is required" }, { status: 400 });
    }
    const body = await request.json();
    const { date, count, row, collumn, description } = body;
    const updatedFruit = await Fruit.findOneAndUpdate(
      { _id: id, userId },
      { date, count, row, collumn, description },
      { new: true }
    );
    if (!updatedFruit) {
      return NextResponse.json({ error: "Fruit not found" }, { status: 404 });
    }
    return NextResponse.json({ success: "Fruit updated successfully", updatedFruit });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete an expense by ID
export async function DELETE(request: NextRequest) {
  try {
    const userId = requireUser(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Fruit ID is required" }, { status: 400 });
    }
    const deletedFruit = await Fruit.findOneAndDelete({ _id: id, userId });
    if (!deletedFruit) {
      return NextResponse.json({ error: "Fruit not found" }, { status: 404 });
    }
    return NextResponse.json({ success: "Fruit deleted successfully." }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
