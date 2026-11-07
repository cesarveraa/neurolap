import hotspots from "./n1-hotspots.json" with { type: "json" };
import type { Bandas, Color, EdmItem, Sistema } from "./items.ts";
import type { VideoScreening } from "./ai-client.ts";
export type Respuesta = {
  checks?: boolean[];
  matrixIds?: string[];
  ensayo1?: boolean[];
  ensayo2?: boolean[];
  si?: (boolean | null)[];
  series?: (boolean | null)[];
  bloqueA?: (boolean | null)[];
  bloqueB?: (boolean | null)[];
  trazos?: (number | null)[];
  aciertos?: number;
  lectura?: boolean[];
  evocacion?: boolean[];
  animales?: number;
  f?: number;
  transcriptAnimales?: string;
  transcriptF?: string;
  modos?: { A?: boolean[]; B?: boolean[]; C?: boolean[] };
  movimientos?: (boolean | null)[];
  colorManual?: Color;
  fuente?: "manual" | "ia_aceptada" | "ia_editada";
  tamizajeDecision?: VideoScreening["decision"];
  notas?: string;
  calculo?: string;
};
export type Puntaje = { puntaje: number | null; color: Color | null; detalle: string };
const count = (v?: boolean[]) => v?.filter(Boolean).length ?? 0;
export function colorDesdeBandas(puntaje: number, bandas: Bandas): Color {
  for (const [clave, intervalo] of Object.entries(bandas) as [keyof Bandas, [number, number]][])
    if (puntaje >= intervalo[0] && puntaje <= intervalo[1])
      return ({ V: "verde", A: "amarillo", R: "rojo" } as const)[clave];
  return "rojo";
}
export function combinarFluidez(a: Color, f: Color): Color {
  if (a === "rojo" && f === "rojo") return "rojo";
  if ((a === "rojo" && f === "amarillo") || (a === "amarillo" && f === "rojo")) return "rojo";
  if ((a === "rojo" && f === "verde") || (a === "verde" && f === "rojo")) return "amarillo";
  if (a === "amarillo" && f === "amarillo") return "amarillo";
  return "verde";
}
export function puntuarProduccionMotora(respuestas: (boolean | null)[]): number | null {
  if (respuestas.length !== 5 || respuestas.some((x) => x === null || x === undefined)) return null;
  return respuestas.reduce<number>((n, x) => n + (x ? 2 : 1), 0);
}
export function puntuarModos(modos: Respuesta["modos"]): number | null {
  if (!modos) return null;
  for (const [modo, puntos] of [
    ["A", 3],
    ["B", 2],
    ["C", 1],
  ] as const) {
    const valores = modos[modo];
    if (valores?.length === 3 && count(valores) >= 2) return puntos;
  }
  return modos.C?.length === 3 ? 0 : null;
}
export function puntuarItem(item: EdmItem, respuesta: Respuesta = {}): Puntaje {
  let puntaje: number | null = null;
  let detalle = "Sin registro";
  const tipo = item.respuesta.tipo;
  if (
    ["checklist", "lectura", "redaccion", "semejanzas", "imitacion"].includes(tipo) &&
    respuesta.checks?.length === item.respuesta.opciones?.length
  ) {
    puntaje = count(respuesta.checks);
    detalle = `${puntaje} aciertos`;
  }
  if (tipo === "dosEnsayos" && respuesta.ensayo1?.length === 6 && respuesta.ensayo2?.length === 6) {
    puntaje = count(respuesta.ensayo1) + count(respuesta.ensayo2);
    detalle = `Ensayo 1: ${count(respuesta.ensayo1)}; ensayo 2: ${count(respuesta.ensayo2)}`;
  }
  if (tipo === "matriz" && (respuesta.matrixIds || respuesta.aciertos !== undefined)) {
    const targets = new Set(hotspots.filter((h) => h.objetivo).map((h) => h.id));
    const selected = new Set(respuesta.matrixIds ?? []);
    const hits = [...selected].filter((id) => targets.has(id)).length;
    const falseAlarms = [...selected].filter((id) => !targets.has(id)).length;
    puntaje = respuesta.aciertos === undefined ? hits : Math.max(0, Math.min(15, respuesta.aciertos));
    detalle = `${hits} aciertos, ${falseAlarms} falsas alarmas`;
    if (respuesta.aciertos !== undefined) detalle += `; evaluador: ${puntaje}`;
  }
  if (tipo === "reconocimiento" && respuesta.si?.length === 12 && respuesta.si.every((x) => x !== null)) {
    const objetivos = item.respuesta.objetivos ?? [];
    const lista = item.respuesta.opciones ?? [];
    const aciertos = lista.filter((x, i) => objetivos.includes(x) && respuesta.si?.[i]).length;
    const intrusiones = lista.filter((x, i) => !objetivos.includes(x) && respuesta.si?.[i]).length;
    puntaje = Math.max(0, aciertos - intrusiones);
    detalle = `${aciertos} objetivos, ${intrusiones} intrusiones`;
  }
  if (tipo === "series" && respuesta.series?.length === 10) {
    let ultima = 0,
      fallas = 0,
      terminal = false;
    respuesta.series.forEach((x, i) => {
      if (fallas >= 3 || x === null) return;
      if (x) {
        ultima = i + 1;
        fallas = 0;
      } else fallas++;
      if (fallas >= 3 || i === 9) terminal = true;
    });
    puntaje = terminal ? ultima : null;
    detalle = `Última serie completa: ${ultima}`;
  }
  if (tipo === "trazos" && respuesta.trazos?.length === 18 && respuesta.trazos.every((x) => x !== null)) {
    puntaje = respuesta.trazos.reduce<number>((n, x) => n + Math.max(0, Math.min(2, x ?? 0)), 0);
    detalle = "18 trazos evaluados";
  }
  if (tipo === "auditiva" && respuesta.bloqueA?.length === 2 && respuesta.bloqueA.every((x) => x !== null)) {
    if (respuesta.bloqueA.every(Boolean)) {
      puntaje = 3;
      detalle = "Bloque A completo";
    } else if (respuesta.bloqueB?.length === 3 && respuesta.bloqueB.every((x) => x !== null)) {
      puntaje = count(respuesta.bloqueB as boolean[]);
      detalle = `Bloque B: ${puntaje} series`;
    }
  }
  if (tipo === "interferencia" && respuesta.evocacion?.length === 8 && respuesta.lectura?.length === 8) {
    puntaje = count(respuesta.evocacion);
    detalle = `Evocación: ${puntaje}; lectura: ${count(respuesta.lectura)}`;
  }
  if (tipo === "fluidez" && respuesta.animales !== undefined && respuesta.f !== undefined) {
    const a = colorDesdeBandas(Math.min(20, respuesta.animales), item.bandas);
    const f = colorDesdeBandas(Math.min(15, respuesta.f), item.bandasSecundarias ?? item.bandas);
    return {
      puntaje: Math.min(20, respuesta.animales),
      color: combinarFluidez(a, f),
      detalle: `Animales ${respuesta.animales} (${a}); F ${respuesta.f} (${f})`,
    };
  }
  if (tipo === "modos") {
    puntaje = puntuarModos(respuesta.modos);
    detalle =
      puntaje === null
        ? "Sin registro"
        : `Modo alcanzado: ${puntaje === 3 ? "A" : puntaje === 2 ? "B" : puntaje === 1 ? "C" : "ninguno"}`;
  }
  if (tipo === "motora") {
    puntaje = puntuarProduccionMotora(respuesta.movimientos ?? []);
    detalle = puntaje === null ? "Faltan observaciones 26a–26e" : "Cinco movimientos observados";
  }
  return {
    puntaje,
    color: puntaje === null ? (respuesta.colorManual ?? null) : colorDesdeBandas(puntaje, item.bandas),
    detalle,
  };
}
export function resumenPorSistema(
  filas: { sistema: Sistema; color: Color | null }[],
): Record<Sistema, { verde: number; amarillo: number; rojo: number }> {
  const out = {
    episodica: { verde: 0, amarillo: 0, rojo: 0 },
    operativa: { verde: 0, amarillo: 0, rojo: 0 },
    semantica: { verde: 0, amarillo: 0, rojo: 0 },
    procesual: { verde: 0, amarillo: 0, rojo: 0 },
  };
  for (const fila of filas) if (fila.color) out[fila.sistema][fila.color]++;
  return out;
}
