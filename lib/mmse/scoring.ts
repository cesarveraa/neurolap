export type MmseAnswer = {
  fecha: (boolean | null)[];
  objetos: (boolean | null)[];
  repeticiones: number | null;
  digitos: string[];
  papel: (boolean | null)[];
  recuerdo: ("correcto" | "incorrecto" | "nr" | null)[];
  copia: "correcto" | "incorrecto" | "nr" | null;
  foto?: string;
};

export const emptyMmse: MmseAnswer = {
  fecha: [null, null, null, null],
  objetos: [null, null, null],
  repeticiones: null,
  digitos: ["", "", "", "", ""],
  papel: [null, null, null],
  recuerdo: [null, null, null],
  copia: null,
};

/** Partes del MMSE que faltan registrar, en el orden del formulario (para decirle al evaluador qué completar). */
export function mmseFaltantes(answer: MmseAnswer): string[] {
  const faltan: string[] = [];
  if (answer.fecha.some((v) => v === null)) faltan.push("1. fecha de hoy");
  if (answer.objetos.some((v) => v === null)) faltan.push("2. tres objetos");
  if (answer.repeticiones === null) faltan.push("2. número de repeticiones");
  if (!answer.digitos.every((v) => /^[0-9]$/.test(v))) faltan.push("3. números al revés");
  if (answer.papel.some((v) => v === null)) faltan.push("4. papel");
  if (answer.recuerdo.some((v) => v === null)) faltan.push("5. recuerdo de los tres objetos");
  if (answer.copia === null) faltan.push("6. copia del dibujo");
  return faltan;
}

export function puntuarMmse(answer: MmseAnswer) {
  const count = (values: (boolean | null)[]) => values.filter((value) => value === true).length;
  const digitos = answer.digitos.filter((value, index) => value === ["9", "7", "5", "3", "1"][index]).length;
  const total = count(answer.fecha) + count(answer.objetos) + digitos + count(answer.papel) +
    answer.recuerdo.filter((value) => value === "correcto").length +
    (answer.copia === "correcto" ? 1 : 0);
  const completo = answer.fecha.every((value) => value !== null) &&
    answer.objetos.every((value) => value !== null) &&
    answer.digitos.every((value) => /^[0-9]$/.test(value)) &&
    answer.papel.every((value) => value !== null) &&
    answer.recuerdo.every((value) => value !== null) && answer.copia !== null &&
    answer.repeticiones !== null;
  return {
    total,
    completo,
    interpretacion: total >= 14 ? "normal" : "sugiere déficit cognitivo",
  };
}
