"use client"

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { testSections } from "@/lib/test-data"
import { Download, Mail, FileText } from "lucide-react"

interface TestResultsProps {
  results: {
    responses: Record<string, any>
    sectionScores: Record<string, number>
    totalScore: number
    completedAt: string
  }
}

export function TestResults({ results }: TestResultsProps) {
  const reportRef = useRef<HTMLDivElement>(null)


  const getSectionMaxScore = (sectionId: string) => {
    const section = testSections.find((s) => s.id === sectionId)
    return section?.items.reduce((sum, item) => sum + (item.maxScore || 1), 0) || 0
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return "Conservado"
    if (percentage >= 60) return "Afectado"
    return "Deficitario"
  }

  const totalMaxScore = testSections.reduce((sum, section) => sum + getSectionMaxScore(section.id), 0)

  const handleDownloadPDF = async () => {
    const el = reportRef.current
    if (!el) return

    // imports dinámicos para evitar problemas con SSR
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).default

    // render a canvas (usa scale 2 para mejor calidad)
    const canvas = await html2canvas(el, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true
    })
    const imgData = canvas.toDataURL("image/png")

    // configura PDF A4 en pt
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // calcula dimensiones para mantener proporción
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // primera página
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST")

    // si el contenido excede una página, añade las siguientes
    let y = -pageHeight
    while (imgHeight + y > 0) {
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight, undefined, "FAST")
      y -= pageHeight
    }

    const filename = `EDM-Resultados-${new Date(results.completedAt)
      .toISOString()
      .slice(0, 10)}.pdf`
    pdf.save(filename)
  }

  const handleEmailReport = () => {
    // Implementation for email sending
    console.log("Sending email report...")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-burgundy-dark">Resultados de la Evaluación EDM</CardTitle>
          <p className="text-warm-gray">
            Evaluación completada el{" "}
            {new Date(results.completedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </CardHeader>
      </Card>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-burgundy-dark">Puntuación General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold">
              {results.totalScore} / {totalMaxScore} puntos
            </span>
            <span className={`text-lg font-semibold ${getScoreColor(results.totalScore, totalMaxScore)}`}>
              {getScoreLabel(results.totalScore, totalMaxScore)}
            </span>
          </div>
          <Progress value={(results.totalScore / totalMaxScore) * 100} className="h-3" />
        </CardContent>
      </Card>

      {/* Section Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-burgundy-dark">Resultados por Sección</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {testSections.map((section) => {
              const sectionScore = results.sectionScores[section.id] || 0
              const maxScore = getSectionMaxScore(section.id)
              const percentage = (sectionScore / maxScore) * 100

              return (
                <div key={section.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                    <div className="text-right">
                      <span className="text-lg font-bold">
                        {sectionScore} / {maxScore}
                      </span>
                      <span className={`ml-2 text-sm font-semibold ${getScoreColor(sectionScore, maxScore)}`}>
                        {getScoreLabel(sectionScore, maxScore)}
                      </span>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-sm text-warm-gray mt-1">{Math.round(percentage)}% de rendimiento</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-burgundy-dark">Interpretación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="w-4 h-4 bg-green-600 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-green-800">Conservado</h4>
                <p className="text-sm text-green-700">80-100% de rendimiento</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="w-4 h-4 bg-yellow-600 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-yellow-800">Afectado</h4>
                <p className="text-sm text-yellow-700">60-79% de rendimiento</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="w-4 h-4 bg-red-600 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-red-800">Deficitario</h4>
                <p className="text-sm text-red-700">Menos del 60% de rendimiento</p>
              </div>
            </div>

            <div className="p-4 bg-beige-light rounded-lg">
              <p className="text-warm-gray leading-relaxed">
                <strong>Importante:</strong> Estos resultados son una evaluación inicial y deben ser interpretados por
                un profesional de la salud. Si tiene preocupaciones sobre su memoria o cognición, consulte con un
                neuropsicólogo o médico especialista.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={handleDownloadPDF}
              className="bg-accent-red hover:bg-accent-red/90 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>

            <Button onClick={handleEmailReport} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Mail className="w-4 h-4" />
              Enviar por Email
            </Button>

            <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={() => window.print()}>
              <FileText className="w-4 h-4" />
              Imprimir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
