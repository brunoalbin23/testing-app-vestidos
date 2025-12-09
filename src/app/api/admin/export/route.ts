import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/jwt-auth";
import { exportData } from "@/lib/admin-service";

export async function GET() {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = exportData();

  // Crear respuesta como JSON descargable
  const response = NextResponse.json(data);
  response.headers.set(
    "Content-Disposition",
    `attachment; filename="rental-system-backup-${new Date().toISOString().split("T")[0]}.json"`
  );
  response.headers.set("Content-Type", "application/json");

  return response;
}