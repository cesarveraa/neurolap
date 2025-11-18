"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { testSections } from "@/lib/test-data"
import { TestSection } from "@/components/test/test-section"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TestWizardProps {
  onComplete: (results: any) => void
}

export function TestWizard({ onComplete }: TestWizardProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [sectionScores, setSectionScores] = useState<Record<string, number>>({})

  const currentSection = testSections[currentSectionIndex]
  const currentItem = currentSection?.items[currentItemIndex]
  const totalItems = testSections.reduce((sum, section) => sum + section.items.length, 0)
  const completedItems =
    testSections.slice(0, currentSectionIndex).reduce((sum, section) => sum + section.items.length, 0) +
    currentItemIndex

  const progress = (completedItems / totalItems) * 100

  const handleItemResponse = (itemId: string, response: any, score: number) => {
    setResponses((prev) => ({
      ...prev,
      [itemId]: response,
    }))

    // Update section score
    setSectionScores((prev) => ({
      ...prev,
      [currentSection.id]: (prev[currentSection.id] || 0) + score,
    }))
  }

  const handleNext = () => {
    if (currentItemIndex < currentSection.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1)
    } else if (currentSectionIndex < testSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      setCurrentItemIndex(0)
    } else {
      // Test completed
      const results = {
        responses,
        sectionScores,
        totalScore: Object.values(sectionScores).reduce((sum: number, score: number) => sum + score, 0),
        completedAt: new Date().toISOString(),
      }
      onComplete(results)
    }
  }

  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1)
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
      setCurrentItemIndex(testSections[currentSectionIndex - 1].items.length - 1)
    }
  }

  const canGoBack = currentSectionIndex > 0 || currentItemIndex > 0
  const isLastItem =
    currentSectionIndex === testSections.length - 1 && currentItemIndex === currentSection.items.length - 1

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div>
              <CardTitle className="text-xl text-burgundy-dark">{currentSection.title}</CardTitle>
              <p className="text-warm-gray">
                Sección {currentSectionIndex + 1} de {testSections.length} • Ítem {currentItemIndex + 1} de{" "}
                {currentSection.items.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-warm-gray">Progreso general</p>
              <p className="text-lg font-semibold text-burgundy-dark">{Math.round(progress)}%</p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
      </Card>

      {/* Current Test Item */}
      <TestSection
        section={currentSection}
        currentItem={currentItem}
        onResponse={handleItemResponse}
        onNext={handleNext}
        canGoNext={true}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!canGoBack}
          className="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <Button onClick={handleNext} className="bg-primary hover:bg-accent-red/90 flex items-center gap-2">
          {isLastItem ? "Finalizar Evaluación" : "Siguiente"}
          {!isLastItem && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
