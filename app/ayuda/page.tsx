import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Phone, Mail, User, Heart, Stethoscope } from "lucide-react"

export default function AyudaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <section className="section-spacing bg-primary text-white relative overflow-hidden">
        {/* decor blobs */}
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white animate-fadeInUp">¿Necesitas Ayuda?</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fadeInUp [animation-delay:120ms]">
            Encuentra la información que necesitas según tu perfil y situación específica
          </p>

        {/* subrayado animado */}
          <div className="mx-auto mt-6 h-1 w-24 bg-white/30 rounded-full overflow-hidden">
            <span className="block h-full w-1/2 bg-white/80 animate-[shimmer_1.8s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs defaultValue="profesional" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 rounded-xl bg-muted/40 p-1">
              <TabsTrigger
                value="profesional"
                className="flex items-center gap-2 rounded-lg transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-sm hover:shadow-sm hover:bg-background/60"
              >
                <Stethoscope className="h-4 w-4 transition-transform duration-300 group-data-[state=active]:scale-110" />
                Profesional Acreditado
              </TabsTrigger>
              <TabsTrigger
                value="pam"
                className="flex items-center gap-2 rounded-lg transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-sm hover:shadow-sm hover:bg-background/60"
              >
                <User className="h-4 w-4 transition-transform duration-300 group-data-[state=active]:scale-110" />
                Persona Adulta Mayor
              </TabsTrigger>
              <TabsTrigger
                value="familiar"
                className="flex items-center gap-2 rounded-lg transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-sm hover:shadow-sm hover:bg-background/60"
              >
                <Heart className="h-4 w-4 transition-transform duration-300 group-data-[state=active]:scale-110" />
                Familiar o Cuidador
              </TabsTrigger>
            </TabsList>

            {/* PROFESIONAL ACREDITADO */}
            <TabsContent value="profesional" className="space-y-6">
              <Card className="transition-all duration-300 hover:shadow-lg animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    Profesional Acreditado
                  </CardTitle>
                  <CardDescription>
                    Requisitos, alcances y evaluaciones disponibles en el portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <p>
                      Para el profesional este portal será una ayuda al momento de trabajar con Personas Adultas Mayores (PAM).
                      Para ser parte de él usted debe ser acreditado previamente, este portal solo admite a usuarios de las
                      siguientes ramas: <strong>neuropsicólogos, psicólogos clínicos, médicos generales, médicos familiares,
                      gerontólogos, psiquiatras, neurólogos</strong> y otros profesionales vinculados a las neurociencias y el
                      desarrollo humano.
                    </p>
                    <p>
                      Al ser parte del portal usted puede acceder a las siguientes evaluaciones:
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* EDM */}
                    <Card className="border-dashed transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md animate-fadeInUp [animation-delay:60ms]">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Badge variant="secondary" className="transition-transform duration-300 group-hover:scale-105">EDM</Badge>
                          Evaluación Diferencial de la Memoria
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Donde usted podrá luego de realizar la prueba a la PAM obtener un <strong>reporte clínico</strong> el cual
                        indicará el estado actual de la memoria de su paciente de forma clara y precisa.
                      </CardContent>
                    </Card>

                    {/* Reserva Cognitiva */}
                    <Card className="border-dashed transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md animate-fadeInUp [animation-delay:120ms]">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Badge variant="secondary" className="transition-transform duration-300 group-hover:scale-105">Reserva Cognitiva</Badge>
                          Escala de Reserva Cognitiva
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Esta escala ayuda a ver las <strong>habilidades o hábitos</strong> que posee la PAM y que pueden ser
                        utilizadas para <strong>palear el avance del deterioro cognitivo</strong>.
                      </CardContent>
                    </Card>

                    {/* MMSE */}
                    <Card className="border-dashed transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md animate-fadeInUp [animation-delay:180ms]">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Badge variant="secondary" className="transition-transform duration-300 group-hover:scale-105">MMSE</Badge>
                          Mini-Mental State Examination
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Es una <strong>prueba rápida</strong> la cual <strong>confirma el resultado</strong> obtenido en el EDM.
                      </CardContent>
                    </Card>

                    {/* GDS */}
                    <Card className="border-dashed transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md animate-fadeInUp [animation-delay:240ms]">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Badge variant="secondary" className="transition-transform duration-300 group-hover:scale-105">GDS</Badge>
                          Escala Global de Deterioro Cognitivo
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Esta escala le indicará a usted <strong>en qué fase</strong> se encuentra su paciente, dependiendo los
                        síntomas que presenta.
                      </CardContent>
                    </Card>
                  </div>

                  <Alert className="border-primary/30 animate-fadeInUp [animation-delay:300ms]">
                    <AlertDescription className="text-sm">
                      Por estos beneficios de brindar un mejor servicio y trato a su paciente PAM le invitamos a ser parte de esta
                      experiencia que contribuirá no solo a su desempeño como profesional sino que <strong>ayudará a investigaciones
                      del área a nivel nacional e internacional</strong>.
                    </AlertDescription>
                  </Alert>

                  <div className="pt-2">
                    <Button className="btn-dark transition-transform duration-300 hover:-translate-y-0.5">Solicitar acreditación</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* UNA PERSONA ADULTA MAYOR */}
            <TabsContent value="pam" className="space-y-6">
              <Card className="transition-all duration-300 hover:shadow-lg animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Una Persona Adulta Mayor (PAM)
                  </CardTitle>
                  <CardDescription>
                    Orientación y ruta de atención para evaluación y estimulación cognitiva
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p>
                    Si usted es una Persona Adulta Mayor (PAM) este portal le ayudará en la <strong>detección temprana</strong> de
                    problemas de memoria.
                  </p>
                  <p>
                    Usted puede dirigirse a nuestros <strong>profesionales acreditados</strong> de las siguientes ramas:
                    neuropsicólogos, psicólogos clínicos, médicos generales, médicos familiares, gerontólogos, psiquiatras,
                    neurólogos y otros profesionales vinculados a las neurociencias y el desarrollo humano; para que se le realicen
                    las evaluaciones respectivas.
                  </p>
                  <p>
                    Al realizarle las pruebas usted podrá tener una <strong>descripción precisa</strong> de su estado actual de
                    memoria y <strong>ser parte de un programa de estimulación cognitiva</strong>, servicio que se brinda en la
                    <strong> Universidad Privada de Santa Cruz (UPSA)</strong> en el <strong>Centro de Investigaciones y
                    Asesoramiento Psicológico (CIAP)</strong>, donde contamos con un equipo especializado y listo para atenderlo en
                    lo que necesite.
                  </p>

                  <div className="pt-2 flex gap-3 flex-wrap">
                    <Button className="btn-dark transition-transform duration-300 hover:-translate-y-0.5">
                      Encontrar profesional acreditado
                    </Button>
                    <Button variant="outline" className="bg-transparent transition-all duration-300 hover:shadow-sm hover:bg-background">
                      Más sobre el Test EDM
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAMILIAR O CUIDADOR */}
            <TabsContent value="familiar" className="space-y-6">
              <Card className="transition-all duration-300 hover:shadow-lg animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Familiar o Cuidador
                  </CardTitle>
                  <CardDescription>
                    Pasos de acción y apoyos disponibles para acompañar a una PAM
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p>
                    Si usted es un familiar o cuidador de una Persona Adulta Mayor (PAM) el servicio que le brinda a usted
                    primeramente es el de <strong>contactar a un profesional del área</strong>: neuropsicólogos, psicólogos
                    clínicos, médicos generales, médicos familiares, gerontólogos, psiquiatras, neurólogos y otros profesionales
                    vinculados a las neurociencias y el desarrollo humano.
                  </p>
                  <p>
                    Al contactarse con ellos la PAM será evaluada con una <strong>serie de instrumentos</strong> que determinarán
                    cuál es la situación de su memoria. Posterior a esta prueba puede llevar a la PAM a la <strong>Universidad
                    Privada de Santa Cruz (UPSA)</strong> en el <strong>Centro de Investigaciones y Asesoramiento Psicológico
                    (CIAP)</strong>, donde contamos con un equipo especializado y listo para trabajar con la PAM en la
                    <strong> estimulación cognitiva</strong>.
                  </p>
                  <p>
                    Además, en él <strong>usted recibirá capacitaciones</strong> sobre el cuidado de esta persona.
                  </p>

                  <div className="grid md:grid-cols-3 gap-3 pt-2">
                    <Button variant="outline" className="bg-transparent transition-all duration-300 hover:shadow-sm hover:bg-background">
                      Contactar profesional
                    </Button>
                    <Button variant="outline" className="bg-transparent transition-all duration-300 hover:shadow-sm hover:bg-background">
                      Programas de estimulación
                    </Button>
                    <Button className="btn-dark transition-transform duration-300 hover:-translate-y-0.5">
                      Capacitaciones para cuidadores
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="bg-secondary py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Alert className="animate-fadeInUp">
            <AlertDescription>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="font-semibold text-lg mb-2">¿Necesitas contactar con nosotros?</h3>
                  <p className="text-muted-foreground">Estamos aquí para ayudarte en cada paso del proceso</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent transition-all duration-300 hover:bg-background hover:shadow-sm">
                    <Mail className="h-4 w-4" />
                    contacto@neurolap.org
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent transition-all duration-300 hover:bg-background hover:shadow-sm">
                    <Phone className="h-4 w-4" />
                    +591 2 123-4567
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <Footer />
    </div>
  )
}

