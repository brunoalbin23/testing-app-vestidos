import { NextResponse } from "next/server";
import {createRental, isItemAvailable, getItem} from "../../../../lib/RentalManagementSystem";
import {verifyCsrfToken} from "../../../../lib/CsrfSessionManagement";

function normalizeDate(s: string | null) {
  if (!s) return null;
  const m = s.match(/^\d{4}-\d{2}-\d{2}$/);
  return m ? s : null;
}

const MAX_RENTAL_DAYS = 30;

function calculateDaysDifference(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export async function POST(req: Request) {
  let itemId: number | NaN = NaN;
  let name = "";
  let email = "";
  let phone = "";
  let start: string | null = null;
  let end: string | null = null;

  // Intentar leer FormData; si falla, intentar JSON body
  try {
    const form = await req.formData();
    /*const csrf = form.get("csrf")?.toString() ?? null;
    if (!verifyCsrfToken(csrf)) {
      return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 });
    }*/

    itemId = Number(form.get("itemId") || NaN);
    name = (form.get("name") || "").toString().trim();
    email = (form.get("email") || "").toString().trim();
    phone = (form.get("phone") || "").toString().trim();
    start = normalizeDate((form.get("start") || "").toString());
    end = normalizeDate((form.get("end") || "").toString());
  } catch (err) {
    try {
      const json = await req.json();
      /*const csrf = (json.csrf as string) ?? null;
      if (!verifyCsrfToken(csrf)) {
        return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 });
      }*/

      itemId = Number(json.itemId || NaN);
      name = (json.name || "").toString().trim();
      email = (json.email || "").toString().trim();
      phone = (json.phone || "").toString().trim();
      start = normalizeDate((json.start || "").toString());
      end = normalizeDate((json.end || "").toString());
    } catch (e) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
  }

  if (!itemId || !name || !email || !phone || !start || !end) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const item = getItem(itemId);
  if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
  
  if (end < start) {
    return NextResponse.json({ error: "End date must be after start date" }, { status: 400 });
  }

  const rentalDays = calculateDaysDifference(start, end);
  if (rentalDays > MAX_RENTAL_DAYS) {
    return NextResponse.json(
      { error: `Rental duration cannot exceed ${MAX_RENTAL_DAYS} days. Selected period: ${rentalDays} days.` },
      { status: 400 }
    );
  }

  if (rentalDays < 1) {
    return NextResponse.json({ error: "Rental duration must be at least 1 day" }, { status: 400 });
  }

  if (!isItemAvailable(itemId, start, end)) {
    return NextResponse.json({ error: "Item not available for selected dates" }, { status: 409 });
  }

  const { error } = createRental({
    itemId,
    start,
    end,
    customer: { name, email, phone },
  });

  if (error) return NextResponse.json({ error }, { status: 409 });

  const res = NextResponse.redirect(new URL(`/items/${itemId}?success=1`, req.url));
  return res;
}