import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/jwt-auth";
import { listItems, listRentals, getItemRentals } from "@/lib/RentalManagementSystem";

export async function GET() {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = listItems();
  const rentals = listRentals();

  // Calcular estadísticas
  const stats = {
    totalItems: items.length,
    totalRentals: rentals.length,
    activeRentals: rentals.filter(r => r.status === "active").length,
    canceledRentals: rentals.filter(r => r.status === "canceled").length,
    totalRevenue: items.reduce((sum, item) => {
      const itemRentals = rentals.filter(r => r.itemId === item.id && r.status === "active");
      const days = itemRentals.reduce((d, r) => {
        const start = new Date(r.start);
        const end = new Date(r.end);
        return d + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      }, 0);
      return sum + (days * item.pricePerDay);
    }, 0),
  };

  // Información de items con rentals
  const itemsWithRentals = items.map(item => ({
    ...item,
    activeRentals: getItemRentals(item.id),
  }));

  return NextResponse.json({
    stats,
    items: itemsWithRentals,
    rentals,
  });
}
