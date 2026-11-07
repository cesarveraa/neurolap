"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CIUDADES, ESCOLARIDAD, ESTADOS_CIVILES, PROFESIONES } from "@/lib/edm/paciente"
import { Textarea } from "@/components/ui/textarea"

type FormState = {
  nombres: string
  apellidos: string
  ciudad: string
  ci: string
  fechaNacimiento: string
  estadoCivil: string
  gradoInstruccion: string
  profesion: string
  tel1: string
  tel2: string
  direccion: string
  acepta: boolean
}

export default function EdmRegistrationForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [shakeField, setShakeField] = useState<keyof FormState | null>(null)

  const [form, setForm] = useState<FormState>({
    nombres: "",
    apellidos: "",
    ciudad: "",
    ci: "",
    fechaNacimiento: "",
    estadoCivil: "",
    gradoInstruccion: "",
    profesion: "",
    tel1: "",
    tel2: "",
    direccion: "",
    acepta: false,
  })

  const [errors, setErrors] = useState<Record<keyof FormState, string>>({} as any)

  // refs para scroll/focus al primer error
  const refs = useMemo(
    () => ({
      nombres: useRef<HTMLInputElement>(null),
      apellidos: useRef<HTMLInputElement>(null),
      ciudad: useRef<HTMLInputElement>(null),
      ci: useRef<HTMLInputElement>(null),
      fechaNacimiento: useRef<HTMLInputElement>(null),
      estadoCivil: useRef<HTMLSelectElement>(null),
      gradoInstruccion: useRef<HTMLSelectElement>(null),
      profesion: useRef<HTMLInputElement>(null),
      tel1: useRef<HTMLInputElement>(null),
      tel2: useRef<HTMLInputElement>(null),
      direccion: useRef<HTMLTextAreaElement>(null),
      acepta: useRef<HTMLInputElement>(null),
    }),
    []
  )

  const onChange =
    (name: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value
      setForm((p) => ({ ...p, [name]: value as any }))
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    }

  const validate = () => {
    const err: Partial<Record<keyof FormState, string>> = {}

    if (!form.nombres.trim()) err.nombres = "Requerido"
    if (!form.apellidos.trim()) err.apellidos = "Requerido"
    if (!form.ciudad.trim()) err.ciudad = "Requerido"
    if (!form.ci.trim()) err.ci = "Requerido"
    if (!form.fechaNacimiento) err.fechaNacimiento = "Requerido"
    if (!form.estadoCivil) err.estadoCivil = "Seleccione una opción"
    if (!form.gradoInstruccion) err.gradoInstruccion = "Seleccione una opción"
    if (!form.profesion.trim()) err.profesion = "Requerido"
    if (!form.tel1.trim()) err.tel1 = "Requerido"
    if (!form.direccion.trim()) err.direccion = "Requerido"
    if (!form.acepta) err.acepta = "Debes aceptar los Términos y Política"

    setErrors(err as Record<keyof FormState, string>)
    return err
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    const keys = Object.keys(err) as (keyof FormState)[]
    if (keys.length > 0) {
      const first = keys[0]
      setShakeField(first)
      refs[first]?.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      refs[first]?.current?.focus()
      // quitar shake tras 600ms
      setTimeout(() => setShakeField(null), 600)
      return
    }

    try {
      setSubmitting(true)
      // await fetch("/api/registro", { method:"POST", body: JSON.stringify(form) })
      router.push("/test-edm")
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = (name: keyof FormState) =>
    [
      "transition-all",
      "focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none",
      errors[name] ? "border-destructive focus:ring-destructive" : "border-border",
      shakeField === name ? "animate-shake-x" : "",
      "card-lift",
    ].join(" ")

  return (
    <form onSubmit={onSubmit} className="space-y-8 animate-fadeInUp">
      {/* Encabezado con subrayado animado */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Registro para la Prueba EDM</h2>
        <span className="mt-2 block h-1 w-24 mx-auto bg-[var(--color-accent)] rounded-full animate-underlineGrow" />
        <p className="text-muted-foreground mt-2 animate-fade-in">
          Completa tus datos y comenzamos. Tardas menos de 2 minutos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nombres / Apellidos */}
        <div className="animate-fadeInUp">
          <label className="block text-sm font-medium mb-1">Nombre(s)</label>
          <Input ref={refs.nombres} value={form.nombres} onChange={onChange("nombres")} placeholder="Nombre(s)" className={fieldClass("nombres")} />
          {errors.nombres && <p className="text-destructive text-xs mt-1">{errors.nombres}</p>}
        </div>
        <div className="animate-fadeInUp delay-150">
          <label className="block text-sm font-medium mb-1">Apellido(s)</label>
          <Input ref={refs.apellidos} value={form.apellidos} onChange={onChange("apellidos")} placeholder="Apellido(s)" className={fieldClass("apellidos")} />
          {errors.apellidos && <p className="text-destructive text-xs mt-1">{errors.apellidos}</p>}
        </div>

        {/* Ciudad natal / CI */}
        <div className="animate-fadeInUp">
          <label className="block text-sm font-medium mb-1">Ciudad Natal</label>
          <Input ref={refs.ciudad} value={form.ciudad} onChange={onChange("ciudad")} placeholder="Ciudad Natal" list="registro-ciudades" className={fieldClass("ciudad")} />
          <datalist id="registro-ciudades">{CIUDADES.map((x) => <option key={x} value={x} />)}<option value="Otro país" /></datalist>
          {errors.ciudad && <p className="text-destructive text-xs mt-1">{errors.ciudad}</p>}
        </div>
        <div className="animate-fadeInUp delay-150">
          <label className="block text-sm font-medium mb-1">Cédula de Identidad</label>
          <Input ref={refs.ci} value={form.ci} onChange={onChange("ci")} placeholder="C.I." className={fieldClass("ci")} />
          {errors.ci && <p className="text-destructive text-xs mt-1">{errors.ci}</p>}
        </div>

        {/* Fecha / Estado civil */}
        <div className="animate-fadeInUp">
          <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
          <Input ref={refs.fechaNacimiento} type="date" value={form.fechaNacimiento} onChange={onChange("fechaNacimiento")} className={fieldClass("fechaNacimiento")} />
          {errors.fechaNacimiento && <p className="text-destructive text-xs mt-1">{errors.fechaNacimiento}</p>}
        </div>
        <div className="animate-fadeInUp delay-150">
          <label className="block text-sm font-medium mb-1">Estado Civil</label>
          <select
            ref={refs.estadoCivil}
            value={form.estadoCivil}
            onChange={onChange("estadoCivil")}
            className={`w-full rounded-md border bg-background px-3 py-2 text-sm ${fieldClass("estadoCivil")}`}
          >
            <option value="">Selecciona…</option>
            {ESTADOS_CIVILES.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
          {errors.estadoCivil && <p className="text-destructive text-xs mt-1">{errors.estadoCivil}</p>}
        </div>

        {/* Grado / Profesión */}
        <div className="animate-fadeInUp">
          <label className="block text-sm font-medium mb-1">Grado de Instrucción</label>
          <select
            ref={refs.gradoInstruccion}
            value={form.gradoInstruccion}
            onChange={onChange("gradoInstruccion")}
            className={`w-full rounded-md border bg-background px-3 py-2 text-sm ${fieldClass("gradoInstruccion")}`}
          >
            <option value="">Selecciona…</option>
            {ESCOLARIDAD.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
          {errors.gradoInstruccion && <p className="text-destructive text-xs mt-1">{errors.gradoInstruccion}</p>}
        </div>
        <div className="animate-fadeInUp delay-150">
          <label className="block text-sm font-medium mb-1">Profesión/Ocupación</label>
          <Input ref={refs.profesion} value={form.profesion} onChange={onChange("profesion")} placeholder="Profesión u ocupación" list="registro-profesiones" className={fieldClass("profesion")} />
          <datalist id="registro-profesiones">{PROFESIONES.map((x) => <option key={x} value={x} />)}</datalist>
          {errors.profesion && <p className="text-destructive text-xs mt-1">{errors.profesion}</p>}
        </div>

        {/* Teléfonos */}
        <div className="animate-fadeInUp">
          <label className="block text-sm font-medium mb-1">Teléfono de Contacto 1</label>
          <Input ref={refs.tel1} value={form.tel1} onChange={onChange("tel1")} placeholder="+591 7xxxxxxx" className={fieldClass("tel1")} />
          {errors.tel1 && <p className="text-destructive text-xs mt-1">{errors.tel1}</p>}
        </div>
        <div className="animate-fadeInUp delay-150">
          <label className="block text-sm font-medium mb-1">Teléfono de Contacto 2</label>
          <Input ref={refs.tel2} value={form.tel2} onChange={onChange("tel2")} placeholder="Opcional" className="card-lift transition-all" />
        </div>

        {/* Dirección */}
        <div className="md:col-span-2 animate-fadeInUp">
          <label className="block text-sm font-medium mb-1">Dirección</label>
          <Textarea
            ref={refs.direccion}
            value={form.direccion}
            onChange={onChange("direccion")}
            rows={3}
            placeholder="Calle, número, zona…"
            className={fieldClass("direccion")}
          />
          {errors.direccion && <p className="text-destructive text-xs mt-1">{errors.direccion}</p>}
        </div>
      </div>

      {/* Términos */}
      <div className="flex items-center gap-2 animate-fadeInUp">
        <input id="acepta" ref={refs.acepta} type="checkbox" checked={form.acepta} onChange={onChange("acepta")} />
        <label htmlFor="acepta" className="text-sm">
          Estoy de acuerdo con la <a href="/privacidad" className="underline">Política de privacidad</a>
        </label>
      </div>
      {errors.acepta && <p className="text-destructive text-xs -mt-2 animate-shake-x">{errors.acepta}</p>}

      {/* CTA */}
      <div className="animate-fadeInUp">
        <Button
          type="submit"
          disabled={submitting}
          className={`w-full btn-dark transition-transform hover:-translate-y-0.5 focus-ring ${submitting ? "animate-pulse-glow" : ""}`}
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" d="M4 12a8 8 0 018-8v4" stroke="currentColor" strokeWidth="4"/>
              </svg>
              Procesando…
            </span>
          ) : (
            "Iniciar Prueba"
          )}
        </Button>
      </div>

      {/* Animaciones locales mínimas */}
      <style jsx>{`
        @keyframes shake-x {
          0%, 100% { transform: translateX(0) }
          20% { transform: translateX(-6px) }
          40% { transform: translateX(6px) }
          60% { transform: translateX(-4px) }
          80% { transform: translateX(4px) }
        }
        .animate-shake-x { animation: shake-x 0.45s ease both }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,.0) }
          50% { box-shadow: 0 0 0 8px rgba(255,255,255,.06) }
        }
        .animate-pulse-glow { animation: pulse-glow 1.2s ease-in-out infinite }
      `}</style>
    </form>
  )
}
