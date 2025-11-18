import { NextResponse, NextRequest } from "next/server"

const COOKIE_NAME = process.env.AUTH_JWT_COOKIE_NAME || "neurolap_token"
const SECURE = String(process.env.AUTH_JWT_COOKIE_SECURE) === "true"
const SAME_SITE = (process.env.AUTH_JWT_COOKIE_SAMESITE || "Lax") as
  | "Lax"
  | "Strict"
  | "None"
const MAX_AGE_DAYS = Number(process.env.AUTH_JWT_COOKIE_MAX_AGE_DAYS || 7)
const DOMAIN = process.env.AUTH_COOKIE_DOMAIN // opcional

/**
 * Guardar cookie de sesión (JWT)
 */
export function setAuthCookie(res: NextResponse, token: string) {
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: SECURE,
    sameSite: SAME_SITE,
    path: "/",
    maxAge: MAX_AGE_DAYS * 24 * 60 * 60, // segundos
    ...(DOMAIN ? { domain: DOMAIN } : {}),
  })
}

/**
 * Eliminar cookie de sesión
 */
export function clearAuthCookie(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: SECURE,
    sameSite: SAME_SITE,
    path: "/",
    maxAge: 0,
    ...(DOMAIN ? { domain: DOMAIN } : {}),
  })
}

/**
 * Leer cookie de sesión desde la request
 */
export function getAuthCookie(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value || null
}
