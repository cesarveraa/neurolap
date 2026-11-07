// Genera un borrador de demostración completo (paciente ficticia) para ver el informe final. No es parte de la app.
import { EDM_ITEMS } from "../lib/edm/items.ts";
import { puntuarItem } from "../lib/edm/scoring.ts";
import { RESERVA_ITEMS } from "../lib/reserva-cognitiva/items.ts";

const P: Record<string, number> = { episodica: 0.62, operativa: 0.86, semantica: 0.9, procesual: 0.8 };
const pick = (n: number, p: number, salto = 0) => Array.from({ length: n }, (_, i) => ((i * 7 + salto) % 10) / 10 < p);
const answers: Record<string, any> = {};
for (const it of EDM_ITEMS) {
  const r = it.respuesta, p = P[it.sistema] ?? 0.8, n = r.opciones?.length ?? 0;
  let a: any = { fuente: "manual" };
  switch (r.tipo) {
    case "dosEnsayos": a.ensayo1 = pick(6, p - 0.2); a.ensayo2 = pick(6, p, 3); break;
    case "matriz": a.aciertos = 11; break;
    case "reconocimiento": a.si = (r.opciones ?? []).map((x, i) => (r.objetivos ?? []).includes(x) ? i % 4 !== 1 : i % 5 === 0); break;
    case "series": a.series = [true, true, true, true, true, false, true, false, false, false]; break;
    case "trazos": a.trazos = Array.from({ length: 18 }, (_, i) => it.ia === "dibujo_memoria" ? (i % 3 === 0 ? 2 : i % 3 === 1 ? 1 : 0) : (i % 6 === 5 ? 1 : 2)); break;
    case "auditiva": a.bloqueA = [true, false]; a.bloqueB = [true, true, false]; break;
    case "interferencia": a.evocacion = pick(8, p); a.lectura = Array(8).fill(true); break;
    case "fluidez":
      a.animales = 12; a.f = 8;
      a.transcriptAnimales = "perro, gato, vaca, caballo, oveja, llama, gallina, pato, conejo, chancho, león, tigre";
      a.transcriptF = "foca, foco, flor, flota, feria, feroz, fruta, fideo";
      a.cualitativaAnimales = { version: "fluidez-cualitativa-v1", n_words: 12, labelled: 12,
        clusters: [
          { words: ["perro", "gato"], categories: ["domestico"], size: 1 },
          { words: ["vaca", "caballo", "oveja"], categories: ["granja"], size: 2 },
          { words: ["gallina", "pato"], categories: ["aves", "granja"], size: 1 },
          { words: ["león", "tigre"], categories: ["felinos", "africa"], size: 1 },
        ], switches: 5, mean_cluster_size: 0.67, repetitions: 0,
        per_15s: [5, 3, 2, 2], first_word_s: 1.8, median_irt_s: 3.4, long_pauses: 1 };
      a.cualitativaF = { version: "fluidez-cualitativa-v1", n_words: 8, labelled: 8,
        clusters: [
          { words: ["foca", "foco"], categories: [], size: 1 },
          { words: ["flor", "flota"], categories: [], size: 1 },
          { words: ["feria", "feroz"], categories: [], size: 1 },
        ], switches: 4, mean_cluster_size: 0.43, repetitions: 0,
        per_15s: [3, 2, 2, 1], first_word_s: 2.1, median_irt_s: 4.6, long_pauses: 1 };
      break;
    case "modos": a.modos = { A: [true, false, false], B: [true, true, false], C: [true, true, true] }; break;
    case "motora": a.movimientos = [true, true, false, true, true]; break;
    default: a.checks = pick(n, p, it.orden);
  }
  if (it.ia === "video") a.tamizajeDecision = "sin_deficit_aparente";
  if (it.registraMovimiento) a.movimientos = [it.registraMovimiento !== "26c"]; // observaciones 26a–26e

  const s = puntuarItem(it, a);
  if (s.puntaje === null && !s.color) throw new Error(`ítem ${it.orden} (${r.tipo}) sin puntaje`);
  answers[String(it.orden)] = a;
}
const draft = {
  patient: { paciente: "Paciente de demostración (DEMO-072)", edad: "72", sexo: "F", escolaridad: "Primaria completa",
             lugar: "La Paz", fecha: "2026-11-07", evaluador: "Evaluador de demostración",
             fechaNacimiento: "1954-03-12", lugarNacimiento: "Oruro", manoEscritura: "Derecha", profesion: "Comerciante",
             ocupacion: "Jubilada", estadoCivil: "Viuda", hijos: "3", idiomaMaterno: "Castellano", otrosIdiomas: "Aymara (básico)",
             convivencia: "Con una hija", antecedentes: "Hipertensión controlada", medicacion: "Losartán 50 mg",
             dificultadesMemoria: "Olvida citas y dónde deja objetos desde hace 1 año" },
  step: 32, complete: true, answers,
  modules: { mmse: true, reserva: true },
  consent: { acepta: true, nombre: "Paciente de demostración", relacion: "evaluado", fecha: "2026-11-07" },
  mmse: { fecha: [true, true, false, true], objetos: [true, true, true], repeticiones: 1, digitos: ["9", "7", "5", "4", "1"],
          papel: [true, true, true], recuerdo: ["correcto", "incorrecto", "nr"], copia: "correcto" },
  reserva: RESERVA_ITEMS.map((_, i) => ([1, 1, 2, 1, 3, 2][i % 6]) as 1 | 2 | 3),
  escalas: { informante: "aplicada", gds: "aplicada", lawton: "aplicada" },
  informante: { ad8: ["si", "no", "si", "no", "no_sabe", "no", "si", "no"],
    descriptivas: { relacion: "Hija", tiempo: "Dos años", horas: "Cuatro horas al día",
      situacion: "Olvidos frecuentes", madre: "Olvidos en edad avanzada",
      significado: "Cambio en el estilo de vida", postergadas: "Trabajo",
      emociones_impacto: "A veces negativamente" } },
  gds: [false, true, false, false, true, false, true, false, false, true,
    true, false, false, false, false],
  lawton: [0, 1, 1, 1, 1, 2, 1, 1],
  reySuggestions: {},
  finalNotes: { cognitivo: "Datos de demostración: perfil con afectación de la memoria episódica diferida y conservación de lenguaje y funciones ejecutivas.",
                emocional: "Sin observaciones (demostración).", conductual: "Colaboradora durante toda la sesión (demostración)." },
};
console.log(JSON.stringify(draft));
