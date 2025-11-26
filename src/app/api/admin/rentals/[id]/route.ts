import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/CsrfSessionManagement";
import { listRentals } from "@/lib/RentalManagementSystem";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const rentals = listRentals();
  const rental = rentals.find(r => r.id === id);

  if (!rental) {
    return NextResponse.json({ error: "Rental not found" }, { status: 404 });
  }

  return NextResponse.json({ rental });
}
