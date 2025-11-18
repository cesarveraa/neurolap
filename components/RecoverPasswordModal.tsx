"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function RecoverPasswordModal({ open, onOpenChange }: Props) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onOpenChange])

  // Scroll lock del body mientras está abierto
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [open])

  // Cerrar clickeando fuera
  const onBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onOpenChange(false)
  }, [onOpenChange])

  const validate = () => {
    if (!email.trim()) return "Ingresa tu correo."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Correo inválido."
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (v) return setError(v)
    setError(null)
    setLoading(true)
    try {
      // Llama tu endpoint real; aquí un ejemplo:
      const res = await fetch("/api/password/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({})))?.message ?? "No pudimos procesar la solicitud."
        throw new Error(msg)
      }
      setDone(true) // mostrar mensaje de éxito
    } catch (err: any) {
      setError(err.message || "Ocurrió un error. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-reveal"
      onClick={onBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="recover-title"
      aria-describedby="recover-desc"
    >
      <Card
        ref={dialogRef}
        className="max-w-md w-[92vw] sm:w-[520px] bg-background border border-white/10 shadow-xl animate-fadeInUp card-lift"
      >
        {/* Header */}
        <div className="px-6 pt-6">
          <h2 id="recover-title" className="text-lg sm:text-xl font-bold">
            Recuperar acceso
          </h2>
          <span className="mt-2 block h-1 w-20 bg-[var(--color-accent)] rounded-full animate-underlineGrow" />
          <p id="recover-desc" className="sr-only">Ingresa tu correo para recibir instrucciones.</p>
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          {!done ? (
            <form onSubmit={onSubmit} className="space-y-4 mt-3">
              <div>
                <Label htmlFor="recover-email" className="mb-1 block text-sm font-medium">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="recover-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="pl-9 focus:ring-2 focus:ring-[var(--color-accent)]"
                    autoComplete="email"
                    required
                  />
                </div>
                {error && <p className="text-destructive text-xs mt-1 animate-fadeInUp">{error}</p>}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className={`btn-dark transition-transform hover:-translate-y-0.5 focus-ring ${loading ? "opacity-90" : ""}`}
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" d="M4 12a8 8 0 018-8v4" stroke="currentColor" strokeWidth="4" />
                      </svg>
                      Enviando…
                    </span>
                  ) : (
                    "Enviar instrucciones"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-muted-foreground">
                Si el correo <strong>{email}</strong> está registrado, te enviaremos un enlace para restablecer tu contraseña.
              </p>
              <div className="flex justify-end">
                <Button className="btn-dark" onClick={() => onOpenChange(false)}>
                  Entendido
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
