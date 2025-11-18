import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Users, Target, Eye, CheckCircle, Home } from "lucide-react"

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <Navbar />
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary animate-fadeIn" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white animate-fadeInSlow">
              ¿Quiénes somos?
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-pretty animate-fadeInSlow [animation-delay:50ms]">
              Pioneros en neuropsicología boliviana, dedicados a la evaluación y estimulación cognitiva
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Historia Section */}
          <div className="mb-16">
            
            <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Historia</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Columna IZQUIERDA: Imagen pionero con animación y degradado */}
              <div className="order-2 md:order-1">
                <figure className="relative overflow-hidden rounded-xl shadow-warm-lg animate-fadeInLeft">
                  {/* Cambia la ruta por tu imagen real */}
                  <img
                    src="/pionero.png"
                    alt="René Calderón Soria, pionero de la Neuropsicología en Bolivia"
                    className="w-full h-auto object-cover"
                  />
                  {/* Degradado hacia la derecha para fundirse con el contenido */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-[color:var(--color-surface)] md:to-transparent" />
                  <figcaption className="absolute bottom-3 left-3 bg-[color:var(--color-surface)]/85 text-[color:var(--color-ink)] text-xs px-2 py-1 rounded">
                    René Calderón Soria
                  </figcaption>
                </figure>
              </div>

              {/* Columna DERECHA: Intro + Accordion */}
              <div className="order-1 md:order-2">
                <div className="max-w-4xl md:max-w-none mx-auto mb-8">
                  <p className="text-lg text-muted-foreground text-pretty">
                    Esbozar la historia de la neuropsicología en Bolivia, nos obliga a reconocer, en primer lugar, a René
                        Calderón Soria como el pionero de esta disciplina.
                  </p>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  defaultValue="origenes"
                  className="max-w-4xl md:max-w-none"
                >
                  {/* 1. Orígenes y pionero */}
                  <AccordionItem value="origenes">
                    <AccordionTrigger className="text-left">
                      <span className="font-semibold">Orígenes y pionero (René Calderón Soria)</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      
                      <p>
                        Bolivia es sin duda alguna un territorio de enormes riquezas naturales y grandes necesidades de atención
                        a una población heterogénea que en este siglo veintiuno demanda oportunidades y ofrece un sin número de
                        posibilidades de estudio, investigación, innovación e intervención Neuropsicológica.
                      </p>
                      <p>
                        René Calderón Soria, un connotado hombre de ciencia, fue fundador del primer Instituto Nacional de
                        Desarrollo Infantil en la década de los 60, de la primera carrera de Psicología en la Universidad
                        Católica Boliviana por la década de los 70 y finalmente fundador de la carrera de Psicología en la
                        Universidad Mayor de San Andrés en la década de los 80.
                      </p>
                      <p>
                        Las primeras generaciones de psicólogos bolivianos formados en Bolivia recibieron de él las primeras
                        clases de Neuropsicología, seguidas por la cátedra de la Dra. Margareth Hurtado y el Dr. Juan Carlos Durán.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 2. Sociedad Boliviana de Neuropsicología */}
                  <AccordionItem value="sociedad">
                    <AccordionTrigger className="text-left">
                      <span className="font-semibold">Sociedad Boliviana de Neuropsicología (1995–hoy)</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <p>
                        La Sociedad Boliviana de Neuropsicología se funda en la ciudad de La Paz, el 15 de octubre de 1995,
                        como consecuencia de reuniones preliminares de organización desde 1993, a la cabeza del Dr. René
                        Calderón Soria.
                      </p>
                      <p>
                        Desde su fundación en 1995 hasta la fecha, las actividades académicas de la Sociedad Boliviana de
                        Neuropsicología (SNpB) han permitido la visita de importantes neuropsicólogos extranjeros.
                      </p>
                      <p>
                        Todas las actividades de la SNpB han tenido como escenario la ciudad de La Paz, pero el reto es la
                        cobertura nacional que nos permita organizar las filiales departamentales. La primera filial creada ha
                        sido la de Santa Cruz de la Sierra en julio de 2012.
                      </p>
                      <p>
                        A la fecha la SNpB es la única institución de carácter científico para la agrupación de profesionales del
                        área neuropsicológica.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 3. NEUROLAP */}
                  <AccordionItem value="neurolap">
                    <AccordionTrigger className="text-left">
                      <span className="font-semibold">NEUROLAP “René Calderón Soria” (UPSA, 2014)</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <p>
                        El NEUROLAP “René Calderón Soria” es el Primer Laboratorio de Neurocognición en Bolivia y debe su
                        nombre al pionero de la Neuropsicología en nuestro país en reconocimiento a su trayectoria e impulso
                        profesional.
                      </p>
                      <p>
                        El NEUROLAP se funda en la Universidad Privada de Santa Cruz (UPSA) con el patrocinio de Grand Challenges
                        Canadá, Help Age International y Fundación Horizontes, bajo el proyecto “No te olvides de mí” a partir de
                        septiembre de 2014.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

              </div>
            </div>
          </div>

          {/* Misión, Visión, Objetivos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card base */}
            {[
              {
                icon: <Target className="h-12 w-12 text-primary" />,
                title: "Misión",
                content:
                  "La misión del NEUROLAP “Rene Calderón Soria” es la atención de las necesidades de evaluación y rehabilitación neurocognitiva de personas con alteraciones en este campo, a través de procedimientos de detección y el diseño de programas de estimulación.",
              },
              {
                icon: <Eye className="h-12 w-12 text-primary" />,
                title: "Visión",
                content:
                  "El NEUROLAP “Rene Calderón Soria” busca ser el Laboratorio de Neurocognición referencial en Bolivia, para el desarrollo de procedimientos de detección de alteraciones cognitivas y el diseño de programas de estimulación para la atención y rehabilitación de las mismas.",
              },
              {
                icon: <Users className="h-12 w-12 text-primary" />,
                title: "Objetivo General",
                content:
                  "Prestar servicios de evaluación mnémica y estimulación neurocognitiva a personas adultas mayores de áreas urbanas y rurales de Bolivia, bajo sospecha de deterioro cognitivo.",
              },
            ].map((item, idx) => (
              // <motion.div key={idx} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{ once:true }} transition={{ duration:.4, delay: idx*0.05 }} className="group relative">
              <div key={idx} className="group relative">
                {/* halo/borde gradiente en hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(120deg, rgba(152,0,46,0.18), rgba(151,72,68,0.18))" }} />
                <Card className="relative overflow-hidden rounded-2xl bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]
                                  shadow-warm transition-all duration-300 ease-out
                                  hover:shadow-warm-lg hover:-translate-y-1 hover:scale-[1.01] focus-within:shadow-warm-lg h-full">
                  {/* overlay sutil */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "radial-gradient(120% 120% at 0% 0%, rgba(238,211,190,0.35) 0%, transparent 45%)" }} />
                  <CardHeader className="relative">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--secondary)]/60 ring-1 ring-[color:var(--border)]
                                    transition-transform duration-300 group-hover:rotate-[-2deg]">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl text-[color:var(--color-ink-strong)]">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-pretty">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              </div>
              // </motion.div>
            ))}

            {/* Objetivos Específicos – variante con lista y CTA */}
            {/* <motion.div initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{ once:true }} transition={{ duration:.4, delay:.15 }} className="group relative"> */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(120deg, rgba(152,0,46,0.18), rgba(151,72,68,0.18))" }} />
              <Card className="relative overflow-hidden rounded-2xl bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]
                                shadow-warm transition-all duration-300 ease-out
                                hover:shadow-warm-lg hover:-translate-y-1 hover:scale-[1.01]">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--secondary)]/60 ring-1 ring-[color:var(--border)]
                                  transition-transform duration-300 group-hover:rotate-[-2deg]">
                    <CheckCircle className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-[color:var(--color-ink-strong)]">Objetivos Específicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground text-sm space-y-2 text-left custom-bullets">
                    <li>Desarrollar un software de evaluación mnémica para evaluación eficiente presencial y a distancia.</li>
                    <li>Establecer modelos de evaluación neurocognitiva.</li>
                    <li>Diseñar modelos básicos de estimulación neurocognitiva frente al deterioro cognitivo.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            {/* </motion.div> */}
          </div>

        </div>
      </section>
      <Footer />
    </div>
  )
}
