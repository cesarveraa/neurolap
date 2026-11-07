"use client";
import { puntuarMmse, mmseFaltantes } from "@/lib/mmse/scoring";
import type { MmseAnswer } from "@/lib/mmse/scoring";

type Props = { value: MmseAnswer; onChange: (value: MmseAnswer) => void };
const objetos = ["Árbol", "Mesa", "Avión"];

function BinaryRows({ labels, values, onChange }: {
  labels: string[]; values: (boolean | null)[];
  onChange: (values: (boolean | null)[]) => void;
}) {
  return <div className="edm-yesno-list">{labels.map((label, index) =>
    <div className="edm-yesno-row" key={label}><span>{label}</span>
      <div className="edm-segmented" role="group" aria-label={label}>
        {([true, false] as const).map((answer) => <button type="button" key={String(answer)}
          aria-pressed={values[index] === answer} className={values[index] === answer ? "selected" : ""}
          onClick={() => onChange(values.map((value, i) => i === index ? answer : value))}>
          {answer ? "Bien" : "Mal"}</button>)}
      </div>
    </div>)}</div>;
}

function TripleRows({ labels, values, onChange }: {
  labels: string[]; values: ("correcto" | "incorrecto" | "nr" | null)[];
  onChange: (values: ("correcto" | "incorrecto" | "nr" | null)[]) => void;
}) {
  return <div className="edm-yesno-list">{labels.map((label, index) =>
    <div className="edm-yesno-row" key={label}><span>{label}</span>
      <div className="edm-segmented" role="group" aria-label={label}>
        {(["correcto", "incorrecto", "nr"] as const).map((answer) =>
          <button type="button" key={answer} aria-pressed={values[index] === answer}
            className={values[index] === answer ? "selected" : ""}
            onClick={() => onChange(values.map((value, i) => i === index ? answer : value))}>
            {answer === "nr" ? "NR" : answer === "correcto" ? "Correcto" : "Incorrecto"}
          </button>)}</div>
    </div>)}</div>;
}

export function MmseForm({ value, onChange }: Props) {
  const result = puntuarMmse(value);
  const set = (patch: Partial<MmseAnswer>) => onChange({ ...value, ...patch });
  return <section className="edm-start-panel edm-module-form">
    <p className="edm-kicker">Instrumento complementario · 19 puntos</p>
    <h1>MMSE modificado</h1>
    <div className="edm-module-rail" aria-label="Progreso MMSE">
      {[value.fecha.every((v) => v !== null), value.objetos.every((v) => v !== null),
        value.digitos.every(Boolean), value.papel.every((v) => v !== null),
        value.recuerdo.every(Boolean), value.copia !== null].map((done, index) =>
        <span key={index} className={done ? "done" : ""} />)}
    </div>
    <div className="edm-module-grid">
      <div className="edm-module-card"><h2>1. Fecha de hoy</h2>
        <p>Sondee el mes, el día del mes, el año y el día de la semana.</p>
        <BinaryRows labels={["Mes", "Día del mes", "Año", "Día de la semana"]}
          values={value.fecha} onChange={(fecha) => set({ fecha })} /></div>
      <div className="edm-module-card"><h2>2. Tres objetos</h2>
        <p><strong>Ahora le voy a nombrar tres objetos. Después de que se los diga, le voy a pedir
          que repita en voz alta los que recuerde, en cualquier orden. Recuerde los objetos porque
          se los voy a preguntar más adelante.</strong></p>
        <p>Lea lentamente, aproximadamente una palabra cada dos segundos. Puntúe el primer intento;
          repita todos los objetos hasta que los aprenda (máximo 5 repeticiones).</p>
        <BinaryRows labels={objetos} values={value.objetos}
          onChange={(objetos) => set({ objetos })} />
        <label>Número de repeticiones (máximo 5)<input type="number" min={0} max={5}
          value={value.repeticiones ?? ""}
          onChange={(event) => set({ repeticiones: event.target.value === "" ? null :
            Math.min(5, Math.max(0, Number(event.target.value))) })} /></label></div>
      <div className="edm-module-card"><h2>3. Números al revés</h2>
        <p>Diga <strong>1 3 5 7 9</strong>. Respuesta correcta: <strong>9 7 5 3 1</strong>.</p>
        <div className="edm-digit-row">{value.digitos.map((digit, index) =>
          <label key={index}>Dígito {index + 1}<input inputMode="numeric" maxLength={1}
            value={digit} onChange={(event) => set({ digitos: value.digitos.map((item, i) =>
              i === index ? event.target.value.replace(/\D/g, "") : item) })} /></label>)}</div></div>
      <div className="edm-module-card"><h2>4. Papel</h2>
        <p><strong>Tómelo con su mano derecha, dóblelo por la mitad con ambas manos y colóquelo
          sobre sus piernas.</strong></p>
        <BinaryRows labels={["Toma con la mano derecha", "Dobla con ambas manos",
          "Coloca sobre las piernas"]} values={value.papel}
          onChange={(papel) => set({ papel })} /></div>
      <div className="edm-module-card"><h2>5. Recuerdo de los objetos</h2>
        <p>Por favor, dígame ahora cuáles recuerda.</p>
        <TripleRows labels={objetos} values={value.recuerdo}
          onChange={(recuerdo) => set({ recuerdo })} /></div>
      <div className="edm-module-card"><h2>6. Copia de dos círculos</h2>
        <p>Muestre el dibujo. Es correcto si las figuras se cruzan sin pasar de la mitad.</p>
        <svg className="edm-circles" viewBox="0 0 220 120" role="img"
          aria-label="Dos círculos entrelazados"><circle cx="85" cy="60" r="42" />
          <circle cx="135" cy="60" r="42" /></svg>
        <div className="edm-segmented" role="group" aria-label="Copia de círculos">
          {(["correcto", "incorrecto", "nr"] as const).map((answer) =>
            <button key={answer} type="button" aria-pressed={value.copia === answer}
              className={value.copia === answer ? "selected" : ""}
              onClick={() => set({ copia: answer })}>
              {answer === "nr" ? "NR" : answer === "correcto" ? "Correcto" : "Incorrecto"}
            </button>)}</div>
        <label>Foto de la hoja (opcional; máximo 1 MB)<input type="file" accept="image/*"
          onChange={(event) => { const file = event.target.files?.[0];
            if (!file) return;
            if (file.size > 1_000_000) { event.target.value = ""; return; }
            const reader = new FileReader();
            reader.onload = () => set({ foto: String(reader.result) });
            reader.readAsDataURL(file);
          }} /></label>
        {value.foto && <img className="edm-mmse-photo" src={value.foto} alt="Hoja MMSE adjunta" />}
      </div>
    </div>
    <p className="edm-result"><strong>Total: {result.total}/19.</strong> {result.completo ?
      result.interpretacion : `Para interpretar y continuar falta: ${mmseFaltantes(value).join(", ")}.`}</p>
  </section>;
}
