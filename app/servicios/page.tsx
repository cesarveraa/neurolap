import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServicesSection } from "@/components/services-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServiciosPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground py-16 lg:py-20">
          {/* blobs decorativos sutiles */}
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-float-slow" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-black/10 blur-3xl animate-float-slower" />

          {/* onda inferior (decorativa) */}
          <svg
            aria-hidden
            className="absolute bottom-0 left-0 w-full h-10 text-black/10 opacity-30"
            viewBox="0 0 1440 40"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,32 C120,20 240,8 360,8 C480,8 600,24 720,24 C840,24 960,8 1080,8 C1200,8 1320,20 1440,32 L1440,40 L0,40 Z"
            />
          </svg>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance text-white animate-fadeInUp">
              Servicios Especializados
            </h1>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto text-pretty leading-relaxed animate-fadeInUp delay-150">
              Brindamos atención integral y especializada en evaluación neuropsicológica y estimulación cognitiva para
              personas adultas mayores.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 active:scale-[0.98]">
                <Link href="/test-edm">Realizar Test EDM</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/80 text-white hover:bg-white hover:text-primary px-8 bg-transparent active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80"
              >
                <Link href="/contacto">Contáctanos</Link>
              </Button>
            </div>
          </div>
        </section>

        <ServicesSection />

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6 text-balance animate-fadeInUp">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty animate-fadeInUp delay-150">
              Inicia tu evaluación neuropsicológica con nuestro test EDM o contáctanos para más información.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp delay-300">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 active:scale-[0.98]">
                <Link href="/test-edm">Realizar Test EDM</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 bg-transparent active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                <Link href="/contacto">Contáctanos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
