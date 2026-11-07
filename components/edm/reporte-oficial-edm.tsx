import type { Color } from "@/lib/edm/items";

type Group = { label: string; span: number; tone?: string };
type Cell = { color: Color | null; provisional: boolean; nombre: string };
type Props = {
  patient: { paciente: string; edad: string; evaluador: string; lugar: string; fecha: string };
  casillas: Record<number, Cell>;
};
const subtipo: Group[] = [
  { label: "", span: 6 }, { label: "verbal", span: 1 }, { label: "visual", span: 1 },
  { label: "auditiva", span: 1 }, { label: "", span: 1 }, { label: "simple", span: 1 },
  { label: "compleja", span: 1 }, { label: "literal", span: 1 }, { label: "numeral", span: 1 },
  { label: "sin interferencia", span: 1 }, { label: "con interferencia", span: 1 },
  { label: "", span: 9 }, { label: "abstracto", span: 1 }, { label: "concreto", span: 1 },
  { label: "", span: 5 }, { label: "corporal", span: 1 }, { label: "manual", span: 1 },
  { label: "", span: 1 },
];
const habilidades: Group[] = [
  ...["Tiempo", "Espacio", "Persona", "Remota", "Progresión", "Regresión", "Seguimiento",
    "Detección", "Detección", "Verbal", "Visoespacial", "Visoespacial", "Auditiva-verbal",
    "Auditiva-verbal", "Visoverbal", "Visoverbal", "Denominación", "Repetición", "Comprensión",
    "Lectura simple",
    "Lectura comprensión", "Redacción", "Copia", "Dictado", "Conceptualización", "Cálculo",
    "Cálculo", "Visoespacial", "Fluidez verbal", "Espontánea", "Por claves", "Por reconocimiento",
    "Producción motora", "Producción motora", "Imitación"].map((label, index) => ({
      label, span: 1,
      tone: index < 4 ? "episodica" : index < 16 ? "operativa"
        : index < 32 ? "semantica" : "procesual",
    })),
];
const dimensiones: Group[] = [
  { label: "Orientación", span: 2 }, { label: "Identificación", span: 2 },
  { label: "Cálculo y seguimiento", span: 3 }, { label: "Reconocimiento", span: 2 },
  { label: "Codificación", span: 7 }, { label: "Evocación verbal", span: 3 },
  { label: "Comprensión", span: 2 }, { label: "Seguimiento de órdenes", span: 2 },
  { label: "Discriminación", span: 1 }, { label: "Cálculo y seguimiento", span: 3 },
  { label: "Representación", span: 1 }, { label: "Evocación verbal", span: 4 },
  { label: "Seguimiento de órdenes", span: 3 },
];
const dominios: Group[] = [
  { label: "Orientación", span: 4, tone: "episodica" },
  { label: "Atención", span: 5, tone: "operativa" },
  { label: "Codificación", span: 7, tone: "operativa" },
  { label: "Lenguaje", span: 3, tone: "semantica" },
  { label: "Lecto-escritura", span: 7, tone: "semantica" },
  { label: "Funciones ejecutivas", span: 9, tone: "semantica" },
];
const sistemas: Group[] = [
  { label: "Memoria episódica", span: 4, tone: "episodica" },
  { label: "Memoria operativa", span: 12, tone: "operativa" },
  { label: "Memoria semántica", span: 16, tone: "semantica" },
  { label: "Memoria procesual", span: 3, tone: "procesual" },
];
const memoria: Group[] = [
  { label: "MLP", span: 4, tone: "memoria" },
  { label: "Memoria corto plazo", span: 12, tone: "memoria" },
  { label: "Memoria largo plazo (MLP)", span: 19, tone: "memoria" },
];
const levels = [
  ["Sub-tipo", subtipo], ["Habilidades", habilidades], ["Dimensiones", dimensiones],
  ["Dominios", dominios], ["Sub tipo", sistemas], ["Memoria", memoria],
] as const;
const names: Record<Color, string> = {
  rojo: "Déficit", amarillo: "Afectación", verde: "Conservación",
};

const palette = {
  label: "#396392", header: "#5082bd", dimension: "#9bb9dc", item: "#008b96",
  episodica: "#ffff9b", operativa: "#caff9e", semantica: "#fbd4b6",
  procesual: "#d7eaf0", memoria: "#112c49", empty: "#c5c5c5",
  rojo: "#ff0000", amarillo: "#ffeb00", verde: "#00ae4f",
};
const rowHeights = [86, 150, 110, 69, 40, 36, 22, 30];
const left = 32;
const top = 130;
const labelWidth = 88;
const cellWidth = (1058 - labelWidth) / 35;

// Texto vertical que cabe en su celda: una línea si alcanza; si no, dos líneas; y si aún no, letra más chica.
function ajustarVertical(texto: string, base: number, largo: number, ancho: number) {
  const mide = (t: string, fs: number) => t.length * fs * 0.64;
  if (mide(texto, base) <= largo) return { lineas: [texto], fs: base };
  const espacios = [...texto.matchAll(/ /g)].map((m) => m.index ?? 0);
  if (espacios.length) {
    const corte = espacios.reduce((a, b) => Math.abs(b - texto.length / 2) < Math.abs(a - texto.length / 2) ? b : a);
    const lineas = [texto.slice(0, corte), texto.slice(corte + 1)];
    const fs = Math.min(base, largo / (Math.max(...lineas.map((l) => l.length)) * 0.64), ancho / 2.3);
    if (fs >= 6.5) return { lineas, fs };
  }
  return { lineas: [texto], fs: Math.max(5.5, largo / (texto.length * 0.64)) };
}

function textoVertical(texto: string, cx: number, cy: number, base: number, largo: number, ancho: number,
  props: Record<string, string | number> = {}) {
  const { lineas, fs } = ajustarVertical(texto, base, largo, ancho);
  const alto = fs * 1.15;
  return <text x={cx} y={cy} fontSize={fs} textAnchor="middle" dominantBaseline="middle"
    transform={`rotate(-90 ${cx} ${cy})`} {...props}>
    {lineas.length === 1 ? lineas[0] : lineas.map((l, i) =>
      <tspan key={i} x={cx} dy={i === 0 ? -alto / 2 : alto}>{l}</tspan>)}
  </text>;
}

function groupedRow(title: string, groups: readonly Group[], level: number, y: number) {
  const height = rowHeights[level];
  let offset = left + labelWidth;
  return <g key={`${title}-${level}`}>
    <rect x={left} y={y} width={labelWidth} height={height} fill={palette.label} stroke="#111" />
    {level < 3
      ? textoVertical(title.toUpperCase(), left + labelWidth / 2, y + height / 2, 15, height - 12, labelWidth - 8,
        { fill: "white", fontWeight: "bold" })
      : <text x={left + labelWidth / 2} y={y + height / 2} fill="white" fontSize={12}
        fontWeight="bold" textAnchor="middle" dominantBaseline="middle">{title.toUpperCase()}</text>}
    {groups.map((group, index) => {
      const x = offset;
      const width = group.span * cellWidth;
      offset += width;
      const fill = group.tone ? palette[group.tone as keyof typeof palette]
        : level === 2 ? palette.dimension : level === 0 && index % 2 ? palette.empty : "#fff";
      const vertical = level < 3;
      const cx = x + width / 2;
      const cy = y + height / 2;
      return <g key={index}>
        <rect x={x} y={y} width={width} height={height} fill={fill} stroke="#111" />
        {group.label && vertical && textoVertical(group.label.toUpperCase(), cx, cy, level === 2 ? 9 : 10,
          height - 8, width - 3, { fill: "#101820" })}
        {group.label && !vertical && <text x={cx} y={cy} fill={level === 5 ? "white" : "#101820"}
          fontSize={level === 5 ? 15 : level === 4 ? 11 : level === 2 ? 9 : 10}
          fontWeight={level === 5 ? "bold" : "normal"} textAnchor="middle"
          dominantBaseline="middle">
          {level === 4 && group.label.startsWith("Memoria ") ? <>
            <tspan x={cx} dy="-6">MEMORIA</tspan>
            <tspan x={cx} dy="13">{group.label.slice(8).toUpperCase()}</tspan>
          </> : group.label.toUpperCase()}
        </text>}
      </g>;
    })}
  </g>;
}

export function ReporteOficialEdm({ patient, casillas }: Props) {
  let y = top;
  return <svg className="edm-official-svg" width="1122" height="794" viewBox="0 0 1122 794"
    xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hoja oficial de resultados EDM"
    style={{ fontFamily: '"Atkinson Hyperlegible Next Variable", Arial, sans-serif' }}>
    <rect width="1122" height="794" fill="white" />
    <rect x={left} y="34" width="1058" height="34" fill={palette.header} />
    <text x="561" y="51" fill="white" fontSize="22" fontWeight="bold"
      textAnchor="middle" dominantBaseline="middle">REPORTE DE RESULTADOS — EDM</text>
    <text x={left} y="91" fontSize="14">PACIENTE: {patient.paciente || "—"}</text>
    <text x="870" y="91" fontSize="14">EDAD: {patient.edad || "—"}</text>
    <text x={left} y="115" fontSize="13">EVALUADOR: {patient.evaluador || "—"}</text>
    <text x="650" y="115" fontSize="13">
      LUGAR Y FECHA: {[patient.lugar, patient.fecha].filter(Boolean).join(", ") || "—"}
    </text>
    {levels.map(([title, groups], level) => {
      const row = groupedRow(title, groups, level, y);
      y += rowHeights[level];
      return row;
    })}
    <g>
      <rect x={left} y={y} width={labelWidth} height={rowHeights[6]}
        fill={palette.label} stroke="#111" />
      <text x={left + labelWidth / 2} y={y + 11} fill="white" fontSize="13"
        fontWeight="bold" textAnchor="middle" dominantBaseline="middle">ÍTEM</text>
      {Array.from({ length: 35 }, (_, index) => <g key={index}>
        <rect x={left + labelWidth + index * cellWidth} y={y} width={cellWidth}
          height={rowHeights[6]} fill={palette.item} stroke="#111" />
        <text x={left + labelWidth + (index + .5) * cellWidth} y={y + 11}
          fontSize="12" textAnchor="middle" dominantBaseline="middle">{index + 1}</text>
      </g>)}
    </g>
    <g>
      <rect x={left} y={y + rowHeights[6]} width={labelWidth} height={rowHeights[7]}
        fill={palette.label} stroke="#111" />
      <text x={left + labelWidth / 2} y={y + rowHeights[6] + 15} fill="white"
        fontSize="11" textAnchor="middle" dominantBaseline="middle">RESULTADO</text>
      {Array.from({ length: 35 }, (_, index) => {
        const cell = casillas[index + 1];
        const color = cell?.color ? palette[cell.color] : cell ? "#fff" : "#ddd";
        const label = cell ? `${cell.nombre}: ${cell.color ? names[cell.color] : "Pendiente"}`
          : "No evaluada en EDM 2023";
        return <g key={index}>
          <title>{`Casilla ${index + 1}: ${label}`}</title>
          <rect x={left + labelWidth + index * cellWidth} y={y + rowHeights[6]}
            width={cellWidth} height={rowHeights[7]} fill={color} stroke="#111" />
          {cell?.provisional && <text x={left + labelWidth + (index + .5) * cellWidth}
            y={y + rowHeights[6] + 15} fontSize="17" fontWeight="bold"
            textAnchor="middle" dominantBaseline="middle">*</text>}
        </g>;
      })}
    </g>
    {(["rojo", "amarillo", "verde"] as const).map((color, index) => <g key={color}>
      <rect x={220 + index * 250} y="728" width="20" height="16"
        fill={palette[color]} stroke="#555" />
      <text x={246 + index * 250} y="736" fontSize="13" dominantBaseline="middle">
        {names[color].toUpperCase()}
      </text>
    </g>)}
    <text x={left} y="775" fontSize="11">* Banda provisional, pendiente de validación clínica.</text>
  </svg>;
}
