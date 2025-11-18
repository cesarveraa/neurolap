"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { RecoverPasswordModal } from "@/components/RecoverPasswordModal" // 👈 importa tu modal
import { useAuth } from "@/hooks/useAuth"                             // 👈 importa tu hook

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()                             // 👈

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recoverOpen, setRecoverOpen] = useState(false)

  const validate = () => {
    if (!email.trim()) return "Ingresa tu correo."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Correo inválido."
    if (!password) return "Ingresa tu contraseña."
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (v) return setError(v)
    setError(null)
    setLoading(true)
    try {
      await login(email, password)                        // 👈 usa el hook (pega a /api/login → /api/usuarios/login)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Ocurrió un error. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* blobs decorativos */}
      <div aria-hidden className="pointer-events-none absolute -top-16 -left-20 h-56 w-56 rounded-full bg-accent/15 blur-2xl animate-float" />
      <div aria-hidden className="pointer-events-none absolute top-24 -right-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float-rev" />

      <main className="min-h-[calc(100vh-120px)] flex items-center">
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-md mx-auto">
            {/* encabezado */}
            <div className="mb-8 text-center animate-fadeInUp">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Inicia sesión</h1>
              <span className="mt-2 block h-1 w-24 mx-auto bg-[var(--color-accent)] rounded-full animate-underlineGrow" />
              <p className="text-muted-foreground mt-2">Accede a tu cuenta para continuar</p>
            </div>

            {/* tarjeta del form */}
            <form
              onSubmit={onSubmit}
              className="rounded-xl border border-border bg-background/70 backdrop-blur p-6 md:p-7 shadow-xl animate-fadeInUp card-lift"
            >
              {/* email */}
              <div className="mb-4">
                <Label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="pl-9 focus:ring-2 focus:ring-[var(--color-accent)]"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* password */}
              <div className="mb-2">
                <Label htmlFor="password" className="mb-1 block text-sm font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 pr-10 focus:ring-2 focus:ring-[var(--color-accent)]"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* error */}
              {error && (
                <p className="mt-2 mb-2 text-sm text-destructive animate-fadeInUp">{error}</p>
              )}

              {/* acciones */}
              <div className="mt-4 flex justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className={`btn-dark w-auto transition-transform hover:-translate-y-0.5 focus-ring ${
                    loading ? "opacity-90" : ""
                  }`}
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8v4"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                      </svg>
                      Validando…
                    </span>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </div>

              {/* ayuda */}
              <div className="mt-4 text-center text-sm text-muted-foreground">
                ¿Olvidaste tu contraseña?{" "}
                <button
                  type="button"
                  onClick={() => setRecoverOpen(true)}
                  className="underline hover:opacity-90"
                >
                  Recuperar acceso
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal de recuperación */}
      <RecoverPasswordModal open={recoverOpen} onOpenChange={setRecoverOpen} />
    </div>
  )
}
