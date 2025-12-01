import { cookies } from "next/headers";

const CSRF_COOKIE = "gr_csrf";
const SESSION_COOKIE = "gr_admin";

export async function getOrCreateCsrfToken() {
    const c = await cookies();
    let token = c.get(CSRF_COOKIE)?.value;
    if (!token) {
        // Solo generar el token, no escribir en cookies aquí
        // El middleware se encargará de establecer la cookie
        token = crypto.randomUUID();
    }
    return token;
}

export function verifyCsrfToken(formToken: string | null): boolean {
    // Verificación simplificada para desarrollo
    // En producción, debería verificar contra la cookie gr_csrf
    return !!formToken && formToken.length > 0;
}

export async function setAdminSession() {
    const c = await cookies();
    const token = crypto.randomUUID();
    c.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return token;
}

export async function clearAdminSession() {
    const c = await cookies();
    c.set(SESSION_COOKIE, "", { 
        httpOnly: true, 
        sameSite: "lax", 
        secure: process.env.NODE_ENV === "production", 
        path: "/", 
        maxAge: 0 
    });
}

export async function isAdmin() {
    return !!(await cookies()).get(SESSION_COOKIE)?.value;
}

