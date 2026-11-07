"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type AudioResult = {
  url: string
  file: File
  durationMs: number
  mimeType: string
}

type SingleAudioRecorderProps = {
  label: string
  maxDurationSec?: number
  acceptUploads?: string // ej: ".wav,.webm,.ogg,.m4a,.mp3"
  onChange: (result: AudioResult | null) => void
}

function pickAudioMime() {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus",
    "audio/mp4", // Safari moderno
  ]
  for (const t of candidates) {
    if ((window as any).MediaRecorder && MediaRecorder.isTypeSupported(t)) return t
  }
  return "" // deja que el browser elija
}

function SingleAudioRecorder({
  label,
  maxDurationSec,
  acceptUploads = "audio/*,.m4a,.aac,.opus,.amr,.3gp,.ogg,.webm,.wav,.mp3",
  onChange,
}: SingleAudioRecorderProps) {
  // refs para evitar renders innecesarios
  const mediaRecRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const startTimeRef = useRef<number>(0)

  // estado mínimo para UI
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [elapsed, setElapsed] = useState(0)

  // mantener onChange estable
  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // timer sólo mientras graba
  useEffect(() => {
    if (!isRecording) return
    const id = setInterval(() => setElapsed(Date.now() - startTimeRef.current), 200)
    return () => clearInterval(id)
  }, [isRecording])

  // limpieza URL al desmontar o al reemplazar grabación
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl)
      // por si quedara grabando
      const mr = mediaRecRef.current
      if (mr && mr.state !== "inactive") mr.stop()
    }
  }, [audioUrl])

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      chunksRef.current = []
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
        setAudioUrl(null)
      }
      setElapsed(0)

      const mimeType = pickAudioMime()
      const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)
      mediaRecRef.current = mr

      mr.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) chunksRef.current.push(ev.data)
      }
      mr.onstop = () => {
        // detener tracks de inmediato
        stream.getTracks().forEach((t) => t.stop())

        const type = mimeType || mr.mimeType || "audio/webm"
        const blob = new Blob(chunksRef.current, { type })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)

        const fname = `${label.replace(/\s+/g, "-").toLowerCase()}-${new Date()
          .toISOString()
          .replace(/[:.]/g, "-")}.${type.includes("mp4") ? "m4a" : type.includes("ogg") ? "ogg" : "webm"}`
        const file = new File([blob], fname, { type })
        const durationMs = Date.now() - startTimeRef.current

        // ⚠️ llamar fuera de render, sin effect dependiente de onChange
        onChangeRef.current({ url, file, durationMs, mimeType: type })

        setIsRecording(false)
      }

      mr.start(200)
      startTimeRef.current = Date.now()
      setIsRecording(true)

      if (maxDurationSec && maxDurationSec > 0) {
        setTimeout(stop, maxDurationSec * 1000)
      }
    } catch (e) {
      console.error("No se pudo acceder al micrófono", e)
      alert("No se pudo acceder al micrófono. Revisa permisos del navegador.")
    }
  }

  const stop = () => {
    const mr = mediaRecRef.current
    if (!mr || mr.state === "inactive") return
    mr.stop()
  }

  const clearAll = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(null)
    setElapsed(0)
    setIsRecording(false)
    onChangeRef.current(null)
  }

  const handleUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const f = ev.target.files?.[0]
    if (!f) return
    // sólo aceptamos los tipos esperados; el atributo accept ya filtra en el picker
    const url = URL.createObjectURL(f)
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(url)
    setElapsed(0)
    setIsRecording(false)
    onChangeRef.current({
      url,
      file: f,
      durationMs: 0,
      mimeType: f.type || "audio/wav",
    })
  }

  const mmss = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    const r = s % 60
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`
  }

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">{label}</p>

      <div className="flex gap-2">
        {!isRecording ? (
          <Button onClick={start} variant="outline">Grabar</Button>
        ) : (
          <Button onClick={stop} variant="destructive">Detener</Button>
        )}
        <Button onClick={clearAll} variant="outline" disabled={isRecording && !audioUrl}>
          Limpiar
        </Button>

        <label className="ml-auto">
          <input
            type="file"
            accept={acceptUploads}
            className="hidden"
            onChange={handleUpload}
          />
          <span className="inline-flex items-center px-3 py-2 text-sm border rounded-md cursor-pointer">
            Subir .wav / .webm
          </span>
        </label>
      </div>

      {isRecording && (
        <div className="text-sm text-muted-foreground">Grabando… {mmss(elapsed)}</div>
      )}

      {audioUrl && (
        <audio src={audioUrl} controls className="w-full mt-1" />
      )}
    </div>
  )
}

interface AudioRecorderPairProps {
  maxDurationSec?: number
  onAnswer: (value: { animals?: AudioResult | null; letterF?: AudioResult | null }) => void
  resetCategory?: { category: "animals" | "letterF"; id: number }
}

/**
 * Dos grabaciones independientes:
 * - "Animales"
 * - "Palabras que empiezan con F"
 * Evita loops manteniendo onAnswer en un ref y sólo notificando cuando hay cambios reales.
 */
export function AudioRecorderPair({ maxDurationSec, onAnswer, resetCategory }: AudioRecorderPairProps) {
  const answerRef = useRef<{ animals?: AudioResult | null; letterF?: AudioResult | null }>({})
  const resetIdRef = useRef(resetCategory?.id ?? 0)
  const [keys, setKeys] = useState({ animals: 0, letterF: 0 })

  // mantener onAnswer estable
  const onAnswerRef = useRef(onAnswer)
  useEffect(() => { onAnswerRef.current = onAnswer }, [onAnswer])

  const update = (part: "animals" | "letterF", value: AudioResult | null) => {
    answerRef.current = { ...answerRef.current, [part]: value }
    // Llamamos una sola vez por cambio, sin effect dependiente del prop
    onAnswerRef.current(answerRef.current)
  }

  useEffect(() => {
    if (!resetCategory || resetCategory.id === resetIdRef.current) return
    resetIdRef.current = resetCategory.id
    answerRef.current = { ...answerRef.current, [resetCategory.category]: null }
    onAnswerRef.current(answerRef.current)
    setKeys((old) => ({ ...old, [resetCategory.category]: old[resetCategory.category] + 1 }))
  }, [resetCategory])

  return (
    <Card>
      <CardContent className="p-4 space-y-6">
        <SingleAudioRecorder
          key={keys.animals}
          label="ANIMALES"
          maxDurationSec={maxDurationSec ?? 60}
          acceptUploads="audio/*,.m4a,.aac,.opus,.amr,.3gp,.ogg,.webm,.wav,.mp3"
          onChange={(res) => update("animals", res)}
        />
        <SingleAudioRecorder
          key={keys.letterF}
          label='PALABRAS QUE EMPIEZAN CON "F"'
          maxDurationSec={maxDurationSec ?? 60}
          acceptUploads="audio/*,.m4a,.aac,.opus,.amr,.3gp,.ogg,.webm,.wav,.mp3"
          onChange={(res) => update("letterF", res)}
        />
      </CardContent>
    </Card>
  )
}
