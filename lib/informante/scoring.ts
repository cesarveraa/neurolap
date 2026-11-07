export type Ad8Response = "si" | "no" | "no_sabe" | null;
export type InformanteAnswer = { ad8: Ad8Response[]; descriptivas: Record<string, string> };
export const emptyInformante: InformanteAnswer = { ad8: Array(8).fill(null), descriptivas: {} };

// Versión española de Carnero-Pardo et al.; confirmar redacción con el equipo antes del uso clínico.
export const AD8_ITEMS = [
  "Problemas para emitir juicios y tomar decisiones adecuadas",
  "Pérdida de interés en sus aficiones y actividades",
  "Repite las preguntas, los comentarios o las cosas que cuenta",
  "Dificultad para aprender a usar herramientas, aparatos o dispositivos",
  "Olvida el mes o año correcto",
  "Dificultad para manejar asuntos financieros complicados",
  "Dificultad para recordar las citas y cosas que tiene que hacer",
  "Los problemas de razonamiento y/o memoria son cotidianos y no ocasionales",
] as const;

export const HISTORIA_PREGUNTAS = [
  ["situacion", "¿Tiene diagnóstico de demencia, presenta olvidos frecuentes o ninguna de las dos situaciones?"],
  ["grado_alzheimer", "Si tiene diagnóstico de Alzheimer, ¿en qué fase se encuentra?"],
  ["perdida_memoria", "Si presenta olvidos, ¿cuál es el porcentaje aproximado de pérdida de memoria?"],
  ["dependencia", "¿En qué actividades necesita ayuda y cuál es el grado aproximado de dependencia?"],
  ["numero_hermanos", "¿Cuántos hermanos tiene la persona mayor?"],
  ["orden_hermanos", "¿Qué lugar ocupa entre sus hermanos?"],
  ["conyuge_actual", "¿Tiene cónyuge actualmente?"],
  ["conyuge_olvidos", "Si tiene cónyuge, ¿presenta olvidos frecuentes?"],
  ["abuelo_paterno", "¿El abuelo paterno tuvo olvidos frecuentes?"],
  ["abuela_paterna", "¿La abuela paterna tuvo olvidos frecuentes?"],
  ["abuelo_materno", "¿El abuelo materno tuvo olvidos frecuentes?"],
  ["abuela_materna", "¿La abuela materna tuvo olvidos frecuentes?"],
  ["padre", "¿El padre tuvo olvidos frecuentes?"],
  ["madre", "¿La madre tuvo olvidos frecuentes?"],
  ["hermanos_olvidos", "¿Algún hermano tiene o tuvo olvidos frecuentes? ¿Quién?"],
  ["hijos_olvidos", "¿Algún hijo tiene olvidos frecuentes? ¿Quién?"],
  ["nietos_olvidos", "¿Algún nieto tiene olvidos frecuentes? ¿Quién?"],
] as const;
export const CUIDADOR_PREGUNTAS = [
  ["relacion", "¿Qué relación tiene con la persona mayor?"],
  ["tiempo", "¿Hace cuánto tiempo la cuida?"],
  ["horas", "¿Cuántas horas al día está a cargo de su cuidado?"],
  ["significado", "¿Qué ha representado para usted el cuidado (cambio de estilo de vida, obligación, acercamiento, postergación, desarrollo personal, aprendizaje u otro)?"],
  ["postergadas", "¿Qué actividades ha tenido que postergar (estudio, vida privada, trabajo u otras)?"],
  ["emociones_impacto", "¿Cómo ha afectado el cuidado a sus emociones?"],
  ["emociones", "¿Qué emociones siente frecuentemente al cuidar (alegría, miedo, tristeza, ira u otras)?"],
  ["sensaciones", "¿Qué sensaciones experimenta frecuentemente (esperanza, irritabilidad, tranquilidad, satisfacción, frustración u otras)?"],
  ["salud", "¿Qué cambios en peso, sueño, energía o apariencia física relaciona con el cuidado?"],
  ["recursos", "¿Qué recursos económicos utiliza para el cuidado?"],
] as const;
export function informanteFaltantes(answer: InformanteAnswer): string[] {
  return AD8_ITEMS.flatMap((_, i) => answer.ad8[i] == null ? [`AD8, pregunta ${i + 1}`] : []);
}
export function puntuarInformante(answer: InformanteAnswer) {
  return { total: answer.ad8.slice(0, 8).filter((v) => v === "si").length,
    completo: informanteFaltantes(answer).length === 0 };
}
