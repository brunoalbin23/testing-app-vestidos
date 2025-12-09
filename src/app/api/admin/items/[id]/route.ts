import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/jwt-auth";
import { updateItem } from "@/lib/RentalManagementSystem";
import type { Category } from "@/lib/types";
import { deleteItem } from "@/lib/RentalManagementSystem";

<<<<<<< HEAD
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
=======
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const name = form.get("name")?.toString().trim();
  const category = form.get("category")?.toString() as Category | undefined;
  const pricePerDay = form.get("pricePerDay") ? Number(form.get("pricePerDay")) : undefined;
  const sizesStr = form.get("sizes")?.toString().trim();
  const color = form.get("color")?.toString().trim();
  const style = form.get("style")?.toString().trim() || undefined;
  const description = form.get("description")?.toString().trim();
  const imagesStr = form.get("images")?.toString().trim();
  const alt = form.get("alt")?.toString().trim();
  const stock = form.get("stock") ? Number(form.get("stock")) : undefined;

  const updateData: any = {};
  if (name) updateData.name = name;
  if (category) updateData.category = category;
  if (pricePerDay !== undefined) updateData.pricePerDay = pricePerDay;

  if (sizesStr) {
    const sizes = sizesStr.split(",").map((s) => s.trim()).filter(Boolean);
    if (sizes.length > 0) updateData.sizes = sizes;
  }

  if (color) updateData.color = color;
  if (style !== undefined) updateData.style = style || undefined;
  if (description) updateData.description = description;

  if (imagesStr) {
    const images = imagesStr.split(",").map((s) => s.trim()).filter(Boolean);
    if (images.length > 0) updateData.images = images;
  }

  if (alt) updateData.alt = alt;
  if (stock !== undefined) updateData.stock = stock;

  const item = updateItem(id, updateData);

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}

<<<<<<< HEAD
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
=======
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin()) {
>>>>>>> parent of 4d5eff9 (Merge pull request #1 from brunoalbin23/feature/admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);

<<<<<<< HEAD
=======
  const form = await req.formData();
  const csrf = form.get("csrf")?.toString() ?? null;
  if (!(await verifyCsrfToken(csrf))) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 });
  }

>>>>>>> parent of 4d5eff9 (Merge pull request #1 from brunoalbin23/feature/admin)
  const success = deleteItem(id);

  if (!success) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}