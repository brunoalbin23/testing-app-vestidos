import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/jwt-auth";
import { listRentals, cancelRental } from "@/lib/RentalManagementSystem";
import { log } from "console";

export async function GET() {
  const admin = await isAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ rentals: listRentals() });
}

export async function POST(req: Request) {
  const admin = await isAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const id = formData.get("id") as string;
  const action = formData.get("action") as string;

  if (action === "cancel") {
    try {
      const ok = cancelRental(id); // UUID string
      if (!ok) {
        return NextResponse.json({ error: "Cancel failed" }, { status: 400 });
      }

      return NextResponse.redirect(new URL("/admin", req.url));
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}