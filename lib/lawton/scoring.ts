export type LawtonAnswer = (number | null)[];
export const emptyLawton: LawtonAnswer = Array(8).fill(null);
export const LAWTON_AREAS = [
  { nombre: "Teléfono", opciones: [["Usa el teléfono por iniciativa propia", 1], ["Marca algunos números conocidos", 1], ["Contesta, pero no marca", 1], ["No usa el teléfono", 0]] },
  { nombre: "Compras", opciones: [["Hace todas las compras de forma independiente", 1], ["Compra pequeñas cosas de forma independiente", 0], ["Necesita compañía para comprar", 0], ["No puede hacer compras", 0]] },
  { nombre: "Preparación de comida", opciones: [["Planea, prepara y sirve comidas adecuadas", 1], ["Prepara comidas si recibe los ingredientes", 0], ["Calienta y sirve, pero no mantiene una dieta adecuada", 0], ["Necesita que le preparen y sirvan la comida", 0]] },
  { nombre: "Cuidado de la casa", opciones: [["Cuida la casa solo/a o con ayuda ocasional", 1], ["Hace tareas domésticas ligeras", 1], ["Hace tareas ligeras, pero no mantiene la limpieza", 1], ["Necesita ayuda en todas las tareas de la casa", 1], ["No participa en tareas domésticas", 0]] },
  { nombre: "Lavado de ropa", opciones: [["Lava toda su ropa personal", 1], ["Lava prendas pequeñas", 1], ["Otra persona debe lavar su ropa", 0]] },
  { nombre: "Transporte", opciones: [["Viaja solo/a en transporte público o conduce", 1], ["Organiza su propio viaje en taxi", 1], ["Usa transporte público con acompañante", 1], ["Viaja solo en taxi o automóvil con ayuda", 0], ["No viaja", 0]] },
  { nombre: "Medicación", opciones: [["Toma dosis y horarios correctos por su cuenta", 1], ["Toma la medicación si se le preparan las dosis", 0], ["No puede responsabilizarse de su medicación", 0]] },
  { nombre: "Dinero", opciones: [["Maneja sus asuntos financieros con independencia", 1], ["Maneja gastos cotidianos, pero necesita ayuda para ir al banco o hacer grandes gastos", 1], ["No puede manejar dinero", 0]] },
] as const;
export function lawtonFaltantes(answer: LawtonAnswer): string[] {
  return LAWTON_AREAS.flatMap((area, i) => answer[i] == null || !Number.isInteger(answer[i]) ||
    answer[i]! < 0 || answer[i]! >= area.opciones.length ? [area.nombre] : []);
}
export function puntuarLawton(answer: LawtonAnswer) {
  return { total: LAWTON_AREAS.reduce((sum, area, i) =>
    sum + (answer[i] == null || !Number.isInteger(answer[i]) || answer[i]! < 0 ||
      answer[i]! >= area.opciones.length ? 0 : area.opciones[answer[i]!][1]), 0),
    completo: lawtonFaltantes(answer).length === 0 };
}
