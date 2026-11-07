// components/test/components/video-recorder.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { predictVideo } from "@/lib/edm/ai-client"
import type { VideoSuggestion } from "@/lib/edm/ai-client"
import { Button } from "@/components/ui/button"

type RecordResult = {
  url: string
  file: File
  durationMs: number
  mimeType: string
  server?: {
    details?: VideoSuggestion
    latencyMs?: number
  }
}

interface VideoRecorderProps {
  /** Límite opcional (segundos) para grabaciones. */
  maxDurationSec?: number
  /** Llamado al finalizar (grabación o subida). */
  onRecord: (result: RecordResult) => void
  onAnalyzing?: () => void
}

// Tipos que acepta el backend
const ALLOWED_MIME = new Set([
  "video/webm",
  "video/webm;codecs=vp8",
  "video/webm;codecs=vp9",
  "video/mp4",
  "video/quicktime",
  "video/x-matroska",
  "video/x-msvideo",
])

export function VideoRecorder({ maxDurationSec, onRecord, onAnalyzing }: VideoRecorderProps) {
  // ======= MODO =======
  const [mode, setMode] = useState<"record" | "upload">("record")

  // ======= ESTADO COMÚN (resultado, UI de backend) =======
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ======= GRABACIÓN =======
  const previewRef = useRef<HTMLVideoElement>(null)    // cámara en vivo
  const replayRef = useRef<HTMLVideoElement>(null)      // reproducción del clip grabado
  const mediaRecRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const startTimeRef = useRef<number>(0)

  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recUrl, setRecUrl] = useState<string | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [sinMicrofono, setSinMicrofono] = useState(false)

  useEffect(() => {
    if (!isRecording) return
    const id = setInterval(() => setElapsed(Date.now() - startTimeRef.current), 200)
    return () => clearInterval(id)
  }, [isRecording])

  // Pedimos cámara al montar SOLO si estamos en modo grabación
  useEffect(() => {
    let mounted = true
    if (mode !== "record") return

    ;(async () => {
      try {
        // En celular, la cámara trasera (el evaluador filma al paciente); en laptop cae a la única que hay
        const video = { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: { ideal: "environment" } }
        // El modelo escucha los golpes de la mano en la mesa: sin cancelación de eco ni supresión de ruido,
        // que borrarían justamente esos golpes. Si no hay micrófono, se graba solo la imagen y se avisa.
        let s: MediaStream
        try {
          s = await navigator.mediaDevices.getUserMedia({
            video,
            audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
          })
        } catch {
          s = await navigator.mediaDevices.getUserMedia({ video, audio: false })
        }
        setSinMicrofono(s.getAudioTracks().length === 0)
        if (!mounted) { s.getTracks().forEach(t => t.stop()); return }
        setStream(s)
        if (previewRef.current) {
          previewRef.current.srcObject = s
          previewRef.current.play().catch(() => {})
        }
      } catch (e) {
        console.error("No se pudo acceder a la cámara", e)
        // No alert aquí para no molestar si el usuario solo quiere 'Subir'
      }
    })()

    return () => {
      mounted = false
      if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") {
        mediaRecRef.current.stop()
      }
      if (previewRef.current) previewRef.current.srcObject = null
      stream?.getTracks().forEach((t) => t.stop())
      if (recUrl) URL.revokeObjectURL(recUrl)
    }
  }, [mode]) // eslint-disable-line

  const pickMime = () => {
    const candidates = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
      "video/mp4", // Safari
    ]
    for (const t of candidates) {
      if ((window as any).MediaRecorder && MediaRecorder.isTypeSupported(t)) return t
    }
    return ""
  }

  const start = () => {
    if (!stream) {
      setError("No hay acceso a la cámara. Cambia a 'Subir archivo' o revisa permisos.")
      return
    }
    chunksRef.current = []
    setElapsed(0)
    setError(null)
    if (recUrl) { URL.revokeObjectURL(recUrl); setRecUrl(null) }

    const mimeType = pickMime()
    const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)
    mediaRecRef.current = mr

    mr.ondataavailable = (ev) => {
      if (ev.data && ev.data.size > 0) chunksRef.current.push(ev.data)
    }
    mr.onstop = async () => {
      await handleRecordedStop(mr, mimeType)
    }

    mr.start(200)
    startTimeRef.current = Date.now()
    setIsRecording(true)

    if (maxDurationSec && maxDurationSec > 0) {
      setTimeout(() => stop(), maxDurationSec * 1000)
    }
  }

  const stop = () => {
    const mr = mediaRecRef.current
    if (!mr || mr.state === "inactive") return
    mr.stop()
    setIsRecording(false)
  }

  const handleRecordedStop = async (mr: MediaRecorder, mimeType: string) => {
    try {
      const type = mimeType || mr.mimeType || "video/webm"
      const blob = new Blob(chunksRef.current, { type })
      const url = URL.createObjectURL(blob)
      setRecUrl(url)

      const fname = `clip-${new Date().toISOString().replace(/[:.]/g, "-")}.${type.includes("mp4") ? "mp4" : "webm"}`
      const file = new File([blob], fname, { type })
      const durationMs = Date.now() - startTimeRef.current

      await uploadToBackend(file, url, durationMs, type)

      if (replayRef.current) {
        replayRef.current.src = url
        replayRef.current.controls = true
      }
    } catch (e: any) {
      setUploading(false)
      setError(e?.message || "Error procesando la grabación")
    }
  }

  const redo = () => {
    if (recUrl) URL.revokeObjectURL(recUrl)
    setRecUrl(null)
    setElapsed(0)
    setError(null)
    if (replayRef.current) {
      replayRef.current.pause()
      replayRef.current.removeAttribute("src")
      replayRef.current.load()
    }
  }

  // ======= SUBIDA DE ARCHIVO =======
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileObj, setFileObj] = useState<File | null>(null)

  const onPickFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const f = ev.target.files?.[0] || null
    if (!f) {
      if (fileUrl) URL.revokeObjectURL(fileUrl)
      setFileUrl(null)
      setFileObj(null)
      return
    }
    if (!isAllowedType(f.type)) {
      setError(`Tipo de archivo no soportado: ${f.type || "desconocido"}`)
      return
    }
    if (fileUrl) URL.revokeObjectURL(fileUrl)
    const url = URL.createObjectURL(f)
    setFileUrl(url)
    setFileObj(f)
  }

  const isAllowedType = (mime: string) => {
    if (!mime) return false
    // normaliza claves: algunos navegadores devuelven "video/webm;codecs=vp8"
    const key = mime.toLowerCase()
    if (ALLOWED_MIME.has(key)) return true
    if (key.startsWith("video/webm")) return true
    return false
  }

  const sendPickedFile = async () => {
    if (!fileObj) return
    setError(null)
    await uploadToBackend(fileObj, fileUrl || "", 0, fileObj.type || "video/webm")
  }

  // ======= SUBIDA COMÚN =======
  const uploadToBackend = async (file: File, url: string, durationMs: number, mime: string) => {
    try {
      onAnalyzing?.()
      setUploading(true)
      const t0 = performance.now()
      const json = await predictVideo(file)
      const t1 = performance.now()
      setUploading(false)

      onRecord({
        url, file, durationMs, mimeType: mime,
        server: { details: json, latencyMs: t1 - t0 }
      })
    } catch (e: any) {
      setUploading(false)
      setError("IA no disponible, registre manualmente")
      onRecord({ url, file, durationMs, mimeType: mime })
    }
  }

  const mmss = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    const r = s % 60
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`
  }

  // ======= UI =======
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Tabs simples */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === "record" ? "default" : "outline"}
            onClick={() => { setMode("record"); setError(null) }}
          >
            Grabar
          </Button>
          <Button
            type="button"
            variant={mode === "upload" ? "default" : "outline"}
            onClick={() => { setMode("upload"); setError(null) }}
          >
            Subir archivo
          </Button>
        </div>

        {/* ======= MODO GRABAR ======= */}
        {mode === "record" && (
          <>
            <div className="relative">
              <video
                ref={previewRef}
                className="w-full rounded-xl border shadow-sm"
                autoPlay
                playsInline
                muted
              />
              {isRecording && (
                <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/60 text-white px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-medium">REC {mmss(elapsed)}</span>
                </div>
              )}
            </div>

            {sinMicrofono && (
              <p role="alert" className="edm-notice">
                El micrófono no está permitido: el video se grabará sin sonido y la IA no podrá escuchar los golpes en
                la mesa, así que dirá «Revisar». Permita el micrófono en el navegador (ícono junto a la dirección) y
                recargue la página.
              </p>
            )}

            <div className="flex gap-2">
              {!isRecording ? (
                <Button type="button" onClick={start} variant="outline">
                  Iniciar grabación
                </Button>
              ) : (
                <Button type="button" onClick={stop} variant="destructive">
                  Detener
                </Button>
              )}
              <Button type="button" onClick={redo} variant="outline" disabled={isRecording || !recUrl}>
                Repetir
              </Button>
            </div>

            {/* Reproducción del clip grabado */}
            {recUrl && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Vista previa del video grabado</p>
                <video ref={replayRef} className="w-full rounded-xl border shadow-sm" controls />
              </div>
            )}
          </>
        )}

        {/* ======= MODO SUBIR ======= */}
        {mode === "upload" && (
          <>
            <div className="border-2 border-dashed rounded-xl p-4 text-center">
              <p className="mb-3 text-sm text-muted-foreground">
                Selecciona un archivo de video (webm, mp4, mov, mkv, avi)
              </p>
              <input
                id="video-input"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={onPickFile}
              />
              <Button asChild variant="outline">
                <label htmlFor="video-input" className="cursor-pointer">Elegir archivo</label>
              </Button>
              {fileObj && (
                <div className="mt-4 text-left">
                  <p className="text-sm">
                    <b>Archivo:</b> {fileObj.name} <span className="text-xs text-muted-foreground">({fileObj.type || "desconocido"})</span>
                  </p>
                  {fileUrl && (
                    <video
                      className="mt-2 w-full rounded-xl border shadow-sm"
                      src={fileUrl}
                      controls
                    />
                  )}
                  <div className="mt-3 flex gap-2">
                    <Button type="button" onClick={sendPickedFile}>
                      Enviar para predicción
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (fileUrl) URL.revokeObjectURL(fileUrl)
                        setFileUrl(null)
                        setFileObj(null)
                        setError(null)
                      }}
                    >
                      Quitar archivo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Estado backend */}
        {uploading && !onAnalyzing && <div className="edm-ai-loading" role="status">
          <div className="edm-skeleton" /><div className="edm-skeleton short" />
          <p>Analizando video… puede tardar hasta un minuto</p>
        </div>}
        {error && <p className="text-sm text-red-600">Error: {error}</p>}
      </CardContent>
    </Card>
  )
}
