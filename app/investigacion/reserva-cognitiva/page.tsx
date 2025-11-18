import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReservaCognitivaPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden animate-fadeIn">
      {/* Ornamentos flotantes suaves */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -left-20 h-56 w-56 rounded-full bg-accent/15 blur-2xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 -right-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float-rev"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-1/3 h-40 w-40 rounded-full bg-accent/10 blur-2xl animate-float-slow"
      />

      {/* Navbar */}
      <Navbar />

      {/* Section Header */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block">
              <h1 className="text-balance animate-fadeInUp">
                Reserva Cognitiva
              </h1>
              {/* subrayado animado bajo el título */}
              <span className="mt-2 block h-1 w-24 mx-auto bg-accent/80 rounded-full animate-underlineGrow" />
            </div>
            <p className="text-lg text-muted-foreground mt-4 animate-fadeInUp delay-150">
              Descubre cómo fortalecer tu reserva cognitiva para mantener la salud mental y prevenir el deterioro
              cognitivo.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto animate-reveal">
            <Accordion type="single" collapsible defaultValue="que-es" className="space-y-4">
              {/* Item 1 */}
              <AccordionItem
                value="que-es"
                className="border border-border rounded-lg card-lift animate-fadeInUp"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-lg">
                  <h3 className="text-xl font-semibold">¿Qué es y Por Qué Importa?</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p>
                      La reserva cognitiva se refiere a la capacidad del cerebro para mantener un funcionamiento normal
                      a pesar de la presencia de patología o daño cerebral.
                    </p>

                    <div className="animate-fadeInLeft">
                      <h4 className="font-semibold mb-2">Relación con el Alzheimer</h4>
                      <p>
                        Las personas con mayor reserva cognitiva pueden mantener sus funciones cognitivas por más
                        tiempo, incluso cuando ya existe patología de Alzheimer en el cerebro. Esto se debe a que el
                        cerebro desarrolla mecanismos compensatorios más eficientes.
                      </p>
                    </div>

                    <div className="animate-fadeInRight delay-150">
                      <h4 className="font-semibold mb-2">Resiliencia Cognitiva</h4>
                      <p>Una mayor reserva cognitiva proporciona:</p>
                      <div className="custom-bullets">
                        <ul className="space-y-1">
                          <li>Mayor resistencia al deterioro cognitivo</li>
                          <li>Mejor adaptación a los cambios cerebrales</li>
                          <li>Mantenimiento de la funcionalidad por más tiempo</li>
                          <li>Mejor calidad de vida en el envejecimiento</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Item 2 */}
              <AccordionItem
                value="habitos"
                className="border border-border rounded-lg card-lift animate-fadeInUp delay-150"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-lg">
                  <h3 className="text-xl font-semibold">Preparación y Hábitos Protectores</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="animate-fade-in">Desarrollar y mantener hábitos saludables es fundamental para construir reserva cognitiva:</p>

                    <div className="custom-bullets">
                      <ul className="space-y-3">
                        <li><strong>Lectura regular:</strong> Mantiene activas las redes neuronales del lenguaje y comprensión</li>
                        <li><strong>Socialización activa:</strong> Participar en actividades grupales y mantener relaciones sociales significativas</li>
                        <li><strong>Actividad física:</strong> Ejercicio regular mejora la circulación cerebral y promueve la neuroplasticidad</li>
                        <li><strong>Sueño de calidad:</strong> 7-8 horas de sueño reparador para la consolidación de la memoria</li>
                        <li><strong>Nutrición balanceada:</strong> Dieta mediterránea rica en antioxidantes y ácidos grasos omega-3</li>
                        <li><strong>Control de comorbilidades:</strong> Manejo adecuado de diabetes, hipertensión y otras condiciones</li>
                        <li><strong>Aprendizaje continuo:</strong> Adquirir nuevas habilidades y conocimientos a lo largo de la vida</li>
                        <li><strong>Estimulación mental:</strong> Puzzles, juegos de estrategia, música, arte</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Item 3 */}
              <AccordionItem
                value="acompanamiento"
                className="border border-border rounded-lg card-lift animate-fadeInUp delay-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-lg">
                  <h3 className="text-xl font-semibold">Acompañamiento Familiar</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p>
                      El apoyo familiar es crucial para mantener y desarrollar la reserva cognitiva. La familia puede:
                    </p>

                    <div className="animate-fadeInLeft">
                      <h4 className="font-semibold mb-2">Crear un Entorno Estimulante</h4>
                      <div className="custom-bullets">
                        <ul className="space-y-2">
                          <li>Fomentar conversaciones significativas y debates familiares</li>
                          <li>Incluir a la persona en la toma de decisiones familiares</li>
                          <li>Planificar actividades grupales que desafíen cognitivamente</li>
                          <li>Mantener rutinas que promuevan la independencia</li>
                        </ul>
                      </div>
                    </div>

                    <div className="animate-fadeInRight delay-150">
                      <h4 className="font-semibold mb-2">Apoyo Emocional</h4>
                      <p>
                        Brindar un ambiente de comprensión, paciencia y motivación. Celebrar los logros y mantener una
                        actitud positiva hacia el envejecimiento activo.
                      </p>
                    </div>

                    {/* Bloque destacado animado */}
                    <div className="mt-6 rounded-lg border border-accent/40 bg-accent/10 p-5 shadow-sm animate-fadeInUp delay-150">
                      <h5 className="font-semibold text-accent mb-2">Cuando el Alzheimer toca a la familia</h5>
                      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p>
                          Cuando el Alzheimer toca a uno de nuestros familiares, por lo general pasa a ser una parte
                          descuidada de la familia debido a la falta de información sobre la manera de tratar a una
                          persona con esta condición.
                        </p>
                        <p>
                          Por este motivo es muy importante mantenernos preparados para esta situación, ya que la
                          persona con Alzheimer necesita mucha atención, tiempo, dedicación y comprensión para poder
                          disminuir la carga tanto física como psicológica a la que se enfrenta.
                        </p>
                        <p>
                          De manera que los cambios por los que pase no generen un ambiente conflictivo sino que se
                          desenvuelvan en un entorno inmediato paciente y sobre todo afectivo basado en la comprensión
                          adecuada de la situación.
                        </p>
                      </div>
                    </div>

                    <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent animate-fade-in delay-300">
                      <p className="text-sm font-medium">
                        <strong>Mensaje de Esperanza:</strong> Nunca es tarde para comenzar a construir reserva
                        cognitiva. Cada actividad, cada nuevo aprendizaje, cada conexión social contribuye a un
                        envejecimiento más saludable y pleno.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA */}
            <div className="mt-12 text-center animate-fadeInUp">
              <Link href="/investigacion">
                <Button
                  variant="outline"
                  className="btn-light bg-transparent transition-transform duration-200 hover:-translate-y-0.5 focus-ring"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Investigación
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
