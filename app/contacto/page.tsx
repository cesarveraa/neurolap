"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({ nombre: "", email: "", asunto: "", mensaje: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!formData.nombre.trim()) next.nombre = "El nombre es obligatorio"
    if (!formData.email.trim()) next.email = "El email es obligatorio"
    if (!formData.asunto.trim()) next.asunto = "El asunto es obligatorio"
    if (!formData.mensaje.trim()) next.mensaje = "El mensaje es obligatorio"
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) next.email = "El email no es válido"
    setErrors(next)
    if (Object.keys(next).length === 0) {
      const cuerpo = `${formData.mensaje}\n\n${formData.nombre} <${formData.email}>`
      window.location.href = `mailto:neurolap.bo@gmail.com?subject=${encodeURIComponent(formData.asunto)}` +
        `&body=${encodeURIComponent(cuerpo)}`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-primary">Contáctanos</h1>
            <p className="max-w-[58ch] text-muted-foreground">Estamos aquí para ayudarte y responder tus consultas</p>
          </div>
        </section>
        <section className="bg-card py-12 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-20 lg:px-8">
            <div>
              <h2 className="text-primary">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="mt-6 grid gap-5" noValidate>
                {(["nombre", "email", "asunto"] as const).map((name) => (
                  <div key={name}>
                    <label htmlFor={name} className="mb-2 block font-semibold">
                      {name === "nombre" ? "Nombre completo" : name === "email" ? "Email" : "Asunto"} *
                    </label>
                    <Input id={name} name={name} type={name === "email" ? "email" : "text"}
                      value={formData[name]} onChange={handleChange} aria-invalid={Boolean(errors[name])}
                      aria-describedby={errors[name] ? `${name}-error` : undefined}
                      className="min-h-12 text-base" placeholder={name === "nombre" ? "Tu nombre completo" : name === "email" ? "tu@email.com" : "¿En qué podemos ayudarte?"} />
                    {errors[name] && <p id={`${name}-error`} className="mt-1 text-sm text-destructive">{errors[name]}</p>}
                  </div>
                ))}
                <div>
                  <label htmlFor="mensaje" className="mb-2 block font-semibold">Mensaje *</label>
                  <Textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange}
                    aria-invalid={Boolean(errors.mensaje)} aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                    className="min-h-32 text-base" placeholder="Cuéntanos más detalles sobre tu consulta..." rows={5} />
                  {errors.mensaje && <p id="mensaje-error" className="mt-1 text-sm text-destructive">{errors.mensaje}</p>}
                </div>
                <Button type="submit" className="min-h-12 w-fit bg-primary px-8 text-primary-foreground hover:bg-primary/90">Enviar mensaje</Button>
                <p className="max-w-[58ch] text-sm text-muted-foreground">Se abrirá su aplicación de correo con el mensaje listo para enviar a neurolap.bo@gmail.com.</p>
              </form>
            </div>
            <aside>
              <h2 className="text-primary">Información de contacto</h2>
              <ul className="mt-6 divide-y divide-border">
                <li className="flex gap-4 py-4 first:pt-0"><Mail aria-hidden className="mt-1 h-6 w-6 shrink-0 text-primary" /><div><strong>Email</strong><br /><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="mailto:neurolap.bo@gmail.com">neurolap.bo@gmail.com</a></div></li>
                <li className="flex gap-4 py-4"><Phone aria-hidden className="mt-1 h-6 w-6 shrink-0 text-primary" /><div><strong>Teléfono</strong><br /><a className="inline-flex min-h-11 items-center underline underline-offset-4" href="tel:+59176325490">+591 76325490</a></div></li>
                <li className="flex gap-4 py-4"><MapPin aria-hidden className="mt-1 h-6 w-6 shrink-0 text-primary" /><div><strong>Ubicación</strong><p className="mb-0">La Paz, Bolivia</p></div></li>
                <li className="py-4"><strong>Redes sociales</strong><div className="mt-3 flex gap-4 text-muted-foreground"><span aria-label="Instagram: próximamente" title="Instagram: próximamente"><Instagram aria-hidden /></span><span aria-label="Facebook: próximamente" title="Facebook: próximamente"><Facebook aria-hidden /></span></div><p className="mt-2 text-muted-foreground">Próximamente.</p></li>
              </ul>
            </aside>
          </div>
        </section>
        <section className="bg-secondary py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2>¿Necesitas ayuda urgente?</h2>
            <p>Contáctanos directamente por teléfono</p>
            <Button asChild className="min-h-12 bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              <a href="tel:+59176325490"><Phone aria-hidden className="mr-2 h-5 w-5" />Llamar ahora</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
