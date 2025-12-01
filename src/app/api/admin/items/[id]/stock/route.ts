import { NextResponse } from "next/server";
import { isAdmin, verifyCsrfToken } from "@/lib/CsrfSessionManagement";
import { updateItemStock } from "@/lib/RentalManagementSystem";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);

  const form = await req.formData();
  const csrf = form.get("csrf")?.toString() ?? null;
  if (!verifyCsrfToken(csrf)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 });
  }

  const stockStr = form.get("stock")?.toString();
  if (!stockStr) {
    return NextResponse.json({ error: "Stock value is required" }, { status: 400 });
  }

  const stock = Number(stockStr);
  if (isNaN(stock) || stock < 0) {
    return NextResponse.json({ error: "Stock must be a valid non-negative number" }, { status: 400 });
  }

  const item = updateItemStock(id, stock);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}

