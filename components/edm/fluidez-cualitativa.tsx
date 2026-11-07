import type { FluencyQualitative } from "@/lib/edm/ai-client";
import { formatDecimal, visibleClusters } from "@/lib/edm/fluidez-format";

const ranges = ["0–15 s", "15–30 s", "30–45 s", "45–60 s"];

export function FluidezCualitativa({ qualitative, category, compact = false }: {
  qualitative: FluencyQualitative;
  category: "animales" | "f";
  compact?: boolean;
}) {
  const { chips, more } = visibleClusters(qualitative, category);
  const values = qualitative.per_15s;
  const max = Math.max(1, ...(values ?? []));
  return <section className={`edm-fluency-quali${compact ? " compact" : ""}`}
    aria-label={`Análisis cualitativo: ${category === "animales" ? "Animales" : "Letra F"}`}>
    <h4>{category === "animales" ? "Animales" : "Letra F"}</h4>
    <div className="edm-fluency-quali-stats">
      <div><span>Agrupamientos</span><strong>{qualitative.clusters.length}</strong></div>
      <div><span>Cambios</span><strong>{qualitative.switches}</strong></div>
      <div><span>Tamaño medio</span><strong>{formatDecimal(qualitative.mean_cluster_size)}</strong></div>
    </div>
    <div className="edm-fluency-quali-chips">
      {chips.map((chip, index) => <span key={index} className="edm-fluency-quali-chip">{chip}</span>)}
      {more && <span className="edm-fluency-quali-more">{more}</span>}
    </div>
    {values && <div className="edm-fluency-quali-chart">
      <strong>Palabras válidas por tramo</strong>
      <svg viewBox="0 0 400 105" role="img"
        aria-label={`Palabras válidas por tramo: ${ranges.map((range, i) => `${range}: ${values[i]}`).join("; ")}`}>
        {values.map((value, i) => {
          const height = value / max * 50;
          const x = 43 + i * 96;
          return <g key={i}>
            <text x={x + 12} y={63 - height} textAnchor="middle">{value}</text>
            <rect x={x} y={68 - height} width="24" height={height} rx="3" />
            <text x={x + 12} y="92" textAnchor="middle">{ranges[i]}</text>
          </g>;
        })}
      </svg>
    </div>}
    {(qualitative.first_word_s !== undefined || qualitative.long_pauses !== undefined) &&
      <p className="edm-fluency-quali-timing">
        {qualitative.first_word_s !== undefined && `Primera palabra a los ${formatDecimal(qualitative.first_word_s)} s`}
        {qualitative.first_word_s !== undefined && qualitative.long_pauses !== undefined && " · "}
        {qualitative.long_pauses !== undefined && `Pausas de 10 s o más: ${qualitative.long_pauses}`}
      </p>}
    <p className="edm-fluency-quali-note">Información complementaria en validación: describe la estrategia de búsqueda. No cambia el color del ítem.</p>
    <details><summary>¿Qué significa?</summary>
      <p>{category === "animales"
        ? "Agrupar es decir seguidos animales del mismo tipo: muestra una memoria semántica organizada. Cambiar es saltar a otro tipo: muestra flexibilidad y función ejecutiva."
        : "Agrupar es decir seguidas palabras con el mismo sonido. Cambiar es pasar a otro grupo de sonidos: muestra flexibilidad y función ejecutiva."}</p>
    </details>
  </section>;
}
