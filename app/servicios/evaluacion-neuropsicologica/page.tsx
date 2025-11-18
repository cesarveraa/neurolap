import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, BarChart3, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EvaluacionNeuropsicologicaPage() {
  const evaluationSteps = [
    {
      title: "Entrevista Inicial",
      icon: FileText,
      description:
        "Recopilación de información sobre historial médico, síntomas actuales y preocupaciones específicas.",
    },
    {
      title: "Aplicación del Test EDM",
      icon: Clock,
      description: "Evaluación estructurada de diferentes tipos de memoria mediante pruebas específicas y validadas.",
    },
    {
      title: "Análisis de Resultados",
      icon: BarChart3,
      description: "Interpretación profesional de los datos obtenidos y comparación con normas poblacionales.",
    },
    {
      title: "Reporte Clínico",
      icon: CheckCircle,
      description: "Elaboración de informe detallado con resultados, interpretación y recomendaciones.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground py-16">
          {/* decor: blobs cálidos */}
          <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_80%_20%,#000_20%,transparent_70%)]">
            <div className="absolute -right-24 -top-24 size-64 rounded-full bg-accent/20 blur-2xl animate-float-slow" />
            <div className="absolute right-20 top-10 size-40 rounded-full bg-[var(--color-surface)]/10 blur-xl animate-float-slower" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in [animation-delay:80ms]">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
                  <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    Evaluación Neuropsicológica
                  </span>
                </h1>
                <p className="text-xl text-primary-foreground/90 text-pretty leading-relaxed mb-8 animate-fade-in [animation-delay:180ms]">
                  Evaluación profesional y detallada de las funciones cognitivas mediante el test EDM (Evaluación
                  Diferencial de la Memoria).
                </p>
                <div className="flex flex-wrap gap-3 animate-fade-in [animation-delay:260ms]">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 shadow-warm hover:shadow-warm-lg transition">
                    <Link href="/test-edm">Realizar Test EDM</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/70 text-accent hover:bg-white/10 px-8 backdrop-blur-sm"
                  >
                    <Link href="/servicios/estimulacion-neurocognitiva">Programas de estimulación</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-warm-lg ring-1 ring-white/10 animate-float">
                  <Image
                    src="/neuropsychological-assessment-professional-setting.jpg"
                    alt="Evaluación neuropsicológica en entorno profesional"
                    width={500}
                    height={400}
                    className="rounded-2xl object-cover"
                    priority
                  />
                  {/* brillo suave */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is EDM Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3 text-balance animate-fade-in">¿Qué es el Test EDM?</h2>
              <div className="mx-auto h-[3px] w-20 rounded-full bg-accent/70 animate-grow-x" />
              <p className="mt-6 text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed animate-fade-in [animation-delay:120ms]">
                La <strong>Evaluación Diferencial de la Memoria (EDM)</strong> es una herramienta neuropsicológica que permite
                explorar con precisión los distintos tipos de memoria y funciones cognitivas, brindando un perfil completo del
                funcionamiento mental de cada persona.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Columna izquierda: explicación enriquecida */}
              <div className="space-y-6 animate-fade-in [animation-delay:60ms]">
                <h3 className="text-2xl font-semibold text-primary">Un enfoque integral</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A diferencia de evaluaciones generales, el EDM se centra en <strong>diferenciar</strong> cómo funcionan
                  diversas memorias en la vida cotidiana: desde recordar lo que hiciste ayer hasta manejar información en tiempo
                  real o aplicar conocimientos adquiridos. 
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Gracias a su estructura, permite detectar con claridad alteraciones leves y orientar programas de
                  <strong> estimulación neurocognitiva personalizados</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div className="p-4 bg-secondary/30 rounded-lg shadow-sm hover:shadow-warm transition hover:-translate-y-0.5">
                    <h4 className="font-semibold text-card-foreground mb-2">Exploración Profunda</h4>
                    <p className="text-sm text-muted-foreground">
                      Analiza desde la <em>memoria episódica</em> hasta la <em>memoria procesual</em>, ofreciendo un mapa
                      cognitivo completo.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg shadow-sm hover:shadow-warm transition hover:-translate-y-0.5">
                    <h4 className="font-semibold text-card-foreground mb-2">Alta Sensibilidad</h4>
                    <p className="text-sm text-muted-foreground">
                      Detecta cambios sutiles que podrían pasar desapercibidos en evaluaciones convencionales.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg shadow-sm hover:shadow-warm transition hover:-translate-y-0.5">
                    <h4 className="font-semibold text-card-foreground mb-2">Relevancia Clínica</h4>
                    <p className="text-sm text-muted-foreground">
                      Guía decisiones en diagnóstico, prevención y estimulación de personas con quejas de memoria.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg shadow-sm hover:shadow-warm transition hover:-translate-y-0.5">
                    <h4 className="font-semibold text-card-foreground mb-2">Aplicación Flexible</h4>
                    <p className="text-sm text-muted-foreground">
                      Puede aplicarse en contextos clínicos, educativos y de investigación.
                    </p>
                  </div>
                </div>
              </div>

              {/* Columna derecha: lista de áreas evaluadas*/}
              <div className="space-y-6 animate-fade-in [animation-delay:140ms]">
                <h3 className="text-2xl font-semibold text-primary">Áreas que evalúa</h3>
                <ul className="space-y-6">
                  {/* Memoria Episódica */}
                  <li className="group flex items-start gap-3">
                    <div className="w-3 h-3 mt-2 bg-accent rounded-full flex-shrink-0 group-hover:scale-125 transition" />
                    <div>
                      <span className="block font-semibold text-card-foreground">Memoria Episódica</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Evalúa la capacidad de recordar experiencias personales en un tiempo y lugar
                        determinado (p. ej., qué hiciste ayer, con quién hablaste, dónde estabas). 
                        Es esencial para la identidad personal y para contextualizar la vida cotidiana. 
                        En el EDM se explora mediante evocación de historias, listas de palabras o eventos
                        breves.
                      </p>
                    </div>
                  </li>

                  {/* Memoria Operativa */}
                  <li className="group flex items-start gap-3">
                    <div className="w-3 h-3 mt-2 bg-accent rounded-full flex-shrink-0 group-hover:scale-125 transition" />
                    <div>
                      <span className="block font-semibold text-card-foreground">Memoria Operativa</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Conocida también como “memoria de trabajo”, permite retener y manipular información 
                        en tiempo real para resolver problemas o realizar tareas inmediatas 
                        (ejemplo: recordar un número telefónico mientras lo marcas, o hacer cálculos mentales).
                        El EDM incluye tareas de repetición, series y manipulación de estímulos.
                      </p>
                    </div>
                  </li>

                  {/* Memoria Semántica */}
                  <li className="group flex items-start gap-3">
                    <div className="w-3 h-3 mt-2 bg-accent rounded-full flex-shrink-0 group-hover:scale-125 transition" />
                    <div>
                      <span className="block font-semibold text-card-foreground">Memoria Semántica</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Se refiere al conocimiento general, cultural y conceptual acumulado a lo largo de la vida 
                        (ejemplo: saber que La Paz es la sede de gobierno, o el significado de una palabra).
                        En el EDM se analiza mediante evocación de significados, definiciones y categorización 
                        de conceptos.
                      </p>
                    </div>
                  </li>

                  {/* Memoria Procesual */}
                  <li className="group flex items-start gap-3">
                    <div className="w-3 h-3 mt-2 bg-accent rounded-full flex-shrink-0 group-hover:scale-125 transition" />
                    <div>
                      <span className="block font-semibold text-card-foreground">Memoria Procesual</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Es la memoria de las habilidades y rutinas motoras, que permite ejecutar acciones 
                        automáticas y aprender procedimientos (ejemplo: montar bicicleta, escribir, tocar un 
                        instrumento). 
                        En el EDM se valora a través de <em>producción motora</em> (dar un golpe, cerrar los ojos, 
                        escribir) e <em>imitación de secuencias</em> (gestos y movimientos encadenados).
                        Es clave para la autonomía funcional y se conserva relativamente estable incluso en fases 
                        avanzadas de deterioro.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Por qué evaluar la memoria  */}
        <section className="relative py-16 bg-[var(--color-surface)]">
          {/* decor suave */}
          <div aria-hidden className="pointer-events-none absolute -z-10 inset-0">
            <div className="absolute left-10 top-10 size-48 rounded-full bg-[var(--color-accent)]/10 blur-2xl animate-float-slow" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Encabezado */}
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-ink-strong)] text-balance">
                ¿Por qué evaluar la memoria?
              </h2>
              <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-[var(--color-accent)]/60 animate-grow-x" />
              <p className="text-lg text-[var(--color-ink-subtle)] mt-6 text-pretty animate-fade-in [animation-delay:120ms]">
                La evaluación de la memoria es un procedimiento neuropsicológico protocolar, 
                esencial en todas las áreas de la Neuropsicología por la relevancia de su 
                conservación o déficit en prácticamente todas las acciones humanas.
              </p>
            </div>

            {/* Dos columnas: texto + imagen */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Columna de texto */}
              <div className="space-y-5 animate-fade-in [animation-delay:60ms]">
                <p className="text-[var(--color-ink)] leading-relaxed">
                  Anteriormente, la evaluación de la memoria se restringía al plano de la patología y se asumía que 
                  respondía únicamente a la necesidad de valorar el deterioro cognitivo en personas muy mayores o 
                  sobrevivientes a eventos que hubieran puesto en peligro su integridad física o afectado la región de la cabeza.
                </p>
                <p className="text-[var(--color-ink)] leading-relaxed">
                  Hoy en día, la evaluación debe realizarse a lo largo del ciclo vital: desde la maduración cerebral y el 
                  neurodesarrollo, hasta el envejecimiento patológico. Evaluar la memoria es evaluar la cognición humana; 
                  a ella debemos los procesos de <strong>codificación</strong>, <strong>decodificación</strong> y 
                  <strong> recodificación</strong>, así como el funcionamiento de procesos cognitivos básicos y superiores.
                </p>
                <div className="quote-callout shadow-warm animate-fade-in [animation-delay:140ms]">
                  <p className="font-medium">
                    En síntesis: evaluar la memoria permite comprender el estado global de la cognición y orientar 
                    con precisión las decisiones clínicas y educativas.
                  </p>
                </div>
                <p className="text-[var(--color-ink)] leading-relaxed">
                  En el cuadro se muestra cómo los procesos cognitivos centrales para la interacción humana 
                  <em> recurren</em> y <em> requieren</em> de nuestra capacidad mnémica para tener lugar.
                </p>

                {/* CTA opcional  para redirigir a esiomulacion cognitiva o.o*/}
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="btn-dark hover:translate-y-[-2px] transition">
                    <Link href="/test-edm">Realizar Evaluación EDM</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[var(--color-accent)] text-[var(--color-ink-strong)] hover:bg-[var(--color-surface-alt)] hover:translate-y-[-2px] transition"
                  >
                    <Link href="/servicios/estimulacion-neurocognitiva">Ver programas de estimulación</Link>
                  </Button>
                </div>
              </div>

              {/* Columna de imagen */}
              <figure className="relative overflow-hidden rounded-xl shadow-warm-lg bg-[var(--color-surface)] animate-fade-in [animation-delay:160ms]">
                {/* Imagen*/}
                <Image
                  src="/funciones-neuropsicologicas.png"
                  alt="Funciones neuropsicológicas y procesos indispensables de la memoria"
                  width={1200}
                  height={1800}
                  className="w-full h-auto object-contain"
                  priority
                />
                {/* Degradado sutil */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-surface)]/0 via-transparent to-transparent" />
                <figcaption className="text-xs text-[var(--color-ink-subtle)] mt-2 text-center">
                  Relación entre funciones neuropsicológicas y procesos mnémicos indispensables.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-3 text-balance">Proceso de Evaluación</h2>
              <div className="mx-auto h-[3px] w-16 rounded-full bg-primary/40 animate-grow-x" />
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Nuestro proceso de evaluación sigue un protocolo estructurado para garantizar resultados precisos y
                confiables.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {evaluationSteps.map((step, index) => (
                <Card
                  key={index}
                  className="text-center h-full border-[var(--color-border)]/70 hover:border-primary/40 transition hover:shadow-warm-lg animate-fade-in"
                  style={{ animationDelay: `${100 + index * 90}ms` as any }}
                >
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 rounded-full bg-secondary/30 w-fit ring-1 ring-border group">
                      <step.icon className="h-8 w-8 text-accent group-hover:scale-110 transition" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-3 text-balance">Beneficios de la Evaluación</h2>
              <div className="mx-auto h-[3px] w-16 rounded-full bg-accent/60 animate-grow-x" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-warm-lg transition hover:-translate-y-0.5 animate-fade-in [animation-delay:80ms]">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Detección Temprana</h3>
                  <p className="text-muted-foreground">
                    Identificación precoz de alteraciones cognitivas para intervención oportuna.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-warm-lg transition hover:-translate-y-0.5 animate-fade-in [animation-delay:160ms]">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Diagnóstico Diferencial</h3>
                  <p className="text-muted-foreground">
                    Distinción entre diferentes tipos de alteraciones de memoria y sus causas.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-warm-lg transition hover:-translate-y-0.5 animate-fade-in [animation-delay:240ms]">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Plan de Intervención</h3>
                  <p className="text-muted-foreground">
                    Recomendaciones específicas para tratamiento y estimulación cognitiva.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/*
        <section className="relative py-16 bg-primary text-primary-foreground overflow-hidden">
           decor 
          <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_10%_10%,#000_30%,transparent_70%)]">
            <div className="absolute -left-20 -top-10 size-72 rounded-full bg-accent/20 blur-2xl animate-float-slow" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-3 text-balance animate-fade-in">Comienza tu Evaluación Hoy</h2>
            <div className="mx-auto h-[3px] w-20 rounded-full bg-white/70 animate-grow-x" />
            <p className="text-xl text-primary-foreground/90 mb-8 text-pretty animate-fade-in [animation-delay:120ms]">
              El Test EDM está disponible en línea y puede completarse desde la comodidad de tu hogar.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 shadow-warm hover:shadow-warm-lg transition animate-fade-in [animation-delay:200ms]"
            >
              <Link href="/test-edm">Iniciar Test EDM</Link>
            </Button>
          </div>
        </section>*/}
      </main>
      <Footer />
    </div>
  )
}
