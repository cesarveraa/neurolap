import { ServiceCard } from "@/components/service-card"
import { Brain, FileText, Activity, GraduationCap } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      title: "Información sobre alteraciones de la memoria",
      icon: Brain,
      description:
        "Recursos educativos completos sobre los diferentes tipos de alteraciones de memoria y sus características.",
      primaryCta: {
        label: "Saber más",
        href: "/servicios/alteraciones-memoria",
      },
    },
    {
      title: "Evaluación neuropsicológica de la memoria",
      icon: FileText,
      description:
        "Evaluación profesional y detallada de las funciones cognitivas mediante el test EDM (Evaluación Diferencial de la Memoria).",
      primaryCta: {
        label: "Saber más",
        href: "/servicios/evaluacion-neuropsicologica",
      },
      secondaryCta: {
        label: "Realizar Evaluación EDM",
        href: "/test-edm",
      },
      elevated: true,
    },
    {
      title: "Reporte clínico de la evaluación",
      icon: FileText,
      description: "Informes detallados y profesionales con los resultados de la evaluación neuropsicológica.",
      primaryCta: {
        label: "Saber más",
        href: "/servicios/evaluacion-neuropsicologica",
      },
    },
    {
      title: "Estimulación neurocognitiva",
      icon: Activity,
      description:
        "Programas personalizados de ejercicios y actividades para estimular y mantener las funciones cognitivas.",
      primaryCta: {
        label: "Saber más",
        href: "/servicios/estimulacion-neurocognitiva",
      },
    },
    {
      title: "Capacitación en cuidados",
      icon: GraduationCap,
      description:
        "Formación especializada para familiares y cuidadores sobre el manejo y cuidado de personas con alteraciones de memoria.",
      primaryCta: {
        label: "Saber más",
        href: "/servicios/capacitacion-cuidados",
      },
    },
  ]

  return (
    <section className="bg-card py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-16 lg:px-8">
        <div>
          <h2 className="text-balance text-primary">Nuestros servicios</h2>
          <p className="max-w-[36ch] text-pretty text-muted-foreground">
            Ofrecemos una gama completa de servicios especializados en la evaluación, diagnóstico y apoyo para personas
            con alteraciones de memoria.
          </p>
        </div>

        <div>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
              primaryCta={service.primaryCta}
              secondaryCta={service.secondaryCta}
              elevated={service.elevated}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
