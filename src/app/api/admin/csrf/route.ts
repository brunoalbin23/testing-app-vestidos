import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/jwt-auth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Con JWT, no necesitamos CSRF tokens adicionales
  // Pero mantenemos esta ruta por compatibilidad
  const token = crypto.randomUUID();
  return NextResponse.json({ token, success: true });
}

