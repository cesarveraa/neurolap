import { NextResponse } from "next/server"
import { setAuthCookie } from "@/lib/server/cookies"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const res = await fetch(`${process.env.AUTH_BACKEND_URL}/api/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return NextResponse.json({ message: data?.message || "Credenciales inválidas." }, { status: res.status })
    }

    const token = data?.token
    if (!token) {
      return NextResponse.json({ message: "Backend no devolvió token." }, { status: 500 })
    }

    const response = NextResponse.json({ ok: true, user: data.user || null })
    setAuthCookie(response, token)
    return response
  } catch (err: any) {
    return NextResponse.json({ message: "Error en el servidor." }, { status: 500 })
  }
}
