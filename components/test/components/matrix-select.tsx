"use client";

import hotspots from "@/lib/edm/n1-hotspots.json" with { type: "json" };

type Hotspot = (typeof hotspots)[number];
type Props = {
  imageSrc?: string;
  targetSrc?: string;
  initialSelection?: string[];
  onSelect: (ids: string[]) => void;
  disabled?: boolean;
};

// The click area expands toward the midpoint between neighboring figures.
function touchBox(h: Hotspot) {
  const cx = h.x + h.w / 2;
  const cy = h.y + h.h / 2;
  const left = hotspots.filter((other) => other.fila === h.fila && other.columna === h.columna - 1)[0];
  const right = hotspots.filter((other) => other.fila === h.fila && other.columna === h.columna + 1)[0];
  const above = hotspots.filter((other) => other.columna === h.columna && other.fila === h.fila - 1)[0];
  const below = hotspots.filter((other) => other.columna === h.columna && other.fila === h.fila + 1)[0];
  const midpointX = (other: Hotspot) => (cx + other.x + other.w / 2) / 2;
  const midpointY = (other: Hotspot) => (cy + other.y + other.h / 2) / 2;
  const x0 = Math.max(0, left ? midpointX(left) : cx - .031);
  const x1 = Math.min(1, right ? midpointX(right) : cx + .031);
  const y0 = Math.max(0, above ? midpointY(above) : cy - .034);
  const y1 = Math.min(1, below ? midpointY(below) : cy + .034);
  return { left: `${x0 * 100}%`, top: `${y0 * 100}%`,
    width: `${(x1 - x0) * 100}%`, height: `${(y1 - y0) * 100}%` };
}

export function MatrixSelect({
  imageSrc = "/anexo1-response-edm.png",
  targetSrc,
  initialSelection = [],
  onSelect,
  disabled = false,
}: Props) {
  const selected = new Set(initialSelection);
  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelect([...next]);
  };
  return (
    <div className="edm-matrix-select">
      {targetSrc && (
        <div className="edm-matrix-target">
          <span>Figura objetivo:</span>
          <img src={targetSrc} alt="Rombo con centro negro" />
        </div>
      )}
      <p>Marque todas las figuras iguales a la mostrada. Revise fila por fila.</p>
      <div className="edm-matrix-image" style={{ aspectRatio: "822 / 872" }}>
        <img src={imageSrc} alt="Lámina de figuras para detección visual" draggable={false} />
        {hotspots.map((h) => (
          <button
            key={h.id}
            type="button"
            className={`edm-hotspot ${selected.has(h.id) ? "selected" : ""}`}
            style={touchBox(h)}
            aria-pressed={selected.has(h.id)}
            aria-label={`fila ${h.fila}, columna ${h.columna}`}
            disabled={disabled}
            onClick={() => toggle(h.id)}
          >
            {selected.has(h.id) && <span aria-hidden="true">×</span>}
          </button>
        ))}
      </div>
      <button type="button" className="edm-matrix-clear" onClick={() => onSelect([])}
        disabled={disabled || selected.size === 0}>
        Limpiar selección ({selected.size})
      </button>
    </div>
  );
}
