import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock, FileText, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LaMemoriaPage() {
  const memoryTypes = [
    {
      title: "Memoria Episódica",
      icon: Clock,
      description: "Memoria de eventos específicos y experiencias personales situadas en tiempo y lugar.",
      characteristics: ["Recuerdos autobiográficos", "Contexto temporal", "Experiencias únicas"],
    },
    {
      title: "Memoria Semántica",
      icon: FileText,
      description: "Conocimiento general sobre el mundo, conceptos y hechos independientes del contexto.",
      characteristics: ["Conocimiento factual", "Conceptos generales", "Información cultural"],
    },
    {
      title: "Memoria Operativa",
      icon: Zap,
      description: "Sistema de memoria a corto plazo que mantiene y manipula información temporalmente.",
      characteristics: ["Procesamiento activo", "Capacidad limitada", "Control ejecutivo"],
    },
    {
      title: "Memoria Procedimental",
      icon: Brain,
      description: "Memoria de habilidades motoras y procedimientos automatizados.",
      characteristics: ["Habilidades motoras", "Automatización", "Aprendizaje implícito"],
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">La Memoria</h1>
                <p className="text-xl text-primary-foreground/90 text-pretty leading-relaxed">
                  Comprende los mecanismos neurobiológicos de la memoria, sus diferentes tipos y cómo funciona en el
                  proceso de envejecimiento normal.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/memory-brain-networks-neural-pathways.jpg"
                  alt="Redes neuronales y vías de la memoria en el cerebro"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is Memory Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-balance">¿Qué es la Memoria?</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
                La memoria es un proceso cognitivo complejo que nos permite codificar, almacenar y recuperar
                información. Es fundamental para el aprendizaje, la identidad personal y el funcionamiento diario.
              </p>
            </div>

            {/* Bloque añadido con la explicación importante */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)]/70 p-6 shadow-warm animate-fadeInUp">
                <p className="text-[var(--color-ink)] leading-relaxed">
                  <strong>La memoria</strong> es el proceso por el que somos capaces de almacenar o recuperar información
                  procedente del entorno o del propio organismo; <em>además</em>, lleva implícita la capacidad de
                  <strong> reconstruir eventos</strong> a partir de la emergencia de detalles aislados, por lo tanto no es
                  solo un proceso de recuperación y nada más.
                </p>
                <p className="mt-4 text-[var(--color-ink)] leading-relaxed">
                  <strong>Sin la memoria</strong> no seríamos lo que somos: podrían entrar estímulos luminosos por nuestros
                  ojos o estímulos acústicos por nuestros oídos, pero seríamos incapaces de recordar aquello o darle
                  función a aquello otro.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Types of Memory */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-balance">Tipos de Memoria</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                La memoria no es un sistema unitario, sino que comprende diferentes subsistemas especializados en
                distintos tipos de información.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {memoryTypes.map((type, index) => (
                <Card key={index} className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-full bg-secondary/20">
                        <type.icon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">{type.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{type.description}</p>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">Características:</h4>
                      <ul className="space-y-1">
                        {type.characteristics.map((char, charIndex) => (
                          <li key={charIndex} className="text-muted-foreground text-sm flex items-center">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></div>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Memory and Aging */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-balance">Memoria y Envejecimiento</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src="/aging-brain-memory.jpg"
                  alt="Comparación de cambios en la memoria durante el envejecimiento"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Cambios Normales vs. Patológicos</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-2">Envejecimiento Normal</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Lentificación en el procesamiento</li>
                      <li>• Dificultades leves en memoria episódica</li>
                      <li>• Preservación de memoria semántica</li>
                      <li>• Compensación mediante estrategias</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-600 mb-2">Envejecimiento Patológico</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Deterioro significativo y progresivo</li>
                      <li>• Afectación de múltiples dominios</li>
                      <li>• Interferencia con actividades diarias</li>
                      <li>• Pérdida de autonomía funcional</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-balance">Evalúa tu Memoria</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
              Conoce el estado de tu memoria mediante nuestra evaluación especializada EDM.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
              <Link href="/test-edm">Realizar Test EDM</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
