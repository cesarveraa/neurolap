import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "NEUROLAP - Portal de Evaluación de Memoria",
  description: "Portal especializado en la evaluación y estimulación de la memoria en Personas Adultas Mayores",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
