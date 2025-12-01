import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/jwt-auth";
import { listRentals } from "@/lib/RentalManagementSystem";

export async function GET() {
  const admin = await isAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ rentals: listRentals() });
}
