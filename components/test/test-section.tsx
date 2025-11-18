"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TextAnswer } from "@/components/test/components/text-answer"
import { YesNo } from "@/components/test/components/yes-no"
import { MultiSelect } from "@/components/test/components/multi-select"
import { ImageViewer } from "@/components/test/components/image-viewer"
import { Timer } from "@/components/test/components/timer"
import { ActionRecorder } from "@/components/test/components/action-recorder"
import { FileUpload } from "@/components/test/components/file-upload"
import { MatrixSelect } from "@/components/test/components/matrix-select"
import { AudioRecorderPair } from "@/components/test/components/audio-recorder"
import { VideoRecorder } from "@/components/test/components/video-recorder"


interface TestSectionProps {
  section: any
  currentItem: any
  onResponse: (itemId: string, response: any, score: number) => void
  onNext: () => void
  canGoNext: boolean
}

function normalize(s: string) {
  return (s ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

function getBandLabelColor(label: "R" | "A" | "V" | null) {
  if (label === "V") return { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" }
  if (label === "A") return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" }
  if (label === "R") return { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" }
  return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" }
}

export function TestSection({ section, currentItem, onResponse }: TestSectionProps) {
  const [currentResponse, setCurrentResponse] = useState<any>(null)
  const [hasResponded, setHasResponded] = useState(false)
  const [score, setScore] = useState<number>(0)

  const handleResponse = (response: any) => {
    setCurrentResponse(response)
    setHasResponded(true)
    const s = calculateScore(currentItem, response)
    setScore(s)
    onResponse(currentItem.itemId, response, s)
  }

  const evaluation = useMemo(() => getEvaluation(currentItem, score), [currentItem, score])
  const labelColors = getBandLabelColor((evaluation?.label ?? null) as any)

  function calculateScore(item: any, response: any): number {
    const maxScore = item?.maxScore ?? 1
    const scoring = item?.scoring || {}

    if (item.answerType === "YesNo" && "correctAnswer" in item) {
      return response === item.correctAnswer ? maxScore : 0
    }

    switch (scoring.type) {
      case "count": {
        if (Array.isArray(response)) {
          const correct = response.filter((x) => !!(x && String(x).trim().length > 0)).length
          return Math.min(correct * (scoring.pointsPerCorrect ?? 1), maxScore)
        } else {
          const ok = response && String(response).trim().length > 0 ? 1 : 0
          return Math.min(ok * (scoring.pointsPerCorrect ?? 1), maxScore)
        }
      }

      case "exact_match": {
        const correctAnswers: string[] = item?.correctAnswers ?? []
        if (!correctAnswers?.length) return 0
        if (Array.isArray(response)) {
          let pts = 0
          for (let i = 0; i < Math.min(response.length, correctAnswers.length); i++) {
            if (normalize(response[i]) === normalize(correctAnswers[i])) {
              pts += scoring.pointsPerCorrect ?? 1
            }
          }
          return Math.min(pts, maxScore)
        } else {
          const ok = normalize(response) === normalize(correctAnswers[0])
          return ok ? Math.min(scoring.pointsPerCorrect ?? 1, maxScore) : 0
        }
      }

      case "sequence": {
        const expected: string[] = item?.correctSequence ?? []
        const ans: string[] = Array.isArray(response)
          ? response
          : typeof response === "string"
            ? response.split(/[,\n]/).map((s) => s.trim())
            : []
        let pts = 0
        for (let i = 0; i < Math.min(ans.length, expected.length); i++) {
          if (normalize(ans[i]) === normalize(expected[i])) pts++
        }
        const maxPoints = scoring.maxPoints ?? maxScore
        return Math.min(pts, maxPoints)
      }

      case "word_count": {
        const maxWords = scoring.maxWords ?? maxScore
        const txt = Array.isArray(response) ? response.join(" ") : String(response ?? "")
        const words = txt
          .split(/[,\s\n]+/)
          .map((w) => w.trim())
          .filter((w) => w.length > 0)
        const pts = Math.min(words.length, maxWords)
        return Math.min(pts, maxScore)
      }

      // ✅ CORREGIDO: compara seleccionados vs expectedTargets y (opcional) penaliza intrusiones
      case "matrix_hits": {
        const selected: string[] = Array.isArray(response) ? response : []
        const targets: string[] = item?.expectedTargets ?? []
        const targetSet = new Set(targets)

        const hits = selected.filter((id) => targetSet.has(id)).length
        const intrusions = selected.filter((id) => !targetSet.has(id)).length

        const penalize = scoring.penalizeIntrusions === true
        let pts = hits
        if (penalize) pts -= intrusions

        const maxHits = scoring.maxHits ?? maxScore
        pts = Math.min(pts, maxHits)

        return Math.max(0, Math.min(pts, maxScore))
      }

      case "recognition": {
        const options: { word: string; correct: boolean }[] = item?.options ?? []
        const selected: string[] = Array.isArray(response) ? response : []
        let pts = 0
        const correctBonus = scoring.correctBonus ?? 1
        const intrusionPenalty = scoring.intrusionPenalty ?? -1
        const index = new Map(options.map((o) => [normalize(o.word), o.correct]))
        for (const s of selected) {
          const isCorrect = index.get(normalize(s))
          if (isCorrect === true) pts += correctBonus
          else pts += intrusionPenalty
        }
        return Math.max(0, Math.min(pts, item?.maxScore ?? 0))
      }
      // 5.1 Unordered set (sin orden; tope maxCorrect)
      
      case "unordered_set": {
        const maxCorrect = scoring.maxCorrect ?? item?.maxScore ?? 0
        const correctPool: string[] = (item?.correctAnswers ?? []).map(normalize)
        const given = Array.isArray(response)
          ? response.map(normalize)
          : String(response ?? "").split(/[,\s\n]+/).map(normalize)

        // único y válidos
        const uniq = Array.from(new Set(given.filter(Boolean)))
        const hits = uniq.filter((w) => correctPool.includes(w)).length
        return Math.min(hits, maxCorrect)
      }

      // 5.2 Press counter (para ActionRecorder: taps)
      case "press_count": {
        const count = typeof response === "number"
          ? response
          : (response?.count ?? 0)
        const maxPresses = scoring.maxPresses ?? item?.maxScore ?? 0
        return Math.max(0, Math.min(count, maxPresses))
      }


      default: {
        switch (item.answerType) {
          case "TextAnswer":
            return response && String(response).trim().length > 0 ? maxScore : 0
          case "MultiSelect": {
            const correctAnswers: string[] = item.correctAnswers ?? []
            if (!correctAnswers?.length || !Array.isArray(response)) return 0
            const correct = response.filter((r: string) => correctAnswers.includes(r)).length
            const incorrect = response.filter((r: string) => !correctAnswers.includes(r)).length
            return Math.max(0, Math.min(correct - incorrect, maxScore))
          }
          default:
            return 0
        }
      }
    }
  }

  function getEvaluation(item: any, score: number): { label: "R" | "A" | "V"; text: string } | null {
    const maxScore = item?.maxScore ?? 1
    const ev = item?.evaluation
    if (!ev) return null

    if (ev.type === "bands" && Array.isArray(ev.bands)) {
      for (const b of ev.bands) {
        if (score >= b.min && score <= b.max) {
          const label = (b.label as "R" | "A" | "V") ?? "A"
          const text = ev.labels?.[label] ?? label
          return { label, text }
        }
      }
      return null
    }

    if (ev.type === "percent" && ev.thresholds) {
      const pct = maxScore > 0 ? score / maxScore : 0
      const v = ev.thresholds.V ?? 0.8
      const a = ev.thresholds.A ?? 0.5
      if (pct >= v) return { label: "V", text: ev.labels?.V ?? "Verde" }
      if (pct >= a) return { label: "A", text: ev.labels?.A ?? "Amarillo" }
      return { label: "R", text: ev.labels?.R ?? "Rojo" }
    }

    return null
  }

  const renderAnswerComponent = () => {
    switch (currentItem.answerType) {
      case "TextAnswer":
        return (
          <TextAnswer
            fields={currentItem.fields || 1}
            placeholder={currentItem.placeholder}
            onAnswer={handleResponse}
          />
        )
      case "YesNo":
        return <YesNo question={currentItem.question} onAnswer={handleResponse} />
      case "MultiSelect":
        return (
          <MultiSelect
            options={currentItem.options || []}
            multiple={currentItem.multiple}
            onAnswer={handleResponse}
          />
        )
      case "ImageViewer":
        return (
          <ImageViewer
            src={currentItem.stimulus || "/placeholder.svg"}
            alt={currentItem.title}
            showTimer={currentItem.timer}
            timerDuration={currentItem.timer?.duration}
            onComplete={handleResponse}
          />
        )
      case "ActionRecorder":
        return (
          <ActionRecorder
            action={
              typeof currentItem.action === "string"
                ? currentItem.action
                : (currentItem.action?.label ??
                  currentItem.action?.name ??
                  currentItem.title ?? // fallback razonable
                  "")
            }
            onRecord={handleResponse}
          />
        )

      case "FileUpload":
        return <FileUpload accept={currentItem.accept || "image/*"} onUpload={handleResponse} />
      case "MatrixSelect":
        return (
          <MatrixSelect
            imageSrc="/anexo1-response-edm.png"
            targetSrc="/anexo1-edm.png"
            maxSelect={15}
            onSelect={(ids) => handleResponse(ids)}
            calibration={{
              enabled: true, // activa calibración
              initial: { rows: 15, cols: 16, x0: 0, y0: 0, x1: 1, y1: 1 } // valores iniciales aproximados
            }}
          />

        )
      case "AudioRecorderPair":
        return (
          <AudioRecorderPair
            maxDurationSec={60}
            onAnswer={handleResponse}
          />
        )


      case "VideoRecorder":
        return (
          <VideoRecorder
            maxDurationSec={60} // opcional
            onRecord={(result) => handleResponse(result)} // te entrega File + url + duración
          />
        )


      default:
        return <TextAnswer fields={1} onAnswer={handleResponse} />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-burgundy-dark">
          {String(currentItem.title ?? "")}
        </CardTitle>

        {typeof currentItem.instruction === "string" && (
          <p className="text-warm-gray leading-relaxed">{currentItem.instruction}</p>
        )}

        {typeof currentItem.rubricNote === "string" && (
          <p className="mt-2 text-sm text-gray-600 italic">{currentItem.rubricNote}</p>
        )}

      </CardHeader>

      <CardContent className="space-y-6">
        {currentItem.timer && currentItem.answerType !== "ImageViewer" && (
          <Timer
            duration={currentItem.timer.duration}
            startManually={currentItem.timer.startManually}
            onExpire={() => console.log("Timer expired")}
          />
        )}

        {renderAnswerComponent()}

        {hasResponded && (
          <div className={`p-4 ${labelColors.bg} border ${labelColors.border} rounded-lg`}>
            <p className={`${labelColors.text} font-medium`}>
              ✓ Respuesta registrada. Puntaje: <b>{score}</b>
              {typeof currentItem.maxScore === "number" ? ` / ${currentItem.maxScore}` : ""}
            </p>
            {evaluation && (
              <div className="mt-2 inline-flex items-center gap-2">
                <span className={`px-2 py-1 text-sm rounded-md border ${labelColors.border} ${labelColors.text}`}>
                  {evaluation.label} – {evaluation.text}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
