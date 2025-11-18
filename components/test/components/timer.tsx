"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Play, Pause, RotateCcw, Edit3, Save, X } from "lucide-react"

interface TimerProps {
  /** duración inicial en segundos */
  duration: number
  /** si es true, no arranca automáticamente */
  startManually?: boolean
  onExpire?: () => void
  onStart?: () => void
  /** se dispara cuando se resetea manualmente */
  onReset?: (newDurationSeconds: number) => void
}

export function Timer({
  duration,
  startManually = false,
  onExpire,
  onStart,
  onReset,
}: TimerProps) {
  const [baseDuration, setBaseDuration] = useState(duration) // duración “objetivo” actual (editable)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(!startManually)
  const [isExpired, setIsExpired] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [editMin, setEditMin] = useState(Math.floor(duration / 60).toString())
  const [editSec, setEditSec] = useState(String(duration % 60).padStart(2, "0"))

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Si cambia la prop duration desde afuera, sincroniza (y pausa para evitar saltos)
  useEffect(() => {
    setBaseDuration(duration)
    setTimeLeft(duration)
    setIsExpired(false)
    setIsRunning(!startManually)
  }, [duration, startManually])

  // Reloj
  useEffect(() => {
    if (!isRunning || isExpired) return
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current as NodeJS.Timeout)
          intervalRef.current = null
          setIsExpired(true)
          setIsRunning(false)
          onExpire?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, isExpired, onExpire])

  const handleStart = () => {
    if (isExpired) {
      // Si estaba expirado, un start actúa como restart + start
      setTimeLeft(baseDuration)
      setIsExpired(false)
    }
    setIsRunning(true)
    onStart?.()
  }

  const handlePause = () => setIsRunning(false)

  const handleRestart = () => {
    // Reinicia al valor base actual (editable)
    setTimeLeft(baseDuration)
    setIsExpired(false)
    setIsRunning(!startManually) // respeta startManually: si antes requería iniciar manual, reinicia en pausa
    onReset?.(baseDuration)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressColor = () => {
    const pct = (timeLeft / baseDuration) * 100
    if (pct > 50) return "bg-green-500"
    if (pct > 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  const saveEdit = () => {
    const m = Math.max(0, parseInt(editMin || "0", 10) || 0)
    const sRaw = Math.max(0, parseInt(editSec || "0", 10) || 0)
    const s = Math.min(59, sRaw) // clamp a 59
    const next = m * 60 + s
    const nextDuration = next > 0 ? next : 1 // evita 0
    // al guardar: pausa, actualiza base y timeLeft, limpia expirado
    setIsRunning(false)
    setBaseDuration(nextDuration)
    setTimeLeft(nextDuration)
    setIsExpired(false)
    setIsEditing(false)
    onReset?.(nextDuration)
  }

  const cancelEdit = () => {
    // vuelve a los valores actuales
    setEditMin(Math.floor(baseDuration / 60).toString())
    setEditSec(String(baseDuration % 60).padStart(2, "0"))
    setIsEditing(false)
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="p-6 text-center">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-warm-gray" />
            <span className="text-sm text-warm-gray">Tiempo restante</span>
          </div>

          {/* Controles edición */}
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(true)
                setIsRunning(false) // al editar, pausa
                setEditMin(Math.floor(baseDuration / 60).toString())
                setEditSec(String(baseDuration % 60).padStart(2, "0"))
              }}
              className="bg-transparent"
              title="Editar duración"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" onClick={saveEdit} className="btn-dark">
                <Save className="w-4 h-4 mr-1" />
                Guardar
              </Button>
              <Button size="sm" variant="outline" onClick={cancelEdit} className="bg-transparent">
                <X className="w-4 h-4 mr-1" />
                Cancelar
              </Button>
            </div>
          )}
        </div>

        {/* Tiempo o editor */}
        {!isEditing ? (
          <div className="text-3xl font-bold text-burgundy-dark mb-4">
            {formatTime(timeLeft)}
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2">
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={editMin}
                onChange={(e) => setEditMin(e.target.value.replace(/[^\d]/g, ""))}
                className="w-20 rounded-md border bg-background px-3 py-2 text-center text-lg"
                aria-label="Minutos"
              />
              <span className="text-xl font-semibold">:</span>
              <input
                type="number"
                min={0}
                max={59}
                inputMode="numeric"
                value={editSec}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "")
                  setEditSec(v)
                }}
                className="w-20 rounded-md border bg-background px-3 py-2 text-center text-lg"
                aria-label="Segundos"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Ajusta minutos y segundos. Al guardar, el contador se reinicia a la nueva duración.
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
            style={{
              width: `${Math.max(0, Math.min(100, (timeLeft / baseDuration) * 100))}%`,
            }}
          />
        </div>

        {/* Controles */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {!isRunning && !isExpired && (
            <Button onClick={handleStart} className="bg-primary hover:bg-accent-red/90 flex items-center gap-2">
              <Play className="w-4 h-4" />
              Iniciar
            </Button>
          )}
          {isRunning && (
            <Button onClick={handlePause} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Pause className="w-4 h-4" />
              Pausar
            </Button>
          )}
          <Button
            onClick={handleRestart}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
            title="Reiniciar al valor actual"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </Button>
        </div>

        {/* Mensaje de expiración */}
        {isExpired && <div className="mt-3 text-red-600 font-semibold">¡Tiempo agotado!</div>}
      </CardContent>
    </Card>
  )
}
