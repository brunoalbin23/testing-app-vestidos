import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "@/lib/jwt-secret";

const encoder = new TextEncoder();

// Hash pre-generado para la contraseña "RompoTodo"
const PASSWORD_HASH = "$2b$10$JPp4Oqc.yg0thGcyzFxxtuAqmzwaTlUcohxoYj1fJ4QFLOt4rD10O";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const username = (form.get("username") || "").toString();
  const password = (form.get("password") || "").toString();

  const expectedUsername = "admin";

  // Validar usuario
  if (username !== expectedUsername) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Validar contraseña contra el hash
  const match = await bcrypt.compare(password, PASSWORD_HASH);
  if (!match) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Firmar JWT con el mismo secreto
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(encoder.encode(JWT_SECRET));

  const response = NextResponse.redirect(new URL("/admin", req.url));
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return response;
}
