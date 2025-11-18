"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User as UserIcon, Eye, EyeOff, Shield } from "lucide-react"
import { useAuth } from "@/hooks/useAuth" 

export default function RegisterUserPage() {
  const router = useRouter()
  const { register } = useAuth()        

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [okMsg, setOkMsg] = useState<string | null>(null)

  const validate = () => {
    if (!email.trim()) return "Ingresa tu correo."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Correo inválido."
    if (!username.trim()) return "Ingresa tu nombre de usuario."
    if (username.trim().length < 3) return "El nombre de usuario debe tener al menos 3 caracteres."
    if (!password) return "Ingresa tu contraseña."
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres."
    if (passwordConfirm !== password) return "Las contraseñas no coinciden."
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (v) return setError(v)
    setError(null)
    setOkMsg(null)
    setLoading(true)
    try {
      await register({                          
        email,
        password,
        passwordConfirm,
        username,
      })
      setOkMsg("Cuenta creada correctamente. Redirigiendo al login…")
      setTimeout(() => router.push("/login"), 900)
    } catch (err: any) {
      setError(err.message || "Ocurrió un error. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Blobs decorativos */}
      <div aria-hidden className="pointer-events-none absolute -top-16 -left-20 h-56 w-56 rounded-full bg-accent/15 blur-2xl animate-float" />
      <div aria-hidden className="pointer-events-none absolute top-24 -right-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float-rev" />
      <div aria-hidden className="pointer-events-none absolute bottom-10 left-1/3 h-40 w-40 rounded-full bg-accent/10 blur-2xl animate-float-slow" />

      <main className="min-h-[calc(100vh-120px)] flex items-center">
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Encabezado */}
          <div className="max-w-xl mb-8 text-center animate-fadeInUp mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Crear cuenta</h1>
            <span className="mt-2 block h-1 w-24 mx-auto bg-[var(--color-accent)] rounded-full animate-underlineGrow" />
            <p className="text-muted-foreground mt-2">Regístrate para acceder a los servicios</p>
          </div>

          {/* Tarjeta */}
          <form
            onSubmit={onSubmit}
            className="max-w-md mx-auto rounded-xl border border-border bg-background/70 backdrop-blur p-6 md:p-7 shadow-xl animate-fadeInUp card-lift"
          >
            {/* Email */}
            <div className="mb-4">
              <Label htmlFor="reg-email" className="mb-1 block text-sm font-medium">
                Correo electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reg-email"
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

            {/* Username */}
            <div className="mb-4">
              <Label htmlFor="reg-username" className="mb-1 block text-sm font-medium">
                Nombre de usuario
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reg-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="tu_usuario"
                  className="pl-9 focus:ring-2 focus:ring-[var(--color-accent)]"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <Label htmlFor="reg-password" className="mb-1 block text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reg-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 pr-10 focus:ring-2 focus:ring-[var(--color-accent)]"
                  autoComplete="new-password"
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
              {/* Indicador simple de fuerza */}
              <div className="mt-2 h-1 w-full bg-muted rounded">
                <div
                  className="h-full rounded bg-[var(--color-accent)] transition-all"
                  style={{ width: Math.min(100, password.length * 12) + "%" }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Mínimo 6 caracteres. Usa mayúsculas, minúsculas y números para mayor seguridad.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-2">
              <Label htmlFor="reg-password2" className="mb-1 block text-sm font-medium">
                Confirmar contraseña
              </Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reg-password2"
                  type={showPass2 ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 pr-10 focus:ring-2 focus:ring-[var(--color-accent)]"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  aria-label={showPass2 ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowPass2((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                >
                  {showPass2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Errores / OK */}
            {error && <p className="mt-2 mb-2 text-sm text-destructive animate-fadeInUp">{error}</p>}
            {okMsg && <p className="mt-2 mb-2 text-sm text-green-600 animate-fadeInUp">{okMsg}</p>}

            {/* CTA */}
            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                disabled={loading}
                className={`btn-dark w-auto transition-transform hover:-translate-y-0.5 focus-ring ${loading ? "opacity-90" : ""}`}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" d="M4 12a8 8 0 018-8v4" stroke="currentColor" strokeWidth="4" />
                    </svg>
                    Creando…
                  </span>
                ) : (
                  "Crear cuenta"
                )}
              </Button>
            </div>

            {/* Link a login */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <button onClick={() => router.push("/login")} className="underline hover:opacity-90">
                Inicia sesión
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  )
}
