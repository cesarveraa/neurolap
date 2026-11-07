export type GdsAnswer = (boolean | null)[];
export const emptyGds: GdsAnswer = Array(15).fill(null);
// Versión breve española de Sheikh y Yesavage, difundida por Stanford.
export const GDS_ITEMS = [
  "¿Está básicamente satisfecho/a con su vida?",
  "¿Ha suspendido muchas de sus actividades e intereses?",
  "¿Siente que su vida está vacía?",
  "¿Se aburre a menudo?",
  "¿Está de buen humor la mayor parte del tiempo?",
  "¿Tiene miedo de que algo malo le vaya a pasar?",
  "¿Se siente feliz la mayor parte del tiempo?",
  "¿Se siente a menudo indefenso/a?",
  "¿Prefiere quedarse en casa en vez de salir y hacer cosas nuevas?",
  "¿Siente que tiene más problemas de memoria que la mayoría de las personas?",
  "¿Piensa que es maravilloso estar vivo/a en este momento?",
  "¿Se siente inútil en su situación actual?",
  "¿Se siente con mucha energía?",
  "¿Siente que su situación es irremediable?",
  "¿Piensa que la mayoría de las personas están en mejores condiciones que usted?",
] as const;
const depresivaSi = new Set([1, 2, 3, 5, 7, 8, 9, 11, 13, 14]);
export function gdsFaltantes(answer: GdsAnswer): string[] {
  return GDS_ITEMS.flatMap((_, i) => answer[i] == null ? [`pregunta ${i + 1}`] : []);
}
export function puntuarGds(answer: GdsAnswer) {
  return { total: answer.slice(0, 15).reduce<number>((sum, v, i) =>
    sum + (v === null || v === undefined ? 0 : v === depresivaSi.has(i) ? 1 : 0), 0),
    completo: gdsFaltantes(answer).length === 0 };
}
