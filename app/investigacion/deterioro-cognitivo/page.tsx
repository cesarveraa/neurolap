import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function DeterioroCognitivoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Section Header */}
      <section className="section-spacing bg-background relative overflow-hidden">
        {/* Decor blobs */}
        <div aria-hidden className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-[var(--color-accent)]/10 blur-3xl animate-floatSlow" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-[var(--color-brand)]/10 blur-2xl animate-floatSlow [animation-delay:300ms]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-balance animate-fadeInUp">
              Deterioro Cognitivo
            </h1>

            {/* subrayado animado sutil */}
            <span
              aria-hidden
              className="mt-2 inline-block h-[3px] w-24 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-brand)] animate-stretchX"
            />

            <p className="text-lg text-muted-foreground mt-4 animate-fadeInUp [animation-delay:120ms]">
              Comprende los factores que influyen en el deterioro cognitivo y cómo el envejecimiento afecta nuestras
              capacidades mentales.
            </p>

            {/* Resumen clave creativo */}
            <div className="mt-6 rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)]/70 p-5 text-left shadow-warm animate-fadeInUp [animation-delay:220ms] gradient-border">
              <h3 className="text-base font-semibold text-[var(--color-ink-strong)] mb-2">Marco general</h3>
              <p className="text-[var(--color-ink)]">
                En la existencia de un individuo existen <strong>tres factores</strong> que influyen categóricamente en su vida:
                <strong> bienestar físico</strong>, <strong>bienestar socio-afectivo</strong> y <strong>bienestar cognitivo</strong>.
                El <strong>equilibrio positivo</strong> de los tres permite vivir plenamente, sin depender de otras personas y
                desarrollando todas las facultades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing-alt relative overflow-hidden">
        {/* fondo con retícula muy tenue */}
        <div aria-hidden className="absolute inset-0 z-0 opacity-[0.035] bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary.DEFAULT)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible defaultValue="factores" className="space-y-4">

              <AccordionItem value="factores" className="border border-border rounded-lg shadow-warm hover:shadow-warm-lg transition-shadow">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
                  <h3 className="text-xl font-semibold">
                    Factores que Influyen en el Deterioro
                  </h3>
                  {/* indicador sutil */}
                  <span className="ml-3 inline-block h-2 w-2 rounded-full bg-[var(--color-accent)] group-data-[state=open]:bg-[var(--color-brand)] transition-colors" />
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-5 animate-fadeInUp">
                    <p>
                      El deterioro cognitivo está influenciado por múltiples factores interconectados:
                    </p>

                    {/* Tarjetas de los tres factores (micro-interacciones) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="rounded-lg bg-[var(--color-surface)] p-4 border border-[var(--color-divider)] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        <h4 className="font-semibold text-primary mb-1">Bienestar físico</h4>
                        <p className="text-sm text-muted-foreground">Salud general, ejercicio y nutrición adecuada.</p>
                      </div>
                      <div className="rounded-lg bg-[var(--color-surface)] p-4 border border-[var(--color-divider)] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        <h4 className="font-semibold text-primary mb-1">Bienestar socio-afectivo</h4>
                        <p className="text-sm text-muted-foreground">Vínculos, apoyo emocional y participación social.</p>
                      </div>
                      <div className="rounded-lg bg-[var(--color-surface)] p-4 border border-[var(--color-divider)] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        <h4 className="font-semibold text-primary mb-1">Bienestar cognitivo</h4>
                        <p className="text-sm text-muted-foreground">Estimulación mental y aprendizaje continuo.</p>
                      </div>
                    </div>

                    {/* Tu lista original (conservo) */}
                    <div className="custom-bullets">
                      <ul className="space-y-2">
                        <li>
                          <strong>Bienestar físico:</strong> Estado de salud general, ejercicio regular, nutrición
                          adecuada
                        </li>
                        <li>
                          <strong>Bienestar socio-afectivo:</strong> Relaciones sociales, apoyo emocional, participación
                          comunitaria
                        </li>
                        <li>
                          <strong>Bienestar cognitivo:</strong> Estimulación mental, aprendizaje continuo, desafíos
                          intelectuales
                        </li>
                        <li>
                          <strong>Factores ambientales:</strong> Calidad del entorno, acceso a servicios de salud
                        </li>
                        <li>
                          <strong>Factores genéticos:</strong> Predisposición hereditaria y vulnerabilidades específicas
                        </li>
                      </ul>
                    </div>

                    {/* Texto requerido: equilibrio ⇢ dependencia */}
                    <div className="rounded-lg bg-secondary/20 p-4 border border-[var(--color-divider)]">
                      <p className="text-sm text-[var(--color-ink)]">
                        En la medida que estos factores, o uno de ellos, se deteriore, la persona se va imposibilitando de
                        vivir su propia existencia y comienza, lentamente, a depender de otros hasta llegar a ser
                        completamente dependiente.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="envejecimiento" className="border border-border rounded-lg shadow-warm hover:shadow-warm-lg transition-shadow">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
                  <h3 className="text-xl font-semibold">Envejecimiento y Causas</h3>
                  <span className="ml-3 inline-block h-2 w-2 rounded-full bg-[var(--color-accent)] group-data-[state=open]:bg-[var(--color-brand)] transition-colors" />
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-5 animate-fadeInUp">
                    {/* Texto requerido: vejez no cronológica */}
                    <p>
                      La vejez no es definible por simple cronología, sino más bien por las condiciones físicas,
                      funcionales, mentales y de salud de las personas. Actualmente está ampliamente aceptado que la
                      manera de envejecer está determinada por la acción conjunta de varias causas, sobre todo por
                      <strong> factores socio-psicológicos</strong> y <em>solo una pequeña parte</em> por factores
                      biológicos.
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">Factores Psicosociales (Mayor Peso)</h4>
                      <p>
                        Las influencias del entorno social, las experiencias de vida, el nivel educativo y las
                        oportunidades de participación social tienen un impacto más significativo en el deterioro
                        cognitivo que los factores puramente biológicos.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Factores Biológicos</h4>
                      <p>
                        Aunque importantes, los cambios cerebrales naturales del envejecimiento pueden ser modulados
                        significativamente por intervenciones psicosociales y ambientales.
                      </p>
                    </div>

                    {/* Texto requerido: histórico/sociocultural + proceso individual/colectivo */}
                    <div className="rounded-lg border border-[var(--color-divider)] p-4 bg-[var(--color-surface)]">
                      <p className="text-sm text-[var(--color-ink)]">
                        Destacan de manera importante los aspectos <strong>históricos y socio-culturales</strong> del
                        entorno del individuo y los aspectos individuales con relación a la manera en que el sujeto se
                        adapta y enfrenta su propio envejecimiento. Es un <strong>proceso individual y a la vez
                        colectivo</strong>: ocurre en la persona, pero es condicionado por la sociedad, por la calidad y
                        por los modos de vida.
                      </p>
                    </div>

                    <p>
                      Esta comprensión nos permite enfocar los esfuerzos de prevención en <strong>aspectos
                      modificables</strong> del entorno y el estilo de vida.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="impacto" className="border border-border rounded-lg shadow-warm hover:shadow-warm-lg transition-shadow">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
                  <h3 className="text-xl font-semibold">Impacto Funcional y Dependencia</h3>
                  <span className="ml-3 inline-block h-2 w-2 rounded-full bg-[var(--color-accent)] group-data-[state=open]:bg-[var(--color-brand)] transition-colors" />
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 animate-fadeInUp">
                    <p>
                      El deterioro cognitivo progresa gradualmente, afectando diferentes aspectos de la vida diaria:
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">Etapas de Progresión</h4>
                      <div className="custom-bullets">
                        <ul className="space-y-2">
                          <li>
                            <strong>Inicial:</strong> Dificultades sutiles en tareas complejas, olvidos ocasionales
                          </li>
                          <li>
                            <strong>Moderada:</strong> Afectación en actividades instrumentales (manejo de finanzas,
                            medicamentos)
                          </li>
                          <li>
                            <strong>Avanzada:</strong> Necesidad de apoyo en actividades básicas de la vida diaria
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Impacto en la Autonomía</h4>
                      <p>
                        La pérdida gradual de independencia afecta no solo a la persona, sino también a su entorno
                        familiar y social. La detección temprana y las intervenciones apropiadas pueden ralentizar
                        significativamente este proceso.
                      </p>
                    </div>

                    {/* Texto requerido: funciones mentales superiores */}
                    <div className="rounded-lg bg-secondary/20 p-4 border border-[var(--color-divider)]">
                      <p className="text-sm text-[var(--color-ink)]">
                        Dentro de las funciones mentales superiores están las <strong>funciones intelectuales</strong> y
                        las <strong>funciones cognitivas</strong>, que en su integridad representan la capacidad de
                        cualquier persona a cualquier edad; sin embargo, <strong>son éstas las que se deterioran</strong> al
                        pasar los años.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA */}
            <div className="mt-12 text-center animate-fadeInUp [animation-delay:120ms]">
              <Link href="/investigacion">
                <Button variant="outline" className="btn-light bg-transparent hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Investigación
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    
  )
}
