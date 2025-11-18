"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TestWizard } from "@/components/test/test-wizard"
import { TestResults } from "@/components/test/test-results"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock, FileText, Users } from "lucide-react"

export default function TestEDMPage() {
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [testResults, setTestResults] = useState(null)

  const handleTestComplete = (results: any) => {
    setTestResults(results)
    setTestCompleted(true)
  }

  if (testCompleted && testResults) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <TestResults results={testResults} />
        </main>
        <Footer />
      </div>
    )
  }

  if (testStarted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <TestWizard onComplete={handleTestComplete} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-burgundy-dark mb-4 text-balance">
            Evaluación Diferencial de la Memoria (EDM)
          </h1>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
            Una evaluación integral y profesional para detectar alteraciones de la memoria en personas adultas mayores,
            desarrollada con estándares científicos rigurosos.
          </p>
        </div>

        {/* Test Information Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Brain className="w-12 h-12 text-accent-red mx-auto mb-2" />
              <CardTitle className="text-lg">Evaluación Integral</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Evalúa múltiples tipos de memoria: episódica, operativa, semántica y procesual
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="w-12 h-12 text-accent-red mx-auto mb-2" />
              <CardTitle className="text-lg">45-60 Minutos</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Duración aproximada con descansos incluidos para mayor comodidad</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <FileText className="w-12 h-12 text-accent-red mx-auto mb-2" />
              <CardTitle className="text-lg">Reporte Detallado</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Resultados profesionales con interpretación clínica y recomendaciones</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-accent-red mx-auto mb-2" />
              <CardTitle className="text-lg">Apoyo Familiar</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Orientación para familiares y cuidadores sobre los resultados</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-burgundy-dark">Instrucciones Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-burgundy-dark">Antes de comenzar:</h3>
                <ul className="space-y-2 text-warm-gray">
                  <li>• Asegúrese de estar en un lugar tranquilo y sin distracciones</li>
                  <li>• Tenga papel y lápiz a mano para algunas actividades</li>
                  <li>• Use audífonos si tiene dificultades auditivas</li>
                  <li>• Puede tomar descansos cuando lo necesite</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-burgundy-dark">Durante la evaluación:</h3>
                <ul className="space-y-2 text-warm-gray">
                  <li>• Lea cuidadosamente cada instrucción</li>
                  <li>• Responda con honestidad y tranquilidad</li>
                  <li>• No se preocupe si no puede responder algo</li>
                  <li>• Siga las indicaciones de tiempo cuando aparezcan</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Test Button */}
        <div className="text-center">
          <Button
            onClick={() => setTestStarted(true)}
            size="lg"
            className="bg-primary hover:bg-accent-red/90 text-bg-accent px-8 py-4 text-lg"
          >
            Iniciar Evaluación EDM
          </Button>
          <p className="text-sm text-warm-gray mt-4">
            Al iniciar acepta que sus respuestas serán procesadas para generar el reporte de evaluación
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
