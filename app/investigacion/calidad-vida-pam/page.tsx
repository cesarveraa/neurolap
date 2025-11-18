import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Quote } from "@/components/ui/quote"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CalidadVidaPAMPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Section Header */}
      <section className="section-spacing relative overflow-hidden">
        {/* blob cálido decorativo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full bg-[var(--color-accent)]/10 blur-2xl"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
            <h1 className="text-balance">Calidad de Vida de las P.A.M.</h1>
            <p className="text-lg text-muted-foreground mt-4">
              Exploramos cómo la salud bucal y otros factores impactan significativamente en la calidad de vida de las
              Personas Adultas Mayores.
            </p>

            {/* Mensaje clave (nuevo) */}
            <div className="mt-6 rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)] p-5 text-left shadow-warm animate-fadeInUp [animation-delay:120ms]">
              <h3 className="text-base font-semibold text-[var(--color-ink-strong)] mb-2">Mensaje clave</h3>
              <p className="text-[var(--color-ink)]">
                <strong>Una de las consideraciones de salud más importantes y menos consideradas</strong> es el estado
                de salud de la boca, que influye de manera determinante en la calidad de vida de la persona, ya que el
                deficiente estado de salud de la boca produce consecuencias en la alimentación, la fonación y la
                estética personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible defaultValue="salud-bucal" className="space-y-4">
              <AccordionItem value="salud-bucal" className="border border-border rounded-lg shadow-warm">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <h3 className="text-xl font-semibold">Salud Bucal y Calidad de Vida</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 animate-fadeInUp">
                    <p>
                      La salud bucal es un componente fundamental de la salud general y tiene un impacto directo en
                      múltiples aspectos de la vida diaria de las personas adultas mayores.
                    </p>

                    {/* Texto importante integrado (intro) */}
                    <div className="quote-callout">
                      Una de las consideraciones de salud más importantes y menos consideradas es el estado de salud de la boca,
                      que influye de manera determinante en la calidad de vida de la persona.
                    </div>

                    <p>
                      Los problemas dentales y de salud oral no solo afectan la capacidad de alimentarse adecuadamente,
                      sino que también influyen en la comunicación, la autoestima y las relaciones sociales.
                    </p>

                    <p>
                      Una boca sana permite mantener la dignidad, la funcionalidad y el bienestar emocional, elementos
                      esenciales para un envejecimiento exitoso y una vida plena.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="aspectos-clave" className="border border-border rounded-lg shadow-warm">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <h3 className="text-xl font-semibold">Aspectos Clave de la Salud Bucal</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-8 animate-fadeInUp">
                    {/* a) Alimentación */}
                    <div className="rounded-lg bg-[var(--color-surface)] p-5 border border-[var(--color-divider)]">
                      <h4 className="font-semibold mb-3 text-primary">a) Alimentación</h4>
                      <p className="mb-3">
                        <strong>Alimentación defectuosa e inadecuada.</strong> Los dientes cariados, sueltos o su
                        falta, hacen que la masticación no se realice adecuadamente, por lo que la persona no forma su
                        bolo alimenticio apropiadamente y no inicia, por lo tanto, la insalivación del alimento y el
                        comienzo de su digestión; traga trozos de alimentos no triturados, recargando al resto del
                        sistema digestivo.
                      </p>
                      <p>
                        En términos funcionales, una dentadura saludable es esencial para triturar, mezclar con saliva y
                        preparar los nutrientes para una adecuada absorción, previniendo problemas digestivos y
                        nutricionales.
                      </p>
                    </div>

                    {/* b) Fonación */}
                    <div className="rounded-lg bg-[var(--color-surface)] p-5 border border-[var(--color-divider)]">
                      <h4 className="font-semibold mb-3 text-primary">b) Fonación</h4>
                      <p className="mb-3">
                        <strong>Fonación defectuosa.</strong> Al faltarle dientes, tenerlos sueltos o con orificios
                        (caries), la pronunciación de la palabra no es la correcta y aparecen silbidos y otras
                        incorrecciones en el hablar. Este es un aspecto que caracteriza la etapa adulta mayor; casi
                        todas las representaciones de los “viejitos” aluden a cambios en la pronunciación y al
                        debilitamiento de la voz.
                      </p>
                      <div className="custom-bullets">
                        <ul className="space-y-1">
                          <li>Pronunciación más clara y segura con prótesis o tratamiento adecuado</li>
                          <li>Menor esfuerzo para hacerse entender y sostener conversaciones</li>
                          <li>Disminución del aislamiento social asociado a dificultades del habla</li>
                        </ul>
                      </div>
                    </div>

                    {/* c) Estética */}
                    <div className="rounded-lg bg-[var(--color-surface)] p-5 border border-[var(--color-divider)]">
                      <h4 className="font-semibold mb-3 text-primary">c) Estética</h4>
                      <p className="mb-3">
                        <em>
                          “Su apariencia de persona sin dientes o con ellos rotos, no permite su presentación ante el
                          resto de los semejantes”.
                        </em>{" "}
                        (Jesé Matas Colom, Jorge Biotti Picand, 2001).
                      </p>
                      <p className="mb-3">
                        Un rostro luce diferente sin las piezas dentales completas. La pérdida de dientes en edad
                        avanzada es frecuente y socialmente esperable; sin embargo, es un signo de vejez que puede
                        afectar la autoimagen del adulto mayor y su deseo de participar en actividades sociales.
                      </p>
                      <Quote className="mt-2">
                        La salud estética bucal fortalece la autoestima y favorece la integración social en la edad
                        adulta mayor.
                      </Quote>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="apoyo-psicosocial" className="border border-border rounded-lg shadow-warm">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <h3 className="text-xl font-semibold">Apoyo Psicosocial y Autoimagen</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 animate-fadeInUp">
                    <p>
                      El apoyo integral a las personas adultas mayores debe considerar tanto los aspectos físicos como
                      emocionales relacionados con la salud bucal.
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">Recomendaciones Generales</h4>
                      <div className="custom-bullets">
                        <ul className="space-y-2">
                          <li>
                            <strong>Atención preventiva regular:</strong> Controles dentales periódicos y limpieza
                            profesional
                          </li>
                          <li>
                            <strong>Educación en higiene oral:</strong> Técnicas adaptadas a las capacidades motoras de
                            cada persona
                          </li>
                          <li>
                            <strong>Apoyo emocional:</strong> Comprender miedos/ansiedades frente al tratamiento dental
                          </li>
                          <li>
                            <strong>Adaptaciones necesarias:</strong> Prótesis bien ajustadas y cómodas
                          </li>
                          <li>
                            <strong>Integración social:</strong> Fomentar actividades que requieran comunicación
                          </li>
                          <li>
                            <strong>Apoyo familiar:</strong> Involucrar a la familia en el cuidado y seguimiento
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>Enfoque Integral:</strong> La calidad de vida en la edad adulta mayor depende de
                        múltiples factores interconectados. La salud bucal, aunque a menudo subestimada, es un pilar
                        fundamental que merece atención especializada y cuidado continuo.
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
