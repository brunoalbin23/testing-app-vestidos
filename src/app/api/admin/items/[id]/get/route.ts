import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/CsrfSessionManagement";
import { getItem } from "@/lib/RentalManagementSystem";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
  }

  const item = getItem(id);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}
