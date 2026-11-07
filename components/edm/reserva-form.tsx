"use client";
import { RESERVA_ITEMS, resumirReserva } from "@/lib/reserva-cognitiva/items";
import type { ReservaAnswer } from "@/lib/reserva-cognitiva/items";

export function ReservaForm({ value, onChange }: {
  value: ReservaAnswer;
  onChange: (value: ReservaAnswer) => void;
}) {
  const result = resumirReserva(value);
  return <section className="edm-start-panel edm-module-form">
    <p className="edm-kicker">Instrumento complementario · EQUILAM</p>
    <h1>Escala de Reserva Cognitiva</h1>
    <p>¿Con qué frecuencia realizo cada una de las siguientes actividades?</p>
    <p>1 = Sí · 2 = A veces · 3 = No</p>
    <div className="edm-module-rail" aria-label="Progreso de reserva cognitiva">
      {RESERVA_ITEMS.map((_, index) => <span key={index}
        className={value[index] !== null && value[index] !== undefined ? "done" : ""} />)}
    </div>
    <div className="edm-reserva-list">{RESERVA_ITEMS.map((item, index) =>
      <div className="edm-yesno-row" key={item}>
        <span><strong>{index + 1}.</strong> {item}</span>
        <div className="edm-segmented" role="group" aria-label={`Pregunta ${index + 1}`}>
          {([1, 2, 3] as const).map((code) => <button key={code} type="button"
            aria-pressed={value[index] === code} className={value[index] === code ? "selected" : ""}
            onClick={() => onChange(RESERVA_ITEMS.map((_, i) => i === index ? code : value[i] ?? null))}>
            {code === 1 ? "Sí" : code === 2 ? "A veces" : "No"}</button>)}
        </div>
      </div>)}</div>
    <p className="edm-result"><strong>Total de códigos: {result.total}</strong>
      {" "}· Actividades “Sí”: {result.si}
      <br />Interpretación pendiente de validación clínica</p>
  </section>;
}
