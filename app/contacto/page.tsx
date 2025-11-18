"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"  
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react"
import { useState } from "react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio"
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio"
    if (!formData.asunto.trim()) newErrors.asunto = "El asunto es obligatorio"
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es obligatorio"

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log("Form submitted:", formData)
      // Reset form
      setFormData({ nombre: "", email: "", asunto: "", mensaje: "" })
      alert("Mensaje enviado correctamente. Te contactaremos pronto.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      {/* decor blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-floatSlow" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-floatSlow [animation-delay:300ms]" />

      {/* Section Header */}
      <section className="section-spacing bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-balance animate-fadeInUp">Contáctanos</h1>

            {/* subrayado animado */}
            <span
              aria-hidden
              className="mt-2 inline-block h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent animate-stretchX"
            />

            <p className="text-lg text-muted-foreground mt-4 animate-fadeInUp [animation-delay:120ms]">
              Estamos aquí para ayudarte y responder tus consultas
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing-alt relative z-10">
        {/* retícula muy tenue */}
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary.DEFAULT)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="order-2 lg:order-1 animate-fadeInLeft">
                <Card className="shadow-warm hover:shadow-warm-lg transition-shadow">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-primary">Envíanos un mensaje</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="group">
                        <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                          Nombre completo *
                        </label>
                        <Input
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className={`${errors.nombre ? "border-destructive animate-shake" : ""} transition-shadow focus-visible:shadow-input-focus`}
                          placeholder="Tu nombre completo"
                        />
                        {errors.nombre && <p className="text-destructive text-sm mt-1">{errors.nombre}</p>}
                      </div>

                      <div className="group">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`${errors.email ? "border-destructive animate-shake" : ""} transition-shadow focus-visible:shadow-input-focus`}
                          placeholder="tu@email.com"
                        />
                        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div className="group">
                        <label htmlFor="asunto" className="block text-sm font-medium mb-2">
                          Asunto *
                        </label>
                        <Input
                          id="asunto"
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleChange}
                          className={`${errors.asunto ? "border-destructive animate-shake" : ""} transition-shadow focus-visible:shadow-input-focus`}
                          placeholder="¿En qué podemos ayudarte?"
                        />
                        {errors.asunto && <p className="text-destructive text-sm mt-1">{errors.asunto}</p>}
                      </div>

                      <div className="group">
                        <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
                          Mensaje *
                        </label>
                        <Textarea
                          id="mensaje"
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          className={`${errors.mensaje ? "border-destructive animate-shake" : ""} transition-shadow focus-visible:shadow-input-focus`}
                          placeholder="Cuéntanos más detalles sobre tu consulta..."
                          rows={5}
                        />
                        {errors.mensaje && <p className="text-destructive text-sm mt-1">{errors.mensaje}</p>}
                      </div>

                      <Button type="submit" className="w-full btn-dark animate-pulseGlow">
                        Enviar mensaje
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="order-1 lg:order-2 space-y-6 animate-fadeInRight">
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-primary">Información de contacto</h2>
                  <div className="space-y-4">
                    <Card className="shadow-warm hover:-translate-y-0.5 hover:shadow-warm-lg transition-all">
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <p className="text-muted-foreground">neurolap.bo@gmail.com</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-warm hover:-translate-y-0.5 hover:shadow-warm-lg transition-all">
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Teléfono</h3>
                          <p className="text-muted-foreground">+591 76325490</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-warm hover:-translate-y-0.5 hover:shadow-warm-lg transition-all">
                      <CardContent className="p-4 flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Ubicación</h3>
                          <p className="text-muted-foreground">La Paz, Bolivia</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-warm hover:-translate-y-0.5 hover:shadow-warm-lg transition-all">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-3">Redes sociales</h3>
                        <div className="flex space-x-4">
                          <a href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                            <Instagram className="w-5 h-5 text-primary" />
                          </a>
                          <a href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                            <Facebook className="w-5 h-5 text-primary" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Map Placeholder */}
                <Card className="shadow-warm hover:shadow-warm-lg transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Ubicación</h3>
                    <div className="bg-muted rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
                      {/* shimmer sutil */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                      <p className="text-muted-foreground relative z-10">Mapa de ubicación</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Banner */}
      <section className="section-spacing relative z-10" style={{ backgroundColor: "#EED3BE" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 animate-fadeInUp" style={{ color: "#5E2129" }}>
              ¿Necesitas ayuda urgente?
            </h2>
            <p className="text-lg mb-6 animate-fadeInUp [animation-delay:120ms]" style={{ color: "#5E2129" }}>
              Contáctanos directamente por teléfono
            </p>
            <a href="tel:+59176325490">
              <Button className="btn-dark hover:-translate-y-0.5 transition-transform">
                <Phone className="w-4 h-4 mr-2" />
                Llamar ahora
              </Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
