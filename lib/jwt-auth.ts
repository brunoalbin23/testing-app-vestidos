import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { JWT_SECRET } from "./jwt-secret";

const SECRET_KEY = JWT_SECRET;
const TOKEN_COOKIE = 'admin_token';
const TOKEN_EXPIRY = '7d'; // 7 days

export interface AdminPayload {
  username: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

/**
 * Crear un JWT token para un admin
 */
export function createJWTToken(username: string): string {
  const payload: AdminPayload = {
    username,
    role: 'admin',
  };

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRY,
    algorithm: 'HS256',
  });
}

/**
 * Verificar y decodificar un JWT token
 */
export function verifyJWTToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY, {
      algorithms: ['HS256'],
    }) as AdminPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Guardar el JWT en una cookie httpOnly
 */
export async function setAdminSession(username: string) {
  const token = createJWTToken(username);
  const c = await cookies();
  
  c.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 30, // 30 min
  });

  return token;
}

/**
 * Obtener el token de la cookie
 */
export async function getAdminToken(): Promise<string | null> {
  const c = await cookies();
  return c.get(TOKEN_COOKIE)?.value || null;
}

/**
 * Validar que el usuario sea admin
 */
export async function isAdmin(): Promise<boolean> {
  const token = await getAdminToken();
  if (!token) return false;
  
  const payload = verifyJWTToken(token);
  return payload !== null && payload.role === 'admin';
}

/**
 * Obtener la información del admin actual
 */
export async function getAdminInfo(): Promise<AdminPayload | null> {
  const token = await getAdminToken();
  if (!token) return null;
  
  return verifyJWTToken(token);
}

/**
 * Limpiar la sesión del admin
 */
export async function clearAdminSession() {
  const c = await cookies();
  c.set(TOKEN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
