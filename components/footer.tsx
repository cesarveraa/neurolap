import Link from "next/link"
import { Mail, Phone, Instagram, Facebook } from "lucide-react"

export function Footer() {
  const serviceLinks = [
    { href: "/servicios/alteraciones-memoria", label: "Información sobre alteraciones de la memoria" },
    { href: "/servicios/evaluacion-neuropsicologica", label: "Evaluación neuropsicológica de la memoria" },
    { href: "/servicios/estimulacion-neurocognitiva", label: "Estimulación neurocognitiva" },
    { href: "/servicios/capacitacion-cuidados", label: "Capacitación en cuidados" },
  ]

  const researchLinks = [
    { href: "/investigacion/la-memoria", label: "La memoria" },
    { href: "/investigacion/deterioro-cognitivo", label: "El deterioro cognitivo" },
    { href: "/investigacion/reserva-cognitiva", label: "Reserva cognitiva" },
    { href: "/investigacion/calidad-vida-pam", label: "La calidad de vida de las P.A.M." },
    { href: "/investigacion/envejecimiento-normal-patologico", label: "El envejecimiento normal y patológico" },
  ]

  const navigationLinks = [
    { href: "/", label: "Inicio" },
    { href: "/quienes-somos", label: "¿Quiénes somos?" },
    { href: "/servicios", label: "Servicios" },
    { href: "/investigacion", label: "Investigación" },
    { href: "/ayuda", label: "¿Necesitas ayuda?" },
    { href: "/contacto", label: "Contáctanos" },
  ]

  return (
    <footer className="bg-chart-2 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Investigación</h3>
            <ul className="space-y-2">
              {researchLinks.map((research) => (
                <li key={research.href}>
                  <Link
                    href={research.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {research.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:neurolap.bo@gmail.com"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  neurolap.bo@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a
                  href="tel:+59176325490"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  +591 76325490
                </a>
              </div>
              <div className="flex space-x-4 pt-2">
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm">© 2024 NEUROLAP. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/terminos"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              Términos
            </Link>
            <Link
              href="/privacidad"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
