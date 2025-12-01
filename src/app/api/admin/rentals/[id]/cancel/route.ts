import { NextResponse } from "next/server";
import { isAdmin, verifyCsrfToken } from "@/lib/CsrfSessionManagement";
import { cancelRental } from "@/lib/RentalManagementSystem";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const form = await req.formData();
  const csrf = form.get("csrf")?.toString() ?? null;
  if (!verifyCsrfToken(csrf)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 });
  }

  const result = cancelRental(id);
  
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
