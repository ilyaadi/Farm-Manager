import connect from "@/dbConfig/dbConfig";
import Fruit from "@/models/fruit";
import { NextRequest, NextResponse } from "next/server";

// Ensure the database is connected
connect();


// GET: Fetch all expenses
export async function GET(request: NextRequest) {
  try {
    const fruit = await Fruit.find(); 
    console.log("Fetched Fruits:", fruit);

    return NextResponse.json(fruit);
  } catch (error: any) {
    console.error("Error fetching fruits:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
