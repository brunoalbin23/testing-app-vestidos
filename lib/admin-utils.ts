import { NextResponse } from "next/server";
import { isAdmin } from "./CsrfSessionManagement";
import type { NextRequest } from "next/server";

/**
 * Middleware helper para proteger rutas admin
 */
export async function protectAdminRoute(req: NextRequest | Request): Promise<NextResponse | null> {
  const admin = await isAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/**
 * Extrae parámetros de FormData de manera tipada
 */
export function extractFormData(form: FormData, keys: string[]): Record<string, any> {
  const data: Record<string, any> = {};
  keys.forEach(key => {
    const value = form.get(key);
    if (value !== null) {
      data[key] = value.toString().trim();
    }
  });
  return data;
}

/**
 * Valida que todos los campos requeridos estén presentes
 */
export function validateRequired(data: Record<string, any>, required: string[]): string | null {
  for (const field of required) {
    if (!data[field] || data[field].length === 0) {
      return `Field '${field}' is required`;
    }
  }
  return null;
}

/**
 * Convierte un string separado por comas en un array
 */
export function parseCommaSeparated(str: string): string[] {
  return str.split(",").map(s => s.trim()).filter(s => s.length > 0);
}

/**
 * Respuesta de error estándar para admin
 */
export function adminErrorResponse(message: string, status: number = 400): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Respuesta de éxito estándar para admin
 */
export function adminSuccessResponse(data: any, status: number = 200): NextResponse {
  return NextResponse.json(data, { status });
}
