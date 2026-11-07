"use client";
import { AD8_ITEMS, CUIDADOR_PREGUNTAS, HISTORIA_PREGUNTAS, puntuarInformante } from "@/lib/informante/scoring";
import type { Ad8Response, InformanteAnswer } from "@/lib/informante/scoring";
import { GDS_ITEMS, puntuarGds } from "@/lib/gds15/scoring";
import type { GdsAnswer } from "@/lib/gds15/scoring";
import { LAWTON_AREAS, puntuarLawton } from "@/lib/lawton/scoring";
import type { LawtonAnswer } from "@/lib/lawton/scoring";

export type EstadoEscala = "pendiente" | "aplicada" | "no_aplicada";
type FormProps<T> = { value: T; onChange: (value: T) => void; estado: EstadoEscala;
  onEstado: (estado: EstadoEscala) => void };
function Estado({ estado, onEstado }: { estado: EstadoEscala; onEstado: (v: EstadoEscala) => void }) {
  return <div className="edm-scale-state" role="group" aria-label="Aplicación de la escala">
    <button type="button" className={estado === "aplicada" ? "selected" : ""}
      aria-pressed={estado === "aplicada"} onClick={() => onEstado("aplicada")}>Aplicar ahora</button>
    <button type="button" className={estado === "no_aplicada" ? "selected" : ""}
      aria-pressed={estado === "no_aplicada"} onClick={() => onEstado("no_aplicada")}>No se aplicó</button>
  </div>;
}
function Choices<T extends string | boolean | number>({ label, name, options, value, onChange }: {
  label: string; name: string; options: readonly (readonly [string, T])[]; value: T | null;
  onChange: (v: T) => void;
}) {
  return <fieldset className="edm-scale-question"><legend>{label}</legend>
    <div className="edm-scale-options">{options.map(([text, option], i) =>
      <label key={i}><input type="radio" name={name} checked={value === option}
        onChange={() => onChange(option)} /><span>{text}</span></label>)}</div>
  </fieldset>;
}
export function InformanteForm({ value, onChange, estado, onEstado }: FormProps<InformanteAnswer>) {
  const total = puntuarInformante(value);
  return <section className="edm-start-panel edm-module-form">
    <p className="edm-kicker">Instrumento complementario · familiar o cuidador</p>
    <h1>Informante: AD8, historia familiar y cuidador</h1>
    <p>Responde alguien que conoce bien a la persona. Considere cambios de los últimos años debidos al razonamiento o la memoria.</p>
    <Estado estado={estado} onEstado={onEstado} />
    {estado === "aplicada" && <>
      <div className="edm-scale-card"><h2>AD8 · cambios observados</h2>
        {AD8_ITEMS.map((q, i) => <Choices key={q} label={`${i + 1}. ${q}`} name={`ad8-${i}`}
          options={[["Sí, ha cambiado", "si"], ["No", "no"], ["No sabe", "no_sabe"]] as const}
          value={value.ad8[i]} onChange={(answer: Ad8Response) => onChange({ ...value,
            ad8: value.ad8.map((v, j) => j === i ? answer : v) })} />)}
        <p className="edm-result"><strong>Total: {total.total}/8.</strong> 2 o más sugiere cambio cognitivo (Galvin 2005). Es información de apoyo.</p>
        <p className="edm-license">AD8 © 2005 Knight Alzheimer’s Disease Research Center, Washington University. Verificar permiso de uso antes de aplicación clínica.</p>
      </div>
      <div className="edm-scale-card"><h2>Historia genealógica</h2><p>Preguntas descriptivas del formulario del equipo. Puede dejar en blanco lo que no sepa.</p>
        {HISTORIA_PREGUNTAS.map(([key, question]) => <label className="edm-scale-text" key={key}>{question}
          <input type="text" value={value.descriptivas[key] ?? ""} onChange={(e) => onChange({ ...value,
            descriptivas: { ...value.descriptivas, [key]: e.target.value } })} /></label>)}</div>
      <div className="edm-scale-card"><h2>Impacto en el cuidador</h2><p>Registro descriptivo sin puntaje.</p>
        {CUIDADOR_PREGUNTAS.map(([key, question]) => <label className="edm-scale-text" key={key}>{question}
          <input type="text" value={value.descriptivas[key] ?? ""} onChange={(e) => onChange({ ...value,
            descriptivas: { ...value.descriptivas, [key]: e.target.value } })} /></label>)}</div>
    </>}
  </section>;
}
export function GdsForm({ value, onChange, estado, onEstado }: FormProps<GdsAnswer>) {
  const total = puntuarGds(value);
  return <section className="edm-start-panel edm-module-form">
    <p className="edm-kicker">Instrumento complementario · responde el paciente</p>
    <h1>GDS-15 · estado de ánimo</h1>
    <p>Responda según cómo se sintió durante la última semana.</p>
    <Estado estado={estado} onEstado={onEstado} />
    {estado === "aplicada" && <div className="edm-scale-card">
      {GDS_ITEMS.map((q, i) => <Choices key={q} label={`${i + 1}. ${q}`} name={`gds-${i}`}
        options={[["Sí", true], ["No", false]] as const} value={value[i]}
        onChange={(answer) => onChange(value.map((v, j) => j === i ? answer : v))} />)}
      <p className="edm-result"><strong>Total: {total.total}/15.</strong> 5 o más sugiere síntomas depresivos; confirmar con entrevista clínica (Sheikh y Yesavage 1986).</p>
    </div>}
  </section>;
}
export function LawtonForm({ value, onChange, estado, onEstado }: FormProps<LawtonAnswer>) {
  const total = puntuarLawton(value);
  return <section className="edm-start-panel edm-module-form">
    <p className="edm-kicker">Instrumento complementario · responde el informante</p>
    <h1>Lawton y Brody · actividades instrumentales</h1>
    <p>Seleccione la opción que mejor describa la capacidad habitual en cada área.</p>
    <Estado estado={estado} onEstado={onEstado} />
    {estado === "aplicada" && <div className="edm-scale-card">
      {LAWTON_AREAS.map((area, i) => <Choices key={area.nombre} label={`${i + 1}. ${area.nombre}`}
        name={`lawton-${i}`} options={area.opciones.map(([label], j) => [label, j] as const)}
        value={value[i]} onChange={(answer) => onChange(value.map((v, j) => j === i ? answer : v))} />)}
      <p className="edm-result"><strong>Total: {total.total}/8.</strong> Más puntos indican mayor autonomía en estas actividades (Lawton y Brody 1969).</p>
    </div>}
  </section>;
}
