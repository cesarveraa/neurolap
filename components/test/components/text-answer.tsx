"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface TextAnswerProps {
  fields?: number | string[]
  placeholder?: string
  multiline?: boolean
  onAnswer: (response: any) => void
}

export function TextAnswer({ fields = 1, placeholder, multiline = false, onAnswer }: TextAnswerProps) {
  const [responses, setResponses] = useState<string[]>([])

  const fieldLabels = Array.isArray(fields)
    ? fields
    : Array(fields)
        .fill("")
        .map((_, i) => `Respuesta ${i + 1}`)
  const fieldCount = Array.isArray(fields) ? fields.length : fields

  const handleInputChange = (index: number, value: string) => {
    const newResponses = [...responses]
    newResponses[index] = value
    setResponses(newResponses)
  }

  const handleSubmit = () => {
    const response = fieldCount === 1 ? responses[0] || "" : responses
    onAnswer(response)
  }

  const InputComponent = multiline ? Textarea : Input

  return (
    <div className="space-y-4">
      {Array.from({ length: fieldCount }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Label htmlFor={`field-${index}`} className="text-sm font-medium">
            {fieldLabels[index]}
          </Label>
          <InputComponent
            id={`field-${index}`}
            placeholder={placeholder || `Ingrese su respuesta...`}
            value={responses[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="text-lg p-3"
          />
        </div>
      ))}

      <Button
        onClick={handleSubmit}
        className="bg-accent-red hover:bg-accent-red/90"
        disabled={responses.every((r) => !r || r.trim() === "")}
      >
        Registrar Respuesta
      </Button>
    </div>
  )
}
