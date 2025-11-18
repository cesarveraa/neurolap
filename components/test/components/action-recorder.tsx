"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ActionRecorderProps {
  action: string
  onRecord: (response: any) => void
}

export function ActionRecorder({ action, onRecord }: ActionRecorderProps) {
  const [recorded, setRecorded] = useState(false)
  const [timestamp, setTimestamp] = useState<Date | null>(null)

  const handleRecord = () => {
    const now = new Date()
    setTimestamp(now)
    setRecorded(true)
    onRecord({
      action,
      timestamp: now.toISOString(),
      recorded: true,
    })
  }

  return (
    <Card>
      <CardContent className="p-6 text-center">
        <p className="text-lg text-warm-gray mb-6">
          Cuando esté listo, presione el botón para registrar la acción: <strong>{action}</strong>
        </p>

        <Button
          size="lg"
          onClick={handleRecord}
          disabled={recorded}
          className={`px-8 py-4 text-lg ${
            recorded ? "bg-green-600 hover:bg-green-600" : "bg-accent-red hover:bg-accent-red/90"
          }`}
        >
          {recorded ? "✓ Acción Registrada" : `Registrar ${action}`}
        </Button>

        {recorded && timestamp && (
          <p className="text-sm text-warm-gray mt-4">Registrado a las {timestamp.toLocaleTimeString()}</p>
        )}
      </CardContent>
    </Card>
  )
}
