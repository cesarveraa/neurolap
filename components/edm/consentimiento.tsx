"use client";

export type Consentimiento = {
  acepta: boolean;
  nombre: string;
  relacion: "evaluado" | "familiar" | "representante" | "";
  fecha: string;
};

export function ConsentimientoForm({ value, onChange }: {
  value: Consentimiento;
  onChange: (value: Consentimiento) => void;
}) {
  const set = (patch: Partial<Consentimiento>) => onChange({ ...value, ...patch });
  return <section className="edm-start-panel edm-consent">
    <p className="edm-kicker">Consentimiento informado</p>
    <h1>Participación en la evaluación</h1>
    <div className="edm-consent-text">
      <p>CENTRO DE ATENCIÓN E INVESTIGACIONES PSICOLÓGICAS Y NEUROPSICOLÓGICAS BOLIVIA</p>
      <h2>CONSENTIMIENTO INFORMADO</h2>
      <p>Estudio: Estado neuropsicológico en personas adultas mayores en la ciudad de
        Santa Cruz de la Sierra</p>
      <h3>LEA CUIDADOSAMENTE LO SIGUIENTE:</h3>
      <p>Usted ha sido invitado (a) a participar en una evaluación gratuita del estado neuropsicológico en
        personas Adultas Mayores. Sin embargo, antes de dar su consentimiento para participar en esta
        actividad, por favor lea cuidadosamente el contenido de este documento, debemos estar seguros
        que comprende todos los requisitos y procedimientos que requiere su participación.</p>
      <p>Usted ha sido seleccionado en un procedimiento al azar bajo un único criterio de inclusión de
        edad igual o mayor a los 60 años.</p>
      <h3>PROPÓSITO DEL ESTUDIO:</h3>
      <p>El propósito de este estudio es detectar casos de personas adultas mayores que presenten
        alteraciones en el estado neuropsicológico para poder implementar de manera gratuita un programa
        de intervención neuropsicológica, para lo cual tenemos como punto de partida el establecimiento
        del perfil neuropsicológico de las personas Adultas Mayores en la ciudad de
        Santa Cruz de la Sierra.</p>
      <h3>RIESGOS DEL ESTUDIO:</h3>
      <p>La participación en este estudio no representa para el adulto mayor o su entorno NINGÚN RIESGO
        al no plantearse variables de influencia, ni positiva, ni negativa.</p>
      <h3>PARTICIPACIÓN EN EL ESTUDIO:</h3>
      <p>Nuevamente le reiteramos que su participación es completamente voluntaria. Usted puede finalizar
        su participación en el momento que lo decida. No se le penalizará de ninguna forma por no
        participar. Adicionalmente, pudiera ser excluido del estudio por el personal de investigación si
        en algún momento los investigadores consideran que su participación no es beneficiosa para
        usted mismo.</p>
      <h3>CONFIDENCIALIDAD:</h3>
      <p>Su información llevará su nombre, pero este no será nunca divulgado.
        La base de datos del estudio
        permanecerá en la oficina del investigador principal y solamente los miembros del equipo de
        investigación tendrán acceso a ella.</p>
      <h3>ACEPTACIÓN:</h3>
      <p>He leído este consentimiento de participación en el Estudio del e,
        el cual está impreso en español
        (lenguaje que leo y entiendo). Este estudio de investigación me ha sido explicado y todas mis
        preguntas relacionadas con los procedimientos, riesgos, inconvenientes y efectos adversos del
        mismo, me han sido respondidas satisfactoriamente.</p>
      <p>Firma del participante: ____________________ Firma del apoderado: ____________________</p>
    </div>
    <div className="edm-consent-fields">
      <label className="edm-checkbox"><input type="checkbox" checked={value.acepta}
        onChange={(event) => set({ acepta: event.target.checked })} />
        El evaluado (o su representante) acepta participar</label>
      <label>Nombre de quien consiente<input value={value.nombre}
        onChange={(event) => set({ nombre: event.target.value })} /></label>
      <label>Relación<select value={value.relacion}
        onChange={(event) => set({ relacion: event.target.value as Consentimiento["relacion"] })}>
        <option value="">Seleccione una relación</option>
        <option value="evaluado">Evaluado</option><option value="familiar">Familiar</option>
        <option value="representante">Representante</option>
      </select></label>
      <label>Fecha<input type="date" value={value.fecha}
        onChange={(event) => set({ fecha: event.target.value })} /></label>
    </div>
  </section>;
}
