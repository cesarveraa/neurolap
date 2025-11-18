import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ResearchSection } from "@/components/research-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function InvestigacionPage() {
  const researchAreas = [
    {
      title: "Neuropsicología del Envejecimiento",
      icon: BookOpen,
      description: "Estudio de los cambios cognitivos normales y patológicos durante el proceso de envejecimiento.",
    },
    {
      title: "Intervenciones Cognitivas",
      icon: Target,
      description: "Desarrollo y validación de programas de estimulación cognitiva para adultos mayores.",
    },
    {
      title: "Calidad de Vida",
      icon: Award,
      description: "Investigación sobre factores que impactan la calidad de vida en la tercera edad.",
    },
    {
      title: "Epidemiología Cognitiva",
      icon: Users,
      description: "Estudios poblacionales sobre prevalencia y factores de riesgo de alteraciones cognitivas.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          {/* Blob decorativo sutil */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl animate-floatY"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto (columna izquierda) */}
            <div className="relative z-20">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance animate-fadeInUp">
                Investigación Científica
              </h1>
              {/* subrayado que “crece” */}
              <span className="block h-[3px] w-24 bg-[color:var(--color-accent)] rounded-full animate-underlineGrow mb-4" />
              <p className="text-xl text-primary-foreground/90 text-pretty leading-relaxed animate-fadeInUp [animation-delay:200ms]">
                Contribuimos al avance del conocimiento científico en neuropsicología del envejecimiento y desarrollo
                de intervenciones cognitivas basadas en evidencia.
              </p>
            </div>
          </div>

          {/* Imagen fija a la derecha + degradado acordado */}
          <div className="absolute inset-y-0 right-0 w-[52%] min-w-[520px] z-0">
            <div className="relative h-full w-full animate-fadeInRight">
              <Image
                src="/investigacion.png"
                alt="Investigación científica en cognición de adultos mayores"
                fill
                className="object-cover object-center"
                priority
              />
              {/* TU degradado: sólido a la derecha, se desvanece hacia el centro */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[color:var(--color-primary)]/70 to-[color:var(--color-primary)]" />
            </div>
          </div>
        </section>



        {/* Mission Section */}
        <section className="py-16 " >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-balance">Nuestra Misión Investigativa</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
                Generar conocimiento científico de calidad que contribuya a mejorar la comprensión de los procesos
                cognitivos en el envejecimiento y desarrollar herramientas efectivas para la evaluación e intervención.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {researchAreas.map((area, index) => (
                <Card
                  key={index}
                  className="group text-center h-full card-lift animate-fadeInUp"
                  style={{ animationDelay: `${100 + index * 80}ms` }}
                >
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 rounded-full bg-secondary/20 w-fit transition-transform duration-300 group-hover:scale-110">
                      <area.icon className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="text-lg text-balance">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </section>

        {/* Research Topics */}
        <ResearchSection />

        {/* Methodology Section */}
        {/*}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-balance">Metodología de Investigación</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Utilizamos metodologías rigurosas y estándares internacionales para garantizar la calidad y validez de
                nuestros estudios.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Enfoques Metodológicos</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground mb-2">Estudios Longitudinales</h4>
                    <p className="text-muted-foreground">
                      Seguimiento a largo plazo de participantes para observar cambios cognitivos a lo largo del tiempo.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground mb-2">Estudios Transversales</h4>
                    <p className="text-muted-foreground">
                      Comparación entre diferentes grupos etarios para identificar patrones de envejecimiento cognitivo.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground mb-2">Ensayos Controlados</h4>
                    <p className="text-muted-foreground">
                      Evaluación de la efectividad de intervenciones cognitivas mediante diseños experimentales
                      rigurosos.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground mb-2">Meta-análisis</h4>
                    <p className="text-muted-foreground">
                      Síntesis cuantitativa de evidencia científica para generar conclusiones robustas.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/research-methodology-data-analysis.jpg"
                  alt="Metodología de investigación y análisis de datos"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6 text-balance">Participa en Nuestros Estudios</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Si estás interesado en participar en nuestros estudios de investigación o colaborar con nuestro equipo,
              contáctanos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                <Link href="/contacto">Participar en Estudios</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 bg-transparent"
              >
                <Link href="/test-edm">Realizar Evaluación</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
