import connect from "@/dbConfig/dbConfig";
import Fruit from "@/models/fruit";
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib";
import { cookies } from "next/headers";

// Ensure the database is connected
connect();


// GET: Fetch all expenses
export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession(cookies(), sessionOptions) as any;
    if (!session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const fruit = await Fruit.find({ userId: session.userId });
    return NextResponse.json(fruit);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
