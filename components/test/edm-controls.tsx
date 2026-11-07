"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MatrixSelect } from "./components/matrix-select";
import type { EdmItem } from "@/lib/edm/items";
import type { Respuesta } from "@/lib/edm/scoring";

type Props = { item: EdmItem; value: Respuesta; onChange: (v: Respuesta) => void };
type ChecksProps = {
  labels: string[];
  values?: boolean[];
  ayudas?: string[];
  onChange: (v: boolean[]) => void;
  blockId: string;
  active: boolean;
  onActivate: () => void;
};
function FichaRegistro({
  label,
  hint,
  active,
  onClick,
}: {
  label: string;
  hint?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`edm-ficha ${active ? "selected" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      <span>
        {label}
        {hint && <small>Esperado: {hint}</small>}
      </span>
      {active && <Check size={19} aria-hidden="true" />}
    </button>
  );
}
function Checklist({ labels, values, ayudas, onChange, blockId, active, onActivate }: ChecksProps) {
  return (
    <div
      className={`edm-check-block ${active ? "active" : ""}`}
      data-active={active}
      onClickCapture={onActivate}
    >
      <div className="edm-fichas" aria-label={`Registro ${blockId}`}>
        {labels.map((label, i) => (
          <FichaRegistro
            key={`${blockId}-${i}`}
            label={label}
            hint={ayudas?.[i]}
            active={values?.[i] ?? false}
            onClick={() =>
              onChange(labels.map((_, j) => (j === i ? !(values?.[j] ?? false) : (values?.[j] ?? false))))
            }
          />
        ))}
      </div>
      <div className="edm-small-actions">
        <button onClick={() => onChange(labels.map(() => true))}>Marcar todo</button>
        <button onClick={() => onChange(labels.map(() => false))}>Limpiar</button>
        <span>Teclas 1–9 · bloque activo</span>
      </div>
    </div>
  );
}
export function YesNoList({
  labels,
  values,
  onChange,
}: {
  labels: string[];
  values?: (boolean | null)[];
  onChange: (v: (boolean | null)[]) => void;
}) {
  return (
    <div className="edm-yesno-list">
      {labels.map((label, i) => (
        <div className="edm-yesno-row" key={i}>
          <span>{label}</span>
          <div className="edm-segmented" role="group" aria-label={label}>
            {([true, false] as const).map((answer) => (
              <button
                key={String(answer)}
                type="button"
                aria-pressed={values?.[i] === answer}
                className={values?.[i] === answer ? "selected" : ""}
                onClick={() => onChange(labels.map((_, j) => (j === i ? answer : (values?.[j] ?? null))))}
              >
                {answer ? "Sí" : "No"}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
function Series({ item, value, onChange }: Props) {
  const series = item.respuesta.series ?? [];
  let failures = 0;
  let stopped = false;
  return (
    <div className="edm-series">
      {series.map((s, i) => {
        if (i) {
          const previous = value.series?.[i - 1];
          failures = previous === false ? failures + 1 : previous === true ? 0 : failures;
          if (failures >= 3) stopped = true;
        }
        const disabled = stopped;
        return (
          <div className={`edm-series-row ${disabled ? "stopped" : ""}`} key={s}>
            <span>{s}</span>
            <div className="edm-segmented" role="group" aria-label={`Serie ${i + 1}`}>
              {([true, false] as const).map((answer) => (
                <button
                  key={String(answer)}
                  type="button"
                  disabled={disabled}
                  aria-pressed={value.series?.[i] === answer}
                  className={value.series?.[i] === answer ? "selected" : ""}
                  onClick={() =>
                    onChange({
                      ...value,
                      series: series.map((_, j) => (j === i ? answer : (value.series?.[j] ?? null))),
                    })
                  }
                >
                  {answer ? "✓" : "✗"}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      {stopped && <p className="edm-notice">Se cumplió la regla de interrupción (3 fallas seguidas).</p>}
    </div>
  );
}
function Modes({ item, value, onChange, activeBlock, onActivate }: Props & {
  activeBlock: string;
  onActivate: (block: string) => void;
}) {
  const [mode, setMode] = useState<"A" | "B" | "C">("A");
  return (
    <div>
      <div className="edm-mode-tabs" role="tablist" aria-label="Modo de aplicación">
        {(["A", "B", "C"] as const).map((m) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m}
            onClick={() => { setMode(m); onActivate(`modo-${m}`); }}>
            Modo {m}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="edm-mode-panel">
        <p>{mode === "A" ? "Oral" : mode === "B" ? "Con tarjetas" : "Con lápiz y papel"}</p>
        <Checklist
          blockId={`modo-${mode}`}
          active={activeBlock === `modo-${mode}`}
          onActivate={() => onActivate(`modo-${mode}`)}
          labels={item.respuesta.opciones ?? []}
          values={value.modos?.[mode]}
          onChange={(v) => onChange({ ...value, modos: { ...value.modos, [mode]: v } })}
        />
        {mode === "B" &&
          item.estimulos?.imagenes?.map((src, i) => (
            <img key={src} src={src} alt={`Tarjeta ${i + 1}`} className="edm-mode-image" />
          ))}
      </div>
    </div>
  );
}
function Strokes({ value, onChange }: Omit<Props, "item">) {
  return (
    <details className="edm-strokes">
      <summary>Puntuar trazos manualmente</summary>
      <div className="edm-stroke-grid">
        {Array.from({ length: 18 }, (_, i) => (
          <div key={i}>
            <span>Trazo {i + 1}</span>
            <div className="edm-segmented" role="group" aria-label={`Trazo ${i + 1}`}>
              {([0, 1, 2] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={value.trazos?.[i] === n}
                  className={value.trazos?.[i] === n ? "selected" : ""}
                  onClick={() =>
                    onChange({
                      ...value,
                      trazos: Array.from({ length: 18 }, (_, j) =>
                        j === i ? n : (value.trazos?.[j] ?? null),
                      ),
                    })
                  }
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
export function EdmControls({ item, value, onChange }: Props) {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const type = item.respuesta.tipo;
  const labels = item.respuesta.opciones ?? [];
  const firstBlock = type === "dosEnsayos" ? "ensayo-1" :
    type === "interferencia" ? "lectura" : type === "modos" ? "modo-A" : "aciertos";
  const selectedBlock = activeBlock ?? firstBlock;
  const set = (patch: Partial<Respuesta>) => onChange({ ...value, ...patch });
  if (["checklist", "lectura", "redaccion", "semejanzas", "imitacion"].includes(type))
    return (
      <Checklist
        blockId="aciertos"
        active={selectedBlock === "aciertos"}
        onActivate={() => setActiveBlock("aciertos")}
        labels={labels}
        values={value.checks}
        ayudas={item.respuesta.ayudas}
        onChange={(v) => set({ checks: v })}
      />
    );
  if (type === "dosEnsayos")
    return (
      <div className="edm-ensayos">
        {([1, 2] as const).map((n) => (
          <section key={n}>
            <h3>Ensayo {n}</h3>
            <Checklist
              blockId={`ensayo-${n}`}
              active={selectedBlock === `ensayo-${n}`}
              onActivate={() => setActiveBlock(`ensayo-${n}`)}
              labels={labels}
              values={n === 1 ? value.ensayo1 : value.ensayo2}
              onChange={(v) => set(n === 1 ? { ensayo1: v } : { ensayo2: v })}
            />
          </section>
        ))}
      </div>
    );
  if (type === "reconocimiento")
    return <YesNoList labels={labels} values={value.si} onChange={(v) => set({ si: v })} />;
  if (type === "series") return <Series item={item} value={value} onChange={onChange} />;
  if (type === "trazos") return <Strokes value={value} onChange={onChange} />;
  if (type === "modos")
    return <Modes item={item} value={value} onChange={onChange}
      activeBlock={selectedBlock} onActivate={setActiveBlock} />;
  if (type === "matriz")
    return (
      <div className="edm-form-block">
        <MatrixSelect
          imageSrc="/anexo1-response-edm.png"
          targetSrc="/edm/n1-estimulo.png"
          initialSelection={value.matrixIds ?? []}
          onSelect={(ids) => set({ matrixIds: ids, aciertos: undefined })}
        />
        <label>
          Corrección manual de aciertos (0–15; opcional)
          <Input
            type="number"
            min={0}
            max={15}
            value={value.aciertos ?? ""}
            onChange={(e) => set({ aciertos: e.target.value === "" ? undefined : Number(e.target.value) })}
          />
        </label>
      </div>
    );
  if (type === "auditiva")
    return (
      <div className="edm-form-block">
        <p>Ejemplo: {item.respuesta.ejemplo}</p>
        {(["bloqueA", "bloqueB"] as const).map((k) => (
          <section key={k}>
            <h3>Bloque {k === "bloqueA" ? "A" : "B"}</h3>
            <YesNoList labels={item.respuesta[k] ?? []} values={value[k]} onChange={(v) => set({ [k]: v })} />
          </section>
        ))}
      </div>
    );
  if (type === "interferencia")
    return (
      <div className="edm-form-block">
        <label>
          Resultado de 5×4
          <Input value={value.calculo ?? ""} onChange={(e) => set({ calculo: e.target.value })} />
        </label>
        <h3>Lectura en voz alta · casilla 20</h3>
        <Checklist
          blockId="lectura"
          active={selectedBlock === "lectura"}
          onActivate={() => setActiveBlock("lectura")}
          labels={labels}
          values={value.lectura}
          onChange={(v) => set({ lectura: v })}
        />
        <h3>Evocación · casilla 16</h3>
        <Checklist
          blockId="evocacion"
          active={selectedBlock === "evocacion"}
          onActivate={() => setActiveBlock("evocacion")}
          labels={labels}
          values={value.evocacion}
          onChange={(v) => set({ evocacion: v })}
        />
      </div>
    );
  if (type === "fluidez")
    return (
      <div className="edm-fluency">
        {(["animales", "f"] as const).map((k) => (
          <label key={k}>
            {k === "animales" ? "Animales" : "Palabras con F"} · conteo válido
            <Input
              type="number"
              min={0}
              value={value[k] ?? ""}
              onChange={(e) => set({ [k]: e.target.value === "" ? undefined : Number(e.target.value) })}
            />
            Transcripción editable
            <Textarea
              value={k === "animales" ? (value.transcriptAnimales ?? "") : (value.transcriptF ?? "")}
              onChange={(e) =>
                set({ [k === "animales" ? "transcriptAnimales" : "transcriptF"]: e.target.value })
              }
            />
          </label>
        ))}
      </div>
    );
  if (type === "motora")
    return (
      <p>
        Se calcula con los cinco movimientos observados en ítems anteriores.
        {value.movimientos?.some((x) => x === null) ? " Faltan observaciones." : ""}
      </p>
    );
  return null;
}
