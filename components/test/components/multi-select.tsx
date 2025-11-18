"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface MultiSelectProps {
  options: Array<{ word: string; correct?: boolean }> | string[]
  multiple?: boolean
  onAnswer: (response: string[]) => void
}

export function MultiSelect({ options, multiple = true, onAnswer }: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (value: string) => {
    if (multiple) {
      setSelected((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
    } else {
      setSelected([value])
    }
  }

  const handleSubmit = () => {
    onAnswer(selected)
  }

  const optionsList =
    Array.isArray(options) && options.length > 0 && typeof options[0] === "object"
      ? (options as Array<{ word: string; correct?: boolean }>).map((opt) => opt.word)
      : (options as string[])

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {optionsList.map((option, index) => (
          <div key={index} className="flex items-center space-x-3">
            {multiple ? (
              <Checkbox
                id={`option-${index}`}
                checked={selected.includes(option)}
                onCheckedChange={() => handleToggle(option)}
              />
            ) : (
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                checked={selected.includes(option)}
                onClick={() => handleToggle(option)}
              />
            )}
            <Label htmlFor={`option-${index}`} className="text-lg cursor-pointer">
              {option}
            </Label>
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} className="bg-accent-red hover:bg-accent-red/90" disabled={selected.length === 0}>
        Registrar Respuesta
      </Button>
    </div>
  )
}
