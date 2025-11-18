"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface YesNoProps {
  question?: string
  onAnswer: (response: boolean) => void
}

export function YesNo({ question, onAnswer }: YesNoProps) {
  const [selected, setSelected] = useState<boolean | null>(null)

  const handleSelect = (value: boolean) => {
    setSelected(value)
    onAnswer(value)
  }

  return (
    <div className="space-y-4">
      {question && <p className="text-lg text-warm-gray">{question}</p>}

      <div className="flex gap-4 justify-center">
        <Button
          variant={selected === true ? "default" : "outline"}
          size="lg"
          onClick={() => handleSelect(true)}
          className={`px-8 py-4 text-lg ${
            selected === true ? "bg-accent-red hover:bg-accent-red/90" : "hover:bg-beige-light"
          }`}
        >
          Sí
        </Button>

        <Button
          variant={selected === false ? "default" : "outline"}
          size="lg"
          onClick={() => handleSelect(false)}
          className={`px-8 py-4 text-lg ${
            selected === false ? "bg-accent-red hover:bg-accent-red/90" : "hover:bg-beige-light"
          }`}
        >
          No
        </Button>
      </div>
    </div>
  )
}
