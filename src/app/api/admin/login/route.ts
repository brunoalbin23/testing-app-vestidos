import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/CsrfSessionManagement";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const form = await req.formData();
  const username = (form.get("username") || "").toString();
  const password = (form.get("password") || "").toString();

  const expectedUsername = "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  if (username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.redirect(new URL("/admin", req.url));
}
