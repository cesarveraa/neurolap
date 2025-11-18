import { ServiceCard } from "@/components/service-card"
import { Brain, TrendingDown, Shield, Heart, Users } from "lucide-react"

export function ResearchSection() {
  const researchTopics = [
    {
      title: "La memoria",
      icon: Brain,
      description:
        "Investigación sobre los mecanismos neurobiológicos de la memoria, tipos de memoria y su funcionamiento en el envejecimiento normal.",
      primaryCta: {
        label: "Saber más",
        href: "/investigacion/la-memoria",
      },
    },
    {
      title: "El deterioro cognitivo",
      icon: TrendingDown,
      description:
        "Estudios sobre los procesos de deterioro cognitivo, factores de riesgo y mecanismos de progresión en adultos mayores.",
      primaryCta: {
        label: "Saber más",
        href: "/investigacion/deterioro-cognitivo",
      },
    },
    {
      title: "Reserva cognitiva",
      icon: Shield,
      description:
        "Investigación sobre la capacidad del cerebro para mantener el funcionamiento cognitivo a pesar del daño neurológico.",
      primaryCta: {
        label: "Saber más",
        href: "/investigacion/reserva-cognitiva",
      },
    },
    {
      title: "La calidad de vida de las P.A.M.",
      icon: Heart,
      description:
        "Estudios sobre factores que influyen en la calidad de vida de las Personas Adultas Mayores y estrategias de mejora.",
      primaryCta: {
        label: "Saber más",
        href: "/investigacion/calidad-vida-pam",
      },
    },
    {
      title: "El envejecimiento normal y patológico",
      icon: Users,
      description:
        "Investigación comparativa entre procesos normales de envejecimiento y alteraciones patológicas asociadas.",
      primaryCta: {
        label: "Saber más",
        href: "/investigacion/envejecimiento-normal-patologico",
      },
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 text-balance">Investigación</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Nuestras líneas de investigación se centran en comprender los procesos cognitivos del envejecimiento y
            desarrollar estrategias de intervención efectivas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchTopics.map((topic, index) => (
            <ServiceCard
              key={index}
              title={topic.title}
              icon={topic.icon}
              description={topic.description}
              primaryCta={topic.primaryCta}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
