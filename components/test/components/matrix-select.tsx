"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Hotspot = { id: string; x: number; y: number; w: number; h: number } // normalizado 0..1

type GridConfig = {
  rows: number
  cols: number
  // rectángulo que contiene TODA la malla, normalizado 0..1
  x0: number
  y0: number
  x1: number
  y1: number
}

type Calibration = {
  enabled?: boolean
  // valores iniciales
  initial?: GridConfig
}

interface MatrixSelectProps {
  imageSrc?: string
  matrix?: string
  onSelect: (selectedIds: string[]) => void
  maxSelect?: number
  targetSrc?: string
  initialSelection?: string[]
  disabled?: boolean
  // Opción 1: generas hotspots con grilla
  grid?: GridConfig
  // Opción 2: pasas hotspots fijos (si existen, se usan en lugar de grid)
  hotspots?: Hotspot[]
  calibration?: Calibration
}

function buildGridHotspots(g: GridConfig): Hotspot[] {
  const { rows, cols, x0, y0, x1, y1 } = g
  const cellW = (x1 - x0) / cols
  const cellH = (y1 - y0) / rows
  const hs: Hotspot[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      hs.push({
        id: `r${r + 1}c${c + 1}`,
        x: x0 + c * cellW,
        y: y0 + r * cellH,
        w: cellW,
        h: cellH,
      })
    }
  }
  return hs
}

export function MatrixSelect({
  imageSrc,
  matrix,
  onSelect,
  maxSelect = 999,
  targetSrc,
  initialSelection = [],
  disabled = false,
  grid,
  hotspots,
  calibration,
}: MatrixSelectProps) {
  const src = useMemo(() => imageSrc || matrix || "/placeholder.svg", [imageSrc, matrix])
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelection))
  const [useGrid, setUseGrid] = useState<GridConfig | null>(grid ?? null)

  // --- Calibración ---
  const [calib, setCalib] = useState<GridConfig>(() =>
    calibration?.initial ?? grid ?? { rows: 25, cols: 18, x0: 0.03, y0: 0.03, x1: 0.97, y1: 0.97 }
  )
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (grid) setUseGrid(grid)
  }, [grid])

  const finalHotspots: Hotspot[] = useMemo(() => {
    if (hotspots && hotspots.length) return hotspots
    const g = calibration?.enabled ? calib : (useGrid ?? calib)
    return buildGridHotspots(g)
  }, [hotspots, calibration?.enabled, calib, useGrid])

  const isSelected = (id: string) => selected.has(id)

  const toggle = (id: string) => {
    if (disabled) return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else {
        if (next.size >= maxSelect) return next
        next.add(id)
      }
      return next
    })
  }

  const handleSubmit = () => onSelect(Array.from(selected))
  const handleClear = () => setSelected(new Set())

  const copyHotspots = async () => {
    const json = JSON.stringify(finalHotspots, null, 2)
    try {
      await navigator.clipboard.writeText(json)
      // opcional: toast
      console.log("Hotspots copiados al portapapeles.")
    } catch {
      console.log(json)
    }
  }

  // Helpers de calibración (arrastrar esquinas TL/BR)
  const onDragCorner = (corner: "tl" | "br") => (e: React.MouseEvent) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height))
    setCalib(prev => {
      if (corner === "tl") {
        const x0 = Math.min(x, prev.x1 - 0.001)
        const y0 = Math.min(y, prev.y1 - 0.001)
        return { ...prev, x0, y0 }
      } else {
        const x1 = Math.max(x, prev.x0 + 0.001)
        const y1 = Math.max(y, prev.y0 + 0.001)
        return { ...prev, x1, y1 }
      }
    })
  }

  return (
    <Card>
      <CardContent className="p-4 sm:p-6 space-y-4">
        {targetSrc && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Figura objetivo:</span>
            <img src={targetSrc} alt="Figura objetivo" className="h-12 w-auto rounded border" draggable={false} />
          </div>
        )}

        <p className="text-warm-gray">
          Marque todas las figuras iguales a la mostrada anteriormente. Revise fila por fila.
        </p>

        <div className="relative inline-block select-none">
          {/* Imagen base */}
          <img
            ref={imgRef}
            src={src}
            alt="Matriz de selección"
            className="max-w-full h-auto border rounded-lg block"
            draggable={false}
          />

          {/* Overlays clicables */}
          {finalHotspots.map((h) => (
            <button
              key={h.id}
              type="button"
              aria-pressed={isSelected(h.id)}
              aria-label={`Zona ${h.id}`}
              onClick={() => toggle(h.id)}
              disabled={disabled}
              className={[
                "absolute outline-none",
                "transition",
                isSelected(h.id)
                  ? "ring-2 ring-red-500/90 bg-red-500/20"
                  : "ring-1 ring-black/10 hover:ring-blue-500/60 hover:bg-blue-500/10",
              ].join(" ")}
              style={{
                left: `${h.x * 100}%`,
                top: `${h.y * 100}%`,
                width: `${h.w * 100}%`,
                height: `${h.h * 100}%`,
              }}
            >
              {isSelected(h.id) && (
                <span className="pointer-events-none text-red-700 font-bold text-xl leading-none select-none">✕</span>
              )}
            </button>
          ))}

          {/* UI de calibración */}
          {calibration?.enabled && (
            <>
              {/* Rectángulo guía */}
              <div
                className="absolute border-2 border-red-500/70 pointer-events-none"
                style={{
                  left: `${calib.x0 * 100}%`,
                  top: `${calib.y0 * 100}%`,
                  width: `${(calib.x1 - calib.x0) * 100}%`,
                  height: `${(calib.y1 - calib.y0) * 100}%`,
                }}
              />
              {/* Esquinas arrastrables */}
              <div
                className="absolute w-4 h-4 bg-red-600 rounded-sm cursor-nwse-resize"
                style={{ left: `${calib.x0 * 100}%`, top: `${calib.y0 * 100}%`, transform: "translate(-50%, -50%)" }}
                onMouseDown={(e) => {
                  const move = (ev: MouseEvent) => onDragCorner("tl")(ev as any)
                  const up = () => {
                    window.removeEventListener("mousemove", move)
                    window.removeEventListener("mouseup", up)
                  }
                  window.addEventListener("mousemove", move)
                  window.addEventListener("mouseup", up)
                }}
              />
              <div
                className="absolute w-4 h-4 bg-red-600 rounded-sm cursor-nwse-resize"
                style={{ left: `${calib.x1 * 100}%`, top: `${calib.y1 * 100}%`, transform: "translate(-50%, -50%)" }}
                onMouseDown={(e) => {
                  const move = (ev: MouseEvent) => onDragCorner("br")(ev as any)
                  const up = () => {
                    window.removeEventListener("mousemove", move)
                    window.removeEventListener("mouseup", up)
                  }
                  window.addEventListener("mousemove", move)
                  window.addEventListener("mouseup", up)
                }}
              />
            </>
          )}
        </div>
        
        {/* Panel de calibración PARA DESARROLLO (se puede quitar DESPUES)
        {calibration?.enabled && (
          <div className="flex flex-wrap gap-2 items-center">
            <div className="text-sm text-gray-600">
              Filas:
              <input
                type="number"
                className="ml-2 w-16 border rounded px-2 py-1"
                value={calib.rows}
                min={1}
                onChange={(e) => setCalib((p) => ({ ...p, rows: Number(e.target.value) || 1 }))}
              />
            </div>
            <div className="text-sm text-gray-600">
              Columnas:
              <input
                type="number"
                className="ml-2 w-16 border rounded px-2 py-1"
                value={calib.cols}
                min={1}
                onChange={(e) => setCalib((p) => ({ ...p, cols: Number(e.target.value) || 1 }))}
              />
            </div>
            <Button variant="outline" onClick={() => setUseGrid(calib)}>
              Usar esta grilla
            </Button>
            <Button onClick={copyHotspots}>Copiar hotspots</Button>
          </div>
        )}
        */}

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleSubmit}
            disabled={selected.size === 0 || disabled}
            variant="outline"
          >
            Confirmar selecciones ({selected.size}{maxSelect !== 999 ? ` / ${maxSelect}` : ""})
          </Button>
          <Button onClick={handleClear} variant="outline" disabled={selected.size === 0 || disabled}>
            Limpiar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
