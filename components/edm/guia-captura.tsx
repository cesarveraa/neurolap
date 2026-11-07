import { Camera, Focus, Lightbulb, Mic, MoveHorizontal, Video } from "lucide-react";
import { useState } from "react";
import { AnimacionCaptura } from "./animacion-captura";

const guides = {
  dibujo: [
    [Camera, "La hoja entera dentro de la foto, con un poco de mesa alrededor"],
    [MoveHorizontal, "Teléfono paralelo a la hoja, de frente (no inclinado)"],
    [Lightbulb, "Luz pareja: sin la sombra del teléfono ni flash"],
    [Focus, "Toque la pantalla para enfocar y sostenga firme"],
    [Focus, "Sin zoom"],
  ],
  video: [
    [Video, "Persona sentada frente a la mesa, centrada"],
    [Video, "Ambas manos y antebrazos a la vista todo el tiempo"],
    [Camera, "Cámara fija a ~1 m, a la altura del pecho"],
    [Mic, "Mesa sin mantel: los golpes deben escucharse"],
    [Lightbulb, "Buena luz y cuarto silencioso"],
    [Video, "Grabe los 3 intentos con cada mano"],
  ],
  fluidez: [
    [Mic, "Cuarto silencioso, sin TV ni conversaciones"],
    [Mic, "Teléfono a ~30 cm de la persona"],
    [Mic, "Grabe directo en este dispositivo (no audios reenviados ni llamadas)"],
    [Mic, "El evaluador no habla durante el minuto"],
  ],
} as const;

export function GuiaCaptura({ tipo, open }: {
  tipo: keyof typeof guides;
  open: boolean;
}) {
  const [expanded, setExpanded] = useState(open);
  return <details key={`${tipo}-${open}`} open={open} onToggle={(event) => setExpanded(event.currentTarget.open)} className="edm-capture-guide">
    <summary>Guía para {tipo === "dibujo" ? "la foto" : tipo === "video" ? "el video" : "el audio"}</summary>
    {expanded && <AnimacionCaptura tipo={tipo} />}
    <ul>
      {guides[tipo].map(([Icon, label]) => <li key={label}>
        <Icon size={18} aria-hidden="true" />
        <span>{label}</span>
      </li>)}
    </ul>
  </details>;
}
