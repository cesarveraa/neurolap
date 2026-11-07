import type { DrawingSuggestion } from "@/lib/edm/ai-client";
import { BarraProbabilidadIA, DecisionIA, nombreDecision } from "./evidencia-video-ia";

export function EvidenciaReyIA({ suggestion }: { suggestion: DrawingSuggestion }) {
  const { screening, estimate } = suggestion;
  return <div className="edm-video-evidence">
    <DecisionIA decision={screening.decision} />
    {(screening.decision === "revisar" || screening.decision === "repetir_foto") &&
      screening.reasons.length > 0 &&
      <ul className="edm-screening-reasons">
        {screening.reasons.map((reason, index) => <li key={index}>{reason}</li>)}
      </ul>}
    {screening.decision !== "repetir_foto" && <>
      <BarraProbabilidadIA probability={screening.deficit_probability}
        reviewBand={screening.review_band} />
      <div className="edm-evidence-grid">
        <div><span>Elementos presentes</span><strong>≈ {estimate.elements_present} de 18</strong></div>
        <div><span>Bien ubicados</span><strong>≈ {estimate.elements_correct} de 18</strong></div>
        <div><span>Puntaje estimado</span><strong>≈ {estimate.score_0_36} / 36</strong></div>
      </div>
      <p className="edm-screening-note">
        Estimación de la IA, no reemplaza la puntuación de los 18 trazos.
      </p>
    </>}
  </div>;
}

export function ResumenReyIA({ copia, memoria }: {
  copia?: DrawingSuggestion;
  memoria?: DrawingSuggestion;
}) {
  if (!copia && !memoria) return null;
  if ((!copia || !memoria) &&
    copia?.screening.decision !== "repetir_foto" &&
    memoria?.screening.decision !== "repetir_foto") return null;
  const decisions = [copia?.screening.decision, memoria?.screening.decision];
  const stages = [["Copia", copia?.screening.decision],
    ["Memoria", memoria?.screening.decision]] as const;
  const repeat = copia?.screening.decision === "repetir_foto" ? "copia" :
    memoria?.screening.decision === "repetir_foto" ? "memoria" : null;
  const recommendation = repeat ? `Repita la foto de ${repeat} antes de interpretar`
    : decisions.includes("deficit_probable")
    ? "Revisar posible déficit visoespacial/memoria"
    : decisions.every((decision) => decision === "sin_deficit_aparente")
      ? "Sin señales de déficit en la figura" : "Revisar";
  return <section className="edm-rey-summary" aria-label="Figura de Rey: copia y memoria">
    <h3>Figura de Rey: copia y memoria</h3>
    <div className="edm-rey-decisions">
      {stages.map(([label, decision]) => decision &&
        <div key={label}>
          <span>{label}</span>
          <strong className={`edm-chip ${decision === "deficit_probable" ? "rojo" :
            decision === "sin_deficit_aparente" ? "verde" : "amarillo"}`}>
            {nombreDecision(decision)}
          </strong>
        </div>)}
    </div>
    <p><strong>Recomendación conjunta:</strong> {recommendation}</p>
    <small>Apoyo al evaluador; la decisión final es del profesional</small>
  </section>;
}
