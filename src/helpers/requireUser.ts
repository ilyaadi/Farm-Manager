import { NextRequest } from "next/server";
import { getDataFromToken } from "./getDataFromToken";

export function requireUser(request: NextRequest): string {
  const userId = getDataFromToken(request);
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
} 