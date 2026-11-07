export const ESCOLARIDAD = ["Sin escolaridad", "Primaria incompleta", "Primaria completa", "Secundaria incompleta", "Secundaria completa (bachiller)", "Técnico", "Universitario incompleto", "Universitario completo", "Posgrado"];
export const ESTADOS_CIVILES = ["Soltero/a", "Casado/a", "Concubino/a – unión libre", "Separado/a", "Divorciado/a", "Viudo/a"];
export const CIUDADES = ["La Paz", "El Alto", "Cochabamba", "Santa Cruz de la Sierra", "Oruro", "Potosí", "Sucre", "Tarija", "Trinidad", "Cobija"];
export const PROFESIONES = ["Jubilado/a", "Ama de casa", "Comerciante", "Agricultor/a", "Docente", "Chofer", "Artesano/a", "Estudiante", "Empleado/a", "Profesional independiente"];

export function calcularEdad(nacimiento: string, evaluacion: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(nacimiento);
  const fecha = /^(\d{4})-(\d{2})-(\d{2})$/.exec(evaluacion);
  if (!match || !fecha) return "";
  const [anio, mes, dia] = match.slice(1).map(Number);
  const [anioEval, mesEval, diaEval] = fecha.slice(1).map(Number);
  const birth = new Date(Date.UTC(anio, mes - 1, dia));
  const evalDate = new Date(Date.UTC(anioEval, mesEval - 1, diaEval));
  if (birth.getUTCFullYear() !== anio || birth.getUTCMonth() !== mes - 1 || birth.getUTCDate() !== dia ||
      evalDate.getUTCFullYear() !== anioEval || evalDate.getUTCMonth() !== mesEval - 1 || evalDate.getUTCDate() !== diaEval ||
      birth > evalDate) return "";
  return String(anioEval - anio - (mesEval < mes || (mesEval === mes && diaEval < dia) ? 1 : 0));
}
