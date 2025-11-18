import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Brain, AlertTriangle, Clock, Users, Quote, ChevronRight, HelpCircle } from "lucide-react"

export default function AlteracionesMemoriaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* ===================== HERO ===================== */}
        {/* Hero con imagen a la derecha, degradado al centro y animación suave */}
        <section className="relative overflow-hidden bg-primary text-secondary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32 relative z-10">
            <div className="text-center md:text-left max-w-3xl mx-auto md:mx-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance animate-fadeIn">
                Información sobre alteraciones de la memoria
              </h1>
              <p className="text-xl max-w-3xl text-pretty leading-relaxed animate-fadeIn delay-150">
                Comprende los diferentes aspectos de la memoria, el deterioro cognitivo y las funciones intelectuales
              </p>

              {/* Índice rápido a los acordeones 
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn delay-200">
                <a href="#memoria" className="group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-[var(--color-surface)] text-[var(--color-ink)] ring-1 ring-[var(--color-divider)] hover:shadow-warm transition">
                  <Brain className="h-5 w-5 text-[var(--color-brand)]" />
                  <span>La memoria</span>
                  <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition" />
                </a>
                <a href="#deterioro" className="group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-[var(--color-surface)] text-[var(--color-ink)] ring-1 ring-[var(--color-divider)] hover:shadow-warm transition">
                  <AlertTriangle className="h-5 w-5 text-[var(--color-brand)]" />
                  <span>Deterioro cognitivo</span>
                  <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition" />
                </a>
                <a href="#funciones" className="group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-[var(--color-surface)] text-[var(--color-ink)] ring-1 ring-[var(--color-divider)] hover:shadow-warm transition">
                  <Users className="h-5 w-5 text-[var(--color-brand)]" />
                  <span>Funciones intelectuales</span>
                  <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition" />
                </a>
              </div>
              */}
            </div>
          </div>

          {/* Imagen a la derecha ocupando alto completo del hero */}
          <div className="absolute inset-y-0 right-0 w-[52%] animate-fadeInRight">
            <Image
              src="/investigacion.png"
              alt="Apoyo y evaluación cognitiva"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Degradado: imagen sólida a la derecha → se funde hacia el centro para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[color:var(--color-primary)]/70 to-[color:var(--color-primary)]" />
          </div>
        </section>

        {/* ===================== CONTENIDO PRINCIPAL ===================== */}
        <section className="section-spacing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Separador suave */}
            <div className="h-px w-full bg-[var(--color-divider)]/80 mb-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Columna principal */}
              <div className="lg:col-span-7">
                <Accordion type="single" collapsible defaultValue="memoria" className="space-y-4">
                  {/* ===== Memoria ===== */}
                  <AccordionItem value="memoria" id="memoria" className="border border-[var(--color-surface-alt)] rounded-lg bg-[var(--color-surface)]/70 backdrop-blur-sm hover:shadow-warm transition">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-[var(--color-surface-alt)]">
                          <Brain className="h-6 w-6 text-[var(--color-brand)]" />
                        </div>
                        <span className="text-xl font-semibold text-left">La Memoria</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 animate-fadeIn">
                      <div className="space-y-4">
                        <p className="text-[var(--color-ink)] leading-relaxed">
                          La memoria es una función cognitiva compleja que nos permite codificar, almacenar y recuperar
                          información. Es fundamental para el aprendizaje, la identidad personal y el funcionamiento
                          diario.
                        </p>

                        <div className="quote-callout">
                          <Quote className="h-5 w-5 text-[var(--color-brand)] mb-2" />
                          <p className="font-medium">
                            "La memoria no es solo recordar el pasado, sino la base sobre la cual construimos nuestro
                            presente y futuro."
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-[var(--color-ink-strong)]">Tipos de memoria:</h4>
                          <ul className="space-y-2 text-[var(--color-ink)]">
                            <li>• <strong>Memoria a corto plazo:</strong> Retiene información por segundos o minutos</li>
                            <li>• <strong>Memoria a largo plazo:</strong> Almacena información de forma permanente</li>
                            <li>• <strong>Memoria de trabajo:</strong> Manipula información temporalmente</li>
                            <li>• <strong>Memoria episódica:</strong> Recuerdos de eventos específicos</li>
                            <li>• <strong>Memoria semántica:</strong> Conocimiento general y conceptos</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* ===== Deterioro ===== */}
                  <AccordionItem value="deterioro" id="deterioro" className="border border-[var(--color-surface-alt)] rounded-lg bg-[var(--color-surface)]/70 backdrop-blur-sm hover:shadow-warm transition">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-[var(--color-surface-alt)]">
                          <AlertTriangle className="h-6 w-6 text-[var(--color-brand)]" />
                        </div>
                        <span className="text-xl font-semibold text-left">Deterioro Cognitivo</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 animate-fadeIn">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-[var(--color-ink-strong)]">
                            En la existencia de un individuo existen tres factores que influyen categóricamente en su vida:
                          </h4>
                          <ul className="space-y-2 text-[var(--color-ink)]">
                            <li>• Bienestar físico</li>
                            <li>• Bienestar socio-afectivo</li>
                            <li>• Bienestar cognitivo</li>
                          </ul>
                        </div>

                        <p className="text-[var(--color-ink)] leading-relaxed">
                          El equilibrio positivo de los tres factores permite que el individuo viva plenamente, sin depender de otras personas y desarrollando todas sus facultades. En la medida que estos factores, o uno de ellos se deteriore, la persona ve su imposibilidad de vivir su propia existencia y comienza, lentamente, a depender de otros hasta llegar a ser completamente dependiente.
                        </p>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-[var(--color-ink-strong)]">Niveles de deterioro:</h4>
                          <ul className="space-y-2 text-[var(--color-ink)]">
                            <li>• <strong>Deterioro Cognitivo Leve (DCL):</strong> Cambios notables pero no incapacitantes</li>
                            <li>• <strong>Demencia leve:</strong> Interferencia moderada con actividades diarias</li>
                            <li>• <strong>Demencia moderada:</strong> Necesidad de supervisión y asistencia</li>
                            <li>• <strong>Demencia severa:</strong> Dependencia total para cuidados básicos</li>
                          </ul>
                        </div>

                        <p className="text-[var(--color-ink)] leading-relaxed">
                          La vejez no es definible por simple cronología, sino por las condiciones físicas, funcionales, mentales y de salud. El envejecimiento está determinado por la acción conjunta de factores socio-psicológicos y, en menor medida, biológicos.
                        </p>

                        <p className="text-[var(--color-ink)] leading-relaxed">
                          Dentro de las funciones mentales superiores están las funciones intelectuales y las cognitivas; son ellas las que más se deterioran con el paso de los años.
                        </p>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-[var(--color-ink-strong)]">Señales de alerta:</h4>
                          <ul className="space-y-2 text-[var(--color-ink)]">
                            <li>• Olvidos frecuentes de información reciente</li>
                            <li>• Dificultad para realizar tareas familiares</li>
                            <li>• Problemas con el lenguaje y la comunicación</li>
                            <li>• Desorientación en tiempo y lugar</li>
                            <li>• Cambios en el juicio y la toma de decisiones</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* ===== Funciones ===== */}
                  <AccordionItem value="funciones" id="funciones" className="border border-[var(--color-surface-alt)] rounded-lg bg-[var(--color-surface)]/70 backdrop-blur-sm hover:shadow-warm transition">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-[var(--color-surface-alt)]">
                          <Users className="h-6 w-6 text-[var(--color-brand)]" />
                        </div>
                        <span className="text-xl font-semibold text-left">Funciones Intelectuales</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 animate-fadeIn">
                      <div className="space-y-4">
                        <p className="text-[var(--color-ink)] leading-relaxed">
                          La inteligencia es el conjunto de capacidades necesarias para adaptarse de forma eficaz. Los estudios transversales clásicos mostraron descensos en test tras los 60 años, pero gran parte se explica por escolaridad, velocidad de respuesta cronometrada, falta de hábito y déficits sensoriales.
                        </p>
                        <p className="text-[var(--color-ink)] leading-relaxed">
                          Las funciones intelectuales abarcan memoria, atención, lenguaje, funciones ejecutivas y habilidades visuoespaciales.
                        </p>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-[var(--color-ink-strong)]">Principales funciones:</h4>
                          <ul className="space-y-2 text-[var(--color-ink)]">
                            <li>• <strong>Atención:</strong> Concentrarse y mantener el foco</li>
                            <li>• <strong>Memoria:</strong> Codificar, almacenar y recuperar</li>
                            <li>• <strong>Lenguaje:</strong> Comprensión y expresión</li>
                            <li>• <strong>Funciones ejecutivas:</strong> Planificar, organizar y controlar</li>
                            <li>• <strong>Visuoespacial:</strong> Percepción y manipulación del espacio</li>
                          </ul>
                        </div>

                        <div className="bg-[var(--color-surface)] p-4 rounded-lg border-l-4 border-[var(--color-accent)]">
                          <h4 className="font-semibold text-[var(--color-ink-strong)] mb-2">Importante sobre la edad</h4>
                          <p className="text-[var(--color-ink)] text-sm">
                            Es normal cierta lentitud o olvidos ocasionales. Cambios significativos que interfieren con la vida diaria requieren evaluación profesional.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-5">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-surface-alt)] shadow-warm">
                    <div className="aspect-[16/10] bg-gradient-to-br from-[var(--color-brand)]/12 to-[var(--color-accent)]/12 rounded-lg flex items-center justify-center mb-4">
                      <Brain className="h-14 w-14 text-[var(--color-brand)]" />
                    </div>
                    <h3 className="font-semibold text-[var(--color-ink-strong)] mb-2">Evaluación Profesional</h3>
                    <p className="text-sm text-[var(--color-ink-subtle)] mb-4">
                      Una evaluación neuropsicológica completa puede identificar alteraciones tempranas y guiar el tratamiento adecuado.
                    </p>
                    <Button
                      asChild
                      className="w-full btn-dark focus-ring-dark"
                    >
                      <Link href="/test-edm">Realizar Evaluación EDM</Link>
                    </Button>
                  </div>

                  {/* Quick facts */}
                  <div className="bg-[var(--color-surface-alt)] p-6 rounded-xl">
                    <h3 className="font-semibold text-[var(--color-ink-strong)] mb-4">Datos Importantes</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-[var(--color-brand)] mt-0.5 flex-shrink-0" />
                        <p className="text-[var(--color-ink)]">La detección temprana mejora el pronóstico.</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Brain className="h-4 w-4 text-[var(--color-brand)] mt-0.5 flex-shrink-0" />
                        <p className="text-[var(--color-ink)]">El ejercicio mental regular ayuda a mantener la función.</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-[var(--color-brand)] mt-0.5 flex-shrink-0" />
                        <p className="text-[var(--color-ink)]">El apoyo familiar es clave en evaluación y tratamiento.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* Banner CTA final */}
            <div className="mt-16 rounded-2xl overflow-hidden border border-[var(--color-divider)] bg-[var(--color-surface)] shadow-warm">
              <div className="grid md:grid-cols-3">
                <div className="md:col-span-2 p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="h-6 w-6 text-[var(--color-brand)]" />
                    <h3 className="text-xl font-semibold text-[var(--color-ink-strong)]">¿Tienes dudas o buscas orientación?</h3>
                  </div>
                  <p className="text-[var(--color-ink)] text-pretty">
                    Podemos guiarte para elegir la evaluación indicada y explicarte los siguientes pasos.
                  </p>
                </div>
                <div className="p-8 flex items-center md:justify-end">
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button asChild className="btn-dark">
                      <Link href="/contacto">Contactar a un profesional</Link>
                    </Button>
                    <Button asChild variant="outline" className="btn-light">
                      <Link href="/ayuda">Ver Preguntas Frecuentes</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
