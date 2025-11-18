import * as React from "react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle, Heart, Users, Info, Home, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CapacitacionCuidadosPage() {
  const cuidadosNecesarios = [
    "Ejercitar la memoria con regularidad.",
    "Contacto afectivo con su familia y amigos.",
    "Tratamiento multidisciplinario (geriatría, neurología, neuropsicología, fisioterapia, nutrición y otros necesarios), para la conservación de su calidad de vida.",
    "Compañía y/o vigilancia de alguien.",
    "Precaución con sus pertenencias de valor sentimental o material.",
    "Medidas de seguridad en los ambientes que frecuenta.",
  ]

  const recomendacionesCuidador = [
    "Mantener comunicación clara y paciente",
    "Establecer rutinas predecibles y consistentes",
    "Usar recordatorios visuales y auditivos",
    "Fomentar la independencia dentro de límites seguros",
    "Buscar apoyo profesional cuando sea necesario",
    "Cuidar la propia salud física y mental",
  ]

  const preparacionFamiliar = [
    "Educarse sobre la condición y su progresión",
    "Planificar cuidados a largo plazo",
    "Establecer redes de apoyo familiar y social",
    "Considerar aspectos legales y financieros",
    "Preparar el hogar para necesidades futuras",
    "Mantener comunicación abierta con el equipo médico",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Imagen a la IZQUIERDA */}
      <div className="absolute inset-y-0 left-0 w-[52%] animate-fadeInLeft">
        <Image
          src="/cuidado-familiar.jpg" // ← tu imagen
          alt="Capacitación en cuidados"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Degradado que deja la imagen sólida a la izquierda y se desvanece al texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-primary" />
      </div>
      {/* Contenido a la DERECHA */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Empuja el contenido hacia la derecha */}
          <div className="flex justify-end">
            <div className="max-w-2xl animate-fadeInUp">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Capacitación en Cuidados
              </h1>
              <p className="text-xl text-primary-foreground/90 text-pretty leading-relaxed">
                Formación integral para familiares y cuidadores de personas con alteraciones de memoria y deterioro
                cognitivo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* ===== Contenido principal ===== */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Columna izquierda: Accordions */}
          <div className="lg:col-span-7 space-y-6 animate-fadeInUp">
            <Accordion type="single" collapsible defaultValue="cuidados-necesarios" className="space-y-4">
              {/* Cuidados necesarios */}
              <AccordionItem value="cuidados-necesarios" className="border border-border rounded-lg bg-card shadow-warm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-secondary">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-semibold text-left">Cuidados Necesarios</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Los cuidados para personas con alteraciones de memoria requieren un enfoque integral que aborde
                      tanto las necesidades físicas como emocionales y cognitivas. Cuidados necesarios en orden de prioridad:
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Lista de cuidados esenciales:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cuidadosNecesarios.map((cuidado, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{cuidado}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      El Alzheimer es definida como una enfermedad familiar debido al grado de perturbación que representa para quienes conviven con el paciente, esta enfermedad modifica con el pasar del tiempo toda la dinámica familiar, los roles y actuaciones de los mismos. Por tanto se recomienda la atención psicológica de todos aquellos que viven la enfermedad del paciente.
                      La capacitación en cuidados debe impartirse tanto a cuidadores externos a la familia, como a los familiares del afectado.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Como Cuidador */}
              <AccordionItem value="como-cuidador" className="border border-border rounded-lg bg-card shadow-warm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-secondary">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-semibold text-left">Como Cuidador</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Ser cuidador de una persona con alteraciones de memoria es una responsabilidad que requiere
                      conocimientos específicos, paciencia y estrategias prácticas para brindar el mejor cuidado
                      posible.
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Recomendaciones prácticas:</h4>
                      <div className="space-y-3">
                        {recomendacionesCuidador.map((recomendacion, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{recomendacion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Técnicas de comunicación */}
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h5 className="font-semibold mb-2">Técnicas de comunicación efectiva:</h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Hablar despacio y con claridad</li>
                        <li>• Usar frases simples y directas</li>
                        <li>• Mantener contacto visual</li>
                        <li>• Ser paciente y dar tiempo para responder</li>
                        <li>• Evitar corregir constantemente</li>
                      </ul>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      Para muchas de las personas que se dedican a ser cuidadores externos de personas con distintas condiciones médicas representa un gran reto el cuidar a una persona con Alzheimer, ya que cada situación familiar es muy distinta a la otra.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Lo que normalmente se recomienda a los cuidadores de personas con Alzheimer es que mantengan comunicación constante con la familia y sobre todo con el cuidador familiar principal del paciente, para así prepararlos –tanto al paciente como a los familiares– para las etapas venideras de esta condición ya que mientras más avanzadas son, más desafíos se presentan.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Manejar armoniosamente los cambios respecto al entorno, su propia higiene, nutrición, incluso de comportamiento; son los aspectos más importantes por los cuales el paciente podría pasar próximamente en el transcurso de su diario vivir.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Como Familiar */}
              <AccordionItem value="como-familiar" className="border border-border rounded-lg bg-card shadow-warm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-secondary">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-semibold text-left">Como Familiar</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Los familiares juegan un papel crucial en el proceso de cuidado y acompañamiento. La preparación y
                      el conocimiento son fundamentales para brindar el mejor apoyo posible.
                    </p>

                    {/* Preparación */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Preparación y acompañamiento:</h4>
                      <div className="space-y-3">
                        {preparacionFamiliar.map((preparacion, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{preparacion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Apoyos en 2 columnas */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h5 className="font-semibold mb-2">Apoyo emocional:</h5>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Validar sentimientos y emociones</li>
                          <li>• Mantener conexiones sociales</li>
                          <li>• Fomentar actividades placenteras</li>
                          <li>• Buscar grupos de apoyo</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h5 className="font-semibold mb-2">Aspectos prácticos:</h5>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Organizar documentos importantes</li>
                          <li>• Planificar cuidados médicos</li>
                          <li>• Adaptar el entorno del hogar</li>
                          <li>• Coordinar con profesionales</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Alert sobre apoyo psicológico (dejado como está) */}
            <Alert className="mt-8">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <h4 className="font-semibold">Apoyo Psicológico Familiar</h4>
                  <p className="text-sm">
                    Cuidar a una persona con alteraciones de memoria puede generar estrés, ansiedad y agotamiento en
                    familiares y cuidadores. Es fundamental buscar apoyo psicológico profesional cuando sea necesario.
                  </p>
                  {/* Alert about psychological support para cuando haya support psicologico hehe
                  <div className="flex items-center gap-2 mt-3">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">Contacta con nuestro equipo de apoyo familiar</span>
                  </div>
                  */}
                </div>
              </AlertDescription>
            </Alert>
          </div>

          {/* Columna derecha: tarjeta visual (imagen/quote/checklist) */}
          <aside className="lg:col-span-5 space-y-6 animate-fadeInUp [animation-delay:200ms]">
            <div className="relative overflow-hidden rounded-xl shadow-warm-lg bg-card border border-border">
              <Image
                src="/cuidados-hero.jpg"
                alt="Acompañamiento familiar"
                width={900}
                height={900}
                className="h-56 w-full object-cover object-center"
              />
              {/* Badge flotante */}
              <div className="absolute top-4 left-4 bg-[color:var(--color-surface)]/90 text-[color:var(--color-ink)] px-3 py-1 rounded-full text-xs shadow-warm">
                Acompañamiento humano
              </div>

              <div className="p-6 space-y-4">
                <blockquote className="quote-callout">
                  “Cuidar es también cuidar de quien cuida.” Mantén una red de apoyo y espacios de descanso.
                </blockquote>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-secondary">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Checklist del día</p>
                        <p className="text-muted-foreground">Hidratación, medicación, paseo breve y conversación.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Entorno seguro</p>
                        <p className="text-muted-foreground">Señaliza, despeja obstáculos y usa buena iluminación.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA opcional */}
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 btn-dark shadow-warm hover:shadow-warm-lg transition"
                >
                  Hablar con un profesional
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Banner final simple (opcional) ===== */}
      <section className="section-spacing-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold mb-2 text-[color:var(--color-ink-strong)]">¿Necesitas una orientación rápida?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nuestro equipo puede guiarte en los primeros pasos: evaluación, estimulación, y apoyo familiar.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <a href="/contacto" className="btn-dark px-5 py-2 rounded-lg shadow-warm hover:shadow-warm-lg transition">
              Contáctanos
            </a>
            <a href="/ayuda" className="btn-light px-5 py-2 rounded-lg">
              Ver recursos
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
