import { NextResponse } from "next/server";
<<<<<<< HEAD
import { isAdmin } from "@/lib/jwt-auth"; // ← nuevo auth basado en JWT
import { updateItemStock } from "@/lib/RentalManagementSystem";
=======
import { isAdmin } from "@/lib/CsrfSessionManagement";
import { updateItemStock, getItem } from "@/lib/RentalManagementSystem";
import { verifyCsrfToken } from "@/lib/CsrfSessionManagement";
>>>>>>> parent of 4d5eff9 (Merge pull request #1 from brunoalbin23/feature/admin)

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
<<<<<<< HEAD
  // Verifica JWT en la cookie admin_token
  if (!(await isAdmin())) {
=======
  if (!isAdmin()) {
>>>>>>> parent of 4d5eff9 (Merge pull request #1 from brunoalbin23/feature/admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);

  const form = await req.formData();
<<<<<<< HEAD
=======
  const csrf = form.get("csrf")?.toString() ?? null;
  if (!(await verifyCsrfToken(csrf))) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 });
  }
>>>>>>> parent of 4d5eff9 (Merge pull request #1 from brunoalbin23/feature/admin)

  const stockStr = form.get("stock")?.toString();
  if (!stockStr) {
    return NextResponse.json(
      { error: "Stock value is required" },
      { status: 400 }
    );
  }

  const stock = Number(stockStr);
  if (isNaN(stock) || stock < 0) {
    return NextResponse.json(
      { error: "Stock must be a valid non-negative number" },
      { status: 400 }
    );
  }

  const item = updateItemStock(id, stock);

  if (!item) {
    return NextResponse.json(
      { error: "Item not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ item });
}
