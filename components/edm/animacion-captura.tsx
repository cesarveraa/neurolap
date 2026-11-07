// Guías de captura animadas: cada una cuenta 3 pasos en 9 s (SVG + CSS, solo transform/opacity).
// El texto de cada paso se repite en la lista de la guía, así que la figura es decorativa (aria-hidden).
type TipoCaptura = "video" | "dibujo" | "fluidez";

const PASOS: Record<TipoCaptura, [string, string, string]> = {
  dibujo: [
    "Inclinado o corrido: la hoja sale deformada o cortada",
    "Paralelo y de frente: la hoja entera, con un poco de mesa",
    "Toque para enfocar, sostenga firme y tome la foto",
  ],
  video: [
    "Teléfono fijo a ~1 m, a la altura del pecho",
    "Ambas manos y antebrazos siempre dentro del cuadro",
    "Puño, filo y palma: 3 intentos con cada mano",
  ],
  fluidez: [
    "Teléfono sobre la mesa, a unos 30 cm de la persona",
    "La persona dice palabras durante 60 segundos",
    "Silencio alrededor: sin TV y sin que nadie más hable",
  ],
};

function Insignia({ x, y, ok }: { x: number; y: number; ok: boolean }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r="12" className={ok ? "cap-ok" : "cap-bad"} />
    <path d={ok ? "M-5 0l3.5 3.5L5-4" : "M-4-4l8 8m0-8-8 8"} className="cap-badline" />
  </g>;
}

function Dibujo() {
  return <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="304" height="184" rx="16" className="cap-wood" />
    <path d="M24 40h60M236 172h56M28 152h30M252 26h40" className="cap-grain" />
    <rect x="95" y="54" width="130" height="92" rx="2" className="cap-paper" />
    {/* figura compleja de Rey, simplificada */}
    <path d="M128 76h52v40h-52zM128 76l52 40M180 76l-52 40M154 76v40M128 96h52M180 76l16 20-16 20M128 76V64m-6 4h12M167 86a4 4 0 1 0 0 .1" className="cap-fig" />
    <g className="cap-on1 rm-hide">
      <path d="M118 22 262 40 248 176 104 150Z" className="cap-phone" />
      <Insignia x={282} y={28} ok={false} />
    </g>
    <g className="cap-from2">
      <g className="cap-settle">
        <rect x="70" y="32" width="180" height="136" rx="16" className="cap-phone" />
        <circle cx="79" cy="100" r="2.5" className="cap-inkf" />
      </g>
      <path d="M88 58V46h12M220 46h12v12M88 142v12h12M220 154h12v-12" className="cap-acc cap-thick cap-corners" />
    </g>
    <circle cx="160" cy="100" r="16" className="cap-acc cap-thick cap-focus rm-hide" />
    <rect x="74" y="36" width="172" height="128" rx="12" className="cap-flash rm-hide" />
    <g className="cap-okb"><Insignia x={282} y={28} ok /></g>
  </svg>;
}

const PUNO = <><path d="M-12 2v-13q0-8 8-8h8q8 0 8 8V2Z" className="cap-skin" /><path d="M-8-13h16M-12-6q-5 1-4 6" className="cap-k" /></>;
const FILO = <><path d="M-5 2v-23q0-6 5-6t5 6V2Z" className="cap-skin" /><path d="M5-16q5 0 5 5" className="cap-k" /></>;
const PALMA = <path d="M-19 2c0-5 1-8 4-8c1-3 6-3 7 0c1-3 6-3 7 0c1-3 6-3 7 0c1-3 6-3 7 0c3 0 6 3 6 8Z" className="cap-skin" />;

function Mano({ x, activaEn }: { x: number; activaEn: "a" | "b" }) {
  const reposo = activaEn === "a" ? "cap-b" : "cap-a";
  return <g transform={`translate(${x} 152)`}>
    <g className={reposo}>{PALMA}</g>
    <g className={`cap-${activaEn} rm-hide`}>
      <g className="cap-tap">
        <g className="cap-p1">{PUNO}</g>
        <g className="cap-p2">{FILO}</g>
        <g className="cap-p3">{PALMA}</g>
      </g>
      <path d="M-24 4l-7 3M24 4l7 3M-21-5l-7-2M21-5l7-2" className="cap-acc cap-impact" />
    </g>
  </g>;
}

function Video() {
  return <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M120 132v-32q0-24 24-24h32q24 0 24 24v32Z" className="cap-cloth" />
    <circle cx="160" cy="48" r="18" className="cap-skin" />
    <path d="M12 132h296l8 40H4Z" className="cap-wood" />
    <path d="M4 172h312v12H4Z" className="cap-wood2" />
    <path d="M128 84q-22 16-20 40l6 22h16l-4-22q0-16 12-26ZM192 84q22 16 20 40l-6 22h-16l4-22q0-16-12-26Z" className="cap-cloth" />
    <Mano x={122} activaEn="a" />
    <Mano x={198} activaEn="b" />
    <rect x="86" y="102" width="148" height="64" rx="8" className="cap-frame" />
    <rect x="86" y="102" width="148" height="64" rx="8" className="cap-acc cap-thick cap-on2" />
    <circle cx="97" cy="113" r="3.5" className="cap-accf cap-blink" />
    <text x="111" y="116.5" className="cap-t cap-small">REC</text>
    <g className="cap-impact">
      <path d="M262 146h5l6-5v14l-6-5h-5Z" className="cap-accf" />
      <path d="M278 143q4 5 0 10M283 139q8 9 0 18" className="cap-acc" />
    </g>
    {/* recuadro: vista lateral con la distancia y la altura del teléfono */}
    <rect x="224" y="10" width="88" height="70" rx="8" className="cap-card" />
    <rect x="224" y="10" width="88" height="70" rx="8" className="cap-acc cap-thick cap-on1" />
    <path d="M232 66h72M246 66V41M240 66l6-10 6 10M292 33v14h-8v19M292 47h6v19M274 47h12" className="cap-k" />
    <rect x="242" y="28" width="8" height="13" rx="2" className="cap-inkf" />
    <circle cx="292" cy="27" r="5" className="cap-skin" />
    <path d="M251 35 286 38" className="cap-guide" />
    <path d="M246 73h46M246 70v6M292 70v6" className="cap-acc" />
    <text x="269" y="61" className="cap-t cap-small">~1 m</text>
    {/* postura actual */}
    <rect x="12" y="12" width="78" height="26" rx="13" className="cap-pill" />
    <text x="51" y="29.5" className="cap-t cap-p1 rm-hide">puño</text>
    <text x="51" y="29.5" className="cap-t cap-p2 rm-hide">filo</text>
    <text x="51" y="29.5" className="cap-t cap-p3 rm-hide">palma</text>
    <text x="51" y="29.5" className="cap-t cap-small rm-show">puño · filo · palma</text>
  </svg>;
}

const PALABRAS = ["perro", "gato", "vaca", "llama"];  // salen cada 0,8 s, alternando fila

function Fluidez() {
  return <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 148v-24q0-20 22-20h20q18 0 22 20v24Z" className="cap-cloth" />
    <circle cx="58" cy="78" r="21" className="cap-skin" />
    <path d="M78 75l6 6-5 2M41 66q9-15 31-9" className="cap-k" />
    <circle cx="67" cy="73" r="1.8" className="cap-inkf" />
    <rect x="10" y="148" width="300" height="10" rx="3" className="cap-wood" />
    <g className="cap-from2">
      <path d="M88 82q5 6 0 12M94 77q9 11 0 22" className="cap-acc" />
      <g className="rm-hide">
        {PALABRAS.map((palabra, i) => {
          const y = i % 2 ? 84 : 62;  // dos filas para que no se encimen
          return <g key={palabra} className="cap-word" style={{ animationDelay: `${-0.8 * i}s` }}>
            <rect x="100" y={y} width="40" height="16" rx="8" className="cap-accf" />
            <text x="120" y={y + 11.5} className="cap-tw">{palabra}</text>
          </g>;
        })}
      </g>
    </g>
    <path d="M234 148l6-12 6 12" className="cap-k" />
    <g transform="rotate(-8 241 112)">
      <rect x="226" y="86" width="30" height="52" rx="6" className="cap-phonef" />
      <rect x="226" y="86" width="30" height="52" rx="6" className="cap-acc cap-thick cap-on1" />
      <circle cx="241" cy="104" r="9" className="cap-track" />
      <circle cx="241" cy="104" r="9" className="cap-ring" transform="rotate(-90 241 104)" />
      {[231, 237, 243, 249].map((x, i) => <rect key={x} x={x} y="118" width="3.5" height="12" rx="1.5"
        className="cap-accf cap-bar" style={{ animationDelay: `${-0.17 * i}s` }} />)}
    </g>
    <path d="M80 98v66M241 142v22" className="cap-guide" />
    <path d="M80 172h161M80 166v12M241 166v12" className="cap-k" />
    <path d="M80 172h161M80 166v12M241 166v12" className="cap-acc cap-thick cap-on1" />
    <text x="160" y="192" className="cap-t">≈ 30 cm</text>
    <g className="cap-on3">
      <rect x="262" y="18" width="40" height="27" rx="4" className="cap-k" />
      <path d="M276 50h12M282 45v5" className="cap-k" />
      <path d="M258 14l48 40" className="cap-slash" />
      <path d="M180 20h40q6 0 6 6v10q0 6-6 6h-24l-8 7v-7h-8q-6 0-6-6V26q0-6 6-6Z" className="cap-k" />
      <path d="M190 31h0M200 31h0M210 31h0" className="cap-k cap-dots" />
      <path d="M176 16l54 34" className="cap-slash" />
    </g>
  </svg>;
}

export function AnimacionCaptura({ tipo }: { tipo: TipoCaptura }) {
  return <figure className="cap-art" aria-hidden="true">
    {tipo === "dibujo" ? <Dibujo /> : tipo === "video" ? <Video /> : <Fluidez />}
    <figcaption className="cap-steps">
      {PASOS[tipo].map((paso, i) => <span key={paso} className={`cap-on${i + 1}`}><b>{i + 1}</b>{paso}</span>)}
    </figcaption>
    <div className="cap-progress"><i /><i /><i /></div>
  </figure>;
}
