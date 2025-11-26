import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/CsrfSessionManagement";
import { getSystemStats, getItemsWithUsageStats } from "@/lib/admin-service";

export async function GET() {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const systemStats = getSystemStats();
  const itemsWithStats = getItemsWithUsageStats();

  // Top 5 items más alquilados
  const topItems = [...itemsWithStats]
    .sort((a, b) => b.totalRentals - a.totalRentals)
    .slice(0, 5);

  // Top 5 items con mayor ingresos
  const topRevenue = [...itemsWithStats]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);

  return NextResponse.json({
    stats: systemStats,
    topItems,
    topRevenue,
    allItemsStats: itemsWithStats,
  });
}
