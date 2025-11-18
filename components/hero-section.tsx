import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative bg-background py-16 lg:py-24 overflow-hidden">
      {/* Blob decorativo de fondo muy sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[var(--color-surface-alt)]/50 blur-3xl animate-float-slow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[var(--color-accent)]/15 blur-3xl animate-float-slower"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-primary text-balance animate-fadeInUp">
                Bienvenidos a Neurolap
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground text-pretty leading-relaxed animate-fadeInUp delay-150">
                Portal especializado en la detección de alteraciones de la memoria, Evaluación Diferencial de la Memoria
                (EDM), y apoyo integral a pacientes y familias.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-300">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 text-lg active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] transition"
              >
                Conoce más
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg bg-transparent active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] transition"
              >
                Realizar Evaluación EDM
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="group aspect-square lg:aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl animate-reveal">
              <Image
                src="/elderly-person-writing-at-desk--warm-lighting--pro.jpg"
                alt="Adulto mayor realizando actividades cognitivas"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority
              />
              {/* Degradado cálido para dar profundidad */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand)]/0 via-[var(--color-brand)]/10 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div
              aria-hidden
              className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full opacity-70 animate-float"
            />
            <div
              aria-hidden
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/25 rounded-full animate-float-rev"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
