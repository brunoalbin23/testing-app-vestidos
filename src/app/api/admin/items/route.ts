import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/jwt-auth";
import { createItem, listItems } from "@/lib/RentalManagementSystem";
import type { Category } from "@/lib/types";

export async function GET() {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = listItems();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const name = form.get("name")?.toString().trim();
  const category = form.get("category")?.toString() as Category | undefined;
  const pricePerDay = Number(form.get("pricePerDay"));
  const sizesStr = form.get("sizes")?.toString().trim();
  const color = form.get("color")?.toString().trim();
  const style = form.get("style")?.toString().trim() || undefined;
  const description = form.get("description")?.toString().trim();
  const imagesStr = form.get("images")?.toString().trim();
  const alt = form.get("alt")?.toString().trim();
  const stock = form.get("stock") ? Number(form.get("stock")) : undefined;

  if (!name || !category || !pricePerDay || !sizesStr || !color || !description || !imagesStr || !alt) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const sizes = sizesStr.split(",").map((s) => s.trim()).filter(Boolean);
  const images = imagesStr.split(",").map((s) => s.trim()).filter(Boolean);

  if (sizes.length === 0 || images.length === 0) {
    return NextResponse.json({ error: "Sizes and images must have at least one value" }, { status: 400 });
  }

  const item = createItem({
    name,
    category,
    pricePerDay,
    sizes,
    color,
    style,
    description,
    images,
    alt,
    stock,
  });

  return NextResponse.json({ item }, { status: 201 });
}