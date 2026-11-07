import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

function CampaignPhoto() {
  // reemplazar por foto propia de la campaña PAM
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
      <Image
        src="/elderly-person-writing-at-desk--warm-lighting--pro.jpg"
        alt="Adulto mayor realizando actividades cognitivas"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="bg-background py-14 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
        <div className="hero-entrance">
          <h1 className="max-w-[15ch] text-balance text-primary">
            Evaluación de la memoria hecha en Bolivia
          </h1>
          <p className="max-w-[54ch] text-pretty text-muted-foreground">
            NEUROLAP ofrece evaluación de la memoria con el EDM, apoyada por inteligencia artificial y desarrollada en Bolivia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="min-h-12 bg-primary px-6 text-base text-primary-foreground hover:bg-primary/90">
              <Link href="/test-edm">Realizar evaluación EDM</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-h-12 border-primary bg-transparent px-6 text-base text-primary hover:bg-primary/10">
              <Link href="/servicios">Conoce los servicios</Link>
            </Button>
          </div>
        </div>
        <CampaignPhoto />
      </div>
    </section>
  )
}
