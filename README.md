# Neurolap · Portal de neuropsicología del envejecimiento

Plataforma web hecha en Bolivia para la **detección temprana de alteraciones de la memoria** en Personas Adultas Mayores
(PAM): la **Evaluación Diferencial de la Memoria (EDM 2023)** en formato digital, con IA de apoyo, y recursos para
familias, cuidadores y profesionales. La IA sugiere; el resultado lo decide siempre el evaluador.

## Funciones

**Evaluación EDM 2023** (`/test-edm`)
- Asistente paso a paso con consentimiento, datos del paciente (edad calculada, idiomas de Bolivia, escolaridad, etc.),
  MMSE modificado y cuestionario de reserva cognitiva.
- Registro de cada ítem y **hoja oficial de resultados** con los colores del EDM, más un **informe en PDF**.
- **IA de apoyo** (API en [Nuerolap/NEUROLAP_Vision_Artificial](https://github.com/Nuerolap/NEUROLAP_Vision_Artificial)):
  - video de puño–filo–palma (ítem 27);
  - foto de la figura de Rey (ítems 11 y 13);
  - fluidez verbal (ítem 18), con conteo y análisis cualitativo: agrupamientos, cambios y ritmo cada 15 s.
- **Guías de captura animadas** para la foto, el video y el audio, y un aviso para repetir la captura si sale mal tomada.
- **Escalas complementarias** opcionales, que no forman parte del EDM 2023:
  - informante (AD8, antecedentes familiares y cuidador);
  - GDS-15;
  - Lawton y Brody.
- El borrador se guarda **solo en el navegador** (`localStorage`). No hay servidor de datos todavía: el registro y el inicio
  de sesión están marcados como "Próximamente".

**Secciones informativas**: memoria, deterioro cognitivo, reserva cognitiva, envejecimiento normal y patológico, calidad
de vida de las PAM y servicios (evaluación, estimulación y capacitación de cuidadores).

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · shadcn/ui · Lucide · jsPDF + html2canvas.
Letra Atkinson Hyperlegible, pensada para baja visión.

## Desarrollo

```bash
npm install
npm run dev                                   # http://localhost:3000
NEXT_PUBLIC_AI_API=http://localhost:8000 npm run dev   # URL de la API de IA (por defecto localhost:8000)
node --test $(find lib -name '*.test.ts')     # pruebas de puntajes (EDM, MMSE, AD8, GDS-15, Lawton, fluidez)
npm run build && npm run start                # producción
```

## Estructura

```
app/                  páginas (inicio, servicios, investigación, test-edm, contacto…)
components/test/      asistente EDM, controles de registro e informe
components/edm/       tarjetas de IA, guías animadas, escalas complementarias, hoja oficial
lib/edm/              ítems, puntajes y cliente de la API de IA
lib/{mmse,informante,gds15,lawton}/   puntaje de cada escala, con pruebas
public/edm/           láminas de estímulo del EDM
```

## Despliegue

Imagen Docker de Next.js, servida junto a la API detrás de Caddy (`/ia/*` va a la API y el resto a la web) en el
servidor del equipo.

## Licencia

El código se distribuye bajo la licencia MIT. Las láminas e ítems del EDM 2023 pertenecen a sus autores, y el MMSE y el
AD8 tienen sus propios derechos: no están cubiertos por la licencia MIT.
