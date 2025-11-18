"use client"

import Image from "next/image"
import EdmRegistrationForm from "@/components/forms/edm-registration-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function RegistroEdmPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Ornamentos flotantes suaves */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-20 h-56 w-56 rounded-full bg-accent/15 blur-2xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 -right-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float-rev"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-1/3 h-40 w-40 rounded-full bg-accent/10 blur-2xl animate-float-slow"
      />

      {/* Main */}
      <main className="min-h-[calc(100vh-120px)]">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Encabezado */}
          <div className="max-w-xl mb-10 animate-fadeInUp">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              ¡Inicia tu proceso de Evaluación!
            </h1>
            <span className="mt-2 block h-1 w-24 bg-[var(--color-accent)] rounded-full animate-underlineGrow" />
            <p className="text-muted-foreground mt-2">
              Registra los siguientes datos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Imagen a la izquierda */}
            <div className="relative w-full h-[520px] md:h-[640px] lg:h-[700px] rounded-xl overflow-hidden shadow-2xl animate-reveal card-lift">
              <Image
                src="/registro.jpg"
                alt="Adulto mayor iniciando registro para evaluación"
                fill
                className="object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
                priority
              />
              {/* Filtro sutil arriba para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/10 pointer-events-none" />
            </div>

            {/* Formulario a la derecha */}
            <div className="max-w-xl w-full animate-fadeInUp delay-150">
              <EdmRegistrationForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
