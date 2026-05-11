# 🧠 Neurolap – Portal de Investigación y Apoyo en Neuropsicología del Envejecimiento

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Neurolap** es una plataforma web integral diseñada para la **neuropsicología del envejecimiento**. Su objetivo principal es facilitar la detección temprana del deterioro cognitivo y centralizar recursos científicos para Personas Adultas Mayores (PAM), sus familias, cuidadores y profesionales de la salud.

---

## 🌟 Características Principales

### 📚 Secciones Informativas
* **Investigación Científica:** Repositorio de avances y estudios en neuropsicología.
* **Envejecimiento:** Diferenciación entre procesos normales y patológicos.
* **Reserva Cognitiva:** Información sobre deterioro cognitivo y factores protectores.
* **Calidad de Vida:** Recursos para el bienestar integral en la tercera edad.
* **Procesos de Memoria:** Análisis de tipos de memoria y sus cambios con la edad.

### 🔬 Herramientas de Evaluación
* **EDM (Evaluación Diferencial de la Memoria):** Implementación digital de protocolos de evaluación para una detección precisa.

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **Next.js 14** | Framework React con App Router y soporte para SSR/ISR. |
| **React** | Biblioteca principal para la interfaz de usuario. |
| **TailwindCSS** | Estilizado basado en utilidades para un diseño responsivo. |
| **shadcn/ui** | Set de componentes accesibles y con diseño moderno. |
| **Lucide Icons** | Iconografía minimalista y escalable. |
| **TypeScript** | Tipado estático para asegurar la robustez del código. |


## 📂 Estructura del Proyecto

neurolap-frontend/
├── app/                  # Rutas y lógica de páginas (App Router)
│   ├── ayuda/            # Soporte segmentado por perfiles
│   ├── contacto/         # Formulario de comunicación directa
│   ├── investigacion/    # Portal de artículos científicos
│   ├── quienes-somos/    # Misión, visión e información institucional
│   ├── servicios/        # Catálogo de servicios profesionales
│   ├── test-edm/         # Módulo de Evaluación Diferencial de la Memoria
│   ├── globals.css       # Configuración de estilos globales
│   ├── layout.tsx        # Estructura base de la aplicación
│   └── page.tsx          # Landing page principal
├── components/           # Componentes UI reutilizables (Navbar, Footer, Cards)
├── lib/                  # Utilidades, constantes y funciones auxiliares
├── public/               # Recursos estáticos (Imágenes, SVGs, PDF)
├── styles/               # Definiciones de temas y estilos adicionales
├── components.json       # Configuración de shadcn/ui
├── next.config.mjs       # Configuración del framework
└── tsconfig.json         # Configuración del compilador TypeScript

🚀 Instalación y Desarrollo
Sigue estos pasos para levantar el proyecto localmente:

Clonar el repositorio:

Bash
git clone [https://github.com/tuusuario/neurolap-portal.git](https://github.com/tuusuario/neurolap-portal.git)
cd neurolap-portal
Instalar dependencias:

Bash
npm install
# o si usas pnpm
pnpm install
Ejecutar servidor de desarrollo:

Bash
npm run dev
La aplicación estará disponible en http://localhost:3000.

Construir para producción:

Bash
npm run build
npm run start
📄 Licencia
Este proyecto se distribuye bajo la Licencia MIT. Siéntete libre de usarlo, modificarlo y distribuirlo, acreditando siempre la autoría original.
