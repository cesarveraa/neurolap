"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timer } from "./timer"
import { ZoomIn, ZoomOut, Maximize } from "lucide-react"

interface ImageViewerProps {
  src: string
  alt: string
  showTimer?: boolean
  timerDuration?: number
  onComplete?: (response: any) => void
}

export function ImageViewer({ src, alt, showTimer, timerDuration, onComplete }: ImageViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [timerExpired, setTimerExpired] = useState(false)

  const handleTimerExpire = () => {
    setTimerExpired(true)
    onComplete?.({ viewed: true, duration: timerDuration })
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5))

  return (
    <div className="space-y-4">
      {showTimer && timerDuration && (
        <Timer duration={timerDuration} startManually={true} onExpire={handleTimerExpire} />
      )}

      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="relative">
            <img
              src={src || "/placeholder.svg"}
              alt={alt}
              className="w-full h-auto mx-auto transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            />

            {/* Controls */}
            <div className="absolute top-2 right-2 flex gap-2">
              <Button size="sm" variant="secondary" onClick={handleZoomOut} disabled={zoom <= 0.5}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" onClick={handleZoomIn} disabled={zoom >= 3}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setIsFullscreen(true)}>
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {timerExpired && (
        <div className="text-center p-4 bg-beige-light rounded-lg">
          <p className="text-warm-gray">Tiempo completado. Puede continuar con la siguiente parte de la evaluación.</p>
        </div>
      )}
    </div>
  )
}
