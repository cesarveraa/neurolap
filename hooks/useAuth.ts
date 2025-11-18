"use client"

import { useEffect, useState, useCallback } from "react"

export type AuthUser = {
  id?: string
  email: string
  username?: string
  rol?: string
  active?: boolean
} | null

export function useAuth() {
  const [user, setUser] = useState<AuthUser>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Refresca sesión
  const refresh = useCallback(async () => {
    try {
        setLoading(true)
        const r = await fetch("/api/me", { cache: "no-store" })
        const data = await r.json().catch(() => ({}))
        setUser(data?.user ?? null)
    } finally {
        setLoading(false)
    }
    }, [])

  useEffect(() => { refresh() }, [refresh])

  // Login usando /api/usuarios/login
  const login = useCallback(async (email: string, password: string) => {
    setError(null)
    const r = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      throw new Error(data?.message || "Credenciales inválidas.")
    }
    await refresh()
    return data
  }, [refresh])

  // Registro usando /api/usuarios/register
  const register = useCallback(async (payload: {
    email: string
    password: string
    passwordConfirm: string
    username: string
  }) => {
    setError(null)
    const body = { ...payload, rol: "paciente", active: true }
    const r = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      throw new Error(data?.message || "No se pudo registrar.")
    }
    await refresh()
    return data
  }, [refresh])

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" })
    setUser(null)
  }

  return { user, loading, error, login, register, logout, refresh }
}
