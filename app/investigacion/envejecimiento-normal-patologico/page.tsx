import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function EnvejecimientoNormalPatologicoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Section Header */}
      <section className="section-spacing bg-background relative overflow-hidden">
        {/* Decor blobs sutiles */}
        <div aria-hidden className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-[var(--color-brand)]/10 blur-2xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-balance animate-fadeInUp">Envejecimiento Normal y Patológico</h1>
            <p className="text-lg text-muted-foreground mt-4 animate-fadeInUp [animation-delay:120ms]">
              Comprende las diferencias entre el envejecimiento natural y los procesos patológicos, y cómo los factores
              socioculturales influyen en este proceso.
            </p>

            {/* Tarjeta-resumen con los 3 factores 
            <div className="mt-6 rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)]/70 p-5 text-left shadow-warm animate-fadeInUp [animation-delay:220ms]">
              <h3 className="text-base font-semibold text-[var(--color-ink-strong)] mb-2">Tres factores clave</h3>
              <p className="text-[var(--color-ink)]">
                En la existencia de un individuo existen <strong>tres factores</strong> que influyen categóricamente en su vida:
                <strong> bienestar físico</strong>, <strong>bienestar socio-afectivo</strong> y <strong>bienestar cognitivo</strong>.
                El <strong>equilibrio positivo</strong> de los tres permite vivir plenamente, sin depender de otras personas y
                desarrollando todas sus facultades.
              </p>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible defaultValue="marco-general" className="space-y-4">
              {/* NUEVO: Marco General (incluye los dos primeros párrafos completos) */}
              <AccordionItem value="marco-general" className="border border-border rounded-lg shadow-warm">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <h3 className="text-xl font-semibold">Marco General del Envejecimiento</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-5 animate-fadeInUp">
                    <p>
                      En la existencia de un individuo existen tres factores que influyen categóricamente en su vida:
                      <strong> Bienestar físico</strong>, <strong>bienestar socio-afectivo</strong> y
                      <strong> bienestar cognitivo</strong>. El equilibrio positivo de los tres factores permite que el individuo
                      viva plenamente, sin depender de otras personas y desarrollando todas sus facultades.
                    </p>
                    <div className="rounded-lg bg-secondary/20 p-4">
                      <p className="text-sm text-[var(--color-ink)]">
                        En la medida que estos factores, o uno de ellos se deteriore, la persona se va imposibilitando de vivir su
                        propia existencia y comienza, lentamente, a depender de otros hasta llegar a ser completamente dependiente.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="factores-modulan" className="border border-border rounded-lg shadow-warm">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <h3 className="text-xl font-semibold">Factores que Modulan el Envejecimiento</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-5 animate-fadeInUp">
                    {/* Párrafo requerido: vejez no cronológica + peso socio-psicológico */}
                    <p>
                      La vejez no es definible por simple cronología, sino más bien por las condiciones físicas, funcionales,
                      mentales y de salud de las personas. Actualmente está ampliamente aceptado que la manera de envejecer está
                      determinada por la acción conjunta de varias causas, sobre todo por <strong>factores socio-psicológicos</strong> y
                      <em> solo una pequeña parte</em> está determinada por factores biológicos.
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">Factores Biológicos</h4>
                      <p>
                        Incluyen los cambios naturales del organismo, la genética y las alteraciones fisiológicas propias del paso
                        del tiempo. Aunque importantes, representan solo una parte del proceso de envejecimiento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Factores Socioculturales (Mayor Impacto)</h4>
                      <p>
                        Los aspectos sociales y culturales tienen un peso significativamente mayor en cómo envejecemos:
                      </p>
                      <div className="custom-bullets mt-2">
                        <ul className="space-y-2">
                          <li>
                            <strong>Nivel educativo:</strong> Mayor educación se asocia con mejor envejecimiento cognitivo
                          </li>
                          <li>
                            <strong>Participación social:</strong> Mantenimiento de roles sociales activos
                          </li>
                          <li>
                            <strong>Apoyo familiar y comunitario:</strong> Redes de soporte sólidas
                          </li>
                          <li>
                            <strong>Acceso a servicios de salud:</strong> Atención preventiva y tratamiento oportuno
                          </li>
                          <li>
                            <strong>Condiciones socioeconómicas:</strong> Recursos para mantener calidad de vida
                          </li>
                          <li>
                            <strong>Actitudes culturales hacia el envejecimiento:</strong> Valoración social de los adultos mayores
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="proceso-individual" className="border border-border rounded-lg shadow-warm">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <h3 className="text-xl font-semibold">Proceso Individual y Social</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-5 animate-fadeInUp">
                    <p>
                      El envejecimiento es simultáneamente un fenómeno personal único y un proceso colectivo influenciado por el
                      contexto histórico y sociocultural.
                    </p>

                    {/* Párrafos requeridos: histórico/sociocultural + individual/colectivo condicionados por la sociedad */}
                    <div className="rounded-lg border border-[var(--color-divider)] p-4 bg-[var(--color-surface)]">
                      <p className="text-sm text-[var(--color-ink)]">
                        En cambio destacan de manera importante los aspectos <strong>históricos y socio-culturales</strong> del
                        entorno del individuo y los aspectos individuales con relación a la manera en que el sujeto se adapta y
                        enfrenta su propio envejecimiento. En este sentido existe un <strong>proceso individual y a la vez
                        colectivo</strong>, en el sentido de que se produce en el individuo, pero es condicionado por la sociedad,
                        por la calidad y por los modos de vida.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Dimensión Personal</h4>
                      <p>
                        Cada persona envejece de manera única, influenciada por su historia de vida, decisiones personales,
                        experiencias acumuladas y características individuales. No existe un patrón universal de envejecimiento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Dimensión Social e Histórica</h4>
                      <p>El envejecimiento también es un fenómeno colectivo que refleja:</p>
                      <div className="custom-bullets mt-2">
                        <ul className="space-y-1">
                          <li>Las condiciones históricas de cada generación</li>
                          <li>Los avances médicos y tecnológicos disponibles</li>
                          <li>Las políticas públicas de salud y bienestar social</li>
                          <li>Los valores culturales sobre la vejez y el envejecimiento</li>
                          <li>Las oportunidades educativas y laborales de cada época</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Contexto Sociocultural</h4>
                      <p>
                        Las sociedades que valoran y respetan a sus adultos mayores, proporcionándoles roles significativos y
                        apoyo adecuado, facilitan procesos de envejecimiento más saludables y satisfactorios.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="funciones-cognitivas" className="border border-border rounded-lg shadow-warm">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <h3 className="text-xl font-semibold">Funciones Cognitivas e Intelectuales</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-5 animate-fadeInUp">
                    <p>
                      Es importante distinguir entre los cambios cognitivos normales del envejecimiento y aquellos que indican
                      procesos patológicos.
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">Cambios Normales con la Edad</h4>
                      <div className="custom-bullets">
                        <ul className="space-y-2">
                          <li>
                            <strong>Velocidad de procesamiento:</strong> Ligera disminución en la rapidez para procesar información
                          </li>
                          <li>
                            <strong>Memoria de trabajo:</strong> Pequeñas dificultades para mantener información temporalmente
                          </li>
                          <li>
                            <strong>Atención dividida:</strong> Mayor dificultad para realizar múltiples tareas simultáneamente
                          </li>
                          <li>
                            <strong>Recuperación de palabras:</strong> Ocasionales dificultades para encontrar palabras específicas
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Sesgos en las Evaluaciones</h4>
                      <p>Es crucial reconocer que muchas pruebas cognitivas tradicionales pueden tener sesgos:</p>
                      <div className="custom-bullets mt-2">
                        <ul className="space-y-2">
                          <li>
                            <strong>Pruebas cronometradas:</strong> Pueden penalizar injustamente a adultos mayores que procesan
                            información más deliberadamente
                          </li>
                          <li>
                            <strong>Diferencias generacionales:</strong> Variaciones en familiaridad con tecnología o tipos de tareas
                          </li>
                          <li>
                            <strong>Factores educativos:</strong> Las diferencias en oportunidades educativas pueden influir en el rendimiento
                          </li>
                          <li>
                            <strong>Hábitos de vida:</strong> Cambios en rutinas y actividades pueden afectar el rendimiento en pruebas específicas
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Párrafo requerido final: funciones mentales superiores que se deterioran con los años */}
                    <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                      <p className="text-sm">
                        Dentro de las funciones mentales superiores están las <strong>funciones intelectuales</strong> y las
                        <strong> funciones cognitivas</strong>, que en su integridad representan la capacidad de cualquier persona a
                        cualquier edad; sin embargo, <strong>son éstas las que se deterioran al pasar los años</strong>.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA */}
            <div className="mt-12 text-center animate-fadeInUp [animation-delay:120ms]">
              <Link href="/investigacion">
                <Button variant="outline" className="btn-light bg-transparent">
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
