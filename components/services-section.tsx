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
        href: "/servicios/reporte-clinico",
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
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 text-balance">Nuestros Servicios</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Ofrecemos una gama completa de servicios especializados en la evaluación, diagnóstico y apoyo para personas
            con alteraciones de memoria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
