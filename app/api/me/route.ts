import { NextRequest, NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/server/cookies"

export async function GET(req: NextRequest) {
  const token = getAuthCookie(req)
  if (!token) return NextResponse.json({ user: null }, { status: 200 })

  const r = await fetch(`${process.env.AUTH_BACKEND_URL}/api/usuarios/me`, {
    headers: { Authorization: `Bearer ${token}` },
    // No envíes cookies del frontend a tu backend externo
    cache: "no-store",
  })

  const data = await r.json().catch(() => ({}))
  if (!r.ok) return NextResponse.json({ user: null }, { status: 200 })

  return NextResponse.json({ user: data }, { status: 200 })
}
