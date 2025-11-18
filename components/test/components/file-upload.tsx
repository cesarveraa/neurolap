"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Check, Loader2, AlertCircle, Brain } from "lucide-react"

interface FileUploadProps {
  accept?: string
  /** Te paso el resultado completo del análisis o null si falló */
  onUpload: (analysis: AnalysisResult | null) => void
}

interface AnalysisResult {
  similarityScore: number // 1-36
  verdict: string
  psychologicalAnalysis: string
  technicalDetails: string
}

const API_BASE_URL ="https://imagenes-eight.vercel.app"

export function FileUpload({
  accept = "image/*,.heic,.heif",
  onUpload,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    setFile(selectedFile)
    setServerError(null)
    setAnalysis(null)

    if (selectedFile && selectedFile.type.startsWith("image/") && selectedFile.type !== "image/heic" && selectedFile.type !== "image/heif") {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async () => {
    if (!file) return
    setIsUploading(true)
    setServerError(null)
    setAnalysis(null)

    try {
      const form = new FormData()
      form.append("file", file, file.name)

      const res = await fetch(`${API_BASE_URL}/analyze-memory-test`, {
        method: "POST",
        body: form,
      })

      if (!res.ok) {
        let detail = ""
        try {
          const data = await res.json()
          detail = data?.detail || JSON.stringify(data)
        } catch {
          /* noop */
        }
        throw new Error(detail || `Error HTTP ${res.status}`)
      }

      const data = await res.json()
      
      // Parsear la respuesta de Gemini
      const analysisResult: AnalysisResult = {
        similarityScore: data.similarity_score || 0,
        verdict: data.verdict || "No se pudo determinar",
        psychologicalAnalysis: data.psychological_analysis || "",
        technicalDetails: data.technical_details || ""
      }

      setAnalysis(analysisResult)
      onUpload(analysisResult)
    } catch (err: any) {
      setServerError(err?.message || "Error analizando la imagen")
      onUpload(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
    setServerError(null)
    setAnalysis(null)
  }

  // Función para determinar el color según el puntaje
  const getScoreColor = (score: number) => {
    if (score >= 30) return "text-green-600"
    if (score >= 20) return "text-yellow-600"
    return "text-red-600"
  }

  // Función para determinar el emoji según el puntaje
  const getScoreEmoji = (score: number) => {
    if (score >= 30) return "🎯 Excelente"
    if (score >= 25) return "👍 Bueno"
    if (score >= 20) return "🤔 Regular"
    if (score >= 15) return "⚠️ Bajo"
    return "❌ Muy bajo"
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {!file ? (
              <div>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Seleccione la imagen del test de memoria</p>
                <input
                  type="file"
                  accept={accept}
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Seleccionar Archivo
                  </label>
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 truncate max-w-[75%]">
                    {file.name}
                  </span>
                  <Button size="sm" variant="ghost" onClick={handleRemove}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {preview ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview del test"
                    className="max-w-full max-h-64 mx-auto rounded-lg"
                  />
                ) : (
                  <p className="text-sm text-gray-500">
                    Vista previa no disponible (posible formato HEIC/HEIF). Igual se puede enviar al servicio.
                  </p>
                )}
              </div>
            )}
          </div>

          {file && (
            <Button
              onClick={handleSubmit}
              className="w-full bg-accent-red hover:bg-accent-red/90"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analizando con Gemini...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analizar Test de Memoria
                </>
              )}
            </Button>
          )}

          {analysis && (
            <div className="space-y-4">
              {/* Puntaje de similitud */}
              <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-800">Puntaje de Similitud</h3>
                  <span className={`text-lg font-bold ${getScoreColor(analysis.similarityScore)}`}>
                    {analysis.similarityScore}/36
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Nivel de similitud:</span>
                  <span className="text-sm font-medium text-blue-800">
                    {getScoreEmoji(analysis.similarityScore)}
                  </span>
                </div>
              </div>

              {/* Veredicto */}
              <div className="rounded-md border border-green-200 bg-green-50 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Veredicto</h3>
                <p className="text-green-700">{analysis.verdict}</p>
              </div>

              {/* Análisis Psicológico */}
              <div className="rounded-md border border-purple-200 bg-purple-50 p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Análisis Psicológico</h3>
                <p className="text-purple-700">{analysis.psychologicalAnalysis}</p>
              </div>

              {/* Detalles Técnicos */}
              <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Detalles Técnicos</h3>
                <p className="text-gray-700 text-sm">{analysis.technicalDetails}</p>
              </div>
            </div>
          )}

          {serverError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-red-800 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-[2px]" />
              <span>{serverError}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default FileUpload