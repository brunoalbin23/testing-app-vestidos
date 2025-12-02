import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdmin } from "@/lib/CsrfSessionManagement";

const CSRF_COOKIE = "gr_csrf";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const c = await cookies();
  let csrfToken = c.get(CSRF_COOKIE)?.value;

  // Si no existe, crear uno nuevo
  if (!csrfToken) {
    csrfToken = crypto.randomUUID();
  }

  // Siempre establecer la cookie en la respuesta para asegurar que esté disponible
  const response = NextResponse.json({ token: csrfToken, success: true });
  response.cookies.set(CSRF_COOKIE, csrfToken, {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  
  return response;
}

