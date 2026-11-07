"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MonitorPlay } from "lucide-react";
import { EDM_ITEMS } from "@/lib/edm/items";
import type { Color, EdmItem } from "@/lib/edm/items";
import { puntuarItem } from "@/lib/edm/scoring";
import type { Respuesta } from "@/lib/edm/scoring";
import { EdmControls, YesNoList } from "./edm-controls";
import { TestResults } from "./test-results";
import { RielProgreso, ListaItems, nombresColor } from "@/components/edm/riel-progreso";
import { ModoPresentador } from "@/components/edm/modo-presentador";
import { TarjetaSugerenciaIA } from "@/components/edm/tarjeta-sugerencia-ia";
import { ResumenReyIA } from "@/components/edm/evidencia-rey-ia";
import type { DrawingSuggestion } from "@/lib/edm/ai-client";
import { CamposPaciente, type Paciente } from "@/components/edm/campos-paciente";
import { calcularEdad } from "@/lib/edm/paciente";
import { ConsentimientoForm } from "@/components/edm/consentimiento";
import type { Consentimiento } from "@/components/edm/consentimiento";
import { MmseForm } from "@/components/edm/mmse-form";
import { ReservaForm } from "@/components/edm/reserva-form";
import { emptyMmse, mmseFaltantes, puntuarMmse } from "@/lib/mmse/scoring";
import type { MmseAnswer } from "@/lib/mmse/scoring";
import { RESERVA_ITEMS, resumirReserva } from "@/lib/reserva-cognitiva/items";
import type { ReservaAnswer } from "@/lib/reserva-cognitiva/items";
import { InformanteForm, GdsForm, LawtonForm } from "@/components/edm/escalas-complementarias-form";
import type { EstadoEscala } from "@/components/edm/escalas-complementarias-form";
import { emptyInformante, informanteFaltantes, puntuarInformante } from "@/lib/informante/scoring";
import type { InformanteAnswer } from "@/lib/informante/scoring";
import { emptyGds, gdsFaltantes, puntuarGds } from "@/lib/gds15/scoring";
import type { GdsAnswer } from "@/lib/gds15/scoring";
import { emptyLawton, lawtonFaltantes, puntuarLawton } from "@/lib/lawton/scoring";
import type { LawtonAnswer } from "@/lib/lawton/scoring";

export const ENABLE_TTS = false;
export function leerConsigna(texto: string) {
  if (!ENABLE_TTS || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const mensaje = new SpeechSynthesisUtterance(texto);
  mensaje.lang = "es-ES";
  window.speechSynthesis.speak(mensaje);
}
export type Draft = {
  patient: Paciente;
  step: number;
  modules: { mmse: boolean; reserva: boolean };
  consent: Consentimiento;
  mmse: MmseAnswer;
  reserva: ReservaAnswer;
  escalas: { informante: EstadoEscala; gds: EstadoEscala; lawton: EstadoEscala };
  informante: InformanteAnswer;
  gds: GdsAnswer;
  lawton: LawtonAnswer;
  answers: Record<number, Respuesta>;
  reySuggestions: Partial<Record<"copia" | "memoria", DrawingSuggestion>>;
  finalNotes: { cognitivo: string; emocional: string; conductual: string };
  complete: boolean;
};
const hoy = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
const empty: Draft = {
  patient: {
    paciente: "",
    edad: "",
    sexo: "",
    escolaridad: "",
    aniosEstudio: "",
    lugar: "",
    fecha: hoy(),
    evaluador: "",
    fechaNacimiento: "", lugarNacimiento: "", manoEscritura: "", profesion: "",
    ocupacion: "", estadoCivil: "", hijos: "", idiomaMaterno: "", otrosIdiomas: "",
    convivencia: "", antecedentes: "", medicacion: "", dificultadesMemoria: "",
  },
  step: -2,
  modules: { mmse: false, reserva: false },
  consent: { acepta: false, nombre: "", relacion: "", fecha: hoy() },
  mmse: emptyMmse,
  reserva: Array(24).fill(null),
  escalas: { informante: "pendiente", gds: "pendiente", lawton: "pendiente" },
  informante: emptyInformante,
  gds: emptyGds,
  lawton: emptyLawton,
  answers: {},
  reySuggestions: {},
  finalNotes: { cognitivo: "", emocional: "", conductual: "" },
  complete: false,
};
const storageKey = "edm-2023-draft-v1";
const systemNames = {
  episodica: "Episódica",
  operativa: "Operativa",
  semantica: "Semántica",
  procesual: "Procesual",
};
function initializeFichas(item: EdmItem, value: Respuesta): Respuesta {
  const labels = item.respuesta.opciones ?? [];
  const blank = () => labels.map(() => false);
  const type = item.respuesta.tipo;
  if (["checklist", "lectura", "redaccion", "semejanzas", "imitacion"].includes(type))
    return { ...value, checks: value.checks ?? blank() };
  if (type === "dosEnsayos")
    return { ...value, ensayo1: value.ensayo1 ?? blank(), ensayo2: value.ensayo2 ?? blank() };
  if (type === "interferencia")
    return { ...value, lectura: value.lectura ?? blank(), evocacion: value.evocacion ?? blank() };
  if (type === "modos")
    return {
      ...value,
      modos: {
        A: value.modos?.A ?? blank(),
        B: value.modos?.B ?? blank(),
        C: value.modos?.C ?? blank(),
      },
    };
  return value;
}
function Resultado({
  color,
  puntaje,
  max,
  detalle,
}: {
  color: Color | null;
  puntaje: number | null;
  max: number;
  detalle?: string;
}) {
  return (
    <div className="edm-result" aria-live="polite">
      <div>
        <strong>Resultado</strong>
        <span className="edm-result-score">
          {puntaje === null ? (color ? "Sin puntaje" : "Pendiente") : `${puntaje} / ${max}`}
        </span>
        <span className={`edm-chip ${color ?? "pendiente"}`}>
          {color ? nombresColor[color] : "Pendiente"}
        </span>
      </div>
      {detalle && <small>{detalle}</small>}
    </div>
  );
}
export function EdmWizard() {
  const [draft, setDraft] = useState<Draft>(empty);
  const [loaded, setLoaded] = useState(false);
  const [savedPulse, setSavedPulse] = useState(false);
  const [presenter, setPresenter] = useState<{ src: string; seconds?: number; lamina?: string } | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const stored = JSON.parse(saved) as Partial<Draft>;
        setDraft({ ...empty, ...stored, patient: { ...empty.patient, ...stored.patient,
            edad: stored.patient?.fechaNacimiento ? calcularEdad(stored.patient.fechaNacimiento, stored.patient.fecha ?? empty.patient.fecha) : stored.patient?.edad ?? "" },
          modules: { ...empty.modules, ...stored.modules },
          consent: { ...empty.consent, ...stored.consent },
          mmse: { ...empty.mmse, ...stored.mmse }, reserva: stored.reserva ?? empty.reserva,
          escalas: { ...empty.escalas, ...stored.escalas },
          informante: { ...emptyInformante, ...stored.informante,
            ad8: stored.informante?.ad8 ?? emptyInformante.ad8,
            descriptivas: stored.informante?.descriptivas ?? {} },
          gds: stored.gds ?? emptyGds, lawton: stored.lawton ?? emptyLawton,
          reySuggestions: stored.reySuggestions ?? {},
          step: stored.consent?.acepta ? (stored.step === 29 && !stored.escalas ? 32 : stored.step ?? -2) : -1,
          complete: Boolean(stored.consent?.acepta && stored.complete) });
      }
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(draft));
      setSavedPulse(true);
    } catch {
      setSavedPulse(false);
      setMessage("No se pudo guardar el borrador. Revise el espacio disponible.");
    }
    const timer = window.setTimeout(() => setSavedPulse(false), 650);
    return () => window.clearTimeout(timer);
  }, [draft, loaded]);
  const item = EDM_ITEMS[draft.step - 1];
  const answers = draft.answers;
  const movements = [12, 19, 20, 21, 22].map((n) => answers[n]?.movimientos?.[0] ?? null);
  const current: Respuesta = item
    ? item.orden === 26
      ? { ...answers[26], movimientos: movements }
      : (answers[item.orden] ?? {})
    : {};
  const result = item ? puntuarItem(item, current) : null;
  const colors = EDM_ITEMS.map(
    (it) => puntuarItem(it, it.orden === 26 ? { movimientos: movements } : answers[it.orden]).color,
  );
  const allComplete = colors.every(Boolean) && movements.every((x) => x !== null);
  const edadActual = draft.patient.fechaNacimiento ? calcularEdad(draft.patient.fechaNacimiento, draft.patient.fecha) : draft.patient.edad.trim();
  const edadValida = Number.isInteger(Number(edadActual)) && Number(edadActual) >= 18 && Number(edadActual) <= 110;
  const patientOk =
    draft.patient.paciente.trim() &&
    draft.patient.evaluador.trim() &&
    edadValida &&
    draft.patient.fecha && draft.patient.escolaridad.trim();
  const consentOk = draft.consent.acepta && draft.consent.nombre.trim() &&
    draft.consent.relacion && draft.consent.fecha;
  const nextStep = (step: number) => step === -2 ? -1 : step === -1 ? 0 :
    step === 0 ? (draft.modules.mmse ? 0.5 : 1) : step === 0.5 ? 1 :
    step === 27 ? (draft.modules.reserva ? 28 : 29) : step === 28 ? 29 : step + 1;
  const previousStep = (step: number) => step === 29 ? (draft.modules.reserva ? 28 : 27) :
    step === 28 ? 27 : step === 1 ? (draft.modules.mmse ? 0.5 : 0) :
    step === 0.5 ? 0 : step - 1;
  const move = (step: number) => {
    if (step >= 0 && !consentOk) return;
    if (step > 0 && !patientOk) return;
    setDirection(step < draft.step ? "previous" : "next");
    setDraft((d) => ({ ...d, step }));
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const update = (order: number, value: Respuesta) =>
    setDraft((d) => ({ ...d, answers: { ...d.answers, [order]: value } }));
  const setAnswer = (value: Respuesta) => {
    if (!item) return;
    update(item.orden, {
      ...initializeFichas(item, value),
      fuente: current.fuente === "ia_aceptada" ? "ia_editada" : (value.fuente ?? "manual"),
    });
  };
  const acceptAi = (patch: Partial<Respuesta>) => {
    if (item) update(item.orden, { ...current, ...patch, fuente: "ia_aceptada" });
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        presenter ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.repeat ||
        document.querySelector('[role="dialog"], [aria-modal="true"]') ||
        (e.target instanceof HTMLElement &&
          (e.target.isContentEditable ||
            Boolean(e.target.closest("input, textarea, select, [contenteditable]"))))
      )
        return;
      if (/^[1-9]$/.test(e.key) && item) {
        const block = document.querySelector<HTMLElement>(
          ".edm-record .edm-check-block[data-active='true']",
        );
        const ficha = block?.querySelectorAll<HTMLButtonElement>(".edm-ficha")[Number(e.key) - 1];
        if (ficha) {
          e.preventDefault();
          ficha.click();
        }
        return;
      }
      if (e.key === "Enter" && e.target instanceof HTMLButtonElement) return;
      if (e.key === "ArrowLeft" && draft.step >= -1) {
        e.preventDefault();
        move(previousStep(draft.step));
      }
      if ((e.key === "ArrowRight" || e.key === "Enter") && item) {
        e.preventDefault();
        move(nextStep(draft.step));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.step, presenter, item, draft.modules, patientOk, consentOk]);
  if (!loaded) return <p className="edm-loading">Cargando borrador…</p>;
  if (draft.complete)
    return (
      <div className="edm-tool">
        <TestResults draft={draft} onBack={() => setDraft((d) => ({ ...d, complete: false }))} />
      </div>
    );
  return (
    <div className="edm-tool">
      <header className="edm-session-header">
        <div className="edm-session-line">
          <strong>EDM 2023</strong>
          <span>
            {draft.patient.paciente || "Paciente sin identificar"}
            {draft.patient.edad ? ` · ${draft.patient.edad} años` : ""}
            {draft.patient.evaluador ? ` · ${draft.patient.evaluador}` : ""}
          </span>
          <span className={`edm-saved ${savedPulse ? "pulse" : ""}`} role="status">
            <Check size={16} /> {message.startsWith("No se pudo guardar") ? "Sin guardar" : "Guardado"}
          </span>
          {draft.step > 0 && <ListaItems
            actual={draft.step}
            colores={colors}
            irA={(n) => {
              if (patientOk && consentOk) move(n);
            }}
          />}
        </div>
        {draft.step > 0 && <RielProgreso
          actual={draft.step}
          colores={colors}
          irA={(n) => {
            if (patientOk && consentOk) move(n);
          }}
        />}
      </header>
      <div key={draft.step} className={`edm-step edm-enter-${direction}`}>
        {draft.step === -2 ? (
          <section className="edm-start-panel">
            <p className="edm-kicker">Nueva evaluación</p>
            <h1>EDM 2023 e instrumentos complementarios</h1>
            <p>Seleccione los instrumentos que aplicará además del EDM.</p>
            <div className="edm-module-choice">
              {(["mmse", "reserva"] as const).map((key) => <label key={key}>
                <input type="checkbox" checked={draft.modules[key]}
                  onChange={(event) => setDraft((d) => ({ ...d, modules: {
                    ...d.modules, [key]: event.target.checked } }))} />
                {key === "mmse" ? "MMSE modificado" : "Escala de Reserva Cognitiva — EQUILAM"}
              </label>)}
            </div>
            <button className="edm-primary" onClick={() => move(-1)}>Continuar al consentimiento</button>
          </section>
        ) : draft.step === -1 ? (
          <ConsentimientoForm value={draft.consent}
            onChange={(consent) => setDraft((d) => ({ ...d, consent }))} />
        ) : draft.step === 0 ? (
          <section className="edm-start-panel">
            <p className="edm-kicker">Antes de comenzar</p>
            <h1>Datos de la evaluación</h1>
            <p>Complete los datos necesarios para identificar este registro.</p>
            <CamposPaciente value={draft.patient} onChange={(patient) => setDraft((d) => ({ ...d, patient }))} />
            <button className="edm-primary" disabled={!patientOk} onClick={() => move(nextStep(0))}>
              Comenzar evaluación
            </button>
          </section>
        ) : draft.step === 0.5 ? (
          <MmseForm value={draft.mmse} onChange={(mmse) => setDraft((d) => ({ ...d, mmse }))} />
        ) : item ? (
          <div className="edm-workspace">
            <section className="edm-protocol" aria-labelledby="edm-item-title">
              <div className="edm-item-index">
                Ítem {item.orden} de 27 <span>Casilla {item.casillas.join(" y ")}</span>
              </div>
              <h1 id="edm-item-title">{item.nombre}</h1>
              <p className="edm-path">
                Memoria {systemNames[item.sistema]} › {item.dimension} › {item.habilidad}
              </p>
              <div className="edm-instruction">
                <h2>Qué hace el evaluador</h2>
                <p>{item.instruccionEvaluador}</p>
              </div>
              <div className="edm-consigna">
                <h2>Consigna para el paciente</h2>
                <blockquote>{item.consigna || "Este ítem se calcula con registros anteriores."}</blockquote>
              </div>
              {item.estimulos?.imagen && (
                <button
                  className="edm-present-button"
                  onClick={() =>
                    setPresenter({
                      src: item.estimulos!.imagen!,
                      seconds: item.estimulos!.segundos,
                      lamina: item.orden === 6 ? item.estimulos!.imagenes?.[0] : undefined,
                    })
                  }
                >
                  <MonitorPlay size={20} /> Mostrar al paciente
                  {item.estimulos.segundos ? ` · ${item.estimulos.segundos} s` : ""}
                </button>
              )}
              {item.estimulos?.imagenes && item.orden !== 6 && (
                <div className="edm-extra-stimuli">
                  {item.estimulos.imagenes.map((src, i) => (
                    <button key={src} onClick={() => setPresenter({ src })}>
                      Mostrar lámina {i + 1}
                    </button>
                  ))}
                </div>
              )}
              {(item.estimulos?.imagen || item.estimulos?.imagenes) && (
                <div className={item.estimulos.imagenes?.length === 8
                  ? "edm-stimulus-grid" : "edm-stimulus-gallery"}>
                  {item.estimulos.imagen && (
                    <figure className="edm-stimulus-cell">
                      <img src={item.estimulos.imagen} alt={`Estímulo de ${item.nombre}`} />
                    </figure>
                  )}
                  {item.estimulos.imagenes?.map((src, i) => (
                    <figure className="edm-stimulus-cell" key={src}>
                      <img src={src} alt={`Lámina ${i + 1} de ${item.nombre}`} />
                      <figcaption>Lámina {i + 1}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {item.reglaInterrupcion && (
                <p className="edm-notice">
                  <strong>Regla de interrupción:</strong> {item.reglaInterrupcion}
                </p>
              )}
              {item.aValidar && (
                <p className="edm-notice">
                  <strong>Revisar:</strong> {item.aValidar}
                </p>
              )}
            </section>
            <section className="edm-record" aria-label="Registro del ítem">
              <h2>Registro</h2>
              {item.ia && (
                <TarjetaSugerenciaIA
                  key={item.orden}
                  itemOrder={item.orden}
                  onAccept={acceptAi}
                  onManual={(v) => setAnswer({ ...current, ...v })}
                  drawingSuggestion={item.orden === 11 ? draft.reySuggestions.copia
                    : item.orden === 13 ? draft.reySuggestions.memoria : undefined}
                  onDrawingSuggestion={item.orden === 11 || item.orden === 13
                    ? (suggestion) => setDraft((d) => ({ ...d, reySuggestions: {
                        ...d.reySuggestions,
                        [item.orden === 11 ? "copia" : "memoria"]: suggestion,
                      } })) : undefined}
                />
              )}
              {item.orden === 13 && <ResumenReyIA
                copia={draft.reySuggestions.copia} memoria={draft.reySuggestions.memoria} />}
              <EdmControls key={item.orden} item={item} value={current} onChange={setAnswer} />
              {item.respuesta.tipo === "trazos" && (
                <div className="edm-manual-color">
                  <p>Si no puntúa los 18 trazos, elija el resultado final.</p>
                  {(["rojo", "amarillo", "verde"] as const).map((color) => (
                    <button
                      key={color}
                      aria-pressed={current.colorManual === color}
                      className={`edm-chip ${color}`}
                      onClick={() => setAnswer({ ...current, colorManual: color })}
                    >
                      {nombresColor[color]}
                    </button>
                  ))}
                </div>
              )}
              {item.registraMovimiento && (
                <div className="edm-movement">
                  <h3>
                    Movimiento {item.registraMovimiento}:{" "}
                    {
                      (
                        {
                          "26a": "¿Da el golpe?",
                          "26b": "¿Cierra los ojos?",
                          "26c": "¿Escribe?",
                          "26d": "¿Escribe?",
                          "26e": "¿Escribe?",
                        } as Record<string, string>
                      )[item.registraMovimiento]
                    }
                  </h3>
                  <YesNoList
                    labels={["Acción observada"]}
                    values={current.movimientos}
                    onChange={(v) => update(item.orden, { ...current, movimientos: v, fuente: "manual" })}
                  />
                </div>
              )}
              <Resultado
                color={result?.color ?? null}
                puntaje={result?.puntaje ?? null}
                max={item.max}
                detalle={result?.detalle}
              />
              {item.provisional && (
                <p className="edm-provisional">* Banda provisional, pendiente de validación clínica.</p>
              )}
              {item.orden === 14 && current.lectura?.length === 8 && (
                <p>Lectura · casilla 20: {current.lectura.filter(Boolean).length}/8</p>
              )}
              <details className="edm-notes">
                <summary>Notas del evaluador</summary>
                <label htmlFor="edm-note">Observaciones de este ítem</label>
                <textarea
                  id="edm-note"
                  value={current.notas ?? ""}
                  onChange={(e) => update(item.orden, { ...current, notas: e.target.value })}
                />
              </details>
            </section>
          </div>
        ) : draft.step === 28 ? (
          <ReservaForm value={draft.reserva}
            onChange={(reserva) => setDraft((d) => ({ ...d, reserva }))} />
        ) : draft.step === 29 ? (
          <InformanteForm value={draft.informante} estado={draft.escalas.informante}
            onChange={(informante) => setDraft((d) => ({ ...d, informante }))}
            onEstado={(informante) => setDraft((d) => ({ ...d,
              escalas: { ...d.escalas, informante } }))} />
        ) : draft.step === 30 ? (
          <GdsForm value={draft.gds} estado={draft.escalas.gds}
            onChange={(gds) => setDraft((d) => ({ ...d, gds }))}
            onEstado={(gds) => setDraft((d) => ({ ...d,
              escalas: { ...d.escalas, gds } }))} />
        ) : draft.step === 31 ? (
          <LawtonForm value={draft.lawton} estado={draft.escalas.lawton}
            onChange={(lawton) => setDraft((d) => ({ ...d, lawton }))}
            onEstado={(lawton) => setDraft((d) => ({ ...d,
              escalas: { ...d.escalas, lawton } }))} />
        ) : (
          <section className="edm-start-panel edm-final-notes">
            <h1>Notas finales del evaluador</h1>
            {(["cognitivo", "emocional", "conductual"] as const).map((key) => (
              <label key={key}>
                Nivel {key}
                <textarea
                  value={draft.finalNotes[key]}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, finalNotes: { ...d.finalNotes, [key]: e.target.value } }))
                  }
                />
              </label>
            ))}
            {!allComplete && (
              <p role="alert" className="edm-notice">
                Faltan ítems o registros de movimiento. Revise los indicadores grises en el riel de progreso.
              </p>
            )}
            {draft.modules.mmse && !puntuarMmse(draft.mmse).completo &&
              <p role="alert" className="edm-notice">Falta completar el MMSE modificado.</p>}
            {draft.modules.reserva && !resumirReserva(draft.reserva).completo &&
              <p role="alert" className="edm-notice">Falta completar la reserva cognitiva.</p>}
            <button
              className="edm-primary"
              disabled={!allComplete || (draft.modules.mmse && !puntuarMmse(draft.mmse).completo) ||
                (draft.modules.reserva && !resumirReserva(draft.reserva).completo)}
              onClick={() => setDraft((d) => ({ ...d, complete: true }))}
            >
              Ver perfil de resultados
            </button>
          </section>
        )}
      </div>
      {draft.step > -2 && (
        <footer className="edm-bottom-bar">
          <button onClick={() => move(previousStep(draft.step))}>
            <ArrowLeft size={18} /> Anterior
          </button>
          {item && <span className="edm-shortcuts">1–9 marcar · Enter siguiente · ← → navegar</span>}
          {item && (
            <span className={`edm-chip ${result?.color ?? "pendiente"}`}>
              {result?.color ? nombresColor[result.color] : "Pendiente"}
            </span>
          )}
          {item?.orden === 13 && (
            <button
              className="edm-session-pause"
              onClick={() => {
                setMessage("Borrador guardado. Puede continuar en otra sesión.");
                move(13);
              }}
            >
              Guardar para otra sesión
            </button>
          )}
          {message && <span role="status">{message}</span>}
          {draft.step < 32 && (
            <button className="edm-primary" disabled={
              (draft.step === -1 && !consentOk) || (draft.step === 0 && !patientOk) ||
              (draft.step === 0.5 && !puntuarMmse(draft.mmse).completo) ||
              (draft.step === 28 && !resumirReserva(draft.reserva).completo) ||
              (draft.step === 29 && (draft.escalas.informante === "pendiente" ||
                draft.escalas.informante === "aplicada" && !puntuarInformante(draft.informante).completo)) ||
              (draft.step === 30 && (draft.escalas.gds === "pendiente" ||
                draft.escalas.gds === "aplicada" && !puntuarGds(draft.gds).completo)) ||
              (draft.step === 31 && (draft.escalas.lawton === "pendiente" ||
                draft.escalas.lawton === "aplicada" && !puntuarLawton(draft.lawton).completo))
            } onClick={() => move(nextStep(draft.step))}>
              Siguiente
              <ArrowRight size={18} />
            </button>
          )}
          {draft.step === -1 && !consentOk && <span className="edm-required">
            Acepte y complete nombre, relación y fecha para continuar.</span>}
          {draft.step === 0 && !patientOk && <span className="edm-required">
            Para continuar falta: {[["nombre o código", draft.patient.paciente.trim()], ["edad (18–110)", edadValida], ["escolaridad", draft.patient.escolaridad.trim()], ["evaluador", draft.patient.evaluador.trim()], ["fecha", draft.patient.fecha]].filter(([, value]) => !value).map(([name]) => name).join(", ")}.</span>}
          {draft.step === 0.5 && !puntuarMmse(draft.mmse).completo && <span className="edm-required">
            Para continuar falta: {mmseFaltantes(draft.mmse).join(", ")}.</span>}
          {draft.step === 28 && !resumirReserva(draft.reserva).completo && <span className="edm-required">
            Para continuar faltan {draft.reserva.filter((v) => v === null || v === undefined).length +
              Math.max(0, RESERVA_ITEMS.length - draft.reserva.length)} respuestas de la escala.</span>}
          {draft.step >= 29 && draft.step <= 31 && (() => {
            const key = draft.step === 29 ? "informante" : draft.step === 30 ? "gds" : "lawton";
            const faltan = key === "informante" ? informanteFaltantes(draft.informante) :
              key === "gds" ? gdsFaltantes(draft.gds) : lawtonFaltantes(draft.lawton);
            return draft.escalas[key] === "pendiente" ? <span className="edm-required">
              Para continuar falta: elegir Aplicar ahora o No se aplicó.</span> :
              draft.escalas[key] === "aplicada" && faltan.length ? <span className="edm-required">
                Para continuar falta: {faltan.join(", ")}.</span> : null;
          })()}
        </footer>
      )}
      {presenter && (
        <ModoPresentador
          {...presenter}
          onClose={() => setPresenter(null)}
          selectedIds={current.matrixIds ?? []}
          onSelect={(matrixIds) => setAnswer({ ...current, matrixIds, aciertos: undefined })}
        />
      )}
    </div>
  );
}
