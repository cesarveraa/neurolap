"use client";

import { useId } from "react";
import { calcularEdad, CIUDADES, ESCOLARIDAD, ESTADOS_CIVILES, PROFESIONES } from "@/lib/edm/paciente";

export type Paciente = {
  paciente: string; edad: string; sexo: string; escolaridad: string; aniosEstudio?: string;
  lugar: string; fecha: string; evaluador: string; fechaNacimiento: string; lugarNacimiento: string;
  manoEscritura: string; profesion: string; ocupacion: string; estadoCivil: string; hijos: string;
  idiomaMaterno: string; otrosIdiomas: string; convivencia: string; antecedentes: string;
  medicacion: string; dificultadesMemoria: string;
};

const idiomas = ["Castellano", "Aymara", "Quechua", "Guaraní", "Otro"];
const convivencias = ["Solo/a", "Pareja", "Hijos/as", "Nietos/as", "Otros familiares", "Cuidador/a", "Residencia"];

export function Segmentado({ titulo, value, opciones, onChange }: {
  titulo: string; value: string; opciones: string[]; onChange: (value: string) => void;
}) {
  const id = useId();
  const otro = Boolean(value && !opciones.includes(value));
  return <fieldset className="edm-choice edm-wide">
    <legend>{titulo}</legend>
    <div className="edm-choice-options">
      {opciones.map((opcion) => <label key={opcion} className="edm-choice-option">
        <input type="radio" name={id} checked={value === opcion || (opcion === "Otro" && otro)}
          onChange={() => onChange(opcion)} /> <span>{opcion}</span>
      </label>)}
    </div>
    {otro && <label className="edm-other">Otro: {value === "Otro" ? "" : value}
      <input type="text" value={value === "Otro" ? "" : value} onChange={(e) => onChange(e.target.value || "Otro")} />
    </label>}
  </fieldset>;
}

export function Chips({ titulo, value, opciones, onChange, permiteOtro = false }: {
  titulo: string; value: string; opciones: string[]; onChange: (value: string) => void; permiteOtro?: boolean;
}) {
  const id = useId();
  const selected = value ? value.split(", ").filter(Boolean) : [];
  const desconocidos = selected.filter((item) => !opciones.includes(item));
  const toggle = (item: string) => onChange((selected.includes(item)
    ? selected.filter((x) => x !== item) : [...selected, item]).join(", "));
  return <fieldset className="edm-choice edm-wide">
    <legend>{titulo}</legend>
    <div className="edm-choice-options">
      {opciones.map((opcion) => <label key={opcion} className="edm-choice-option">
        <input type="checkbox" checked={selected.includes(opcion)} onChange={() => toggle(opcion)} />
        <span>{opcion}</span>
      </label>)}
      {permiteOtro && <label className="edm-choice-option">
        <input type="checkbox" checked={desconocidos.length > 0} onChange={() =>
          onChange((desconocidos.length ? selected.filter((x) => opciones.includes(x)) : [...selected, "Otro"]).join(", "))} />
        <span>Otro</span>
      </label>}
    </div>
    {permiteOtro && desconocidos.length > 0 && <label className="edm-other" htmlFor={id}>Otro: {desconocidos.filter((x) => x !== "Otro").join(", ")}
      <input id={id} type="text" value={desconocidos.join(", ") === "Otro" ? "" : desconocidos.join(", ")}
        onChange={(e) => onChange([...selected.filter((x) => opciones.includes(x)), e.target.value || "Otro"].join(", "))} />
    </label>}
    {!permiteOtro && desconocidos.length > 0 && <p className="edm-legacy">Otro: {desconocidos.join(", ")}</p>}
  </fieldset>;
}

export function Contador({ titulo, value, onChange }: {
  titulo: string; value: string; onChange: (value: string) => void;
}) {
  const id = useId();
  const number = Number(value || 0);
  return <div className="edm-counter">
    <label htmlFor={id}>{titulo}</label>
    <div><button type="button" aria-label={`Reducir ${titulo}`} disabled={number <= 0} onClick={() => onChange(String(number - 1))}>−</button>
      <input id={id} type="number" min="0" max="20" value={value} onChange={(e) => onChange(e.target.value)} />
      <button type="button" aria-label={`Aumentar ${titulo}`} disabled={number >= 20} onClick={() => onChange(String(number + 1))}>+</button></div>
  </div>;
}

function Lista({ titulo, value, opciones, onChange }: {
  titulo: string; value: string; opciones: string[]; onChange: (value: string) => void;
}) {
  return <label>{titulo}<select value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="">Seleccione…</option>
    {value && !opciones.includes(value) && <option value={value}>Otro: {value}</option>}
    {opciones.map((opcion) => <option key={opcion} value={opcion}>{opcion}</option>)}
  </select></label>;
}

export function CamposPaciente({ value, onChange }: { value: Paciente; onChange: (value: Paciente) => void }) {
  const set = (key: keyof Paciente, text: string) => onChange({ ...value, [key]: text });
  const fechaEdad = value.fechaNacimiento ? calcularEdad(value.fechaNacimiento, value.fecha) : "";
  const texto = (key: keyof Paciente, titulo: string, list?: string) =>
    <label>{titulo}<input type="text" list={list} value={value[key] ?? ""} onChange={(e) => set(key, e.target.value)} /></label>;
  return <div className="edm-patient-blocks">
    <section><h2>Identificación</h2><div className="edm-patient-grid">
      {texto("paciente", "Nombre o código del paciente")}
      {texto("evaluador", "Evaluador")}
      <label>Fecha de evaluación<input type="date" value={value.fecha} onChange={(e) => {
        onChange({ ...value, fecha: e.target.value, edad: value.fechaNacimiento ? calcularEdad(value.fechaNacimiento, e.target.value) : value.edad });
      }} /></label>
      {texto("lugar", "Lugar", "edm-ciudades")}
      <label>Fecha de nacimiento<input type="date" value={value.fechaNacimiento} onChange={(e) => {
        onChange({ ...value, fechaNacimiento: e.target.value, edad: e.target.value ? calcularEdad(e.target.value, value.fecha) : value.edad });
      }} /></label>
      <label>Edad {value.fechaNacimiento && <small>Calculada a la fecha de evaluación</small>}
        <input type="number" min="18" max="110" value={value.fechaNacimiento ? fechaEdad : value.edad}
          readOnly={Boolean(value.fechaNacimiento)} onChange={(e) => set("edad", e.target.value)} /></label>
      {texto("lugarNacimiento", "Lugar de nacimiento", "edm-ciudades")}
      <datalist id="edm-ciudades">{CIUDADES.map((x) => <option key={x} value={x} />)}<option value="Otro país" /></datalist>
    </div></section>
    <section><h2>Datos sociodemográficos</h2><div className="edm-patient-grid">
      <Segmentado titulo="Sexo" value={value.sexo} opciones={["Femenino", "Masculino"]} onChange={(x) => set("sexo", x)} />
      <Segmentado titulo="Mano con que escribe" value={value.manoEscritura} opciones={["Derecha", "Izquierda", "Ambas"]} onChange={(x) => set("manoEscritura", x)} />
      <Lista titulo="Escolaridad" value={value.escolaridad} opciones={ESCOLARIDAD} onChange={(x) => set("escolaridad", x)} />
      <label>Años de estudio (opcional)<input type="number" min="0" max="25" value={value.aniosEstudio ?? ""} onChange={(e) => set("aniosEstudio", e.target.value)} /></label>
      <Lista titulo="Estado civil" value={value.estadoCivil} opciones={ESTADOS_CIVILES} onChange={(x) => set("estadoCivil", x)} />
      <Contador titulo="N.º de hijos" value={value.hijos} onChange={(x) => set("hijos", x)} />
      <Segmentado titulo="Idioma materno" value={value.idiomaMaterno} opciones={idiomas} onChange={(x) => set("idiomaMaterno", x)} />
      <Chips titulo="Otros idiomas" value={value.otrosIdiomas} opciones={idiomas.slice(0, -1)} permiteOtro onChange={(x) => set("otrosIdiomas", x)} />
      <Chips titulo="Con quién vive" value={value.convivencia} opciones={convivencias} onChange={(x) => set("convivencia", x)} />
      {texto("profesion", "Profesión", "edm-profesiones")}
      {texto("ocupacion", "Ocupación", "edm-profesiones")}
      <datalist id="edm-profesiones">{PROFESIONES.map((x) => <option key={x} value={x} />)}</datalist>
    </div></section>
    <section><h2>Salud y memoria</h2><div className="edm-patient-grid">
      {([ ["antecedentes", "Enfermedades o intervenciones anteriores"], ["medicacion", "Medicación actual"], ["dificultadesMemoria", "Dificultades de memoria manifiestas o diagnosticadas"] ] as const).map(([key, label]) =>
        <label key={key} className="edm-wide">{label}<textarea value={value[key]} rows={3} onChange={(e) => set(key, e.target.value)} /></label>)}
    </div></section>
  </div>;
}
