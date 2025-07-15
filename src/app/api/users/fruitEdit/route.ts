import Fruit from "@/models/fruit";
import { NextResponse } from "next/server";

// Fetch a fruit by ID
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Fruit ID is required" }, { status: 400 });
  }

  try {
    const fruit = await Fruit.findById(id);
    if (!fruit) {
      return NextResponse.json({ error: "Fruit not found" }, { status: 404 });
    }
    return NextResponse.json(fruit);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a fruit by ID
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Fruit ID is required" }, { status: 400 });
  }

  const body = await request.json();
  const { date, count, row, collumn, message } = body;

  try {
    const updatedFruit = await Fruit.findByIdAndUpdate(
      id,
      { date, count, row, collumn, message },
      { new: true }
    );
    if (!updatedFruit) {
      return NextResponse.json({ error: "Fruit not found" }, { status: 404 });
    }
    return NextResponse.json({ success: "Fruit updated successfully", updatedFruit });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a fruit by ID
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Fruit ID is required" }, { status: 400 });
  }

  try {
    const deletedFruit = await Fruit.findByIdAndDelete(id);
    if (!deletedFruit) {
      return NextResponse.json({ error: "Fruit not found" }, { status: 404 });
    }
    return NextResponse.json({ success: "Fruit deleted successfully." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}