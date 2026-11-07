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
        <section className="bg-primary py-14 text-white lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="max-w-[20ch] text-balance text-white">Servicios especializados</h1>
            <p className="max-w-[65ch] text-pretty text-white/90">
              Brindamos atención integral y especializada en evaluación neuropsicológica y estimulación cognitiva para personas adultas mayores.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-h-12 bg-white px-6 text-primary hover:bg-white/90">
                <Link href="/test-edm">Realizar Test EDM</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-12 border-white bg-transparent px-6 text-white hover:bg-white/10">
                <Link href="/contacto">Contáctanos</Link>
              </Button>
            </div>
          </div>
        </section>
        <ServicesSection />
        <section className="bg-background py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-primary">¿Listo para comenzar?</h2>
            <p className="max-w-[65ch] text-muted-foreground">
              Inicia tu evaluación neuropsicológica con nuestro test EDM o contáctanos para más información.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-h-12 bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                <Link href="/test-edm">Realizar Test EDM</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-12 border-primary bg-transparent px-6 text-primary hover:bg-primary/10">
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
