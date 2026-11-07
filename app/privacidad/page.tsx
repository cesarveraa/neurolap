"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PrivacidadPage() {
  const [open, setOpen] = useState(true)
  const router = useRouter()
  const dialogRef = useRef<HTMLDivElement>(null)
  // Cerrar = volver a donde estaba (o al inicio); antes dejaba la página en blanco
  const salir = useCallback(() => {
    setOpen(false)
    if (window.history.length > 1) router.back()
    else router.push("/")
  }, [router])

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") salir()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [salir])

  // Scroll lock del body mientras está abierto
  useEffect(() => {
    if (open) {
      const { overflow } = document.body.style
      document.body.style.overflow = "hidden"
      return () => { document.body.style.overflow = overflow }
    }
  }, [open])

  // Cerrar al hacer click fuera
  const onBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) salir()
  }, [salir])

  const handleAccept = () => {
    setOpen(false)
    router.push("/registro")
  }

  // Página vacía si ya se cerró
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-reveal"
      onClick={onBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="privacidad-title"
      aria-describedby="privacidad-desc"
    >
      <Card
        ref={dialogRef}
        className="max-w-3xl w-[92vw] sm:w-[640px] bg-background border border-white/10 shadow-xl animate-fadeInUp"
      >
        {/* Header */}
        <div className="px-6 pt-6">
          <h2 id="privacidad-title" className="text-xl font-bold">
            Término de Privacidad y Confidencialidad
          </h2>
          <span className="mt-2 block h-1 w-24 bg-[var(--color-accent)] rounded-full animate-underlineGrow" />
          <p id="privacidad-desc" className="sr-only">
            Lea cuidadosamente los términos del estudio.
          </p>
        </div>

        {/* Contenido scrollable */}
        <div className="px-6 pb-4 mt-2">
          <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-4 text-sm leading-relaxed">
            <p className="text-[var(--color-accent)] font-medium">
              Por favor lea cuidadosamente el contenido de este documento; debemos estar seguros de que comprende los
              requisitos y procedimientos que requiere su participación.
            </p>

            <h4 className="font-semibold">Propósito del Estudio:</h4>
            <p>
              El propósito de este estudio es detectar casos de personas adultas mayores que presenten alteraciones en
              el estado neuropsicológico para poder implementar de manera gratuita un programa de intervención
              neuropsicológica, tomando como punto de partida el establecimiento del perfil neuropsicológico de las
              personas Adultas Mayores en la ciudad de Santa Cruz de la Sierra.
            </p>

            <h4 className="font-semibold">Riesgo del Estudio:</h4>
            <p>
              La participación en este estudio no representa para el adulto mayor o su entorno NINGÚN RIESGO al no
              plantearse variables de influencia, ni positiva, ni negativa.
            </p>

            <h4 className="font-semibold">Participación en el Estudio:</h4>
            <p>
              Su participación es completamente voluntaria. Usted puede finalizar su participación cuando lo decida. No
              se le penalizará de ninguna forma por no participar. Podrá ser excluido si el personal de investigación
              considera que su participación no es beneficiosa para usted mismo.
            </p>

            <h4 className="font-semibold">Confidencialidad:</h4>
            <p>
              Su información llevará su nombre, pero éste no será nunca divulgado. La base de datos del estudio
              permanecerá en la oficina del investigador principal y solamente los miembros del equipo de investigación
              tendrán acceso a ella.
            </p>

            <h4 className="font-semibold">Aceptación:</h4>
            <p>
              He leído este consentimiento de participación en el Estudio. Este estudio de investigación me ha sido
              explicado y todas mis preguntas relacionadas con procedimientos, riesgos, inconvenientes y efectos
              adversos han sido respondidas satisfactoriamente.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={salir}>
            Cerrar
          </Button>
          <Button onClick={handleAccept} className="btn-dark">
            Acepto y continuar
          </Button>
        </div>
      </Card>
    </div>
  )
}
