// app/api/logout/route.ts
import { NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/server/cookies"

export async function POST() {
  try {
    const res = NextResponse.json({ ok: true, message: "Sesión cerrada correctamente." })
    clearAuthCookie(res)   // 👈 elimina la cookie
    return res
  } catch (err) {
    console.error("Error en logout:", err)
    return NextResponse.json({ ok: false, message: "Error al cerrar sesión." }, { status: 500 })
  }
}