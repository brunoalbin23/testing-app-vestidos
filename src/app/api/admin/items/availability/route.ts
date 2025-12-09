import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/CsrfSessionManagement";
import { listItems, isItemAvailable, getItemRentals } from "@/lib/RentalManagementSystem";

export async function GET(req: Request) {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "Both 'start' and 'end' query parameters are required" },
      { status: 400 }
    );
  }

  const items = listItems();

  const availability = items.map(item => ({
    id: item.id,
    name: item.name,
    available: isItemAvailable(item.id, startDate, endDate),
    bookedDates: getItemRentals(item.id).map(r => ({
      start: r.start,
      end: r.end,
      customer: r.customer.name,
    })),
  }));

  return NextResponse.json({ availability });
}