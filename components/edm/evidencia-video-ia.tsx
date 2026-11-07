import type { ScreeningDecision, VideoScreening, VideoSuggestion } from "@/lib/edm/ai-client";
import { Info } from "lucide-react";

const decisionLabels: Record<ScreeningDecision, string> = {
  deficit_probable: "Déficit probable",
  sin_deficit_aparente: "Sin déficit aparente",
  revisar: "Revisar",
  repetir_grabacion: "Repetir grabación",
  repetir_foto: "Repetir foto",
};

const decisionDescriptions: Record<ScreeningDecision, string> = {
  deficit_probable: "La IA sugiere revisar un posible déficit",
  sin_deficit_aparente: "La IA no encuentra señales de déficit",
  revisar: "La IA no puede decidir en este caso",
  repetir_grabacion: "La grabación no permite analizar el ejercicio; grabe de nuevo",
  repetir_foto: "La foto no permite analizar el dibujo; tome otra",
};

export function nombreDecision(decision: ScreeningDecision) {
  return decisionLabels[decision];
}

export function DecisionIA({ decision }: { decision: ScreeningDecision }) {
  const tone = decision === "deficit_probable" ? "rojo"
    : decision === "sin_deficit_aparente" ? "verde" : "amarillo";
  return <div className="edm-screening-decision">
    <span className={`edm-chip ${tone}`}>{nombreDecision(decision)}</span>
    <strong>{decisionDescriptions[decision]}</strong>
  </div>;
}

export function BarraProbabilidadIA({ probability, reviewBand }: {
  probability: number;
  reviewBand: [number, number];
}) {
  const percent = Math.min(100, Math.max(0, probability * 100));
  const start = Math.min(100, Math.max(0, reviewBand[0] * 100));
  const end = Math.min(100, Math.max(start, reviewBand[1] * 100));
  return <div className="edm-probability">
    <div className="edm-probability-heading">
      <span>Probabilidad de déficit</span><strong>{percent.toFixed(0)}%</strong>
    </div>
    <div className="edm-probability-track" role="img"
      aria-label={`Probabilidad de déficit ${percent.toFixed(0)} por ciento. ` +
        `Franja gris de revisión entre ${start.toFixed(0)} y ${end.toFixed(0)} por ciento.`}>
      <div className="edm-probability-gray" style={{ left: `${start}%`, width: `${end - start}%` }} />
      <span className="edm-probability-marker" style={{ left: `${percent}%` }} />
    </div>
    <small>Franja gris: la IA no decide en esta franja.</small>
  </div>;
}

function LineaTiempo({ suggestion, screening }: {
  suggestion: VideoSuggestion;
  screening: VideoScreening;
}) {
  const timeline = suggestion.timeline ?? [];
  const duration = Math.max(1, screening.features.dur, screening.start_cue_s,
    ...screening.taps, ...timeline.map((point) => point.t));
  const position = (time: number) => `${Math.min(100, Math.max(0, time / duration * 100))}%`;
  return (
    <div className="edm-video-timeline">
      <strong>Línea de tiempo</strong>
      <div className="edm-time-scale">
        <span aria-hidden="true" />
        <div><span>0 s</span><span>{duration.toFixed(1)} s</span></div>
      </div>
      <div className="edm-time-grid">
        {(["left", "right"] as const).map((hand) => {
          const points = timeline.filter((point) => point.hand === hand)
            .sort((a, b) => a.t - b.t);
          return (
            <div className="edm-time-pair" key={hand}>
              <span className="edm-time-label">Mano {hand === "left" ? "izquierda" : "derecha"}</span>
              <div className="edm-time-track"
                aria-label={`Posturas de mano ${hand === "left" ? "izquierda" : "derecha"}`}>
                {points.map((point, index) => {
                  const start = index ? (points[index - 1].t + point.t) / 2 : 0;
                  const end = index < points.length - 1
                    ? (point.t + points[index + 1].t) / 2 : duration;
                  return <span key={`${point.t}-${index}`} className={`edm-time-posture ${point.posture}`}
                    style={{ left: position(start), width: `${(end - start) / duration * 100}%` }}
                    title={`${point.posture === "puno" ? "Puño" : point.posture} · ${point.t.toFixed(1)} s`}
                  />;
                })}
              </div>
            </div>
          );
        })}
        <div className="edm-time-overlay" aria-label={`Inicio a los ${screening.start_cue_s.toFixed(1)} s; ` +
          `${screening.taps.length} golpes detectados`}>
          <span className="edm-cue" style={{ left: position(screening.start_cue_s) }} />
          {screening.taps.map((tap, index) => (
            <span key={`${tap}-${index}`} className="edm-tap" style={{ left: position(tap) }} />
          ))}
        </div>
      </div>
      <p className="edm-timeline-legend">
        <span className="puno" /> Puño <span className="filo" /> Filo
        <span className="palma" /> Palma <span className="tap" /> Golpe
        <span className="cue" /> Inicio
      </p>
    </div>
  );
}

export function EvidenciaVideoIA({ suggestion }: { suggestion: VideoSuggestion }) {
  const screening = suggestion.screening;
  if (!screening) return null;
  const evidence = [
    ["Ciclos puño→filo→palma detectados", screening.features.cycles],
    ["Golpes en la mesa", screening.features.taps],
    ["Racha de golpes regulares", screening.features.tap_run || "—"],
    ["Ritmo", screening.features.tempo
      ? `${screening.features.tempo.toLocaleString("es", { maximumFractionDigits: 2 })} s`
      : "—"],
    ...(screening.features.active_frac !== undefined ? [
      ["Tiempo con las manos activas", `${Math.round(screening.features.active_frac * 100)}%`],
      ["Dos manos moviéndose a la vez", `${Math.round((screening.features.both_moving_frac ?? 0) * 100)}%`],
    ] as const : []),
  ] as const;
  const reasons = screening.decision === "revisar" && screening.reasons.length === 1 &&
    screening.reasons[0] === "La IA no tiene suficiente seguridad en este caso."
    ? [] : screening.reasons;
  return (
    <div className="edm-video-evidence">
      <DecisionIA decision={screening.decision} />
      {(screening.decision === "revisar" || screening.decision === "repetir_grabacion") &&
        reasons.length > 0 && (
        <ul className="edm-screening-reasons">
          {reasons.map((reason, index) => <li key={index}>{reason}</li>)}
        </ul>
      )}
      {screening.notes?.length > 0 && <div className="edm-screening-notes" role="note">
        <Info size={18} aria-hidden="true" />
        <ul>{screening.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>
      </div>}
      {screening.decision !== "repetir_grabacion" && <>
        <BarraProbabilidadIA probability={screening.deficit_probability}
          reviewBand={screening.review_band ?? [0.4, 0.6]} />
        <div className="edm-evidence-grid">
          {evidence.map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
        <LineaTiempo suggestion={suggestion} screening={screening} />
      </>}
      <p className="edm-screening-note">Tamizaje de apoyo: la decisión final es del evaluador.</p>
      <small>Modelo: {screening.model_version}</small>
    </div>
  );
}
