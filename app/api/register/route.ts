import { NextResponse } from "next/server"
import { setAuthCookie } from "@/lib/server/cookies"

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => ({}))
    const body = {
      email: payload.email,
      password: payload.password,
      passwordConfirm: payload.passwordConfirm,
      username: payload.username,
      rol: "paciente", // fijo por defecto
      active: true,    // activo por defecto
    }

    const res = await fetch(`${process.env.AUTH_BACKEND_URL}/api/usuarios/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return NextResponse.json({ message: data?.message || "No se pudo registrar." }, { status: res.status })
    }

    // Si tu backend devuelve token
    if (data?.token) {
      const response = NextResponse.json({ ok: true, user: data.user || null })
      setAuthCookie(response, data.token)
      return response
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ message: "Error en el servidor." }, { status: 500 })
  }
}
