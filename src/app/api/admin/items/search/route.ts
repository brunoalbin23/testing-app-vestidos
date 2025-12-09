import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/CsrfSessionManagement";
import { listItems, getAvailableSizes, getAvailableColors, getAvailableStyles } from "@/lib/RentalManagementSystem";
import type { Category } from "@/lib/types";

export async function GET(req: Request) {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const category = searchParams.get("category") as Category | undefined;
  const size = searchParams.get("size") || undefined;
  const color = searchParams.get("color") || undefined;
  const style = searchParams.get("style") || undefined;
  const sortBy = searchParams.get("sortBy") || "name"; // name, price, category
  const sortOrder = searchParams.get("sortOrder") || "asc"; // asc, desc

  let items = listItems({
    q,
    category,
    size,
    color,
    style,
  });

  // Aplicar ordenamiento
  if (sortBy === "price") {
    items.sort((a, b) => 
      sortOrder === "asc" ? a.pricePerDay - b.pricePerDay : b.pricePerDay - a.pricePerDay
    );
  } else if (sortBy === "category") {
    items.sort((a, b) =>
      sortOrder === "asc" 
        ? a.category.localeCompare(b.category) 
        : b.category.localeCompare(a.category)
    );
  } else {
    // name (default)
    items.sort((a, b) =>
      sortOrder === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name)
    );
  }

  const filters = {
    sizes: getAvailableSizes(),
    colors: getAvailableColors(),
    styles: getAvailableStyles(),
  };

  return NextResponse.json({ 
    items, 
    filters,
    totalResults: items.length,
    query: {
      q,
      category,
      size,
      color,
      style,
      sortBy,
      sortOrder,
    }
  });
}