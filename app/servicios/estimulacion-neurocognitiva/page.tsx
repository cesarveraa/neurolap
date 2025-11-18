import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Brain, Target, Users, Home, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function EstimulacionNeurocognitivaPage() {
  const planItems = [
    "Evaluación inicial personalizada",
    "Diseño de programa específico",
    "Ejercicios de memoria episódica",
    "Entrenamiento de atención sostenida",
    "Estimulación de funciones ejecutivas",
    "Actividades de memoria operativa",
    "Ejercicios visuoespaciales",
    "Seguimiento y ajustes periódicos",
  ]; // ← importante: punto y coma y sin corchetes extra debajo

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section: imagen a la derecha + degradado */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="max-w-3xl animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Estimulación Neurocognitiva</h1>
            <p className="text-xl text-white/90 text-pretty leading-relaxed">
              Programas personalizados de estimulación cognitiva basados en evidencia científica para mantener y mejorar
              las funciones mentales
            </p>
          </div>
        </div>

        {/* Imagen hero a la derecha */}
        <div className="absolute inset-y-0 right-0 w-[50%] min-w-[520px] animate-fadeInRight">
          <Image
            src="/stim-hero.jpg"
            alt="Sesión de estimulación cognitiva"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Degradado: sólido en la derecha → transparente en la izquierda */}
          <div className="absolute inset-0 bg-gradient-to-l from-primary/0 via-primary/30 to-primary" />
        </div>
      </section>



      {/* Contenido principal */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Columna A */}
            <div className="space-y-6">
              <div className="animate-fadeInUp">
                <h2 className="text-3xl font-bold text-foreground mb-6">¿Qué es la Estimulación Neurocognitiva?</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    La estimulación neurocognitiva es un conjunto de técnicas y ejercicios diseñados para mantener,
                    mejorar o rehabilitar las funciones cognitivas como la memoria, atención, lenguaje y funciones
                    ejecutivas.
                  </p>
                  <p>
                    Este tipo de estimulación consiste en un conjunto de técnicas que tienen como finalidad ejercitar
                    y estimular las diferentes funciones cognitivas de la persona (memoria, lenguaje, atención, percepción).
                  </p>
                  <p>
                    Cada programa es diseñado específicamente según los resultados de la evaluación neuropsicológica
                    inicial, asegurando que las actividades sean apropiadas para el nivel cognitivo y las necesidades
                    particulares de cada persona.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-surface-alt)] bg-[var(--color-surface)] px-5 py-4 flex items-start gap-3 shadow-warm animate-fadeInUp delay-150">
                <Brain className="h-6 w-6 text-[var(--color-brand)] mt-0.5" />
                <p className="text-sm text-[var(--color-ink)]">
                  Los programas se ajustan periódicamente según la respuesta del paciente para maximizar resultados.
                </p>
              </div>

              <div className="animate-fadeInUp delay-200">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Metodología</h3>
                <p className="text-muted-foreground">
                  A partir de los resultados de la “Evaluación Diferencial de la Memoria”, se realiza la estimulación
                  neurocognitiva correspondiente.
                </p>
              </div>

              <div className="animate-fadeInUp delay-300">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Beneficios Comprobados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Mejora de la memoria de trabajo",
                    "Aumento de la atención sostenida",
                    "Fortalecimiento de funciones ejecutivas",
                    "Mejora en la calidad de vida",
                  ].map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna B */}
            <div className="space-y-6">
              <Card className="shadow-warm hover:shadow-warm-lg transition-shadow duration-200 animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Plan Personalizado según Reporte Clínico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Cada programa se diseña basándose en la evaluación neuropsicológica inicial:
                  </p>
                  <div className="space-y-3">
                    {planItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-warm hover:shadow-warm-lg transition-shadow duration-200 animate-fadeInUp delay-150">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Dirigido a
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Personas con deterioro cognitivo leve</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Adultos mayores con quejas de memoria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Individuos que buscan mantener su función cognitiva</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA (cuando querramos usar) */}
          {/*
          <div className="text-center mt-12 animate-fadeInUp delay-300">
            <Button className="btn-dark" size="lg">
              Conoce el programa de estimulación
            </Button>
          </div>
          */}
        </div>
      </section>
    </div>
  )
}
