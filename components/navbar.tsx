"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"   // 👈 usa tu hook

type NavChild = { href: string; label: string }
type NavItem =
  | { href: string; label: string; children?: never }
  | { href: string; label: string; children: NavChild[] }

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openMobile, setOpenMobile] = useState<{ [key: string]: boolean }>({})
  const pathname = usePathname()
  const router = useRouter()

  const { user, loading, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    router.push("/")      // llevar al home al cerrar sesion
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const servicesChildren: NavChild[] = [
    { href: "/servicios/alteraciones-memoria", label: "Alteraciones de la memoria" },
    { href: "/servicios/evaluacion-neuropsicologica", label: "Evaluación neuropsicológica" },
    { href: "/servicios/estimulacion-neurocognitiva", label: "Estimulación neurocognitiva" },
    { href: "/servicios/capacitacion-cuidados", label: "Capacitación en cuidados" },
  ]

  const researchChildren: NavChild[] = [
    { href: "/investigacion/la-memoria", label: "La memoria" },
    { href: "/investigacion/deterioro-cognitivo", label: "Deterioro cognitivo" },
    { href: "/investigacion/reserva-cognitiva", label: "Reserva cognitiva" },
    { href: "/investigacion/calidad-vida-pam", label: "Calidad de vida de las P.A.M." },
    { href: "/investigacion/envejecimiento-normal-patologico", label: "Envejecimiento normal y patológico" },
  ]

  const navItems: NavItem[] = [
    { href: "/", label: "Inicio" },
    { href: "/quienes-somos", label: "¿Quiénes somos?" },
    { href: "/servicios", label: "Servicios", children: servicesChildren },
    { href: "/investigacion", label: "Investigación", children: researchChildren },
    { href: "/ayuda", label: "¿Necesitas ayuda?" },
    { href: "/contacto", label: "Contáctanos" },
  ]

  const linkBase =
    "relative inline-flex min-h-11 items-center px-2 py-2 text-sm lg:text-[15px] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
  const linkHover = "hover:text-white"
  const activeUnderline =
    "after:absolute after:inset-x-2 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-[var(--color-accent)] after:content-['']"

  const isActivePath = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href)

  return (
    <nav
      role="navigation"
      aria-label="Principal"
      className="sticky top-0 z-50 bg-primary text-white"
    >
      <div
        className={isScrolled ? "border-b border-white/20 shadow-sm" : "border-b border-white/15"}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Izquierda: Logo / Marca */}
          <Link
            href="/"
            className="flex min-h-14 items-center gap-2 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="text-xl font-extrabold tracking-wide text-white lg:text-2xl">
              NEUROLAP
            </span>
          </Link>

          {/* Derecha: Links + acciones (Desktop) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-6">
            <ul className="flex items-center gap-2 lg:gap-5">
              {navItems.map((item) => {
                const active = isActivePath(item.href)
                if ("children" in item && item.children?.length) {
                  return (
                    <li key={item.href} className="relative group">
                      <Link
                        href={item.href}
                        className={[linkBase, linkHover, active ? activeUnderline : "hover:opacity-90", "gap-1"].join(" ")}
                        aria-haspopup="true"
                        aria-expanded="false"
                        role="button"
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                      </Link>
                      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true">
                        <div className="absolute left-1/2 -translate-x-1/2 pt-3">
                          <div className="rounded-xl border border-white/10 bg-[var(--color-brand)]/98 shadow-xl shadow-black/20 backdrop-blur-md min-w-[260px] overflow-hidden">
                            <ul className="py-2">
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className="flex min-h-11 items-center px-4 py-2 text-sm text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[linkBase, linkHover, active ? activeUnderline : "hover:opacity-90"].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Acciones de sesión (desktop) */}
            <div className="ml-3 flex items-center gap-2 lg:ml-6 lg:gap-3">
              {!loading && !user && (
                <>
                  <Button
                    asChild
                    className="min-h-11 bg-white text-primary hover:bg-white/90 font-semibold px-4 lg:px-5"
                  >
                    <Link href="/registro">Regístrate</Link>
                  </Button>
                  <Button
                    asChild
                    className="min-h-11 border border-white/50 bg-transparent text-white hover:bg-white/10 font-semibold px-4 lg:px-5"
                  >
                    <Link href="/login">Inicio de sesión</Link>
                  </Button>
                </>
              )}

              {!loading && user && (
                <>
                  {/* (Opcional) acceso al panel */}
                  <Button
                    asChild
                    variant="outline"
                    className="min-h-11 bg-transparent text-white hover:bg-white/10"
                  >
                    <Link href="/panel">Mi panel</Link>
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="min-h-11 border border-white/50 bg-transparent text-white hover:bg-white/10 font-semibold px-4 lg:px-5"
                  >
                    Cerrar sesión
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen((v) => !v)}
              className="min-h-11 min-w-11 text-white hover:bg-white/15 focus:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={[
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
            isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="px-4 pb-4 pt-2 border-t border-white/15">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const active = isActivePath(item.href)
                const hasChildren = "children" in item && item.children?.length
                const expanded = !!openMobile[item.href]

                if (hasChildren) {
                  return (
                    <li key={item.href}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={[
                            "flex min-h-11 items-center rounded-md px-3 py-2 text-white",
                            "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]",
                            active ? "bg-white/15" : "hover:bg-white/10",
                          ].join(" ")}
                        >
                          {item.label}
                        </Link>
                        <button
                          className="grid min-h-11 min-w-11 place-items-center rounded-md text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
                          aria-expanded={expanded}
                          aria-controls={`submenu-${item.href}`}
                          onClick={() => setOpenMobile((s) => ({ ...s, [item.href]: !expanded }))}
                        >
                          <ChevronDown className={["h-5 w-5 transition-transform duration-200", expanded ? "rotate-180" : ""].join(" ")} />
                        </button>
                      </div>
                      <div
                        id={`submenu-${item.href}`}
                        className={[
                          "pl-3 ml-1 border-l border-white/15 overflow-hidden transition-[max-height,opacity] duration-300",
                          expanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0",
                        ].join(" ")}
                      >
                        <ul className="py-1">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className="flex min-h-11 items-center rounded-md px-3 py-2 text-sm text-white hover:bg-white/10"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  )
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={[
                        "flex min-h-11 items-center rounded-md px-3 py-2 text-white",
                        "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]",
                        active ? "bg-white/15" : "hover:bg-white/10",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Acciones de sesión (mobile) */}
            <div className="mt-3 grid gap-2">
              {!loading && !user && (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    asChild
                    className="min-h-11 w-full bg-white text-primary hover:bg-white/90 font-semibold"
                  >
                    <Link href="/registro" onClick={() => setIsOpen(false)}>Regístrate</Link>
                  </Button>
                  <Button
                    asChild
                    className="min-h-11 w-full border border-white/50 bg-transparent text-white hover:bg-white/10 font-semibold"
                  >
                    <Link href="/login" onClick={() => setIsOpen(false)}>Inicio de sesión</Link>
                  </Button>
                </div>
              )}

              {!loading && user && (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="min-h-11 w-full bg-transparent text-white hover:bg-white/10"
                  >
                    <Link href="/panel" onClick={() => setIsOpen(false)}>Mi panel</Link>
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="min-h-11 w-full border border-white/50 bg-transparent text-white hover:bg-white/10 font-semibold"
                  >
                    Cerrar sesión
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </nav>
  )
}
