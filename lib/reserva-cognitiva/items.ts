export const RESERVA_ITEMS = [
  "Controlo mis asuntos personales (tomar mis medicinas, ir a la cita con el médico, " +
    "qué ropa vestir cada día, reservas en hoteles, etc.).",
  "Controlo los asuntos económicos de mi hogar (recibos, hipoteca, inversiones, etc.).",
  "Realizo tareas domésticas (hacer la comida, limpiar el polvo, ordenar la casa, " +
    "poner la lavadora, hacer la compra, etc.).",
  "Utilizo las nuevas tecnologías de forma básica (contestar al teléfono o al celular, " +
    "prender la televisión, cambiar los canales, etc.).",
  "Realizo cursos, talleres o similares (de informática, de idiomas, etc.).",
  "Hago uso de otro idioma o dialecto.",
  "Estoy informado/a (escucho la radio, veo noticias por televisión, leo el periódico, etc.).",
  "Utilizo las nuevas tecnologías del momento y hago uso de ellas de una forma más compleja " +
    "(uso el teléfono celular para escribir mensajes, navegar por Internet, reservas online, etc.).",
  "Leo como afición (periódicos, revistas, libros).",
  "Me gusta realizar pasatiempos (crucigramas, sopa de letras, cruzadas, etc.) " +
    "y/o juegos de mesa (cartas, damas, dominó, ajedrez, etc.).",
  "Escribo como afición (cartas, diario personal, poesía, etc.).",
  "Escucho música o veo la televisión (música clásica o de la época, noticias, " +
    "concursos, entrevistas, etc.).",
  "Toco algún instrumento musical (guitarra, flauta, etc.).",
  "Colecciono objetos (sellos, monedas, postales, etc.).",
  "Viajo o realizo excursiones de forma activa (visito monumentos, muestro interés " +
    "por la cultura del lugar y las costumbres, etc.).",
  "Asisto a algún evento cultural (exposiciones, teatro, cine, visita a museos, conciertos).",
  "Realizo manualidades y/o jardinería (trabajos de carpintería, costura, poda de plantas, etc.).",
  "Cocino como afición (realizo nuevas recetas, pruebo otras formas de cocinar los alimentos, etc.).",
  "Me gusta pintar y/o tomar fotos (pintar cuadros, hacer fotos de los sitios que he visitado, " +
    "realizar reportajes, retoques digitales, etc.).",
  "Voy de compras de forma activa (comparo precios, pruebo nuevos productos, " +
    "memorizo la lista de la compra, etc.).",
  "Realizo alguna actividad física (tai chi, correr, fútbol, caminar, etc.).",
  "Visito y/o soy visitado/a por familiares, amigos, vecinos, etc. " +
    "(reuniones sociales, comidas familiares, etc.).",
  "Realizo actividades religiosas, de convivencia, de voluntariado, etc.",
  "Me relaciono con personas de otras generaciones.",
] as const;

export type ReservaAnswer = (1 | 2 | 3 | null)[];
export function resumirReserva(answers: ReservaAnswer) {
  return {
    total: answers.reduce<number>((sum, value) => sum + (value ?? 0), 0),
    si: answers.filter((value) => value === 1).length,
    completo: answers.length === RESERVA_ITEMS.length && answers.every((value) => value !== null),
  };
}
